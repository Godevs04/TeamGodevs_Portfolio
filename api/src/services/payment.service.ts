import crypto from 'node:crypto';
import type { HydratedDocument } from 'mongoose';
import type { Orders } from 'razorpay/dist/types/orders.js';
import { env } from '../config/env.js';
import { isDatabaseReady } from '../config/db.js';
import { getRazorpay, getRazorpayKeySecret } from '../config/razorpay.js';
import {
  MIN_ORDER_AMOUNT_PAISE,
  PAYMENT_PURPOSE_LABELS,
  STUDENT_PROJECT_PRICE_TIERS,
  findStudentProject,
  type PaymentPurpose,
} from '../constants/catalog.js';
import { Order, type OrderDoc } from '../models/Order.js';
import {
  buildPaymentReceiptEmailHtml,
  buildPaymentTeamEmailHtml,
  type PaymentEmailData,
} from '../templates/payment-emails.js';
import { HttpError } from '../utils/http-error.js';
import { formatMinorAmount } from '../utils/pricing.js';
import type { VisitorMeta } from '../utils/request-meta.js';
import type {
  CreateOrderInput,
  PaymentFailureInput,
  VerifyPaymentInput,
} from '../validators/payment.schema.js';
import { sendEmails } from './email.service.js';

export type CreateOrderResult = {
  order_id: string;
  amount: number;
  currency: string;
  receipt: string;
  key_id: string;
};

type ResolvedItem = {
  amount: number;
  id: string | null;
  name: string;
  code: string | null;
  tier: number | null;
};

function resolveItem(input: CreateOrderInput): ResolvedItem {
  if (input.purpose === 'student-project') {
    const id = input.item?.id;
    const project = id ? findStudentProject(id) : null;
    if (!id || !project) {
      throw new HttpError(400, 'Invalid project selected. Please reopen the project and try again.');
    }
    return {
      amount: STUDENT_PROJECT_PRICE_TIERS[project.tier] * 100,
      id,
      name: project.title,
      code: project.code,
      tier: project.tier,
    };
  }

  return {
    amount: input.amount ?? 0,
    id: input.item?.id ?? null,
    name: input.item?.name ?? PAYMENT_PURPOSE_LABELS[input.purpose],
    code: input.item?.code ?? null,
    tier: null,
  };
}

/** Razorpay receipts are limited to 40 characters. */
function generateReceipt(): string {
  return `rcpt_${Date.now().toString(36)}_${crypto.randomBytes(4).toString('hex')}`;
}

/** Razorpay notes: max 15 keys, 256 characters per value. */
function note(value: string | null | undefined): string {
  return (value ?? '').slice(0, 256);
}

function toHttpError(error: unknown): HttpError {
  if (error instanceof HttpError) return error;

  const { statusCode, error: details } = (error ?? {}) as {
    statusCode?: number;
    error?: { code?: string; description?: string };
  };
  console.error('Razorpay API error:', statusCode ?? '', details?.description ?? error);

  if (statusCode === 401) {
    return new HttpError(401, 'Payment gateway authentication failed. Please contact us.');
  }
  return new HttpError(500, 'Unable to start the payment right now. Please try again in a moment.');
}

