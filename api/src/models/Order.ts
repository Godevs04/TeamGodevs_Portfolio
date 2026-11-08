import { Schema, model, type InferSchemaType } from 'mongoose';
import { PAYMENT_PURPOSES } from '../constants/catalog.js';

export const ORDER_STATUSES = ['created', 'paid', 'failed'] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

const orderSchema = new Schema(
  {
    razorpayOrderId: { type: String, required: true, unique: true },
    razorpayPaymentId: { type: String, default: null },
    razorpaySignature: { type: String, default: null },
    /** Smallest currency unit (paise) */
    amount: { type: Number, required: true, min: 100 },
    currency: { type: String, required: true, default: 'INR' },
    receipt: { type: String, required: true },
    status: { type: String, enum: ORDER_STATUSES, default: 'created', index: true },
    purpose: { type: String, enum: PAYMENT_PURPOSES, required: true },
    item: {
      id: { type: String, default: null },
      name: { type: String, required: true },
      code: { type: String, default: null },
      tier: { type: Number, default: null },
    },
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true, lowercase: true },
      phone: { type: String, required: true },
      college: { type: String, default: null },
    },
    notes: { type: String, default: null },
    failure: {
      code: { type: String, default: null },
      description: { type: String, default: null },
      reason: { type: String, default: null },
      source: { type: String, default: null },
      step: { type: String, default: null },
    },
    /** Set once the paid notification emails have gone out (avoids duplicates from verify + webhook). */
    receiptEmailSentAt: { type: Date, default: null },
    paidAt: { type: Date, default: null },
    verifiedBy: { type: String, enum: ['checkout', 'webhook', null], default: null },
    ipAddress: { type: String, default: null },
    userAgent: { type: String, default: null },
  },
  { timestamps: true, collection: 'orders' }
);

orderSchema.index({ 'customer.email': 1, createdAt: -1 });

export type OrderDoc = InferSchemaType<typeof orderSchema>;

export const Order = model('Order', orderSchema);
