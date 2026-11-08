import { useEffect, useRef, useState, type ReactNode } from 'react';
import SectionFallback from '@/components/layout/SectionFallback';
import { LAZY_SECTIONS_ACTIVATE_EVENT } from '@/lib/scroll';

type LazySectionProps = {
  children: ReactNode;
  /** Start loading slightly before the section enters the viewport */
  rootMargin?: string;
  minHeightClassName?: string;
};

/**
 * Defers mounting (and therefore lazy() chunk fetch) until near viewport.
 * Prevents Projects/framer-motion from competing with LCP on first paint.
 *
 * Also mounts immediately when `scrollToSection()` (or a URL hash) targets a
 * section that has not been rendered yet, so CTA / nav buttons always work.
 */
const LazySection = ({
  children,
  rootMargin = '280px 0px',
  minHeightClassName = 'min-h-[12rem]',
}: LazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(
    () => typeof window !== 'undefined' && window.location.hash.length > 1
  );

  useEffect(() => {
    if (active) return;

    const activate = () => setActive(true);
    window.addEventListener(LAZY_SECTIONS_ACTIVATE_EVENT, activate);

    const el = ref.current;
    let observer: IntersectionObserver | undefined;

    if (el && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) activate();
        },
        { rootMargin, threshold: 0.01 }
      );
      observer.observe(el);
    } else {
      activate();
    }

    return () => {
      window.removeEventListener(LAZY_SECTIONS_ACTIVATE_EVENT, activate);
      observer?.disconnect();
    };
  }, [active, rootMargin]);

  return (
    <div
      ref={ref}
      className={minHeightClassName}
      data-lazy-section={active ? 'active' : 'pending'}
    >
      {active ? children : <SectionFallback />}
    </div>
  );
};

export default LazySection;
