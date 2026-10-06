import type { ContactSubmissionBody } from '@/lib/contact-form';

type ContactApiSuccess = { ok: true };
type ContactApiFailure = { ok: false; message: string; fallback?: 'book_call' };

export type ContactApiResult = ContactApiSuccess | ContactApiFailure;

export async function submitContactInquiry(
  payload: ContactSubmissionBody
): Promise<ContactApiResult> {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => null)) as
      | { message?: string; error?: string; fallback?: string }
      | null;

    if (!response.ok) {
      const backendFailure = response.status >= 500 || data?.fallback === 'book_call';
      return {
        ok: false,
        message: data?.message ?? data?.error ?? 'Unable to send your inquiry. Please try again.',
        ...(backendFailure ? { fallback: 'book_call' as const } : {}),
      };
    }

    return { ok: true };
  } catch {
    return {
      ok: false,
      message: 'Network error. Check your connection or email us directly.',
      fallback: 'book_call',
    };
  }
}
