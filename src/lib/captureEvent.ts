type PostHogLite = {
  capture?: (name: string, props?: Record<string, unknown>) => void;
  identify?: (id: string, props?: Record<string, unknown>) => void;
};

function getPostHog(): PostHogLite | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as Window & { posthog?: PostHogLite }).posthog;
}

/** Fire-and-forget analytics — no PostHog SDK import on the critical path. */
export function captureEvent(
  event: string,
  properties?: Record<string, string | number | boolean | undefined>
) {
  getPostHog()?.capture?.(event, properties);
}

export function identifyUser(id: string, properties?: Record<string, string | undefined>) {
  getPostHog()?.identify?.(id, properties);
}
