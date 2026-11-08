import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import { getHealth } from './controllers/health.controller.js';
import { razorpayWebhookHandler } from './controllers/payment.controller.js';
import { errorHandler, notFoundHandler } from './middleware/error-handler.js';
import { docsRouter } from './routes/docs.js';
import { apiRouter } from './routes/index.js';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', env.trustProxy);

  app.use(helmet());
  app.use(
    cors({
      origin(origin, callback) {
        // Allow server-to-server calls (no Origin header) and configured frontends.
        if (!origin || env.corsOrigins.includes(origin)) return callback(null, true);
        callback(null, false);
      },
      methods: ['GET', 'POST', 'OPTIONS'],
    })
  );

  // Webhook signature is computed over the raw body, so it must bypass express.json().
  app.post('/api/webhooks/razorpay', express.raw({ type: 'application/json', limit: '1mb' }), razorpayWebhookHandler);

  app.use(express.json({ limit: '100kb' }));

  app.get('/', (_req, res) => {
    res.json({ ok: true, name: 'TeamGoDevs API' });
  });
  app.get('/health', getHealth);

  if (env.apiDocsEnabled) {
    app.use(docsRouter);
  }

  app.use('/api', apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
