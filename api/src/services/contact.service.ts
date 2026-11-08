import { env } from '../config/env.js';
import { isDatabaseReady } from '../config/db.js';
import { ContactInquiry } from '../models/ContactInquiry.js';
import { buildConfirmationEmailHtml, buildTeamEmailHtml } from '../templates/contact-emails.js';
import { checkBotSubmission } from '../utils/bot-guard.js';
import { HttpError } from '../utils/http-error.js';
import type { VisitorMeta } from '../utils/request-meta.js';
import {
  contactSubmissionBodySchema,
  formatProjectType,
  type ContactInquiryPayload,
} from '../validators/contact.schema.js';
import { sendEmails } from './email.service.js';
import { checkContactRateLimit } from './rate-limit.service.js';

async function saveContactInquiry(data: ContactInquiryPayload, meta: VisitorMeta): Promise<void> {
  if (!isDatabaseReady()) {
    console.warn('Database not connected — inquiry was not saved.');
    return;
  }

  try {
    await ContactInquiry.create({
      name: data.name,
      email: data.email.toLowerCase(),
      projectType: data.projectType,
      budget: data.budget,
      message: data.message,
      source: 'website',
      ...meta,
    });
  } catch (error) {
    console.error('Failed to save contact inquiry:', error);
    throw new HttpError(500, 'Failed to save your inquiry. Please try again.', { fallback: 'book_call' });
  }
}

export async function handleContactSubmission(body: unknown, meta: VisitorMeta): Promise<void> {
  const parsed = contactSubmissionBodySchema.safeParse(body);
  if (!parsed.success) {
    throw new HttpError(400, parsed.error.issues[0]?.message ?? 'Invalid form data.');
  }

  const botCheck = checkBotSubmission(parsed.data);
  if (!botCheck.allowed) {
    // Pretend success so bots don't learn they were filtered.
    console.info(`Contact submission blocked (${botCheck.reason}).`);
    return;
  }

  const { companyWebsite: _honeypot, formStartedAt: _startedAt, ...inquiry } = parsed.data;

  const rateLimit = await checkContactRateLimit(meta.ipAddress, inquiry.email);
  if (!rateLimit.allowed) {
    throw new HttpError(429, rateLimit.message);
  }

  if (!env.resendApiKey) {
    throw new HttpError(500, 'Email service is not configured.', { fallback: 'book_call' });
  }

  if (env.emailPersons.length === 0) {
    throw new HttpError(500, 'Notification recipients are not configured.', { fallback: 'book_call' });
  }

  await saveContactInquiry(inquiry, meta);

  const result = await sendEmails([
    {
      to: env.emailPersons,
      replyTo: inquiry.email,
      subject: `New inquiry — ${inquiry.name} (${formatProjectType(inquiry.projectType)})`,
      html: buildTeamEmailHtml(inquiry, meta),
    },
    {
      to: [inquiry.email],
      subject: 'We received your inquiry — TeamGoDevs',
      html: buildConfirmationEmailHtml(inquiry, meta),
    },
  ]);

  if (!result.ok) {
    console.error('Resend error:', result.error);
    throw new HttpError(502, 'Failed to send email. Please try again or contact us directly.', {
      fallback: 'book_call',
    });
  }
}
