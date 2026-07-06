import type { VercelRequest, VercelResponse } from '@vercel/node';
import { detectCountryFromHeaders } from '../server/geo/detect-country.js';
import { resolvePricingRegion } from '../src/lib/pricing/regions.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const country = detectCountryFromHeaders(req.headers);
  const region = resolvePricingRegion(country);

  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  return res.status(200).json({ country, region });
}
