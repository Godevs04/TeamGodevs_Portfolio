import { BarChart3, Layers, Sparkles, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TestimonialMetric } from './data';

const ICONS: LucideIcon[] = [BarChart3, Sparkles, Layers];

type ImpactStatsRowProps = {
  metrics: TestimonialMetric[];
  className?: string;
};

const ImpactStatsRow = ({ metrics, className }: ImpactStatsRowProps) => {
  return (
    <div
      className={cn('testimonial-impact-row w-full min-w-0', className)}
      aria-label="Project impact highlights"
    >
      {metrics.map((metric, index) => {
        const Icon = ICONS[index % ICONS.length];
        const isLast = index === metrics.length - 1;
        return (
          <div
            key={metric.label}
            className={cn(
              'testimonial-impact-cell flex min-w-0 flex-1 flex-col items-center justify-center gap-1.5 px-2 py-5 text-center sm:px-4 sm:py-6',
              !isLast && 'border-r border-gray-200/60 dark:border-white/[0.06]'
            )}
          >
            <Icon className="h-4 w-4 shrink-0 text-emerald-600/80 dark:text-emerald-400/70" aria-hidden />
            <p className="text-base font-semibold leading-none tracking-tight text-gray-900 dark:text-white sm:text-lg">
              {metric.value}
            </p>
            <p className="text-[10px] font-medium uppercase leading-normal tracking-wide text-gray-500 dark:text-gray-500">
              {metric.label}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ImpactStatsRow;
