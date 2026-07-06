import type { ContactSubmissionBody } from '../../src/lib/contact-form.js';

const MIN_FORM_DURATION_MS = 5_000;

export type BotCheckResult =
  | { allowed: true }
  | { allowed: false; silent: true; reason: 'honeypot' | 'too_fast' };

export function checkBotSubmission(body: ContactSubmissionBody): BotCheckResult {
  if (body.companyWebsite && body.companyWebsite.trim().length > 0) {
    return { allowed: false, silent: true, reason: 'honeypot' };
  }

  if (body.formStartedAt) {
    const elapsed = Date.now() - body.formStartedAt;
    if (elapsed < MIN_FORM_DURATION_MS) {
      return { allowed: false, silent: true, reason: 'too_fast' };
    }
  }

  return { allowed: true };
}
