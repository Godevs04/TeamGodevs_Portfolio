import { apiRequest } from '@/lib/api';
import type { RazorpayFailureResponse, RazorpaySuccessResponse } from '@/lib/razorpay';

export type PaymentPurpose = 'student-project' | 'custom';

export type PaymentCustomer = {
  name: string;
  email: string;
  phone: string;
  college?: string;
};

export type CreateOrderRequest = {
  purpose: PaymentPurpose;
  /** Paise. Ignored by the server for catalog items, which are priced server-side. */
  amount?: number;
  currency?: 'INR';
  item?: { id?: string; name: string; code?: string; tier?: number };
  customer: PaymentCustomer;
  notes?: string;
};

export type CreateOrderResponse = {
  ok: true;
  order_id: string;
  amount: number;
  currency: string;
  receipt: string;
  key_id: string;
};

export type VerifyPaymentResponse = {
  ok: true;
  verified: true;
  order_id: string;
  payment_id: string;
};

export const createPaymentOrder = (payload: CreateOrderRequest) =>
  apiRequest<CreateOrderResponse>('/api/create-order', { method: 'POST', json: payload });

export const verifyPayment = (payload: RazorpaySuccessResponse) =>
  apiRequest<VerifyPaymentResponse>('/api/verify-payment', { method: 'POST', json: payload });

/** Best-effort — failures are also captured by the Razorpay webhook. */
export function reportPaymentFailure(orderId: string, failure: RazorpayFailureResponse['error']) {
  void apiRequest('/api/payment-failed', {
    method: 'POST',
    json: {
      razorpay_order_id: orderId,
      razorpay_payment_id: failure.metadata?.payment_id,
      code: failure.code,
      description: failure.description,
      reason: failure.reason,
      source: failure.source,
      step: failure.step,
    },
  }).catch(() => undefined);
}
