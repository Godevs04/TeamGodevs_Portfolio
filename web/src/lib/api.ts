const API_BASE_URL = (import.meta.env.VITE_API_URL ?? '').trim().replace(/\/+$/, '');

/** Absolute URL for an Express API path, e.g. apiUrl('/api/contact'). */
export const apiUrl = (path: string) => `${API_BASE_URL}${path}`;

export type ApiErrorBody = { ok?: false; message?: string; error?: string; fallback?: string };

export class ApiError extends Error {
  readonly status: number;
  readonly body: ApiErrorBody | null;

  constructor(status: number, message: string, body: ApiErrorBody | null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

/** JSON request helper — throws ApiError with the server's message on non-2xx responses. */
export async function apiRequest<T>(path: string, init: RequestInit & { json?: unknown } = {}): Promise<T> {
  const { json, headers, ...rest } = init;

  let response: Response;
  try {
    response = await fetch(apiUrl(path), {
      ...rest,
      headers: {
        Accept: 'application/json',
        ...(json !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
      },
      ...(json !== undefined ? { body: JSON.stringify(json) } : {}),
    });
  } catch {
    throw new ApiError(0, 'Network error. Check your connection and try again.', null);
  }

  const data = (await response.json().catch(() => null)) as (T & ApiErrorBody) | null;

  if (!response.ok) {
    throw new ApiError(
      response.status,
      data?.message ?? data?.error ?? 'Something went wrong. Please try again.',
      data
    );
  }

  return data as T;
}
