import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Differentiator = {
  title: string;
  description: string;
  stat: string;
  statLabel: string;
};

type DifferentiatorCardProps = {
  item: Differentiator;
  icon: LucideIcon;
  className?: string;
};

const DifferentiatorCard = ({ item, icon: Icon, className }: DifferentiatorCardProps) => {
  return (
    <article
      className={cn(
        'group flex h-full flex-col gap-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm',
        'transition-all duration-300',
        'hover:-translate-y-1 hover:border-green-400 hover:shadow-lg',
        'dark:border-border dark:bg-card dark:hover:border-primary',
        className
      )}
    >
      {/* Icon + stat badge */}
      <div className="flex items-center gap-3">
        <span
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100',
            'transition-colors duration-300',
            'group-hover:bg-green-200 dark:bg-primary/15 dark:group-hover:bg-primary/25'
          )}
        >
          <Icon
            className={cn(
              'h-5 w-5 text-green-600 transition-colors duration-300',
              'group-hover:text-green-800 dark:text-primary dark:group-hover:text-primary'
            )}
            aria-hidden
          />
        </span>
        <div className="inline-flex min-w-0 flex-wrap items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 dark:bg-primary/10">
          <span className="text-sm font-bold tabular-nums text-green-700 dark:text-primary">
            {item.stat}
          </span>
          <span className="text-xs text-green-600/90 dark:text-primary/80">{item.statLabel}</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold leading-snug text-gray-900 dark:text-foreground">
        {item.title}
      </h3>

      <p className="text-sm leading-relaxed text-gray-500 dark:text-muted-foreground">
        {item.description}
      </p>
    </article>
  );
};

export default DifferentiatorCard;