export async function createOrder(input: CreateOrderInput, meta: VisitorMeta): Promise<CreateOrderResult> {
  const item = resolveItem(input);

  if (item.amount < MIN_ORDER_AMOUNT_PAISE) {
    throw new HttpError(400, 'Minimum payment amount is ₹1 (100 paise).');
  }
  if (item.amount > env.paymentMaxAmountInr * 100) {
    throw new HttpError(
      400,
      `Online payments are limited to ${formatMinorAmount(env.paymentMaxAmountInr * 100, input.currency)}. Please contact us for larger payments.`
    );
  }

  const receipt = input.receipt || generateReceipt();
  const razorpay = getRazorpay();

  let razorpayOrder: Orders.RazorpayOrder;
  try {
    razorpayOrder = await razorpay.orders.create({
      amount: item.amount,
      currency: input.currency,
      receipt,
      notes: {
        purpose: input.purpose,
        item_id: note(item.id),
        item_name: note(item.name),
        item_code: note(item.code),
        customer_name: note(input.customer.name),
        customer_email: note(input.customer.email),
        customer_phone: note(input.customer.phone),
      },
    });
  } catch (error) {
    throw toHttpError(error);
  }

  if (isDatabaseReady()) {
    try {
      await Order.create({
        razorpayOrderId: razorpayOrder.id,
        amount: item.amount,
        currency: input.currency,
        receipt,
        purpose: input.purpose,
        item: { id: item.id, name: item.name, code: item.code, tier: item.tier },
        customer: {
          name: input.customer.name,
          email: input.customer.email,
          phone: input.customer.phone,
          college: input.customer.college ?? null,
        },
        notes: input.notes ?? null,
        ipAddress: meta.ipAddress,
        userAgent: meta.userAgent,
      });
    } catch (error) {
      // The Razorpay order exists, so checkout can still proceed; log for reconciliation.
      console.error(`Failed to save order ${razorpayOrder.id}:`, error);
    }
  } else {
    console.warn(`Database not connected — order ${razorpayOrder.id} was not saved.`);
  }

  return {
    order_id: razorpayOrder.id,
    amount: Number(razorpayOrder.amount),
    currency: razorpayOrder.currency,
    receipt,
    key_id: env.razorpayKeyId as string,
  };
}

function signaturesMatch(expectedHex: string, receivedHex: string): boolean {
  const expected = Buffer.from(expectedHex, 'utf8');
  const received = Buffer.from(receivedHex, 'utf8');
  return expected.length === received.length && crypto.timingSafeEqual(expected, received);
}

export function isValidCheckoutSignature(orderId: string, paymentId: string, signature: string): boolean {
  const expected = crypto
    .createHmac('sha256', getRazorpayKeySecret())
    .update(`${orderId}|${paymentId}`)
    .digest('hex');
  return signaturesMatch(expected, signature);
}

function toEmailData(order: HydratedDocument<OrderDoc>): PaymentEmailData {
  return {
    orderId: order.razorpayOrderId,
    paymentId: order.razorpayPaymentId ?? '',
    receipt: order.receipt,
    amount: order.amount,
    currency: order.currency,
    purpose: order.purpose as PaymentPurpose,
    itemName: order.item?.name ?? PAYMENT_PURPOSE_LABELS[order.purpose as PaymentPurpose],
    itemCode: order.item?.code,
    customer: {
      name: order.customer?.name ?? '',
      email: order.customer?.email ?? '',
      phone: order.customer?.phone ?? '',
      college: order.customer?.college,
    },
    notes: order.notes,
    paidAt: order.paidAt ?? new Date(),
  };
}

async function sendPaymentEmails(orderId: string): Promise<void> {
  if (!env.resendApiKey) {
    console.warn('RESEND_API_KEY not set — payment emails skipped.');
    return;
  }

  // Atomically claim the send so checkout verification and the webhook never both email.
  const order = await Order.findOneAndUpdate(
    { razorpayOrderId: orderId, status: 'paid', receiptEmailSentAt: null },
    { $set: { receiptEmailSentAt: new Date() } },
    { returnDocument: 'after' }
  );
  if (!order) return;

  const data = toEmailData(order);
  const amount = formatMinorAmount(data.amount, data.currency);

  const result = await sendEmails([
    {
      to: [data.customer.email],
      subject: `Payment received — ${amount} · TeamGoDevs`,
      html: buildPaymentReceiptEmailHtml(data),
    },
    ...(env.emailPersons.length > 0
      ? [
          {
            to: env.emailPersons,
            replyTo: data.customer.email,
            subject: `New payment — ${amount} from ${data.customer.name} (${data.itemName})`,
            html: buildPaymentTeamEmailHtml(data),
          },
        ]
      : []),
  ]);

  if (!result.ok) {
    console.error(`Payment emails failed for order ${orderId}:`, result.error);
    await Order.updateOne({ _id: order._id }, { $set: { receiptEmailSentAt: null } });
  }
}

