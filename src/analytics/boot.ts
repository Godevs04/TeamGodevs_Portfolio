import posthog from "posthog-js";
import { initClarity } from "@/lib/clarity";

/** Client-only analytics bootstrap — dynamically imported after interaction/idle. */
export function bootAnalytics() {
  const token = import.meta.env.VITE_PUBLIC_POSTHOG_TOKEN as string | undefined;
  const host = import.meta.env.VITE_PUBLIC_POSTHOG_HOST as string | undefined;

  if (token) {
    posthog.init(token, {
      api_host: host,
      defaults: "2026-01-30",
      capture_pageview: true,
      persistence: "localStorage+cookie",
      disable_session_recording: true,
      disable_surveys: true,
      // Avoid extra remote scripts (web-vitals / dead-clicks) that hurt Lighthouse
      disable_external_dependency_loading: true,
      capture_performance: false,
      autocapture: false,
    });
    (window as Window & { posthog?: typeof posthog }).posthog = posthog;
  }

  initClarity();
}
