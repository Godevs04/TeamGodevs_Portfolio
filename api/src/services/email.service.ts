import { Resend } from 'resend';
import { env } from '../config/env.js';

let client: Resend | null = null;

export function isEmailConfigured(): boolean {
  return Boolean(env.resendApiKey && env.emailPersons.length > 0);
}

function getResend(): Resend | null {
  if (!env.resendApiKey) return null;
  if (!client) client = new Resend(env.resendApiKey);
  return client;
}

export type OutgoingEmail = {
  to: string[];
  subject: string;
  html: string;
  replyTo?: string;
};

export type SendEmailsResult = { ok: true } | { ok: false; error: unknown };

/** Sends all emails in parallel; fails if any of them fails. */
export async function sendEmails(emails: OutgoingEmail[]): Promise<SendEmailsResult> {
  const resend = getResend();
  if (!resend) return { ok: false, error: new Error('RESEND_API_KEY is not set') };

  const results = await Promise.all(
    emails.map((email) =>
      resend.emails.send({
        from: env.resendFromEmail,
        to: email.to,
        subject: email.subject,
        html: email.html,
        ...(email.replyTo ? { replyTo: email.replyTo } : {}),
      })
    )
  );

  const failed = results.find((result) => result.error);
  return failed ? { ok: false, error: failed.error } : { ok: true };
}
