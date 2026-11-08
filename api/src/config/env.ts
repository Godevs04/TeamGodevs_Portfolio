import { fileURLToPath } from 'node:url';

// Resolves to api/.env from both src/config (tsx) and dist/config (compiled).
const envFilePath = fileURLToPath(new URL('../../.env', import.meta.url));

try {
  process.loadEnvFile(envFilePath);
} catch {
  // No .env file — rely on the host environment (Render, Railway, Docker, etc.).
}

function optional(name: string): string | undefined {
  const value = process.env[name];
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function int(name: string, fallback: number): number {
  const raw = optional(name);
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function bool(name: string, fallback: boolean): boolean {
  const raw = optional(name)?.toLowerCase();
  if (raw === 'true' || raw === '1') return true;
  if (raw === 'false' || raw === '0') return false;
  return fallback;
}

function list(name: string, fallback: string[] = []): string[] {
  const raw = optional(name);
  if (!raw) return fallback;
  return [...new Set(raw.split(',').map((item) => item.trim()).filter(Boolean))];
}

const nodeEnv = optional('NODE_ENV') ?? 'development';

export const env = {
  nodeEnv,
  isProduction: nodeEnv === 'production',
  port: int('PORT', 5050),
  /** Number of reverse proxies in front of the API (Render / Railway / Nginx = 1). */
  trustProxy: int('TRUST_PROXY', 1),
  corsOrigins: list('CORS_ORIGINS', ['http://localhost:8080']),
  /** Scalar API reference at /docs and the spec at /openapi.json (default: on outside production). */
  apiDocsEnabled: bool('API_DOCS_ENABLED', nodeEnv !== 'production'),

  mongodbUri: optional('MONGODB_URI'),
  mongodbDbName: optional('MONGODB_DB_NAME') ?? 'teamgodevs',

  razorpayKeyId: optional('RAZORPAY_KEY_ID'),
  razorpayKeySecret: optional('RAZORPAY_KEY_SECRET'),
  razorpayWebhookSecret: optional('RAZORPAY_WEBHOOK_SECRET'),
  paymentMaxAmountInr: int('PAYMENT_MAX_AMOUNT_INR', 500_000),

  resendApiKey: optional('RESEND_API_KEY'),
  emailPersons: list('EMAIL_PERSONS'),
  resendFromEmail: optional('RESEND_FROM_EMAIL') ?? 'TeamGoDevs <hello@teamgodevs.in>',

  contactRateLimitHour: int('CONTACT_RATE_LIMIT_HOUR', 3),
  contactRateLimitDay: int('CONTACT_RATE_LIMIT_DAY', 10),

  /** Local dev only: simulate the visitor country for geo pricing (IN, US, GB…). */
  devViewerCountry: optional('DEV_VIEWER_COUNTRY')?.toUpperCase(),
} as const;
