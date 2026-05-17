import BrandLogo from '@/components/BrandLogo';
import PageContainer from '@/components/layout/PageContainer';
import Section from '@/components/layout/Section';

const BrandSection = () => {
  return (
    <Section variant="muted" className="relative overflow-hidden border-y border-border/60 !py-16 md:!py-20">
      <div
        className="pointer-events-none absolute -left-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl"
        aria-hidden
      />

      <PageContainer className="relative">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 md:flex-row md:items-center md:gap-16">
          <div className="shrink-0 animate-fade-in">
            <BrandLogo size="lg" />
          </div>

          <div className="animate-fade-in text-center md:text-left stagger-1">
            <p className="badge-pill mb-4 border-0 bg-transparent p-0 text-primary">
              Who we are
            </p>
            <h2 className="text-h2 mb-4">
              Team<span className="text-gradient">Go</span>Devs
            </h2>
            <p className="text-body-lg text-muted-foreground">
              We are a product-focused studio building web apps, mobile experiences, and digital
              brands for growing businesses. From strategy to launch, we partner with you to ship
              solutions that look professional and perform in the real world.
            </p>
            <p className="text-caption mt-6 font-semibold uppercase tracking-[0.15em] text-muted-foreground">
              Building solutions · Delivering impact
            </p>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
};

export default BrandSection;
