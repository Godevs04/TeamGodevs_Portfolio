import PageContainer from '@/components/layout/PageContainer';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/SectionHeader';
import SectionCTA from '@/components/layout/SectionCTA';
import Reveal from '@/components/layout/Reveal';
import { useInView } from '@/hooks/use-in-view';
import { useAnimatedCounter } from '@/hooks/use-animated-counter';

type MetricProps = {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  benefit: string;
};

const Metric = ({ end, suffix = '', prefix = '', label, benefit }: MetricProps) => {
  const { ref, inView } = useInView(0.25);
  const count = useAnimatedCounter(inView, { end, duration: 2200 });

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-border/60 bg-card p-6 text-center shadow-soft transition-smooth hover-lift md:p-8"
    >
      <div className="text-h2 text-gradient mb-1">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="text-h3 mb-1">{label}</div>
      <p className="text-caption text-muted-foreground">{benefit}</p>
    </div>
  );
};

const metrics: MetricProps[] = [
  { end: 300, suffix: '%', label: 'Traffic growth', benefit: 'Avg. after SEO sprints' },
  { end: 2, suffix: '×', label: 'Conversion lift', benefit: 'Median funnel redesign' },
  { end: 50, suffix: '+', label: 'Products shipped', benefit: 'Web & mobile in production' },
  { end: 98, suffix: '%', label: 'Retention', benefit: 'Clients return for v2' },
];

const Results = () => {
  return (
    <Section id="results">
      <PageContainer>
        <SectionHeader
          badge="Results"
          title="Outcomes"
          highlight="not outputs"
          description="Pipeline, revenue, and retention—the metrics founders actually care about."
        />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 70}>
              <Metric {...metric} />
            </Reveal>
          ))}
        </div>

        <SectionCTA
          title="Want numbers like these?"
          primaryLabel="Read client stories"
          primaryTarget="testimonials"
          secondaryLabel="Start your project"
          secondaryTarget="contact"
        />
      </PageContainer>
    </Section>
  );
};

export default Results;
