import type { Request, Response } from 'express';
import { env } from '../config/env.js';
import { isDatabaseReady } from '../config/db.js';
import { isRazorpayConfigured } from '../config/razorpay.js';
import { isEmailConfigured } from '../services/email.service.js';

/**
 * Liveness + dependency status. Always 200 while the process is up so host health
 * checks (Render, Railway, uptime monitors) don't restart it over an external outage;
 * `status: 'degraded'` signals a configured dependency that is currently unavailable.
 */
export function getHealth(_req: Request, res: Response) {
  const database = env.mongodbUri ? (isDatabaseReady() ? 'up' : 'down') : 'not_configured';
  const payments = isRazorpayConfigured() ? 'configured' : 'not_configured';
  const email = isEmailConfigured() ? 'configured' : 'not_configured';

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    ok: true,
    status: database === 'down' ? 'degraded' : 'ok',
    environment: env.nodeEnv,
    uptimeSeconds: Math.round(process.uptime()),
    timestamp: new Date().toISOString(),
    services: { database, payments, email },
  });
}
