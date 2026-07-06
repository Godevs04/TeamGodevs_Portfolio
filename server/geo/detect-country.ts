export type GeoHeaders = Record<string, string | string[] | undefined>;

function headerValue(headers: GeoHeaders, name: string): string | undefined {
  const value = headers[name] ?? headers[name.toLowerCase()];
  if (Array.isArray(value)) return value[0];
  return typeof value === 'string' ? value : undefined;
}

export function detectCountryFromHeaders(headers: GeoHeaders): string | null {
  const country = headerValue(headers, 'x-vercel-ip-country');
  return country?.trim().toUpperCase() ?? null;
}
