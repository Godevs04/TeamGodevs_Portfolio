import {
  MIN_ORDER_AMOUNT_PAISE,
  PAYMENT_PURPOSES,
  STUDENT_PROJECT_PRICE_TIERS,
  SUPPORTED_CURRENCIES,
} from '../constants/catalog.js';
import { env } from '../config/env.js';
import { ORDER_STATUSES } from '../models/Order.js';
import { PROJECT_TYPE_LABELS } from '../validators/contact.schema.js';

const json = (schema: object, example?: unknown) => ({
  'application/json': { schema, ...(example !== undefined ? { example } : {}) },
});

const ref = (name: string) => ({ $ref: `#/components/schemas/${name}` });
const response = (name: string) => ({ $ref: `#/components/responses/${name}` });

const tierPricing = Object.entries(STUDENT_PROJECT_PRICE_TIERS)
  .map(([tier, price]) => `tier ${tier} = ₹${price.toLocaleString('en-IN')}`)
  .join(', ');

const paymentErrors = {
  '429': response('RateLimited'),
  '503': response('PaymentsUnavailable'),
};

/** OpenAPI 3.1 description of the TeamGoDevs API, rendered by Scalar at /docs. */
export function buildOpenApiDocument(serverUrl: string) {
  return {
    openapi: '3.1.0',
    info: {
      title: 'TeamGoDevs API',
      version: '1.0.0',
      description: [
        'Backend for [teamgodevs.in](https://www.teamgodevs.in): contact inquiries, visitor geo pricing and Razorpay payments.',
        '',
        '## Payment flow',
        '1. `POST /api/create-order` — the server prices the item and creates a Razorpay order.',
        '2. Open Razorpay Checkout in the browser with the returned `order_id` and `key_id`.',
        '3. `POST /api/verify-payment` with the three `razorpay_*` fields from the checkout success handler.',
        '4. On failure, report it with `POST /api/payment-failed` (best-effort; the webhook also records it).',
        '',
        'All amounts are in the smallest currency unit (paise). Errors always look like `{ "ok": false, "message": "…" }`.',
      ].join('\n'),
      contact: { name: 'TeamGoDevs', url: 'https://www.teamgodevs.in', email: 'hello@teamgodevs.in' },
    },
    servers: [{ url: serverUrl, description: env.isProduction ? 'Production' : 'Current environment' }],
    tags: [
      { name: 'System', description: 'Health and service status.' },
      { name: 'Contact', description: 'Website contact / project inquiry form.' },
      { name: 'Geo', description: 'Visitor country detection for regional pricing.' },
      { name: 'Payments', description: 'Razorpay Standard Checkout — order creation, verification and status.' },
      { name: 'Webhooks', description: 'Server-to-server callbacks from Razorpay.' },
    ],
    paths: {
      '/api/health': {
        get: {
          tags: ['System'],
          operationId: 'getHealth',
          summary: 'Health check',
          description:
            'Liveness and dependency status. Always `200` while the process is up; `status` is `degraded` when the configured database is unreachable. Also served at `/health`.',
          responses: {
            '200': {
              description: 'Service status',
              content: json(ref('HealthResponse'), {
                ok: true,
                status: 'ok',
                environment: 'production',
                uptimeSeconds: 3600,
                timestamp: '2026-11-08T17:00:00.000Z',
                services: { database: 'up', payments: 'configured', email: 'configured' },
              }),
            },
          },
        },
      },
      '/api/geo': {
        get: {
          tags: ['Geo'],
          operationId: 'getGeo',
          summary: 'Detect visitor country',
          description:
            'Resolves the visitor country from CDN headers (Vercel / Cloudflare) and maps it to a pricing region. Cached privately for 1 hour.',
          responses: {
            '200': {
              description: 'Detected country and pricing region',
              content: json(ref('GeoResponse'), { country: 'IN', region: 'IN' }),
            },
          },
        },
      },
      '/api/contact': {
        post: {
          tags: ['Contact'],
          operationId: 'submitContact',
          summary: 'Submit a contact inquiry',
          description: [
            'Saves the inquiry and emails the team plus a confirmation to the visitor.',
            '',
            `Limited to ${env.contactRateLimitHour} per hour and ${env.contactRateLimitDay} per day per IP / email, plus a burst limit of 10 requests per 15 minutes.`,
            '',
            'Submissions caught by the bot guard (filled honeypot or submitted too fast) receive a normal `200` so bots cannot tell they were filtered.',
          ].join('\n'),
          requestBody: {
            required: true,
            content: json(ref('ContactRequest'), {
              name: 'Priya Sharma',
              email: 'priya@example.com',
              projectType: 'web',
              budget: '50k-1.5l',
              message: 'We need a booking website for our clinic.',
              companyWebsite: '',
              formStartedAt: 1762620000000,
            }),
          },
          responses: {
            '200': { description: 'Inquiry received', content: json(ref('OkResponse'), { ok: true }) },
            '400': response('BadRequest'),
            '429': response('RateLimited'),
            '500': {
              description: 'Saving or email delivery is not available. `fallback: "book_call"` tells the UI to offer a call booking instead.',
              content: json(ref('ErrorResponse'), {
                ok: false,
                message: 'Failed to save your inquiry. Please try again.',
                fallback: 'book_call',
              }),
            },
            '502': {
              description: 'Email provider rejected the message.',
              content: json(ref('ErrorResponse'), {
                ok: false,
                message: 'Failed to send email. Please try again or contact us directly.',
                fallback: 'book_call',
              }),
            },
          },
        },
      },
      '/api/create-order': {
        post: {
          tags: ['Payments'],
          operationId: 'createOrder',
          summary: 'Create a Razorpay order',
          description: [
            'Creates a Razorpay order and stores it with status `created`.',
            '',
            `- **student-project** — priced on the server from the project id (${tierPricing}). Any amount, tier or name sent by the client is ignored.`,
            `- **custom** — \`amount\` in paise, minimum ${MIN_ORDER_AMOUNT_PAISE} (₹1), maximum ₹${env.paymentMaxAmountInr.toLocaleString('en-IN')}.`,
          ].join('\n'),
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: ref('CreateOrderRequest'),
                examples: {
                  studentProject: {
                    summary: 'Student project (server-priced)',
                    value: {
                      purpose: 'student-project',
                      item: { id: 'crop-recommendation-system', name: 'Crop Recommendation System' },
                      customer: { name: 'Gowtham', email: 'gowtham@example.com', phone: '+91 98765 43210', college: 'KASC, B.Sc CS, 3rd year' },
                      notes: 'Review on 20 Nov',
                    },
                  },
                  custom: {
                    summary: 'Custom amount (invoice)',
                    value: {
                      purpose: 'custom',
                      amount: 500000,
                      currency: 'INR',
                      item: { name: 'Invoice INV-1042' },
                      customer: { name: 'Priya Sharma', email: 'priya@example.com', phone: '9876543210' },
                    },
                  },
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Order created — open Razorpay Checkout with `order_id` and `key_id`.',
              content: json(ref('CreateOrderResponse'), {
                ok: true,
                order_id: 'order_TxjVXAobvzv0Wd',
                amount: 349900,
                currency: 'INR',
                receipt: 'rcpt_mh9k2x1a_3f9a1c2b',
                key_id: 'rzp_test_xxxxxxxxxxxxxx',
              }),
            },
            '400': response('BadRequest'),
            '401': {
              description: 'Razorpay rejected the server credentials.',
              content: json(ref('ErrorResponse'), {
                ok: false,
                message: 'Payment gateway authentication failed. Please contact us.',
              }),
            },
            '500': {
              description: 'Razorpay API error.',
              content: json(ref('ErrorResponse'), {
                ok: false,
                message: 'Unable to start the payment right now. Please try again in a moment.',
              }),
            },
            ...paymentErrors,
          },
        },
      },
      '/api/verify-payment': {
        post: {
          tags: ['Payments'],
          operationId: 'verifyPayment',
          summary: 'Verify a checkout payment signature',
          description:
            'Checks `HMAC-SHA256(razorpay_order_id + "|" + razorpay_payment_id, KEY_SECRET)` against `razorpay_signature` (constant-time). On success the order is marked `paid` and receipt emails are sent once. A mismatch never marks the order paid.',
          requestBody: {
            required: true,
            content: json(ref('VerifyPaymentRequest'), {
              razorpay_order_id: 'order_TxjVXAobvzv0Wd',
              razorpay_payment_id: 'pay_TxjW1kq2dHc9sZ',
              razorpay_signature: '9e2f…c41a',
            }),
          },
          responses: {
            '200': {
              description: 'Signature valid — payment recorded.',
              content: json(ref('VerifyPaymentResponse'), {
                ok: true,
                verified: true,
                order_id: 'order_TxjVXAobvzv0Wd',
                payment_id: 'pay_TxjW1kq2dHc9sZ',
              }),
            },
            '400': {
              description: 'Missing fields or signature mismatch.',
              content: json(ref('ErrorResponse'), {
                ok: false,
                message: 'Payment verification failed. If money was deducted, please contact us with your payment ID.',
              }),
            },
            ...paymentErrors,
          },
        },
      },
      '/api/payment-failed': {
        post: {
          tags: ['Payments'],
          operationId: 'reportPaymentFailure',
          summary: 'Report a failed payment attempt',
          description:
            'Records the `payment.failed` error from Razorpay Checkout on the order. Ignored once an order is `paid`, so a later successful retry still wins.',
          requestBody: {
            required: true,
            content: json(ref('PaymentFailureRequest'), {
              razorpay_order_id: 'order_TxjVXAobvzv0Wd',
              razorpay_payment_id: 'pay_TxjW1kq2dHc9sZ',
              code: 'BAD_REQUEST_ERROR',
              description: 'Payment was declined by the bank.',
              reason: 'payment_failed',
              source: 'bank',
              step: 'payment_authorization',
            }),
          },
          responses: {
            '200': { description: 'Failure recorded', content: json(ref('OkResponse'), { ok: true }) },
            '400': response('BadRequest'),
            '429': response('RateLimited'),
          },
        },
      },
      '/api/orders/{orderId}': {
        get: {
          tags: ['Payments'],
          operationId: 'getOrder',
          summary: 'Get order status',
          parameters: [
            {
              name: 'orderId',
              in: 'path',
              required: true,
              description: 'Razorpay order id',
              schema: { type: 'string', example: 'order_TxjVXAobvzv0Wd' },
            },
          ],
          responses: {
            '200': {
              description: 'Order found',
              content: json(ref('OrderStatusResponse'), {
                ok: true,
                order: {
                  order_id: 'order_TxjVXAobvzv0Wd',
                  status: 'paid',
                  amount: 349900,
                  currency: 'INR',
                  receipt: 'rcpt_mh9k2x1a_3f9a1c2b',
                  item: { name: 'Crop Recommendation System', code: 'ML-005' },
                  payment_id: 'pay_TxjW1kq2dHc9sZ',
                  paid_at: '2026-11-08T17:05:00.000Z',
                },
              }),
            },
            '404': {
              description: 'Unknown order id',
              content: json(ref('ErrorResponse'), { ok: false, message: 'Order not found.' }),
            },
            '429': response('RateLimited'),
            '503': {
              description: 'Database not connected.',
              content: json(ref('ErrorResponse'), { ok: false, message: 'Order lookup is temporarily unavailable.' }),
            },
          },
        },
      },
      '/api/webhooks/razorpay': {
        post: {
          tags: ['Webhooks'],
          operationId: 'razorpayWebhook',
          summary: 'Razorpay webhook',
          description: [
            'Register this URL in Razorpay Dashboard → Settings → Webhooks with the `payment.captured`, `order.paid` and `payment.failed` events.',
            '',
            'The `X-Razorpay-Signature` header must equal `HMAC-SHA256(raw body, RAZORPAY_WEBHOOK_SECRET)`. Marks orders paid even if the buyer closed the tab before `/api/verify-payment` ran.',
          ].join('\n'),
          parameters: [
            {
              name: 'X-Razorpay-Signature',
              in: 'header',
              required: true,
              description: 'Hex HMAC-SHA256 of the raw request body using the webhook secret.',
              schema: { type: 'string' },
            },
          ],
          requestBody: {
            required: true,
            content: json(ref('RazorpayWebhookEvent'), {
              event: 'payment.captured',
              payload: { payment: { entity: { id: 'pay_TxjW1kq2dHc9sZ', order_id: 'order_TxjVXAobvzv0Wd' } } },
            }),
          },
          responses: {
            '200': { description: 'Event processed (unknown events are acknowledged and ignored)', content: json(ref('OkResponse'), { ok: true }) },
            '400': {
              description: 'Missing / invalid signature or malformed payload.',
              content: json(ref('ErrorResponse'), { ok: false, message: 'Invalid webhook signature.' }),
            },
            '503': {
              description: '`RAZORPAY_WEBHOOK_SECRET` is not configured.',
              content: json(ref('ErrorResponse'), { ok: false, message: 'Webhook secret is not configured.' }),
            },
          },
        },
      },
    },
    components: {
      schemas: {
        OkResponse: {
          type: 'object',
          required: ['ok'],
          properties: { ok: { type: 'boolean', const: true } },
        },
        ErrorResponse: {
          type: 'object',
          required: ['ok', 'message'],
          properties: {
            ok: { type: 'boolean', const: false },
            message: { type: 'string', description: 'Human-readable message, safe to show to the user.' },
            fallback: {
              type: 'string',
              enum: ['book_call'],
              description: 'Suggests an alternative action to the UI.',
            },
          },
        },
        HealthResponse: {
          type: 'object',
          required: ['ok', 'status', 'environment', 'uptimeSeconds', 'timestamp', 'services'],
          properties: {
            ok: { type: 'boolean', const: true },
            status: { type: 'string', enum: ['ok', 'degraded'] },
            environment: { type: 'string', examples: ['development', 'production'] },
            uptimeSeconds: { type: 'integer', minimum: 0 },
            timestamp: { type: 'string', format: 'date-time' },
            services: {
              type: 'object',
              required: ['database', 'payments', 'email'],
              properties: {
                database: { type: 'string', enum: ['up', 'down', 'not_configured'] },
                payments: { type: 'string', enum: ['configured', 'not_configured'] },
                email: { type: 'string', enum: ['configured', 'not_configured'] },
              },
            },
          },
        },
        GeoResponse: {
          type: 'object',
          required: ['country', 'region'],
          properties: {
            country: { type: ['string', 'null'], description: 'ISO 3166-1 alpha-2 country code', examples: ['IN'] },
            region: { type: 'string', enum: ['IN', 'US', 'GB', 'EU', 'ID', 'AU', 'SG', 'AE'] },
          },
        },
        ContactRequest: {
          type: 'object',
          required: ['name', 'email', 'projectType', 'budget', 'message'],
          properties: {
            name: { type: 'string', minLength: 1, maxLength: 120 },
            email: { type: 'string', format: 'email', maxLength: 254 },
            projectType: {
              type: 'string',
              minLength: 1,
              description: `Known values: ${Object.keys(PROJECT_TYPE_LABELS).map((key) => `\`${key}\``).join(', ')}.`,
            },
            budget: {
              type: 'string',
              minLength: 1,
              description: 'Budget bucket: `under-50k`, `50k-1.5l`, `1.5l-5l`, `5l-plus` or `undecided`.',
            },
            message: { type: 'string', minLength: 1, maxLength: 5000 },
            companyWebsite: {
              type: 'string',
              maxLength: 200,
              description: 'Honeypot — must be left empty. Hidden from real users.',
            },
            formStartedAt: {
              type: 'integer',
              description: 'Epoch milliseconds when the form was opened; very fast submissions are treated as bots.',
            },
          },
        },
        Customer: {
          type: 'object',
          required: ['name', 'email', 'phone'],
          properties: {
            name: { type: 'string', minLength: 1, maxLength: 120 },
            email: { type: 'string', format: 'email', maxLength: 254 },
            phone: { type: 'string', pattern: '^\\+?[0-9\\s-]{7,20}$', examples: ['+91 98765 43210'] },
            college: { type: 'string', maxLength: 200 },
          },
        },
        OrderItem: {
          type: 'object',
          required: ['name'],
          properties: {
            id: { type: 'string', maxLength: 120, description: 'Student project id (required for `student-project`).' },
            name: { type: 'string', minLength: 1, maxLength: 200 },
            code: { type: 'string', maxLength: 40, description: 'Ignored for student projects.' },
            tier: { type: 'integer', minimum: 1, maximum: 4, description: 'Ignored — the server uses its own catalog.' },
          },
        },
        CreateOrderRequest: {
          type: 'object',
          required: ['customer'],
          properties: {
            purpose: { type: 'string', enum: [...PAYMENT_PURPOSES], default: 'custom' },
            amount: {
              type: 'integer',
              minimum: MIN_ORDER_AMOUNT_PAISE,
              maximum: env.paymentMaxAmountInr * 100,
              description: 'Paise. Required for `custom`; ignored for `student-project`.',
            },
            currency: { type: 'string', enum: [...SUPPORTED_CURRENCIES], default: 'INR' },
            receipt: { type: 'string', maxLength: 40, description: 'Optional; generated when omitted.' },
            item: ref('OrderItem'),
            customer: ref('Customer'),
            notes: { type: 'string', maxLength: 500 },
          },
        },
        CreateOrderResponse: {
          type: 'object',
          required: ['ok', 'order_id', 'amount', 'currency', 'receipt', 'key_id'],
          properties: {
            ok: { type: 'boolean', const: true },
            order_id: { type: 'string' },
            amount: { type: 'integer', description: 'Paise' },
            currency: { type: 'string' },
            receipt: { type: 'string' },
            key_id: { type: 'string', description: 'Public Razorpay key id for Checkout.' },
          },
        },
        VerifyPaymentRequest: {
          type: 'object',
          required: ['razorpay_order_id', 'razorpay_payment_id', 'razorpay_signature'],
          properties: {
            razorpay_order_id: { type: 'string', minLength: 1 },
            razorpay_payment_id: { type: 'string', minLength: 1 },
            razorpay_signature: { type: 'string', minLength: 1 },
          },
        },
        VerifyPaymentResponse: {
          type: 'object',
          required: ['ok', 'verified', 'order_id', 'payment_id'],
          properties: {
            ok: { type: 'boolean', const: true },
            verified: { type: 'boolean', const: true },
            order_id: { type: 'string' },
            payment_id: { type: 'string' },
          },
        },
        PaymentFailureRequest: {
          type: 'object',
          required: ['razorpay_order_id'],
          properties: {
            razorpay_order_id: { type: 'string', minLength: 1 },
            razorpay_payment_id: { type: 'string' },
            code: { type: 'string', maxLength: 100 },
            description: { type: 'string', maxLength: 500 },
            reason: { type: 'string', maxLength: 200 },
            source: { type: 'string', maxLength: 100 },
            step: { type: 'string', maxLength: 100 },
          },
        },
        OrderStatusResponse: {
          type: 'object',
          required: ['ok', 'order'],
          properties: {
            ok: { type: 'boolean', const: true },
            order: {
              type: 'object',
              properties: {
                order_id: { type: 'string' },
                status: { type: 'string', enum: [...ORDER_STATUSES] },
                amount: { type: 'integer', description: 'Paise' },
                currency: { type: 'string' },
                receipt: { type: 'string' },
                item: {
                  type: 'object',
                  properties: { name: { type: ['string', 'null'] }, code: { type: ['string', 'null'] } },
                },
                payment_id: { type: ['string', 'null'] },
                paid_at: { type: ['string', 'null'], format: 'date-time' },
              },
            },
          },
        },
        RazorpayWebhookEvent: {
          type: 'object',
          properties: {
            event: { type: 'string', examples: ['payment.captured', 'order.paid', 'payment.failed'] },
            payload: {
              type: 'object',
              properties: {
                payment: {
                  type: 'object',
                  properties: {
                    entity: {
                      type: 'object',
                      properties: {
                        id: { type: 'string' },
                        order_id: { type: 'string' },
                        error_code: { type: 'string' },
                        error_description: { type: 'string' },
                        error_reason: { type: 'string' },
                        error_source: { type: 'string' },
                        error_step: { type: 'string' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      responses: {
        BadRequest: {
          description: 'Validation failed — `message` names the first invalid field.',
          content: json(ref('ErrorResponse'), { ok: false, message: 'Valid email is required' }),
        },
        RateLimited: {
          description: 'Too many requests from this IP. See the `RateLimit` / `RateLimit-Policy` headers.',
          content: json(ref('ErrorResponse'), {
            ok: false,
            message: 'Too many payment attempts. Please wait a few minutes and try again.',
          }),
        },
        PaymentsUnavailable: {
          description: 'Razorpay keys are not configured on the server.',
          content: json(ref('ErrorResponse'), {
            ok: false,
            message: 'Online payments are not configured yet. Please contact us directly.',
          }),
        },
      },
    },
  };
}
