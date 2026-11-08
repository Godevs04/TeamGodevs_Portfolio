import { z } from 'zod';
import {
  MIN_ORDER_AMOUNT_PAISE,
  PAYMENT_PURPOSES,
  SUPPORTED_CURRENCIES,
} from '../constants/catalog.js';

const customerSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('Valid email is required').max(254),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{7,20}$/, 'Valid phone number is required'),
  college: z.string().trim().max(200).optional(),
});

const itemSchema = z.object({
  id: z.string().trim().max(120).optional(),
  name: z.string().trim().min(1).max(200),
  code: z.string().trim().max(40).optional(),
  tier: z.coerce.number().int().min(1).max(4).optional(),
});

export const createOrderSchema = z
  .object({
    purpose: z.enum(PAYMENT_PURPOSES).default('custom'),
    /** Smallest currency unit (paise). Ignored for catalog items — priced server-side. */
    amount: z.coerce
      .number({ invalid_type_error: 'Amount must be a number' })
      .int('Amount must be in paise (whole number)')
      .optional(),
    currency: z.enum(SUPPORTED_CURRENCIES).default('INR'),
    receipt: z.string().trim().max(40).optional(),
    item: itemSchema.optional(),
    customer: customerSchema,
    notes: z.string().trim().max(500).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.purpose === 'student-project') {
      if (!data.item?.id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['item'],
          message: 'Project details are missing. Please reopen the project and try again.',
        });
      }
      return;
    }

    if (data.amount === undefined) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['amount'], message: 'Amount is required' });
    } else if (data.amount < MIN_ORDER_AMOUNT_PAISE) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['amount'],
        message: 'Minimum payment amount is ₹1 (100 paise).',
      });
    }
  });

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export const verifyPaymentSchema = z.object({
  razorpay_order_id: z.string({ required_error: 'razorpay_order_id is required' }).trim().min(1, 'razorpay_order_id is required'),
  razorpay_payment_id: z.string({ required_error: 'razorpay_payment_id is required' }).trim().min(1, 'razorpay_payment_id is required'),
  razorpay_signature: z.string({ required_error: 'razorpay_signature is required' }).trim().min(1, 'razorpay_signature is required'),
});

export type VerifyPaymentInput = z.infer<typeof verifyPaymentSchema>;

export const paymentFailureSchema = z.object({
  razorpay_order_id: z.string().trim().min(1, 'razorpay_order_id is required'),
  razorpay_payment_id: z.string().trim().optional(),
  code: z.string().trim().max(100).optional(),
  description: z.string().trim().max(500).optional(),
  reason: z.string().trim().max(200).optional(),
  source: z.string().trim().max(100).optional(),
  step: z.string().trim().max(100).optional(),
});

export type PaymentFailureInput = z.infer<typeof paymentFailureSchema>;
