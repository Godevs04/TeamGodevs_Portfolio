import { Zap, Award, Headphones, BadgeIndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PageContainer from '@/components/layout/PageContainer';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/SectionHeader';
import ProductCard from '@/components/services/ProductCard';
import TechStack from '@/components/services/TechStack';
import { offerings, differentiators } from '@/components/services/offerings';
import { scrollToSection } from '@/lib/scroll';

const differentiatorIcons = [Zap, Award, Headphones, BadgeIndianRupee];

const Services = () => {
  return (
    <Section id="services" variant="default" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 bg-mesh opacity-60"
        aria-hidden
      />

      <PageContainer className="relative">
        <SectionHeader
          badge="Product offerings"
          title="Pick a product."
          highlight="Scale when you're ready."
          description="Each offering is a focused package—clear scope, clear outcomes, and a team that ships. Bundle multiple or start with one."
        />

        {/* Product grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {offerings.map((product) => (
            <ProductCard key={product.title} product={product} />
          ))}
        </div>

        {/* What makes us different */}
        <div className="mt-24 md:mt-28">
          <SectionHeader
            badge="Why TeamGoDevs"
            title="What makes us"
            highlight="different"
            description="We're not a generic agency. We're a product studio built for founders who need speed, quality, and a partner who stays."
            className="mb-12"
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((item, index) => {
              const Icon = differentiatorIcons[index];
              return (
                <Card
                  key={item.title}
                  variant="glass"
                  className="group hover-lift border-border/50 hover:border-primary/25"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-gradient-primary">
                        <Icon className="h-5 w-5 text-primary group-hover:text-white" aria-hidden />
                      </span>
                      <div className="text-right">
                        <div className="text-h3 text-gradient leading-none">{item.stat}</div>
                        <div className="text-caption text-muted-foreground">{item.statLabel}</div>
                      </div>
                    </div>
                    <h3 className="text-h3 mb-2">{item.title}</h3>
                    <p className="text-body text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Tech stack */}
        <div className="mt-24 md:mt-28">
          <SectionHeader
            badge="Tech stack"
            title="Built with tools"
            highlight="you can hire for"
            description="Modern, battle-tested technologies—so your product is maintainable long after we hand off."
            className="mb-10"
          />
          <TechStack />
        </div>

        {/* Pricing hint */}
        <Card
          variant="gradient"
          className="mt-24 overflow-hidden border-primary/20 md:mt-28"
        >
          <CardContent className="relative p-8 text-center md:p-12">
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
              aria-hidden
            />
            <p className="text-caption mb-3 font-semibold uppercase tracking-widest text-primary">
              Transparent pricing
            </p>
            <h3 className="text-h2 mb-4">
              Projects starting from{' '}
              <span className="text-gradient">₹25,000</span>
            </h3>
            <p className="text-body-lg mx-auto mb-8 max-w-2xl text-muted-foreground">
              Every build is scoped to your goals—not a one-size-fits-all rate card. Share your
              requirements and we&apos;ll send a fixed quote within 48 hours. No surprises, no
              hourly black holes.
            </p>
            <div className="mb-8 flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <span className="rounded-full border border-border bg-background/80 px-4 py-2">
                MVPs from <strong className="text-foreground">₹1.5L</strong>
              </span>
              <span className="rounded-full border border-border bg-background/80 px-4 py-2">
                SEO from <strong className="text-foreground">₹25K/mo</strong>
              </span>
              <span className="rounded-full border border-border bg-background/80 px-4 py-2">
                Design from <strong className="text-foreground">₹40K</strong>
              </span>
            </div>
            <Button
              variant="gradient"
              size="lg"
              className="rounded-full"
              onClick={() => scrollToSection('contact')}
            >
              Get a custom quote
            </Button>
          </CardContent>
        </Card>
      </PageContainer>
    </Section>
  );
};

export default Services;
