export type VisitorMeta = {
  ipAddress: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  timezone: string | null;
  userAgent: string | null;
};

export type RequestMetaSource = {
  headers: Record<string, string | string[] | undefined>;
  socketRemoteAddress?: string | null;
};

function headerValue(
  headers: Record<string, string | string[] | undefined>,
  name: string
): string | undefined {
  const value = headers[name] ?? headers[name.toLowerCase()];
  if (Array.isArray(value)) return value[0];
  return typeof value === 'string' ? value : undefined;
}

export function extractClientIp(source: RequestMetaSource): string | null {
  const forwarded = headerValue(source.headers, 'x-forwarded-for');
  if (forwarded) {
    const ip = forwarded.split(',')[0]?.trim();
    if (ip) return ip;
  }

  const realIp = headerValue(source.headers, 'x-real-ip');
  if (realIp) return realIp;

  const vercelIp = headerValue(source.headers, 'x-vercel-forwarded-for');
  if (vercelIp) return vercelIp.split(',')[0]?.trim() ?? null;

  return source.socketRemoteAddress ?? null;
}

export function extractRequestMeta(source: RequestMetaSource): VisitorMeta {
  const headers = source.headers;

  return {
    ipAddress: extractClientIp(source),
    country: headerValue(headers, 'x-vercel-ip-country') ?? null,
    region: headerValue(headers, 'x-vercel-ip-country-region') ?? null,
    city: headerValue(headers, 'x-vercel-ip-city') ?? null,
    timezone: headerValue(headers, 'x-vercel-ip-timezone') ?? null,
    userAgent: headerValue(headers, 'user-agent') ?? null,
  };
}

export function formatVisitorLocation(meta: VisitorMeta): string {
  const parts = [meta.city, meta.region, meta.country].filter(Boolean);
  if (parts.length > 0) return parts.join(', ');
  if (meta.timezone) return meta.timezone;
  return 'Unknown';
}
