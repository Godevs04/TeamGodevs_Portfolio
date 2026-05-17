import { useInView } from '@/hooks/use-in-view';
import { useAnimatedCounter } from '@/hooks/use-animated-counter';
import { aggregateMetrics } from './data';

type MetricCardProps = {
  end: number;
  suffix: string;
  label: string;
  decimals?: number;
  inView: boolean;
};

const MetricCard = ({ end, suffix, label, decimals = 0, inView }: MetricCardProps) => {
  const value = useAnimatedCounter(inView, { end, duration: 2000, decimals });

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-6 text-center shadow-soft transition-smooth hover-lift">
      <p className="text-h2 text-gradient mb-1">
        {decimals > 0 ? value.toFixed(decimals) : value}
        {suffix}
      </p>
      <p className="text-caption text-muted-foreground">{label}</p>
    </div>
  );
};

const TrustMetrics = () => {
  const { ref, inView } = useInView(0.2);

  return (
    <div ref={ref} className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:mt-20">
      {aggregateMetrics.map((metric) => (
        <MetricCard
          key={metric.label}
          end={metric.end}
          suffix={metric.suffix}
          label={metric.label}
          decimals={metric.decimals ?? 0}
          inView={inView}
        />
      ))}
    </div>
  );
};

export default TrustMetrics;
