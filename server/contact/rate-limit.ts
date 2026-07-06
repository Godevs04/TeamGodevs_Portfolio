import { getSupabaseAdmin } from '../supabase.js';

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; message: string };

function getEnvInt(name: string, fallback: number): number {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function hoursAgoIso(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

function daysAgoIso(days: number): string {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
}

export async function checkContactRateLimit(
  ipAddress: string | null,
  email: string
): Promise<RateLimitResult> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { allowed: true };
  }

  const perHour = getEnvInt('CONTACT_RATE_LIMIT_HOUR', 3);
  const perDay = getEnvInt('CONTACT_RATE_LIMIT_DAY', 10);
  const hourSince = hoursAgoIso(1);
  const daySince = daysAgoIso(1);
  const normalizedEmail = email.toLowerCase();

  if (ipAddress) {
    const { count: hourCount, error: hourError } = await supabase
      .from('contact_inquiries')
      .select('id', { count: 'exact', head: true })
      .eq('ip_address', ipAddress)
      .gte('created_at', hourSince);

    if (hourError) {
      console.error('Rate limit hour check failed:', hourError.message);
    } else if ((hourCount ?? 0) >= perHour) {
      return {
        allowed: false,
        message: 'Too many submissions from your network. Please try again in an hour.',
      };
    }

    const { count: dayCount, error: dayError } = await supabase
      .from('contact_inquiries')
      .select('id', { count: 'exact', head: true })
      .eq('ip_address', ipAddress)
      .gte('created_at', daySince);

    if (dayError) {
      console.error('Rate limit day check failed:', dayError.message);
    } else if ((dayCount ?? 0) >= perDay) {
      return {
        allowed: false,
        message: 'Daily submission limit reached. Please email hello@teamgodevs.in directly.',
      };
    }
  }

  const { count: emailHourCount, error: emailError } = await supabase
    .from('contact_inquiries')
    .select('id', { count: 'exact', head: true })
    .eq('email', normalizedEmail)
    .gte('created_at', hourSince);

  if (emailError) {
    console.error('Rate limit email check failed:', emailError.message);
    return { allowed: true };
  }

  if ((emailHourCount ?? 0) >= perHour) {
    return {
      allowed: false,
      message: 'You have already submitted an inquiry recently. We will reply within 2 hours.',
    };
  }

  return { allowed: true };
}
