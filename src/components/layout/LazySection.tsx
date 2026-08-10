import { useEffect, useRef, useState, type ReactNode } from 'react';
import SectionFallback from '@/components/layout/SectionFallback';

type LazySectionProps = {
  children: ReactNode;
  /** Start loading slightly before the section enters the viewport */
  rootMargin?: string;
  minHeightClassName?: string;
};

/**
 * Defers mounting (and therefore lazy() chunk fetch) until near viewport.
 * Prevents Projects/framer-motion from competing with LCP on first paint.
 */
const LazySection = ({
  children,
  rootMargin = '280px 0px',
  minHeightClassName = 'min-h-[12rem]',
}: LazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || active) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [active, rootMargin]);

  return (
    <div ref={ref} className={minHeightClassName}>
      {active ? children : <SectionFallback />}
    </div>
  );
};

export default LazySection;
