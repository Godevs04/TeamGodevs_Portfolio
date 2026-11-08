import crypto from 'node:crypto';
import { apiReference } from '@scalar/express-api-reference';
import { Router, type Request, type RequestHandler } from 'express';
import { buildOpenApiDocument } from '../docs/openapi.js';

const SCALAR_CDN = 'https://cdn.jsdelivr.net';
const SCALAR_FONTS = 'https://fonts.scalar.com';

const serverUrl = (req: Request) => `${req.protocol}://${req.get('host')}`;

/**
 * The reference UI loads from jsDelivr and injects styles at runtime, so it needs a looser
 * CSP than the JSON API; scripts stay locked to the CDN plus a per-request nonce.
 */
const docsCsp = (nonce: string) =>
  [
    "default-src 'self'",
    `script-src 'self' ${SCALAR_CDN} 'nonce-${nonce}'`,
    `style-src 'self' 'unsafe-inline' ${SCALAR_CDN} ${SCALAR_FONTS}`,
    `font-src 'self' data: ${SCALAR_CDN} ${SCALAR_FONTS}`,
    "img-src 'self' data: blob: https:",
    `connect-src 'self' ${SCALAR_CDN}`,
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "frame-ancestors 'self'",
  ].join('; ');

const renderReference = (nonce: string) =>
  apiReference({
    pageTitle: 'TeamGoDevs API Reference',
    nonce,
    url: '/openapi.json',
    theme: 'deepSpace',
    layout: 'modern',
    defaultHttpClient: { targetKey: 'js', clientKey: 'fetch' },
    metaData: { title: 'TeamGoDevs API Reference', description: 'REST API for teamgodevs.in' },
  });

const docsHandler: RequestHandler<never, string> = (req, res, next) => {
  const nonce = crypto.randomBytes(16).toString('base64');
  res.setHeader('Content-Security-Policy', docsCsp(nonce));
  res.setHeader('Cache-Control', 'no-store');
  return renderReference(nonce)(req, res, next);
};

export const docsRouter = Router();

docsRouter.get('/openapi.json', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.json(buildOpenApiDocument(serverUrl(req)));
});

docsRouter.get('/docs', docsHandler);
