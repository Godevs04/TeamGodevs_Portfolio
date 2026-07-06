import type { ContactInquiryPayload } from '../../src/lib/contact-form.js';
import type { VisitorMeta } from './request-meta.js';
import { getSupabaseAdmin } from '../supabase.js';

export type SaveInquiryResult =
  | { ok: true; saved: boolean }
  | { ok: false; message: string };

export async function saveContactInquiry(
  data: ContactInquiryPayload,
  meta: VisitorMeta
): Promise<SaveInquiryResult> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    console.warn('Supabase not configured — inquiry was not saved to database.');
    return { ok: true, saved: false };
  }

  const { error } = await supabase.from('contact_inquiries').insert({
    name: data.name,
    email: data.email.toLowerCase(),
    project_type: data.projectType,
    budget: data.budget,
    message: data.message,
    source: 'website',
    ip_address: meta.ipAddress,
    country: meta.country,
    region: meta.region,
    city: meta.city,
    timezone: meta.timezone,
    user_agent: meta.userAgent,
  });

  if (error) {
    console.error('Supabase insert error:', error.message, error.code, error.details);
    return { ok: false, message: 'Failed to save your inquiry. Please try again.' };
  }

  console.info('Contact inquiry saved to Supabase.');

  return { ok: true, saved: true };
}
