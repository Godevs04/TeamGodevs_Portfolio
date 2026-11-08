import { useEffect, useRef, useState } from 'react';

type UseAnimatedCounterOptions = {
  end: number;
  duration?: number;
  decimals?: number;
};

export function useAnimatedCounter(
  inView: boolean,
  { end, duration = 2000, decimals = 0 }: UseAnimatedCounterOptions
) {
  const [value, setValue] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = eased * end;
      setValue(decimals > 0 ? Number(next.toFixed(decimals)) : Math.floor(next));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(end);
    };

    requestAnimationFrame(step);
  }, [inView, end, duration, decimals]);

  return value;
}
