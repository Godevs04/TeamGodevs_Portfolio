import { useEffect, useRef } from 'react';
import { Calendar, Clock, Video } from 'lucide-react';
import { CLARITY_EVENTS, trackClarityEvent } from '@/lib/clarity';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { mailto } from '@/lib/site';
import { CALENDLY_EMBED_URL } from './constants';
import { usePostHog } from '@posthog/react';

const timeSlots = ['10:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'];

const BookCallPanel = () => {
  const posthog = usePostHog();
  const trackedEmbed = useRef(false);

  useEffect(() => {
    if (!CALENDLY_EMBED_URL || trackedEmbed.current) return;
    trackedEmbed.current = true;
    trackClarityEvent(CLARITY_EVENTS.CALENDLY_OPEN, { source: 'calendly_embed' });
    posthog?.capture('book_call_viewed', { type: 'calendly_embed' });
  }, [posthog]);

  if (CALENDLY_EMBED_URL) {
    return (
      <Card variant="elevated" className="overflow-hidden shadow-large">
        <CardContent className="p-0">
          <iframe
            src={CALENDLY_EMBED_URL}
            title="Book a call with TeamGoDevs"
            className="min-h-[70vh] w-full border-0 sm:min-h-[620px]"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="elevated" className="overflow-hidden shadow-large">
      <CardContent className="p-6 md:p-8">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="badge-pill">Free consultation</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-caption text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-primary" aria-hidden />
            30 minutes · Google Meet
          </span>
        </div>

        <h3 className="text-h3 mb-2">Book a discovery call</h3>
        <p className="text-body mb-8 text-muted-foreground">
          Pick a time that works for you. We&apos;ll discuss goals, timeline, and whether we&apos;re
          the right fit—no sales pressure.
        </p>

        {/* Calendly-style placeholder */}
        <div className="rounded-2xl border border-border bg-muted/30 p-4 md:p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Select a time</p>
            <Calendar className="h-5 w-5 text-primary" aria-hidden />
          </div>

          <div className="mb-6 grid grid-cols-7 gap-1 text-center text-caption text-muted-foreground">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
              <span key={`${d}-${i}`} className="py-1 font-medium">
                {d}
              </span>
            ))}
            {Array.from({ length: 35 }).map((_, i) => (
              <button
                key={i}
                type="button"
                disabled={i < 5 || i > 28}
                className={`min-h-11 rounded-lg py-2 text-xs transition-smooth ${
                  i === 18
                    ? 'bg-gradient-primary font-semibold text-white shadow-glow'
                    : i < 5 || i > 28
                      ? 'text-transparent'
                      : 'hover:bg-primary/10 text-foreground'
                }`}
                aria-label={i === 18 ? 'Selected date' : undefined}
              >
                {i >= 5 && i <= 28 ? i - 4 : ''}
              </button>
            ))}
          </div>

          <p className="text-caption mb-3 font-medium text-muted-foreground">Available slots (IST)</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {timeSlots.map((slot, i) => (
              <button
                key={slot}
                type="button"
                className={`min-h-11 rounded-xl border px-3 py-2.5 text-sm font-medium transition-smooth ${
                  i === 1
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-card hover:border-primary/30'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button variant="gradient" size="lg" className="flex-1 rounded-xl" asChild>
            <a
              href={mailto('Book a discovery call')}
              className="inline-flex items-center justify-center gap-2"
            >
              <Video className="h-5 w-5" />
              Confirm via email
            </a>
          </Button>
          <p className="text-caption flex items-center justify-center text-muted-foreground sm:max-w-[200px]">
            Add your Calendly link in <code className="mx-1 rounded bg-muted px-1">constants.ts</code>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookCallPanel;
