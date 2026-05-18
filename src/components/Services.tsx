import { Card, CardContent } from '@/components/ui/card';
import PageContainer from '@/components/layout/PageContainer';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/SectionHeader';
import SectionCTA from '@/components/layout/SectionCTA';
import Reveal from '@/components/layout/Reveal';
import ProductCard from '@/components/services/ProductCard';
import WhyUsSection from '@/components/services/WhyUsSection';
import TechStack from '@/components/services/TechStack';
import { Button } from '@/components/ui/button';
import { offerings } from '@/components/services/offerings';
import { scrollToSection } from '@/lib/scroll';

const Services = () => {
  return (
    <Section id="services" variant="default" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-2/3 bg-mesh opacity-40"
        aria-hidden
      />

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

        <WhyUsSection />

        <Reveal className="mt-20 md:mt-24">
          <SectionHeader
            badge="Stack"
            title="Modern tech,"
            highlight="easy to hire for"
            align="center"
            className="mb-8"
          />
          <TechStack className="mx-auto max-w-5xl" />
        </Reveal>

        <Reveal>
          <Card variant="gradient" className="mt-20 overflow-hidden border-primary/20 md:mt-24">
            <CardContent className="relative p-8 text-center md:p-10">
              <p className="text-caption mb-2 font-semibold uppercase tracking-widest text-primary">
                Pricing
              </p>
              <h3 className="text-h2 mb-6">
                From <span className="text-gradient">₹20,000</span> — scoped to your goals
              </h3>
              <div className="mb-8 flex flex-wrap justify-center gap-3 text-sm">
                <span className="rounded-full border border-border bg-background/80 px-4 py-2">
                  MVPs <strong>₹40,000+</strong>
                </span>
                <span className="rounded-full border border-border bg-background/80 px-4 py-2">
                  SEO <strong>₹5,000/mo</strong>
                </span>
                <span className="rounded-full border border-border bg-background/80 px-4 py-2">
                  Design <strong>₹10,000</strong>
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
