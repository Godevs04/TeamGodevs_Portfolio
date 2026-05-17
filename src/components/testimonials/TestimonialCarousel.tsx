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
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <Card variant="glass" className="overflow-hidden shadow-large">
        <Quote className="absolute right-5 top-5 h-14 w-14 text-primary/10 md:h-16 md:w-16" aria-hidden />
        <CardContent className="relative min-h-[280px] p-6 md:min-h-[300px] md:p-10">
          {items.map((item, index) => (
            <article
              key={item.id}
              aria-hidden={index !== activeIndex}
              className={cn(
                'absolute inset-0 flex flex-col justify-center p-6 transition-opacity duration-500 ease-in-out md:p-10',
                index === activeIndex ? 'z-10 opacity-100' : 'z-0 opacity-0 pointer-events-none'
              )}
            >
              <div
                key={index === activeIndex ? fadeKey : undefined}
                className={cn(
                  index === activeIndex && 'animate-testimonial-fade'
                )}
              >
                <StarRating rating={item.rating} />

                <blockquote className="text-h3 my-6 font-medium leading-relaxed text-foreground md:my-8">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-4">
                  <img
                    src={item.avatar}
                    alt=""
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/25 shadow-medium md:h-16 md:w-16"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-body text-muted-foreground">
                      {item.role} · <span className="font-medium text-foreground/80">{item.company}</span>
                    </p>
                    <p className="text-caption mt-1 text-primary">{item.project}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </CardContent>
      </Card>

      <div className="mt-6 flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={goPrev}
          className="rounded-full hover-lift"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex gap-2" role="tablist" aria-label="Testimonials">
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`${item.name} at ${item.company}`}
              onClick={() => goTo(index)}
              className={cn(
                'h-2.5 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring',
                index === activeIndex
                  ? 'w-8 bg-primary'
                  : 'w-2.5 bg-border hover:bg-primary/50'
              )}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={goNext}
          className="rounded-full hover-lift"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing testimonial from {current.name}, {current.company}
      </p>
    </div>
  );
};

export default TestimonialCarousel;
