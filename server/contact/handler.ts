import { Resend } from 'resend';
import {
  contactSubmissionBodySchema,
  formatProjectType,
} from '../../src/lib/contact-form.js';
import { checkBotSubmission } from './bot-guard.js';
import { buildConfirmationEmailHtml, buildTeamEmailHtml } from './email-templates.js';
import { checkContactRateLimit } from './rate-limit.js';
import type { VisitorMeta } from './request-meta.js';
import { saveContactInquiry } from './save-inquiry.js';

export type ContactHandlerResult =
  | { ok: true }
  | { ok: false; status: number; message: string };

function getEnv(name: string): string | undefined {
  const value = process.env[name];
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function parseRecipients(raw: string | undefined): string[] {
  if (!raw) return [];
  return [...new Set(raw.split(',').map((email) => email.trim()).filter(Boolean))];
}

export async function handleContactSubmission(
  body: unknown,
  meta: VisitorMeta
): Promise<ContactHandlerResult> {
  const parsed = contactSubmissionBodySchema.safeParse(body);
  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      message: parsed.error.issues[0]?.message ?? 'Invalid form data.',
    };
  }

  const botCheck = checkBotSubmission(parsed.data);
  if (!botCheck.allowed) {
    console.info(`Contact submission blocked (${botCheck.reason}).`);
    return { ok: true };
  }

  const { companyWebsite: _honeypot, formStartedAt: _startedAt, ...inquiry } = parsed.data;

  const rateLimit = await checkContactRateLimit(meta.ipAddress, inquiry.email);
  if (!rateLimit.allowed) {
    return { ok: false, status: 429, message: rateLimit.message };
  }

  const apiKey = getEnv('RESEND_API_KEY');
  const teamRecipients = parseRecipients(getEnv('EMAIL_PERSONS'));
  const fromEmail = getEnv('RESEND_FROM_EMAIL') ?? 'TeamGoDevs <hello@teamgodevs.in>';

  if (!apiKey) {
    return { ok: false, status: 500, message: 'Email service is not configured.' };
  }

  if (teamRecipients.length === 0) {
    return { ok: false, status: 500, message: 'Notification recipients are not configured.' };
  }

  const resend = new Resend(apiKey);

  const saveResult = await saveContactInquiry(inquiry, meta);
  if (saveResult.ok === false) {
    return { ok: false, status: 500, message: saveResult.message };
  }

  const [teamResult, userResult] = await Promise.all([
    resend.emails.send({
      from: fromEmail,
      to: teamRecipients,
      replyTo: inquiry.email,
      subject: `New inquiry — ${inquiry.name} (${formatProjectType(inquiry.projectType)})`,
      html: buildTeamEmailHtml(inquiry, meta),
    }),
    resend.emails.send({
      from: fromEmail,
      to: [inquiry.email],
      subject: 'We received your inquiry — TeamGoDevs',
      html: buildConfirmationEmailHtml(inquiry),
    }),
  ]);

  if (teamResult.error || userResult.error) {
    console.error('Resend error:', teamResult.error ?? userResult.error);
    return {
      ok: false,
      status: 502,
      message: 'Failed to send email. Please try again or contact us directly.',
    };
  }

  return { ok: true };
}
