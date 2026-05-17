import PageContainer from '@/components/layout/PageContainer';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/SectionHeader';
import { useInView } from '@/hooks/use-in-view';
import { useAnimatedCounter } from '@/hooks/use-animated-counter';

type MetricProps = {
  end: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
};

const Metric = ({ end, suffix = '', prefix = '', label, description }: MetricProps) => {
  const { ref, inView } = useInView(0.25);
  const count = useAnimatedCounter(inView, { end, duration: 2200 });

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-border/60 bg-card p-8 text-center shadow-soft transition-smooth hover-lift"
    >
      <div className="text-display text-gradient mb-2">
        {prefix}
        {count}
        {suffix}
      </div>
      <div className="text-h3 mb-2">{label}</div>
      <p className="text-caption text-muted-foreground">{description}</p>
    </div>
  );
};

const metrics: MetricProps[] = [
  {
    end: 300,
    suffix: '%',
    label: 'Traffic growth',
    description: 'Average organic increase after SEO + content sprints',
  },
  {
    end: 2,
    suffix: '×',
    label: 'Conversion lift',
    description: 'Median uplift from UX redesigns on key funnels',
  },
  {
    end: 50,
    suffix: '+',
    label: 'Products shipped',
    description: 'Web apps, mobile apps, and platforms in production',
  },
  {
    end: 98,
    suffix: '%',
    label: 'Client retention',
    description: 'Teams that come back for v2, growth, and support',
  },
];

const Results = () => {
  return (
    <Section id="results">
      <PageContainer>
        <SectionHeader
          badge="Results"
          title="Numbers that"
          highlight="move the needle"
          description="We measure what matters—pipeline, revenue, and retention—not vanity metrics."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {metrics.map((metric) => (
            <Metric key={metric.label} {...metric} />
          ))}
        </div>
      </PageContainer>
    </Section>
  );
};

export default Results;
