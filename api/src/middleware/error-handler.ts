import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError } from 'zod';
import { HttpError } from '../utils/http-error.js';

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ ok: false, message: 'Not found' });
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({
      ok: false,
      message: error.message,
      ...(error.fallback ? { fallback: error.fallback } : {}),
    });
    return;
  }

  if (error instanceof ZodError) {
    const issue = error.issues[0];
    const field = issue?.path.join('.');
    const message =
      issue?.message === 'Required' && field ? `${field} is required` : issue?.message ?? 'Invalid request.';
    res.status(400).json({ ok: false, message });
    return;
  }

  // body-parser errors (malformed JSON, payload too large)
  if (typeof error?.status === 'number' && error.status < 500 && typeof error?.type === 'string') {
    res.status(error.status).json({ ok: false, message: 'Invalid request body.' });
    return;
  }

  console.error('Unhandled error:', error);
  res.status(500).json({ ok: false, message: 'Internal server error' });
};
