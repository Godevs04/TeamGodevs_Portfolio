import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CLARITY_EVENTS, trackClarityEvent } from '@/lib/clarity';
import { cn } from '@/lib/utils';
import type { Testimonial } from './data';

type TestimonialCarouselProps = {
  items: Testimonial[];
  activeIndex: number;
  onIndexChange: (index: number) => void;
  autoPlayMs?: number;
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: rating }).map((_, i) => (
      <Star key={i} className="h-3.5 w-3.5 fill-amber-400/90 text-amber-400" />
    ))}
  </div>
);

const TestimonialCarousel = ({
  items,
  activeIndex,
  onIndexChange,
  autoPlayMs = 5500,
}: TestimonialCarouselProps) => {
  const [isPaused, setIsPaused] = useState(false);
  const [fadeKey, setFadeKey] = useState(0);

  const goTo = useCallback(
    (index: number, action: 'dot' | 'next' | 'prev') => {
      if (index !== activeIndex) {
        trackClarityEvent(CLARITY_EVENTS.TESTIMONIAL_INTERACTION, {
          action,
          testimonial_id: items[index]?.id,
        });
      }
      setFadeKey((k) => k + 1);
      onIndexChange(index);
    },
    [activeIndex, items, onIndexChange]
  );

  const goNext = useCallback(() => {
    const next = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    goTo(next, 'next');
  }, [activeIndex, items.length, goTo]);

  const goPrev = useCallback(() => {
    const prev = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    goTo(prev, 'prev');
  }, [activeIndex, items.length, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goNext, autoPlayMs);
    return () => clearInterval(interval);
  }, [isPaused, goNext, autoPlayMs]);

  const current = items[activeIndex];

  return (
    <div
      className="flex h-full min-h-0 w-full min-w-0 flex-col gap-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="testimonial-quote-card relative flex min-h-[320px] flex-1 flex-col overflow-hidden transition-all duration-500 hover:-translate-y-0.5">
        <Quote
          className="pointer-events-none absolute right-4 top-4 z-0 h-10 w-10 text-emerald-500/10 sm:h-12 sm:w-12"
          aria-hidden
        />
        <article
          key={`${current.id}-${fadeKey}`}
          className="animate-testimonial-fade relative z-10 flex flex-1 flex-col p-5 sm:p-6 md:p-7"
          aria-live="polite"
        >
          <div className="flex flex-wrap items-center gap-3">
            <StarRating rating={current.rating} />
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400/90">
              {current.category}
            </span>
          </div>

          <blockquote className="mt-4 text-xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-2xl md:text-[30px]">
            &ldquo;{current.quote}&rdquo;
          </blockquote>

          <p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
            {current.result}
          </p>

          <div className="mt-auto flex items-center gap-3 pt-5">
            <img
              src={current.avatar}
              alt=""
              className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-emerald-500/20"
            />
            <div className="min-w-0">
              <p className="font-medium text-gray-900 dark:text-white">{current.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {current.role} · <span className="text-gray-700 dark:text-gray-300">{current.company}</span>
              </p>
            </div>
          </div>
        </article>
      </div>

      <div className="flex shrink-0 items-center justify-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={goPrev}
          className="testimonial-nav-btn min-h-10 min-w-10 shrink-0 rounded-full"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex flex-wrap justify-center gap-1.5" role="tablist" aria-label="Testimonials">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`${item.name} at ${item.company}`}
              onClick={() => goTo(index, 'dot')}
              className="flex min-h-10 min-w-10 items-center justify-center rounded-full focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                className={cn(
                  'block rounded-full transition-all duration-500',
                  index === activeIndex
                    ? 'h-2 w-7 bg-emerald-500'
                    : 'h-2 w-2 bg-gray-300 hover:bg-emerald-500/50 dark:bg-white/20'
                )}
                aria-hidden
              />
            </button>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={goNext}
          className="testimonial-nav-btn min-h-10 min-w-10 shrink-0 rounded-full"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <p className="sr-only">
        Showing testimonial {activeIndex + 1} of {items.length}: {current.name}, {current.company}
      </p>
    </div>
  );
};

export default TestimonialCarousel;
