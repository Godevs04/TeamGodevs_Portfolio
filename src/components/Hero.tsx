import { ArrowRight, Calendar, Play, Shield, Star, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';
import { scrollToSection } from '@/lib/scroll';
import LazyImage from '@/components/ui/lazy-image';
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
        <LazyImage
          src={heroBg}
          alt=""
          priority
          className="h-full w-full scale-105 object-cover"
        />
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
      </div>

      <PageContainer className="relative z-10 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <span className="glass mb-6 inline-flex animate-fade-in items-center gap-2 rounded-full px-4 py-2 text-caption font-medium text-white">
            <span className="h-2 w-2 animate-pulse-glow rounded-full bg-[#10b981]" aria-hidden />
            Now booking Q2 2026
          </span>

          <h1 className="animate-fade-in text-display mb-6 text-white">
            Ship products that
            <span className="mt-2 block bg-gradient-to-r from-[#4ade80] via-[#10b981] to-[#34d399] bg-clip-text text-transparent">
              convert visitors into revenue
            </span>
          </h1>

          <p className="text-body-lg mx-auto mb-10 max-w-xl animate-fade-in text-white/80">
            End-to-end product studio—strategy, design, code, and launch in weeks.
          </p>

          <div className="flex flex-col gap-3 animate-fade-in sm:flex-row sm:justify-center">
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

          <p className="text-caption mt-4 text-white/50">
            Free 30-min call · Reply in 2 hours
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {trustBadges.map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/75 backdrop-blur-sm transition-smooth hover:border-white/20"
              >
                <Icon className="h-3.5 w-3.5 text-[#10b981]" aria-hidden />
                {label}
              </span>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="mt-10 hidden text-white/60 hover:bg-white/10 hover:text-white sm:inline-flex"
            onClick={() => scrollToSection('projects')}
          >
            <Play className="mr-2 h-4 w-4" />
            See case studies
          </Button>
        </div>
      </PageContainer>
    </section>
  );
};

export default Hero;
