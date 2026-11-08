import { PAYMENT_PURPOSE_LABELS, type PaymentPurpose } from '../constants/catalog.js';
import { formatMinorAmount } from '../utils/pricing.js';
import { SITE_URL, detailRow, escapeHtml, firstName, renderEmailLayout } from './layout.js';

export type PaymentEmailData = {
  orderId: string;
  paymentId: string;
  receipt: string;
  amount: number;
  currency: string;
  purpose: PaymentPurpose;
  itemName: string;
  itemCode?: string | null;
  customer: { name: string; email: string; phone: string; college?: string | null };
  notes?: string | null;
  paidAt: Date;
};

const PAYMENT_FOOTER_NOTE = `You are receiving this because a payment was made on
          <a href="${SITE_URL}" style="color:#64748b;text-decoration:underline;">teamgodevs.in</a>.`;

function formatPaidAt(date: Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(date);
}

function paymentRows(data: PaymentEmailData): string {
  return [
    detailRow('Amount', formatMinorAmount(data.amount, data.currency)),
    detailRow('For', data.itemCode ? `${data.itemName} (${data.itemCode})` : data.itemName),
    detailRow('Payment ID', data.paymentId),
    detailRow('Order ID', data.orderId),
    detailRow('Receipt', data.receipt),
    detailRow('Paid on', `${formatPaidAt(data.paidAt)} IST`),
  ].join('');
}

function summaryCard(title: string, rows: string): string {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #d1fae5;border-radius:18px;overflow:hidden;background:linear-gradient(180deg,#f0fdf4 0%,#ffffff 100%);">
      <tr>
        <td style="padding:18px 20px;border-bottom:1px solid #d1fae5;">
          <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#059669;">
            ${escapeHtml(title)}
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 20px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            ${rows}
          </table>
        </td>
      </tr>
    </table>
  `;
}

export function buildPaymentReceiptEmailHtml(data: PaymentEmailData): string {
  const name = firstName(data.customer.name);
  const amount = formatMinorAmount(data.amount, data.currency);

  const body = `
    ${summaryCard('Payment receipt', paymentRows(data))}

    <p style="margin:20px 0 0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.7;color:#475569;">
      Our team will reach out on your email or WhatsApp within 24 hours to confirm the delivery timeline.
      Keep the payment ID above for your records — quote it if you contact us about this order.
    </p>
  `;

  return renderEmailLayout({
    preheader: `Payment of ${amount} received — thank you, ${name}!`,
    eyebrow: 'Payment successful',
    headline: `Thanks, ${name}!`,
    intro: `We've received your payment of <strong style="color:#059669;">${escapeHtml(amount)}</strong> for <strong style="color:#0f172a;">${escapeHtml(data.itemName)}</strong>.`,
    body,
    footerNote: PAYMENT_FOOTER_NOTE,
  });
}

export function buildPaymentTeamEmailHtml(data: PaymentEmailData): string {
  const amount = formatMinorAmount(data.amount, data.currency);

  const customerRows = [
    detailRow('Name', data.customer.name),
    detailRow('Email', data.customer.email, true),
    detailRow('Phone', data.customer.phone),
    ...(data.customer.college ? [detailRow('College', data.customer.college)] : []),
    detailRow('Type', PAYMENT_PURPOSE_LABELS[data.purpose]),
  ].join('');

  const notes = data.notes
    ? `
    <div style="margin-top:20px;padding:20px;border-radius:18px;background:#f8fafc;border:1px solid #e2e8f0;">
      <p style="margin:0 0 10px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#64748b;">
        Notes from customer
      </p>
      <p style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.75;color:#334155;white-space:pre-wrap;">
        ${escapeHtml(data.notes)}
      </p>
    </div>`
    : '';

  const body = `
    ${summaryCard('Payment', paymentRows(data))}
    <div style="margin-top:20px;">
      ${summaryCard('Customer', customerRows)}
    </div>
    ${notes}
  `;

  return renderEmailLayout({
    preheader: `${amount} received from ${data.customer.name} — ${data.itemName}`,
    eyebrow: 'New payment',
    headline: `${amount} received`,
    intro: `<strong style="color:#0f172a;">${escapeHtml(data.customer.name)}</strong> just paid online for <strong style="color:#0f172a;">${escapeHtml(data.itemName)}</strong>. Reach out to confirm the delivery timeline.`,
    body,
    footerNote: PAYMENT_FOOTER_NOTE,
  });
}
