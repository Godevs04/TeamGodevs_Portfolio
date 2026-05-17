import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';
import { scrollToSection } from '@/lib/scroll';

const FinalCTA = () => {
  return (
    <section
      id="cta"
      className="relative overflow-hidden py-20 md:py-28"
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
      <div
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDQyYzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA0Ii8+PC9nPjwvc3ZnPg==')] opacity-60"
        aria-hidden
      />

      <PageContainer className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-caption mb-4 font-semibold uppercase tracking-widest text-[#10b981]">
            Ready when you are
          </p>
          <h2 id="final-cta-heading" className="text-h1 mb-6 text-white">
            Turn your idea into a product customers{' '}
            <span className="bg-gradient-to-r from-[#4ade80] to-[#10b981] bg-clip-text text-transparent">
              actually pay for
            </span>
          </h2>
          <p className="text-body-lg mb-10 text-white/70">
            Join 50+ teams who shipped faster with TeamGoDevs. Tell us what you&apos;re building—we&apos;ll
            reply with a plan, not a pitch deck.
          </p>

          <div className="flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Button
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="hover-lift rounded-full bg-white px-10 text-[#16a34a] shadow-glow hover:bg-white/95"
            >
              Start your project
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('contact')}
              className="hover-lift rounded-full border-white/25 bg-white/5 px-10 text-white hover:bg-white/10"
            >
              <Calendar className="h-5 w-5" />
              Book a call
            </Button>
          </div>

          <p className="text-caption mt-6 text-white/45">
            Average kickoff in 5 business days · Fixed-scope or retainer · NDA on request
          </p>
        </div>
      </PageContainer>
    </section>
  );
};

export default FinalCTA;
