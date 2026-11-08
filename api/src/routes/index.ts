import { Router } from 'express';
import { isDatabaseReady } from '../config/db.js';
import { isRazorpayConfigured } from '../config/razorpay.js';
import { submitContact } from '../controllers/contact.controller.js';
import { getGeo } from '../controllers/geo.controller.js';
import {
  createOrderHandler,
  getOrderHandler,
  paymentFailedHandler,
  verifyPaymentHandler,
} from '../controllers/payment.controller.js';
import { contactLimiter, paymentLimiter } from '../middleware/rate-limiters.js';
import { isEmailConfigured } from '../services/email.service.js';

export const apiRouter = Router();

apiRouter.get('/health', (_req, res) => {
  res.status(200).json({
    ok: true,
    services: {
      database: isDatabaseReady(),
      payments: isRazorpayConfigured(),
      email: isEmailConfigured(),
    },
  });
});

apiRouter.get('/geo', getGeo);
apiRouter.post('/contact', contactLimiter, submitContact);

apiRouter.post('/create-order', paymentLimiter, createOrderHandler);
apiRouter.post('/verify-payment', paymentLimiter, verifyPaymentHandler);
apiRouter.post('/payment-failed', paymentLimiter, paymentFailedHandler);
apiRouter.get('/orders/:orderId', paymentLimiter, getOrderHandler);
