import { formatBudget, formatProjectType, type ContactInquiryPayload } from '../../src/lib/contact-form';

const SITE_URL = 'https://teamgodevs.in';
const SITE_EMAIL = 'hello@teamgodevs.in';
const LOGO_URL = `${SITE_URL}/Logo_1.png`;

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || name;
}

type EmailLayoutOptions = {
  preheader: string;
  eyebrow: string;
  headline: string;
  intro: string;
  body: string;
  accent?: 'emerald' | 'slate';
};

function renderEmailLayout({
  preheader,
  eyebrow,
  headline,
  intro,
  body,
  accent = 'emerald',
}: EmailLayoutOptions): string {
  const accentColor = accent === 'emerald' ? '#10b981' : '#64748b';
  const accentSoft = accent === 'emerald' ? '#ecfdf5' : '#f8fafc';
  const accentBorder = accent === 'emerald' ? '#a7f3d0' : '#e2e8f0';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${escapeHtml(headline)}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">
    ${escapeHtml(preheader)}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background:#ffffff;border-radius:24px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 20px 50px rgba(15,23,42,0.08);">

          <!-- Header -->
          <tr>
            <td style="padding:0;background:linear-gradient(135deg,#071018 0%,#0f172a 55%,#052e16 100%);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center" style="padding:32px 28px 24px;">
                    <img
                      src="${LOGO_URL}"
                      alt="TeamGoDevs"
                      width="72"
                      height="72"
                      style="display:block;width:72px;height:72px;border-radius:18px;border:2px solid rgba(255,255,255,0.12);"
                    />
                    <p style="margin:16px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:${accentColor};">
                      ${escapeHtml(eyebrow)}
                    </p>
                    <h1 style="margin:10px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:28px;line-height:1.2;font-weight:700;color:#ffffff;letter-spacing:-0.02em;">
                      ${escapeHtml(headline)}
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding:28px 32px 8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
              <p style="margin:0;font-size:16px;line-height:1.7;color:#475569;">
                ${intro}
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:16px 32px 28px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px 32px;background:${accentSoft};border-top:1px solid ${accentBorder};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <p style="margin:0 0 8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:14px;font-weight:600;color:#0f172a;">
                      TeamGoDevs
                    </p>
                    <p style="margin:0 0 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;line-height:1.6;color:#64748b;">
                      Web, mobile &amp; growth studio · Bengaluru, India
                    </p>
                    <a href="${SITE_URL}" style="display:inline-block;margin:0 8px 8px 0;padding:12px 20px;border-radius:999px;background:linear-gradient(135deg,#10b981,#059669);color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;text-decoration:none;">
                      Visit website
                    </a>
                    <a href="mailto:${SITE_EMAIL}" style="display:inline-block;margin:0 0 8px;padding:12px 20px;border-radius:999px;background:#ffffff;border:1px solid #cbd5e1;color:#0f172a;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;font-weight:600;text-decoration:none;">
                      ${SITE_EMAIL}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <p style="margin:20px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;line-height:1.6;color:#94a3b8;text-align:center;max-width:600px;">
          You are receiving this because someone used the contact form at
          <a href="${SITE_URL}" style="color:#64748b;text-decoration:underline;">teamgodevs.in</a>.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function detailRow(label: string, value: string, isLink = false): string {
  const valueHtml = isLink
    ? `<a href="mailto:${escapeHtml(value)}" style="color:#059669;text-decoration:none;font-weight:600;">${escapeHtml(value)}</a>`
    : `<span style="color:#0f172a;font-weight:600;">${escapeHtml(value)}</span>`;

  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#94a3b8;width:34%;vertical-align:top;">
        ${escapeHtml(label)}
      </td>
      <td style="padding:12px 0 12px 16px;border-bottom:1px solid #f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#0f172a;vertical-align:top;">
        ${valueHtml}
      </td>
    </tr>
  `;
}

export function buildTeamEmailHtml(data: ContactInquiryPayload): string {
  const projectType = formatProjectType(data.projectType);
  const budget = formatBudget(data.budget);

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

export function buildConfirmationEmailHtml(data: ContactInquiryPayload): string {
  const projectType = formatProjectType(data.projectType);
  const budget = formatBudget(data.budget);
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
