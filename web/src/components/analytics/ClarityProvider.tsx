import { useEffect } from 'react';
import { initClarity } from '@/lib/clarity';

/**
 * Loads Microsoft Clarity after hydration (client-only, production-only).
 * Renders nothing — avoids SSR/hydration mismatch.
 */
const ClarityProvider = () => {
  useEffect(() => {
    const schedule =
      'requestIdleCallback' in window
        ? (cb: () => void) => window.requestIdleCallback(cb, { timeout: 4000 })
        : (cb: () => void) => window.setTimeout(cb, 2500);

    const id = schedule(() => {
      initClarity();
    });

    return () => {
      if (typeof id === 'number' && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(id);
      } else if (typeof id === 'number') {
        window.clearTimeout(id);
      }
    };
  }, []);

  return null;
};

export default ClarityProvider;
