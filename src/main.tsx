import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

/**
 * Analytics after first interaction (or long idle) so Lighthouse / LCP
 * never pay for PostHog + Clarity on the critical path.
 */
const bootAnalytics = () => {
  void import("./analytics/boot").then((m) => m.bootAnalytics());
};

if (typeof window !== "undefined") {
  let booted = false;
  const run = () => {
    if (booted) return;
    booted = true;
    cleanup();
    bootAnalytics();
  };

  const events = ["pointerdown", "keydown", "touchstart", "scroll"] as const;
  const cleanup = () => {
    for (const event of events) {
      window.removeEventListener(event, run);
    }
  };

  for (const event of events) {
    window.addEventListener(event, run, { once: true, passive: true });
  }

  // Fallback so we still get pageviews without interaction
  window.setTimeout(run, 8000);
}
