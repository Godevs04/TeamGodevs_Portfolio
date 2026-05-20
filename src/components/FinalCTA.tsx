import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';
import { scrollToSection } from '@/lib/scroll';
import { cn } from '@/lib/utils';
import { usePostHog } from '@posthog/react';

const FinalCTA = () => {
  const posthog = usePostHog();

  const handleCtaClick = (label: string) => {
    posthog?.capture('final_cta_clicked', { cta_label: label, section: 'final_cta' });
    scrollToSection('contact');
  };

  return (
    <section
      id="cta"
      className="relative overflow-hidden border-y border-border/60 py-14 sm:py-20 md:py-24"
      aria-labelledby="final-cta-heading"
    >
      <div
        className={cn(
          'absolute inset-0',
          'bg-gradient-to-br from-green-50 via-background to-background',
          'dark:from-[#052e16] dark:via-[#0f172a] dark:to-[#0f172a]'
        )}
        aria-hidden
      />
      <div
        className={cn(
          'absolute inset-0',
          'bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,hsl(142_76%_36%_/_0.12),transparent)]',
          'dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(22,163,74,0.35),transparent)]'
        )}
        aria-hidden
      />

      <PageContainer className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-caption mb-3 font-semibold uppercase tracking-widest text-primary">
            Next step
          </p>
          <h2
            id="final-cta-heading"
            className="text-h1 mb-5 text-foreground dark:text-white"
          >
            Turn your idea into revenue
          </h2>
          <p className="text-body-lg mb-8 text-muted-foreground dark:text-white/70">
            50+ teams shipped with us. Get a plan in 48 hours—not a sales deck.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              variant="gradient"
              size="lg"
              className="hover-lift w-full sm:w-auto dark:hidden"
              onClick={() => handleCtaClick('start_your_project')}
            >
              Start your project
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover-lift w-full border-border bg-card/80 sm:w-auto dark:hidden"
              onClick={() => handleCtaClick('book_a_call')}
            >
              <Calendar className="h-5 w-5" />
              Book a call
            </Button>
            <Button
              variant="ctaWhite"
              size="lg"
              className="hover-lift hidden w-full sm:w-auto dark:inline-flex"
              onClick={() => handleCtaClick('start_your_project')}
            >
              Start your project
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              variant="ctaGhost"
              size="lg"
              className="hover-lift hidden w-full sm:w-auto dark:inline-flex"
              onClick={() => handleCtaClick('book_a_call')}
            >
              <Calendar className="h-5 w-5" />
              Book a call
            </Button>
          </div>

          <p className="text-caption mt-5 text-muted-foreground dark:text-white/45">
            Kickoff in ~5 days · Fixed scope · NDA available
          </p>
        </div>
      </PageContainer>
    </section>
  );
};

export default FinalCTA;
