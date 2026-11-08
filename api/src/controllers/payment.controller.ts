import type { Request, Response } from 'express';
import {
  createOrder,
  getOrderStatus,
  handleRazorpayWebhook,
  recordPaymentFailure,
  verifyPayment,
} from '../services/payment.service.js';
import { headerValue, extractRequestMeta } from '../utils/request-meta.js';
import {
  createOrderSchema,
  paymentFailureSchema,
  verifyPaymentSchema,
} from '../validators/payment.schema.js';

export async function createOrderHandler(req: Request, res: Response) {
  const input = createOrderSchema.parse(req.body);
  const order = await createOrder(input, extractRequestMeta(req));
  res.status(201).json({ ok: true, ...order });
}

export async function verifyPaymentHandler(req: Request, res: Response) {
  const input = verifyPaymentSchema.parse(req.body);
  const result = await verifyPayment(input);
  res.status(200).json({ ok: true, verified: true, ...result });
}

export async function paymentFailedHandler(req: Request, res: Response) {
  const input = paymentFailureSchema.parse(req.body);
  await recordPaymentFailure(input);
  res.status(200).json({ ok: true });
}

export async function getOrderHandler(req: Request, res: Response) {
  const order = await getOrderStatus(String(req.params.orderId));
  res.status(200).json({ ok: true, order });
}

export async function razorpayWebhookHandler(req: Request, res: Response) {
  const rawBody = Buffer.isBuffer(req.body) ? req.body : Buffer.from('');
  await handleRazorpayWebhook(rawBody, headerValue(req, 'x-razorpay-signature'));
  res.status(200).json({ ok: true });
}
