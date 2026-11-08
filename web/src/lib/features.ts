/**
 * Build-time feature flags (read from Vite env — must be prefixed with VITE_).
 * Changing a flag on Vercel requires a redeploy.
 */
const isTruthy = (value: string | undefined) =>
  typeof value === 'string' && ['true', '1', 'yes', 'on'].includes(value.trim().toLowerCase());

/** Show the "Student Projects" menu, home teaser and /student-projects catalog. */
export const IS_COLLEGE_PROJECT = isTruthy(import.meta.env.VITE_IS_COLLEGE_PROJECT);

export const STUDENT_PROJECTS_PATH = '/student-projects';

/** Online payments (Razorpay) — enabled when the public key id is configured. */
export const IS_PAYMENTS_ENABLED = Boolean(import.meta.env.VITE_RAZORPAY_KEY_ID?.trim());

export const PAYMENT_PATH = '/payment';

export const studentProjectPaymentUrl = (projectId: string) =>
  `${PAYMENT_PATH}?project=${encodeURIComponent(projectId)}`;
