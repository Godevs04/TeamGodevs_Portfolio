import PageContainer from '@/components/layout/PageContainer';
import { Building2 } from 'lucide-react';

const clients = [
  'LP Future',
  'NaturalWaves',
  'The Whiteberry',
  'Taatom',
  'Streamora',
  'HealthFirst',
  'EcoCommerce',
  'TechStart',
  'Fiverr',
  'Upwork',
  'BudgetBoy',
];

const LogoStrip = () => (
  <div className="marquee-mask overflow-hidden">
    <div className="marquee-track gap-8 px-4">
      {[...clients, ...clients].map((name, i) => (
        <div
          key={`${name}-${i}`}
          className="flex shrink-0 items-center gap-2 rounded-xl border border-border/60 bg-card px-6 py-3 shadow-soft"
        >
          <Building2 className="h-4 w-4 text-primary" aria-hidden />
          <span className="whitespace-nowrap text-sm font-semibold text-foreground">{name}</span>
        </div>
      ))}
    </div>
  </div>
);

const SocialProof = () => {
  return (
    <section className="border-y border-border/60 bg-muted/30 py-12 md:py-14" aria-label="Trusted by clients">
      <PageContainer>
        <p className="text-caption mb-8 text-center font-semibold uppercase tracking-widest text-muted-foreground">
          Trusted by <span className="text-primary">50+ companies</span> worldwide
        </p>
        <LogoStrip />
      </PageContainer>
    </section>
  );
};

export default SocialProof;
