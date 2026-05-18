import { ArrowRight, Calendar, Clock, Rocket, Shield, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageContainer from '@/components/layout/PageContainer';
import HeroVisual from '@/components/hero/HeroVisual';
import { scrollToSection } from '@/lib/scroll';
import { cn } from '@/lib/utils';

const trustItems = [
  { icon: Shield, label: '50+ clients' },
  { icon: Star, label: '4.9★ rating' },
  { icon: Zap, label: '2-week sprint cycles' },
  { icon: Clock, label: '2hr response' },
];

const stagger = [
  'hero-stagger-1',
  'hero-stagger-2',
  'hero-stagger-3',
  'hero-stagger-4',
  'hero-stagger-5',
  'hero-stagger-6',
  'hero-stagger-7',
];

const Hero = () => {
  return (
    <section
      id="home"
      className="hero-premium relative flex min-h-[100dvh] items-center overflow-hidden border-b border-border/60 pt-20"
    >
      <div className="hero-base-bg absolute inset-0 z-0" aria-hidden />
      <div className="hero-radial-glow pointer-events-none absolute inset-0 z-0" aria-hidden />
      <div className="hero-radial-glow-right pointer-events-none absolute inset-0 z-0" aria-hidden />
      <div className="hero-blob hero-blob-1 pointer-events-none absolute z-0" aria-hidden />
      <div className="hero-blob hero-blob-2 pointer-events-none absolute z-0" aria-hidden />
      <div className="hero-blob hero-blob-3 pointer-events-none absolute z-0" aria-hidden />
      <div className="hero-noise pointer-events-none absolute inset-0 z-[1]" aria-hidden />

      <PageContainer className="relative z-10 py-20 sm:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:text-left">
            <span
              className={cn(
                'mb-6 inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/90 px-4 py-2 text-sm text-muted-foreground shadow-soft backdrop-blur-md transition-all duration-300',
                'dark:border-white/10 dark:bg-white/5 dark:text-gray-300',
                'hero-fade-in',
                stagger[0]
              )}
            >
              <Rocket className="h-4 w-4 text-primary" aria-hidden />
              Now booking Q2 2026
            </span>

            <h1
              className={cn(
                'hero-fade-in text-4xl font-bold leading-[1.12] tracking-tighter text-foreground dark:text-white md:text-5xl lg:text-6xl',
                stagger[1]
              )}
            >
              Build products that turn users into{' '}
              <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
                revenue
              </span>
            </h1>

            <p
              className={cn(
                'mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg md:leading-[1.75] lg:mx-0',
                'dark:text-gray-400',
                'hero-fade-in',
                stagger[2]
              )}
            >
              We design, build, and launch high-converting web and mobile products in weeks — not
              months.
            </p>

            <div
              className={cn(
                'mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start',
                'hero-fade-in',
                stagger[3]
              )}
            >
              <Button
                size="lg"
                className={cn(
                  'hero-cta-primary w-full border-0 transition-all duration-300 hover:scale-105 hover:brightness-110 sm:w-auto',
                  'min-h-[48px] px-8'
                )}
                onClick={() => scrollToSection('contact')}
              >
                Start your project
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                className={cn(
                  'hero-cta-glass w-full transition-all duration-300 hover:scale-105 sm:w-auto',
                  'min-h-[48px] px-8'
                )}
                onClick={() => scrollToSection('contact')}
              >
                <Calendar className="h-5 w-5" />
                Book a call
              </Button>
            </div>

            <p
              className={cn(
                'mt-4 text-sm text-muted-foreground transition-colors duration-300 dark:text-gray-500',
                'hero-fade-in',
                stagger[4]
              )}
            >
              Free 30-min call · Reply in 2 hours
            </p>

            <div
              className={cn(
                'mt-10 flex flex-wrap justify-center gap-3 lg:justify-start',
                'hero-fade-in',
                stagger[5]
              )}
            >
              {trustItems.map(({ icon: Icon, label }) => (
                <span key={label} className="hero-trust-pill">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                  {label}
                </span>
              ))}
            </div>
          </div>

          <div className={cn('hero-fade-in', stagger[6], 'lg:justify-self-end')}>
            <HeroVisual />
          </div>
        </div>
      </PageContainer>
    </section>
  );
};

export default Hero;
