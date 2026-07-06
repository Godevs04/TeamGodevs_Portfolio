import { Resend } from 'resend';
import { contactInquirySchema, formatProjectType } from '../../src/lib/contact-form';
import { buildConfirmationEmailHtml, buildTeamEmailHtml } from './email-templates';

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

export async function handleContactSubmission(body: unknown): Promise<ContactHandlerResult> {
  const parsed = contactInquirySchema.safeParse(body);
  if (!parsed.success) {
    return {
      ok: false,
      status: 400,
      message: parsed.error.issues[0]?.message ?? 'Invalid form data.',
    };
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
  const data = parsed.data;

  const [teamResult, userResult] = await Promise.all([
    resend.emails.send({
      from: fromEmail,
      to: teamRecipients,
      replyTo: data.email,
      subject: `New inquiry — ${data.name} (${formatProjectType(data.projectType)})`,
      html: buildTeamEmailHtml(data),
    }),
    resend.emails.send({
      from: fromEmail,
      to: [data.email],
      subject: 'We received your inquiry — TeamGoDevs',
      html: buildConfirmationEmailHtml(data),
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
