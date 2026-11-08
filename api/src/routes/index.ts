import { Router } from 'express';
import { submitContact } from '../controllers/contact.controller.js';
import { getGeo } from '../controllers/geo.controller.js';
import { getHealth } from '../controllers/health.controller.js';
import {
  createOrderHandler,
  getOrderHandler,
  paymentFailedHandler,
  verifyPaymentHandler,
} from '../controllers/payment.controller.js';
import { contactLimiter, paymentLimiter } from '../middleware/rate-limiters.js';

export const apiRouter = Router();

apiRouter.get('/health', getHealth);

apiRouter.get('/geo', getGeo);
apiRouter.post('/contact', contactLimiter, submitContact);

apiRouter.post('/create-order', paymentLimiter, createOrderHandler);
apiRouter.post('/verify-payment', paymentLimiter, verifyPaymentHandler);
apiRouter.post('/payment-failed', paymentLimiter, paymentFailedHandler);
apiRouter.get('/orders/:orderId', paymentLimiter, getOrderHandler);
