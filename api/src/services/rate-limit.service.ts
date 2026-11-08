import { env } from '../config/env.js';
import { isDatabaseReady } from '../config/db.js';
import { ContactInquiry } from '../models/ContactInquiry.js';

export type RateLimitResult = { allowed: true } | { allowed: false; message: string };

const HOUR_MS = 60 * 60 * 1000;

function since(ms: number): Date {
  return new Date(Date.now() - ms);
}

export async function checkContactRateLimit(
  ipAddress: string | null,
  email: string
): Promise<RateLimitResult> {
  if (!isDatabaseReady()) {
    return { allowed: true };
  }

  const perHour = env.contactRateLimitHour;
  const perDay = env.contactRateLimitDay;

  try {
    if (ipAddress) {
      const [hourCount, dayCount] = await Promise.all([
        ContactInquiry.countDocuments({ ipAddress, createdAt: { $gte: since(HOUR_MS) } }),
        ContactInquiry.countDocuments({ ipAddress, createdAt: { $gte: since(24 * HOUR_MS) } }),
      ]);

      if (hourCount >= perHour) {
        return {
          allowed: false,
          message: 'Too many submissions from your network. Please try again in an hour.',
        };
      }

      if (dayCount >= perDay) {
        return {
          allowed: false,
          message: 'Daily submission limit reached. Please email hello@teamgodevs.in directly.',
        };
      }
    }

    const emailHourCount = await ContactInquiry.countDocuments({
      email: email.toLowerCase(),
      createdAt: { $gte: since(HOUR_MS) },
    });

    if (emailHourCount >= perHour) {
      return {
        allowed: false,
        message: 'You have already submitted an inquiry recently. We will reply within 2 hours.',
      };
    }
  } catch (error) {
    console.error('Contact rate limit check failed:', error);
  }

  return { allowed: true };
}
