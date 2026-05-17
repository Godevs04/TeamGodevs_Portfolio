import { ArrowRight, Calendar, Play, Shield, Star, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';
import { scrollToSection } from '@/lib/scroll';
import heroBg from '@/assets/hero-bg.jpg';

const trustBadges = [
  { icon: Shield, label: '50+ clients' },
  { icon: Star, label: '4.9★ rated' },
  { icon: Zap, label: '2-week sprints' },
  { icon: Clock, label: '2hr response' },
];

const Hero = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        <img src={heroBg} alt="" className="h-full w-full scale-105 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#052e16]/90 via-[#0f172a]/85 to-[#0f172a]/95" />
        <div
          className="hero-glow absolute -left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-[#16a34a]/30 blur-[120px]"
          aria-hidden
        />
        <div
          className="hero-glow absolute -right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-[#10b981]/25 blur-[100px]"
          style={{ animationDelay: '2s' }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDQyYzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnoiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIi8+PC9nPjwvc3ZnPg==')] opacity-40" />
      </div>

      <PageContainer className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <span className="glass mb-6 inline-flex animate-fade-in items-center gap-2 rounded-full px-4 py-2 text-caption font-medium text-white">
            <span className="h-2 w-2 animate-pulse-glow rounded-full bg-[#10b981]" aria-hidden />
            Now booking Q2 2026 projects
          </span>

          <h1 className="animate-fade-in text-display mb-6 text-white" style={{ animationDelay: '0.05s' }}>
            Ship products that
            <span className="mt-2 block bg-gradient-to-r from-[#4ade80] via-[#10b981] to-[#34d399] bg-clip-text text-transparent">
              convert visitors into revenue
            </span>
          </h1>

          <p
            className="text-body-lg mx-auto mb-10 max-w-2xl animate-fade-in text-white/80"
            style={{ animationDelay: '0.1s' }}
          >
            TeamGoDevs is your end-to-end product studio—strategy, design, engineering, and launch.
            We help startups and SMBs go from idea to live in weeks, not months.
          </p>

          <div
            className="flex flex-col items-stretch justify-center gap-4 animate-fade-in sm:flex-row sm:items-center"
            style={{ animationDelay: '0.15s' }}
          >
            <Button
              onClick={() => scrollToSection('contact')}
              size="lg"
              className="hover-lift rounded-full bg-white px-8 text-[#16a34a] shadow-glow hover:bg-white/95"
            >
              Start your project
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              variant="outline"
              size="lg"
              className="hover-lift rounded-full border-white/30 bg-white/5 px-8 text-white backdrop-blur-sm hover:border-[#10b981]/50 hover:bg-white/10"
            >
              <Calendar className="h-5 w-5" />
              Book a call
            </Button>
            <Button
              onClick={() => scrollToSection('projects')}
              variant="ghost"
              size="lg"
              className="rounded-full text-white/80 hover:bg-white/10 hover:text-white sm:hidden"
            >
              <Play className="h-5 w-5" />
              View work
            </Button>
          </div>

          <p
            className="text-caption mt-4 animate-fade-in text-white/50"
            style={{ animationDelay: '0.2s' }}
          >
            Free 30-min discovery call · No commitment · We reply within 2 hours
          </p>

          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-in"
            style={{ animationDelay: '0.25s' }}
          >
            {trustBadges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-sm"
              >
                <Icon className="h-3.5 w-3.5 text-[#10b981]" aria-hidden />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-16 hidden justify-center sm:flex">
            <Button
              onClick={() => scrollToSection('projects')}
              variant="ghost"
              size="sm"
              className="text-white/60 hover:text-white"
            >
              <Play className="mr-2 h-4 w-4" />
              See case studies
            </Button>
          </div>
        </div>
      </PageContainer>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce" aria-hidden>
        <div className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30">
          <div className="mt-2 h-2 w-1 animate-pulse rounded-full bg-[#10b981]" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
