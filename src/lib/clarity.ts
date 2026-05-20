/**
 * Microsoft Clarity — client-only analytics (production).
 * @see https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api
 */

export const CLARITY_EVENTS = {
  PROJECT_CLICK: 'project_click',
  CALENDLY_OPEN: 'calendly_open',
  CONTACT_SUBMIT: 'contact_submit',
  TESTIMONIAL_INTERACTION: 'testimonial_interaction',
  THEME_TOGGLE: 'theme_toggle',
} as const;

export type ClarityEventName = (typeof CLARITY_EVENTS)[keyof typeof CLARITY_EVENTS];

export type ClarityMetadata = Record<string, string | number | boolean | undefined>;

type ClarityFn = {
  (...args: unknown[]): void;
  q?: unknown[][];
};

declare global {
  interface Window {
    clarity?: ClarityFn;
  }
}

/** Read project ID from env (NEXT_PUBLIC_ prefix for deploy parity with Next.js). */
export function getClarityProjectId(): string | undefined {
  const id = import.meta.env.NEXT_PUBLIC_CLARITY_ID;
  if (typeof id !== 'string') return undefined;
  const trimmed = id.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

/** Clarity runs only in production builds with a valid project ID. */
export function isClarityEnabled(): boolean {
  return import.meta.env.PROD && Boolean(getClarityProjectId());
}

let initStarted = false;

/**
 * Injects the Clarity tag asynchronously. Safe to call once after mount.
 * No-op in development or when ID is missing.
 */
export function initClarity(): void {
  if (typeof window === 'undefined' || !isClarityEnabled() || initStarted) return;

  const projectId = getClarityProjectId();
  if (!projectId) return;

  initStarted = true;

  if (!window.clarity) {
    const stub: ClarityFn = function (...args: unknown[]) {
      (stub.q = stub.q || []).push(args);
    };
    window.clarity = stub;
  }

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${encodeURIComponent(projectId)}`;
  document.head.appendChild(script);
}

function clarityReady(): boolean {
  return isClarityEnabled() && typeof window.clarity === 'function';
}

/**
 * Record a custom Clarity event with optional session tags.
 * Queued automatically if the script has not finished loading.
 */
export function trackClarityEvent(event: ClarityEventName, metadata?: ClarityMetadata): void {
  if (!isClarityEnabled()) return;

  try {
    window.clarity?.('event', event);

    if (metadata) {
      for (const [key, value] of Object.entries(metadata)) {
        if (value !== undefined) {
          window.clarity?.('set', key, String(value));
        }
      }
    }
  } catch {
    /* analytics must never break UX */
  }
}

/** Whether Clarity has been initialized on this page load. */
export function isClarityInitialized(): boolean {
  return initStarted && clarityReady();
}
