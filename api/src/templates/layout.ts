export const SITE_URL = 'https://www.teamgodevs.in';
export const SITE_EMAIL = 'hello@teamgodevs.in';
const LOGO_URL = `${SITE_URL}/Logo_1.png`;

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || name;
}

type EmailLayoutOptions = {
  preheader: string;
  eyebrow: string;
  headline: string;
  intro: string;
  body: string;
  accent?: 'emerald' | 'slate';
  /** Trusted HTML shown under the card, explaining why the email was sent. */
  footerNote?: string;
};

const DEFAULT_FOOTER_NOTE = `You are receiving this because someone used the contact form at
          <a href="${SITE_URL}" style="color:#64748b;text-decoration:underline;">teamgodevs.in</a>.`;

export function renderEmailLayout({
  preheader,
  eyebrow,
  headline,
  intro,
  body,
  accent = 'emerald',
  footerNote = DEFAULT_FOOTER_NOTE,
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
          ${footerNote}
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function detailRow(label: string, value: string, isLink = false): string {
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
