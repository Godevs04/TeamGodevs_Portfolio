const MIN_FORM_DURATION_MS = 5_000;

export type BotCheckInput = {
  companyWebsite?: string;
  formStartedAt?: number;
};

export type BotCheckResult =
  | { allowed: true }
  | { allowed: false; reason: 'honeypot' | 'too_fast' };

export function checkBotSubmission(body: BotCheckInput): BotCheckResult {
  if (body.companyWebsite && body.companyWebsite.trim().length > 0) {
    return { allowed: false, reason: 'honeypot' };
  }

  if (body.formStartedAt) {
    const elapsed = Date.now() - body.formStartedAt;
    if (elapsed < MIN_FORM_DURATION_MS) {
      return { allowed: false, reason: 'too_fast' };
    }
  }

  return { allowed: true };
}
