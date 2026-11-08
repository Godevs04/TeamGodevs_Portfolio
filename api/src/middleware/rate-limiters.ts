import { rateLimit } from 'express-rate-limit';

const message = (text: string) => ({ ok: false, message: text });

/** Burst protection; per-email/IP limits for inquiries live in rate-limit.service. */
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: message('Too many requests. Please try again in a few minutes.'),
});

export const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 30,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: message('Too many payment attempts. Please wait a few minutes and try again.'),
});
