import { useEffect } from 'react';
import { initClarity } from '@/lib/clarity';

/**
 * Loads Microsoft Clarity after hydration (client-only, production-only).
 * Renders nothing — avoids SSR/hydration mismatch.
 */
const ClarityProvider = () => {
  useEffect(() => {
    initClarity();
  }, []);

  return null;
};

export default ClarityProvider;
