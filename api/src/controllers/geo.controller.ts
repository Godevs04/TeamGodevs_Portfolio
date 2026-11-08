import type { Request, Response } from 'express';
import { env } from '../config/env.js';
import { resolvePricingRegion } from '../utils/pricing.js';
import { detectCountry } from '../utils/request-meta.js';

export function getGeo(req: Request, res: Response) {
  const devCountry = env.isProduction ? undefined : env.devViewerCountry;
  const country = devCountry ?? detectCountry(req);

  res.setHeader('Cache-Control', 'private, max-age=3600');
  res.status(200).json({ country, region: resolvePricingRegion(country) });
}
