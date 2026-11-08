import {
  formatBudget,
  formatProjectType,
  type ContactInquiryPayload,
} from '../validators/contact.schema.js';
import { formatVisitorLocation, type VisitorMeta } from '../utils/request-meta.js';
import { SITE_URL, detailRow, escapeHtml, firstName, renderEmailLayout } from './layout.js';

function truncateUserAgent(userAgent: string | null): string {
  if (!userAgent) return 'Unknown';
  return userAgent.length > 120 ? `${userAgent.slice(0, 117)}...` : userAgent;
}

export function buildTeamEmailHtml(data: ContactInquiryPayload, meta?: VisitorMeta): string {
  const projectType = formatProjectType(data.projectType);
  const budget = formatBudget(data.budget, meta?.country);
  const location = meta ? formatVisitorLocation(meta) : 'Unknown';
  const ipAddress = meta?.ipAddress ?? 'Unknown';
  const timezone = meta?.timezone;
  const userAgent = truncateUserAgent(meta?.userAgent ?? null);

  const visitorRows = [
    detailRow('Location', location),
    detailRow('IP address', ipAddress),
    ...(timezone ? [detailRow('Timezone', timezone)] : []),
    detailRow('Device / browser', userAgent),
  ].join('');

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;background:#ffffff;">
      <tr>
        <td style="padding:18px 20px;background:linear-gradient(180deg,#f8fafc 0%,#ffffff 100%);border-bottom:1px solid #e2e8f0;">
          <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#059669;">
            Lead snapshot
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 20px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            ${detailRow('Name', data.name)}
            ${detailRow('Email', data.email, true)}
            ${detailRow('Project', projectType)}
            ${detailRow('Budget', budget)}
          </table>
        </td>
      </tr>
    </table>

    <div style="margin-top:20px;padding:20px;border-radius:18px;background:#f8fafc;border:1px solid #e2e8f0;">
      <p style="margin:0 0 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;">
        Visitor info
      </p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        ${visitorRows}
      </table>
    </div>

    <div style="margin-top:20px;padding:20px;border-radius:18px;background:#f8fafc;border:1px solid #e2e8f0;">
      <p style="margin:0 0 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;">
        Project brief
      </p>
      <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.75;color:#334155;white-space:pre-wrap;">
        ${escapeHtml(data.message)}
      </p>
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:24px;">
      <tr>
        <td>
          <a href="mailto:${escapeHtml(data.email)}?subject=${encodeURIComponent(`Re: Your TeamGoDevs inquiry — ${data.name}`)}"
             style="display:inline-block;padding:14px 24px;border-radius:14px;background:linear-gradient(135deg,#10b981,#059669);color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;box-shadow:0 10px 24px rgba(16,185,129,0.28);">
            Reply to ${escapeHtml(firstName(data.name))}
          </a>
        </td>
      </tr>
    </table>
  `;

  return renderEmailLayout({
    preheader: `New inquiry from ${data.name} — ${projectType}`,
    eyebrow: 'New lead',
    headline: 'Project inquiry received',
    intro: `A founder just submitted the contact form on <strong style="color:#0f172a;">teamgodevs.in</strong>. Review the details below and respond while the conversation is warm.`,
    body,
    accent: 'emerald',
  });
}

export function buildConfirmationEmailHtml(data: ContactInquiryPayload, meta?: VisitorMeta): string {
  const projectType = formatProjectType(data.projectType);
  const budget = formatBudget(data.budget, meta?.country);
  const name = firstName(data.name);

  const body = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
      <tr>
        <td width="33%" align="center" style="padding:0 6px 0 0;vertical-align:top;">
          <div style="padding:16px 10px;border-radius:16px;background:#ecfdf5;border:1px solid #a7f3d0;">
            <p style="margin:0 0 6px;font-size:18px;line-height:1;">✓</p>
            <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#047857;">Received</p>
          </div>
        </td>
        <td width="33%" align="center" style="padding:0 3px;vertical-align:top;">
          <div style="padding:16px 10px;border-radius:16px;background:#f8fafc;border:1px solid #e2e8f0;">
            <p style="margin:0 0 6px;font-size:18px;line-height:1;">◎</p>
            <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;">In review</p>
          </div>
        </td>
        <td width="33%" align="center" style="padding:0 0 0 6px;vertical-align:top;">
          <div style="padding:16px 10px;border-radius:16px;background:#f8fafc;border:1px solid #e2e8f0;">
            <p style="margin:0 0 6px;font-size:18px;line-height:1;">↩</p>
            <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748b;">Reply &lt; 2h</p>
          </div>
        </td>
      </tr>
    </table>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #d1fae5;border-radius:18px;overflow:hidden;background:linear-gradient(180deg,#f0fdf4 0%,#ffffff 100%);">
      <tr>
        <td style="padding:18px 20px;border-bottom:1px solid #d1fae5;">
          <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#059669;">
            Your submission summary
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 20px 20px;">
          <p style="margin:0 0 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#334155;">
            <strong style="color:#0f172a;">Project:</strong> ${escapeHtml(projectType)}
          </p>
          <p style="margin:0 0 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#334155;">
            <strong style="color:#0f172a;">Budget:</strong> ${escapeHtml(budget)}
          </p>
          <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.75;color:#334155;white-space:pre-wrap;">
            <strong style="color:#0f172a;">Details:</strong><br />${escapeHtml(data.message)}
          </p>
        </td>
      </tr>
    </table>

    <p style="margin:20px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#475569;">
      Prefer to talk sooner? Book a free discovery call on our site or reply directly to this email — we're happy to help shape the next step.
    </p>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px;">
      <tr>
        <td>
          <a href="${SITE_URL}/#contact"
             style="display:inline-block;padding:14px 24px;border-radius:14px;background:linear-gradient(135deg,#10b981,#059669);color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:700;text-decoration:none;box-shadow:0 10px 24px rgba(16,185,129,0.28);">
            Book a discovery call
          </a>
        </td>
      </tr>
    </table>
  `;

  return renderEmailLayout({
    preheader: `Thanks ${name} — we received your project inquiry and will reply soon.`,
    eyebrow: 'Inquiry confirmed',
    headline: `Thanks, ${name}!`,
    intro: `We've received your project details at <strong style="color:#0f172a;">TeamGoDevs</strong>. A real person on our team will review your brief and get back to you within <strong style="color:#059669;">2 hours</strong> with next steps.`,
    body,
    accent: 'emerald',
  });
}