async function markOrderPaid(params: {
  orderId: string;
  paymentId: string;
  signature?: string;
  verifiedBy: 'checkout' | 'webhook';
}): Promise<void> {
  if (!isDatabaseReady()) {
    console.warn(`Database not connected — payment ${params.paymentId} for ${params.orderId} was not recorded.`);
    return;
  }

  const updated = await Order.findOneAndUpdate(
    { razorpayOrderId: params.orderId, status: { $ne: 'paid' } },
    {
      $set: {
        status: 'paid',
        razorpayPaymentId: params.paymentId,
        razorpaySignature: params.signature ?? null,
        paidAt: new Date(),
        verifiedBy: params.verifiedBy,
      },
    },
    { returnDocument: 'after' }
  );

  if (!updated) {
    const exists = await Order.exists({ razorpayOrderId: params.orderId });
    if (!exists) {
      console.warn(`Verified payment ${params.paymentId} for unknown order ${params.orderId} — reconcile in the Razorpay dashboard.`);
    }
    return;
  }

  void sendPaymentEmails(params.orderId).catch((error) =>
    console.error(`Payment email error for order ${params.orderId}:`, error)
  );
}

export async function verifyPayment(input: VerifyPaymentInput): Promise<{ order_id: string; payment_id: string }> {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = input;

  if (!isValidCheckoutSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature)) {
    console.warn(`Signature mismatch for order ${razorpay_order_id} / payment ${razorpay_payment_id}.`);
    throw new HttpError(
      400,
      'Payment verification failed. If money was deducted, please contact us with your payment ID.'
    );
  }

  await markOrderPaid({
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    signature: razorpay_signature,
    verifiedBy: 'checkout',
  });

  return { order_id: razorpay_order_id, payment_id: razorpay_payment_id };
}

/** Records a failed attempt. A later successful retry on the same order still marks it paid. */
export async function recordPaymentFailure(input: PaymentFailureInput): Promise<void> {
  if (!isDatabaseReady()) return;

  await Order.updateOne(
    { razorpayOrderId: input.razorpay_order_id, status: { $ne: 'paid' } },
    {
      $set: {
        status: 'failed',
        ...(input.razorpay_payment_id ? { razorpayPaymentId: input.razorpay_payment_id } : {}),
        failure: {
          code: input.code ?? null,
          description: input.description ?? null,
          reason: input.reason ?? null,
          source: input.source ?? null,
          step: input.step ?? null,
        },
      },
    }
  );
}

export async function getOrderStatus(orderId: string) {
  if (!isDatabaseReady()) {
    throw new HttpError(503, 'Order lookup is temporarily unavailable.');
  }

  const order = await Order.findOne({ razorpayOrderId: orderId }).lean();
  if (!order) {
    throw new HttpError(404, 'Order not found.');
  }

  return {
    order_id: order.razorpayOrderId,
    status: order.status,
    amount: order.amount,
    currency: order.currency,
    receipt: order.receipt,
    item: { name: order.item?.name ?? null, code: order.item?.code ?? null },
    payment_id: order.razorpayPaymentId,
    paid_at: order.paidAt,
  };
}

type RazorpayWebhookEvent = {
  event?: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        order_id?: string;
        error_code?: string;
        error_description?: string;
        error_reason?: string;
        error_source?: string;
        error_step?: string;
      };
    };
  };
};

export async function handleRazorpayWebhook(rawBody: Buffer, signature: string | undefined): Promise<void> {
  if (!env.razorpayWebhookSecret) {
    throw new HttpError(503, 'Webhook secret is not configured.');
  }

  const expected = crypto.createHmac('sha256', env.razorpayWebhookSecret).update(rawBody).digest('hex');
  if (!signature || !signaturesMatch(expected, signature)) {
    throw new HttpError(400, 'Invalid webhook signature.');
  }

  let event: RazorpayWebhookEvent;
  try {
    event = JSON.parse(rawBody.toString('utf8')) as RazorpayWebhookEvent;
  } catch {
    throw new HttpError(400, 'Invalid webhook payload.');
  }

  const payment = event.payload?.payment?.entity;
  if (!payment?.id || !payment.order_id) return;

  switch (event.event) {
    case 'payment.captured':
    case 'order.paid':
      await markOrderPaid({ orderId: payment.order_id, paymentId: payment.id, verifiedBy: 'webhook' });
      break;
    case 'payment.failed':
      await recordPaymentFailure({
        razorpay_order_id: payment.order_id,
        razorpay_payment_id: payment.id,
        code: payment.error_code,
        description: payment.error_description,
        reason: payment.error_reason,
        source: payment.error_source,
        step: payment.error_step,
      });
      break;
    default:
      break;
  }
}
