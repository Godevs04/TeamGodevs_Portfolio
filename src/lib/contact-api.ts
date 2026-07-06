import type { ContactInquiryPayload } from '@/lib/contact-form';

type ContactApiSuccess = { ok: true };
type ContactApiFailure = { ok: false; message: string };

export type ContactApiResult = ContactApiSuccess | ContactApiFailure;

export async function submitContactInquiry(
  payload: ContactInquiryPayload
): Promise<ContactApiResult> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => null)) as
      | { message?: string; error?: string }
      | null;

    if (!response.ok) {
      return {
        ok: false,
        message: data?.message ?? data?.error ?? 'Unable to send your inquiry. Please try again.',
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      message: 'Network error. Check your connection or email us directly.',
    };
  }
}
