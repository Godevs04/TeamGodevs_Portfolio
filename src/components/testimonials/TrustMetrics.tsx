import { useInView } from '@/hooks/use-in-view';
import { useAnimatedCounter } from '@/hooks/use-animated-counter';
import { aggregateMetrics } from './data';

type MetricCellProps = {
  end: number;
  suffix: string;
  label: string;
  display?: string;
  decimals?: number;
  inView: boolean;
};

const MetricCell = ({ end, suffix, label, display, decimals = 0, inView }: MetricCellProps) => {
  const value = useAnimatedCounter(inView, { end, duration: 2000, decimals });

  return (
    <div className="flex min-w-0 flex-col items-center justify-center px-3 py-5 text-center sm:px-4 sm:py-6">
      <p className="text-lg font-semibold leading-tight tracking-tight text-gray-900 dark:text-white sm:text-xl">
        {display ? (
          <span>{display}</span>
        ) : (
          <>
            {decimals > 0 ? value.toFixed(decimals) : value}
            <span className="text-emerald-600 dark:text-emerald-400">{suffix}</span>
          </>
        )}
      </p>
      <p className="mt-1.5 max-w-[9rem] text-[10px] font-medium uppercase leading-snug tracking-wide text-gray-500 dark:text-gray-500 sm:max-w-none">
        {label}
      </p>
    </div>
  );
};

const TrustMetrics = () => {
  const { ref, inView } = useInView(0.2);

  return (
    <div
      ref={ref}
      className="testimonial-trust-row w-full min-w-0 max-w-full grid grid-cols-2 divide-x divide-y divide-gray-200/60 sm:grid-cols-4 sm:divide-y-0 dark:divide-white/[0.06]"
    >
      {aggregateMetrics.map((metric) => (
        <MetricCell
          key={metric.label}
          end={metric.end}
          suffix={metric.suffix}
          label={metric.label}
          display={metric.display}
          decimals={metric.decimals ?? 0}
          inView={inView}
        />
      ))}
    </div>
  );
};

export default TrustMetrics;
