import Razorpay from 'razorpay';
import { HttpError } from '../utils/http-error.js';
import { env } from './env.js';

let client: Razorpay | null = null;

export function isRazorpayConfigured(): boolean {
  return Boolean(env.razorpayKeyId && env.razorpayKeySecret);
}

export function getRazorpay(): Razorpay {
  if (!env.razorpayKeyId || !env.razorpayKeySecret) {
    throw new HttpError(503, 'Online payments are not configured yet. Please contact us directly.');
  }

  if (!client) {
    client = new Razorpay({ key_id: env.razorpayKeyId, key_secret: env.razorpayKeySecret });
  }

  return client;
}

export function getRazorpayKeySecret(): string {
  if (!env.razorpayKeySecret) {
    throw new HttpError(503, 'Online payments are not configured yet. Please contact us directly.');
  }
  return env.razorpayKeySecret;
}
