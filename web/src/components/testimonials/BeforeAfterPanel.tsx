import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BeforeAfter } from './data';

type BeforeAfterPanelProps = {
  data: BeforeAfter;
  className?: string;
};

const BeforeAfterPanel = ({ data, className }: BeforeAfterPanelProps) => {
  return (
    <div className={cn('testimonial-transform-card flex h-full flex-col', className)}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-500">
            Transformation
          </p>
          <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">{data.metric}</p>
        </div>
        <span className="testimonial-impact-pill shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-400/90">
          {data.growth}
        </span>
      </div>

      <div className="flex flex-1 flex-col items-stretch justify-center gap-3">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
          <div className="testimonial-before-box rounded-2xl px-3 py-4 text-center sm:px-4 sm:py-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-red-600/70 dark:text-red-400/70">
              Before
            </p>
            <p className="mt-2 text-sm font-semibold leading-snug text-gray-600 dark:text-gray-400">
              {data.before}
            </p>
          </div>

          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/10"
            aria-hidden
          >
            <ArrowRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </motion.div>

          <div className="testimonial-after-box rounded-2xl px-3 py-4 text-center sm:px-4 sm:py-5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600/80 dark:text-emerald-400/80">
              After
            </p>
            <p className="mt-2 text-sm font-semibold leading-snug text-gray-900 dark:text-white">
              {data.after}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterPanel;
