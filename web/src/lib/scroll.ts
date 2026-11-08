/** Fired to force every <LazySection> to mount its content immediately. */
export const LAZY_SECTIONS_ACTIVATE_EVENT = 'lazysections:activate';

const WAIT_FOR_TARGET_MS = 5000;
/** Re-align after lazy chunks above the target finish loading and shift layout. */
const REALIGN_DELAYS_MS = [450, 1100];

let pendingRequest = 0;

type NavigateFn = (to: string) => void;
let routerNavigate: NavigateFn | null = null;

/** Registered by <RouterBridge /> so section links work from other routes. */
export function registerNavigate(fn: NavigateFn | null) {
  routerNavigate = fn;
}

function scrollElementIntoView(element: HTMLElement) {
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Smooth-scrolls to a section by id.
 *
 * Most sections are wrapped in <LazySection>, so they are not in the DOM until
 * they come near the viewport. When the target is missing we ask all lazy
 * sections to mount, wait for the target to appear, then scroll (and re-align
 * once surrounding content has rendered).
 */
export function scrollToSection(sectionId: string) {
  if (typeof window === 'undefined') return;

  const id = sectionId.replace(/^#/, '');

  // Sections live on the home page — go there first (Index scrolls on hash).
  if (window.location.pathname !== '/') {
    if (routerNavigate) routerNavigate(`/#${id}`);
    else window.location.assign(`/#${id}`);
    return;
  }

  const requestId = ++pendingRequest;

  const existing = document.getElementById(id);
  const needsActivation = !existing || document.querySelector('[data-lazy-section="pending"]');

  if (!needsActivation && existing) {
    scrollElementIntoView(existing);
    return;
  }

  window.dispatchEvent(new Event(LAZY_SECTIONS_ACTIVATE_EVENT));

  const startedAt = performance.now();

  const realign = () => {
    REALIGN_DELAYS_MS.forEach((delay) => {
      window.setTimeout(() => {
        if (requestId !== pendingRequest) return;
        const el = document.getElementById(id);
        if (el) scrollElementIntoView(el);
      }, delay);
    });
  };

  const waitForTarget = () => {
    if (requestId !== pendingRequest) return;

    const el = document.getElementById(id);
    if (el) {
      scrollElementIntoView(el);
      realign();
      return;
    }

    if (performance.now() - startedAt < WAIT_FOR_TARGET_MS) {
      window.requestAnimationFrame(waitForTarget);
    }
  };

  window.requestAnimationFrame(waitForTarget);
}
