export type ErrorFallback = 'book_call';

export class HttpError extends Error {
  readonly status: number;
  readonly fallback?: ErrorFallback;

  constructor(status: number, message: string, options: { fallback?: ErrorFallback } = {}) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.fallback = options.fallback;
  }
}
