import { ArrowRight, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { BeforeAfter } from './data';
import { cn } from '@/lib/utils';

type BeforeAfterPanelProps = {
  data: BeforeAfter;
  className?: string;
};

const BeforeAfterPanel = ({ data, className }: BeforeAfterPanelProps) => {
  return (
    <Card variant="elevated" className={cn('overflow-hidden', className)}>
      <CardContent className="p-5 sm:p-6 md:p-8">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <p className="text-caption font-semibold uppercase tracking-widest text-muted-foreground">
            Before vs after
          </p>
          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-caption font-bold text-primary">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden />
            {data.growth}
          </span>
        </div>

        <p className="text-body mb-6 font-medium text-foreground">{data.metric}</p>

        <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-[1fr_auto_1fr] sm:gap-4">
          <div className="rounded-xl border border-border/80 bg-muted/50 p-4 text-center transition-smooth">
            <p className="text-caption mb-1 text-muted-foreground">Before</p>
            <p className="text-lg font-semibold text-muted-foreground line-through decoration-destructive/40 sm:text-h3">
              {data.before}
            </p>
          </div>

          <ArrowRight className="mx-auto h-5 w-5 shrink-0 rotate-90 text-primary sm:rotate-0" aria-hidden />

          <div className="rounded-xl border border-primary/25 bg-primary/5 p-4 text-center shadow-soft">
            <p className="text-caption mb-1 text-primary">After</p>
            <p className="text-lg font-bold text-gradient sm:text-h3">{data.after}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BeforeAfterPanel;
