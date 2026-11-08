import { Award, BadgeIndianRupee, Headphones, Zap, type LucideIcon } from 'lucide-react';
import Reveal from '@/components/layout/Reveal';
import DifferentiatorCard from '@/components/services/DifferentiatorCard';
import { differentiators } from '@/components/services/offerings';

const differentiatorIcons: LucideIcon[] = [Zap, Award, Headphones, BadgeIndianRupee];

const WhyUsSection = () => {
  return (
    <section
      className="relative mt-20 overflow-hidden rounded-3xl md:mt-24"
      aria-labelledby="why-us-heading"
    >
      {/* Premium gradient backdrop */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white via-white to-green-50/90 dark:from-background dark:via-background dark:to-emerald-950/25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full bg-green-400/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl"
        aria-hidden
      />

      <div className="relative px-4 py-14 sm:px-8 sm:py-16 md:py-20">
        <Reveal>
          <header className="mx-auto mb-12 max-w-3xl text-center md:mb-14">
            <span className="mb-5 inline-flex rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-green-700 dark:border-primary/25 dark:bg-primary/10 dark:text-primary">
              Why us
            </span>
            <h2
              id="why-us-heading"
              className="text-3xl font-bold tracking-tight md:text-5xl md:leading-[1.1]"
            >
              <span className="text-gray-800 dark:text-foreground">Built for </span>
              <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">
                speed &amp; quality
              </span>
            </h2>
          </header>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item, index) => {
            const Icon = differentiatorIcons[index];
            return (
              <Reveal key={item.title} delay={index * 90} className="h-full">
                <DifferentiatorCard item={item} icon={Icon} />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
