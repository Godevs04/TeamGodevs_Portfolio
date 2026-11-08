import { useCallback, useState } from 'react';
import { ApiError } from '@/lib/api';
import {
  createPaymentOrder,
  reportPaymentFailure,
  verifyPayment,
  type CreateOrderRequest,
} from '@/lib/payment-api';
import { RAZORPAY_KEY_ID, loadRazorpayCheckout } from '@/lib/razorpay';

export type CheckoutStatus =
  | 'idle'
  | 'creating'
  | 'awaiting'
  | 'verifying'
  | 'success'
  | 'failed'
  | 'cancelled';

export type CheckoutResult = {
  orderId: string;
  paymentId: string;
  amount: number;
  currency: string;
  receipt: string;
};

type CheckoutDisplay = {
  description: string;
};

const errorMessage = (error: unknown, fallback: string) =>
  error instanceof ApiError || error instanceof Error ? error.message : fallback;

export function useRazorpayCheckout() {
  const [status, setStatus] = useState<CheckoutStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CheckoutResult | null>(null);

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
    setResult(null);
  }, []);

  const pay = useCallback(async (request: CreateOrderRequest, display: CheckoutDisplay) => {
    setError(null);
    setResult(null);
    setStatus('creating');

    const loaded = await loadRazorpayCheckout();
    if (!loaded || !window.Razorpay) {
      setStatus('failed');
      setError('Could not load the payment gateway. Check your connection or disable ad-blockers and try again.');
      return;
    }

    let order: Awaited<ReturnType<typeof createPaymentOrder>>;
    try {
      order = await createPaymentOrder(request);
    } catch (err) {
      setStatus('failed');
      setError(errorMessage(err, 'Unable to start the payment. Please try again.'));
      return;
    }

    let lastFailure: string | null = null;
    let settled = false;

    const instance = new window.Razorpay({
      key: RAZORPAY_KEY_ID || order.key_id,
      amount: order.amount,
      currency: order.currency,
      order_id: order.order_id,
      name: 'TeamGoDevs',
      description: display.description.slice(0, 255),
      image: `${window.location.origin}/Logo_1.png`,
      prefill: {
        name: request.customer.name,
        email: request.customer.email,
        contact: request.customer.phone,
      },
      notes: { receipt: order.receipt },
      theme: { color: '#10b981' },
      retry: { enabled: true, max_count: 3 },
      modal: {
        confirm_close: true,
        ondismiss: () => {
          if (settled) return;
          settled = true;
          if (lastFailure) {
            setStatus('failed');
            setError(lastFailure);
          } else {
            setStatus('cancelled');
          }
        },
      },
      handler: async (response) => {
        settled = true;
        setStatus('verifying');
        try {
          const verified = await verifyPayment(response);
          setResult({
            orderId: verified.order_id,
            paymentId: verified.payment_id,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt,
          });
          setStatus('success');
        } catch (err) {
          setStatus('failed');
          setError(
            `${errorMessage(err, 'We could not verify your payment.')} Payment ID: ${response.razorpay_payment_id}`
          );
        }
      },
    });

    instance.on('payment.failed', (response) => {
      lastFailure = response.error?.description || 'Payment failed. Please try another method.';
      reportPaymentFailure(order.order_id, response.error ?? {});
    });

    setStatus('awaiting');
    instance.open();
  }, []);

  return {
    status,
    error,
    result,
    pay,
    reset,
    isBusy: status === 'creating' || status === 'awaiting' || status === 'verifying',
  };
}
