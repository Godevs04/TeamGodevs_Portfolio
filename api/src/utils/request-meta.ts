import type { Request } from 'express';

export type VisitorMeta = {
  ipAddress: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  timezone: string | null;
  userAgent: string | null;
};

export function headerValue(req: Request, name: string): string | undefined {
  const value = req.headers[name.toLowerCase()];
  if (Array.isArray(value)) return value[0];
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : undefined;
}

/** Visitor country from edge / CDN headers (Vercel, Cloudflare, or a custom proxy). */
export function detectCountry(req: Request): string | null {
  const country =
    headerValue(req, 'x-vercel-ip-country') ??
    headerValue(req, 'cf-ipcountry') ??
    headerValue(req, 'x-country-code');

  if (!country || country === 'XX' || country === 'T1') return null;
  return country.toUpperCase();
}

/** Relies on Express `trust proxy` to resolve X-Forwarded-For safely. */
export function extractClientIp(req: Request): string | null {
  return headerValue(req, 'cf-connecting-ip') ?? req.ip ?? req.socket?.remoteAddress ?? null;
}

export function extractRequestMeta(req: Request): VisitorMeta {
  return {
    ipAddress: extractClientIp(req),
    country: detectCountry(req),
    region: headerValue(req, 'x-vercel-ip-country-region') ?? null,
    city: headerValue(req, 'x-vercel-ip-city') ?? null,
    timezone: headerValue(req, 'x-vercel-ip-timezone') ?? null,
    userAgent: headerValue(req, 'user-agent') ?? null,
  };
}

export function formatVisitorLocation(meta: VisitorMeta): string {
  const parts = [meta.city, meta.region, meta.country].filter(Boolean);
  if (parts.length > 0) return parts.join(', ');
  if (meta.timezone) return meta.timezone;
  return 'Unknown';
}
