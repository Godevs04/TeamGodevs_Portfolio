import { Zap, Award, Headphones, BadgeIndianRupee } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import PageContainer from '@/components/layout/PageContainer';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/SectionHeader';
import SectionCTA from '@/components/layout/SectionCTA';
import Reveal from '@/components/layout/Reveal';
import ProductCard from '@/components/services/ProductCard';
import TechStack from '@/components/services/TechStack';
import { Button } from '@/components/ui/button';
import { offerings, differentiators } from '@/components/services/offerings';
import { scrollToSection } from '@/lib/scroll';

const differentiatorIcons = [Zap, Award, Headphones, BadgeIndianRupee];

const Services = () => {
  return (
    <Section id="services" variant="default" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-mesh opacity-60" aria-hidden />

      <PageContainer className="relative">
        <SectionHeader
          badge="Offerings"
          title="Products that"
          highlight="ship outcomes"
          description="Fixed-scope packages with clear deliverables—bundle or start with one."
        />

        <Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {offerings.map((product) => (
              <ProductCard key={product.title} product={product} />
            ))}
          </div>
        </Reveal>

        <SectionCTA
          title="Not sure which package fits?"
          description="We'll recommend the right stack in a free 30-minute call."
          primaryLabel="Book a free call"
          secondaryLabel="See our process"
          secondaryTarget="process"
        />

        <div className="mt-20 md:mt-24">
          <SectionHeader
            badge="Why us"
            title="Built for"
            highlight="speed & quality"
            className="mb-10 !max-w-2xl"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item, index) => {
              const Icon = differentiatorIcons[index];
              return (
                <Reveal key={item.title} delay={index * 60}>
                  <Card variant="glass" className="group h-full hover-lift border-border/50">
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-smooth group-hover:bg-gradient-primary">
                          <Icon className="h-5 w-5 text-primary group-hover:text-white" aria-hidden />
                        </span>
                        <div className="text-right">
                          <div className="text-h3 text-gradient leading-none">{item.stat}</div>
                          <p className="text-caption text-muted-foreground">{item.statLabel}</p>
                        </div>
                      </div>
                      <h3 className="text-h3 mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </div>

        <Reveal className="mt-20 md:mt-24">
          <SectionHeader
            badge="Stack"
            title="Modern tech,"
            highlight="easy to hire for"
            className="mb-8 !max-w-xl"
          />
          <TechStack />
        </Reveal>

        <Reveal>
          <Card variant="gradient" className="mt-20 overflow-hidden border-primary/20 md:mt-24">
            <CardContent className="relative p-8 text-center md:p-10">
              <p className="text-caption mb-2 font-semibold uppercase tracking-widest text-primary">
                Pricing
              </p>
              <h3 className="text-h2 mb-6">
                From <span className="text-gradient">₹25,000</span> — scoped to your goals
              </h3>
              <div className="mb-8 flex flex-wrap justify-center gap-3 text-sm">
                <span className="rounded-full border border-border bg-background/80 px-4 py-2">
                  MVPs <strong>₹1.5L+</strong>
                </span>
                <span className="rounded-full border border-border bg-background/80 px-4 py-2">
                  SEO <strong>₹25K/mo</strong>
                </span>
                <span className="rounded-full border border-border bg-background/80 px-4 py-2">
                  Design <strong>₹40K+</strong>
                </span>
              </div>
              <Button variant="cta" size="lg" onClick={() => scrollToSection('contact')}>
                Get a custom quote
              </Button>
            </CardContent>
          </Card>
        </Reveal>
      </PageContainer>
    </Section>
  );
};

export default Services;
