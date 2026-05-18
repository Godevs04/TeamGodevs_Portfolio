import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
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
    (index: number) => {
      setFadeKey((k) => k + 1);
      onIndexChange(index);
    },
    [onIndexChange]
  );

  const goNext = useCallback(() => {
    goTo(activeIndex === items.length - 1 ? 0 : activeIndex + 1);
  }, [activeIndex, items.length, goTo]);

  const goPrev = useCallback(() => {
    goTo(activeIndex === 0 ? items.length - 1 : activeIndex - 1);
  }, [activeIndex, items.length, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(goNext, autoPlayMs);
    return () => clearInterval(interval);
  }, [isPaused, goNext, autoPlayMs]);

  const current = items[activeIndex];

  return (
    <div
      className="flex flex-col gap-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <Card variant="glass" className="relative overflow-hidden shadow-large">
        <Quote
          className="pointer-events-none absolute right-5 top-5 z-0 h-12 w-12 text-primary/10 sm:h-14 sm:w-14 md:h-16 md:w-16"
          aria-hidden
        />
        <CardContent className="relative p-5 sm:p-6 md:p-10">
          <article
            key={`${current.id}-${fadeKey}`}
            className="animate-testimonial-fade"
            aria-live="polite"
          >
            <StarRating rating={current.rating} />

            <blockquote className="relative z-10 my-5 text-base font-medium leading-relaxed text-foreground sm:my-6 sm:text-lg md:my-8 md:text-h3">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <div className="relative z-10 flex items-center gap-4">
              <img
                src={current.avatar}
                alt=""
                className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-primary/25 shadow-medium sm:h-14 sm:w-14 md:h-16 md:w-16"
              />
              <div className="min-w-0">
                <p className="font-semibold text-foreground">{current.name}</p>
                <p className="text-sm text-muted-foreground sm:text-body">
                  {current.role} ·{' '}
                  <span className="font-medium text-foreground/80">{current.company}</span>
                </p>
                <p className="text-caption mt-1 text-primary">{current.project}</p>
              </div>
            </div>
          </article>
        </CardContent>
      </Card>

      <div className="flex items-center justify-center gap-3 sm:gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={goPrev}
          className="min-h-11 min-w-11 shrink-0 rounded-full hover-lift"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex flex-wrap justify-center gap-1 sm:gap-2" role="tablist" aria-label="Testimonials">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`${item.name} at ${item.company}`}
              onClick={() => goTo(index)}
              className="flex min-h-11 min-w-11 items-center justify-center rounded-full focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span
                className={cn(
                  'block rounded-full transition-all duration-300',
                  index === activeIndex
                    ? 'h-2.5 w-8 bg-primary'
                    : 'h-2.5 w-2.5 bg-border hover:bg-primary/50'
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
          className="min-h-11 min-w-11 shrink-0 rounded-full hover-lift"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <p className="sr-only">
        Showing testimonial {activeIndex + 1} of {items.length}: {current.name}, {current.company}
      </p>
    </div>
  );
};

export default TestimonialCarousel;
