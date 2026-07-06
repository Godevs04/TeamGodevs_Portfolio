import type { ContactInquiryPayload } from '../../src/lib/contact-form';
import { getSupabaseAdmin } from '../supabase';

export type SaveInquiryResult =
  | { ok: true; saved: boolean }
  | { ok: false; message: string };

export async function saveContactInquiry(data: ContactInquiryPayload): Promise<SaveInquiryResult> {
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
  });

  if (error) {
    console.error('Supabase insert error:', error.message, error.code, error.details);
    return { ok: false, message: 'Failed to save your inquiry. Please try again.' };
  }

  console.info('Contact inquiry saved to Supabase.');

  return { ok: true, saved: true };
}
