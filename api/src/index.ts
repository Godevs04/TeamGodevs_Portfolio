import { env } from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/db.js';
import { isRazorpayConfigured } from './config/razorpay.js';
import { createApp } from './app.js';

async function main() {
  try {
    await connectDatabase();
  } catch (error) {
    console.error('Could not connect to MongoDB:', error);
    process.exit(1);
  }

  if (!isRazorpayConfigured()) {
    console.warn('RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET not set — payment endpoints will return 503.');
  }

  // Express 5 invokes this callback with bind errors (e.g. EADDRINUSE) as well as on success.
  const server = createApp().listen(env.port, (error?: Error) => {
    if (error) {
      console.error(`Could not start API on port ${env.port}:`, error.message);
      process.exit(1);
    }
    console.info(`TeamGoDevs API listening on http://localhost:${env.port} (${env.nodeEnv})`);
  });

  const shutdown = (signal: string) => {
    console.info(`${signal} received — shutting down.`);
    server.close(() => {
      void disconnectDatabase().finally(() => process.exit(0));
    });
    setTimeout(() => process.exit(1), 10_000).unref();
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

void main();
