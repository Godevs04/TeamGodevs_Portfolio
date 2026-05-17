import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';
import { scrollToSection } from '@/lib/scroll';

const FinalCTA = () => {
  return (
    <section
      id="cta"
      className="relative overflow-hidden py-20 md:py-24"
      aria-labelledby="final-cta-heading"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#052e16] via-[#0f172a] to-[#0f172a]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(22,163,74,0.35),transparent)]"
        aria-hidden
      />

      <PageContainer className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-caption mb-3 font-semibold uppercase tracking-widest text-[#10b981]">
            Next step
          </p>
          <h2 id="final-cta-heading" className="text-h1 mb-5 text-white">
            Turn your idea into revenue
          </h2>
          <p className="text-body-lg mb-8 text-white/70">
            50+ teams shipped with us. Get a plan in 48 hours—not a sales deck.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              variant="ctaWhite"
              size="lg"
              className="hover-lift w-full sm:w-auto"
              onClick={() => scrollToSection('contact')}
            >
              Start your project
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              variant="ctaGhost"
              size="lg"
              className="hover-lift w-full sm:w-auto"
              onClick={() => scrollToSection('contact')}
            >
              <Calendar className="h-5 w-5" />
              Book a call
            </Button>
          </div>

          <p className="text-caption mt-5 text-white/45">
            Kickoff in ~5 days · Fixed scope · NDA available
          </p>
        </div>
      </PageContainer>
    </section>
  );
};

export default FinalCTA;
