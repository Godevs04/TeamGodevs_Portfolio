import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { ProjectFilter } from './caseStudies';
import { filterOptions } from './caseStudies';

type ProjectFiltersProps = {
  active: ProjectFilter;
  onChange: (filter: ProjectFilter) => void;
  counts: Record<ProjectFilter, number>;
};

const ProjectFilters = ({ active, onChange, counts }: ProjectFiltersProps) => {
  return (
    <div
      className="mb-12 flex flex-wrap justify-center gap-2"
      role="tablist"
      aria-label="Filter projects by type"
    >
      {filterOptions.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={cn(
              'relative min-h-[44px] overflow-hidden rounded-full border px-4 py-2 text-xs font-semibold transition-colors duration-300 sm:px-5 sm:text-sm',
              isActive
                ? 'border-green-500/40 text-gray-900 dark:border-green-400/40 dark:text-white'
                : 'border-gray-200 bg-white/80 text-gray-600 hover:border-green-500/30 hover:text-gray-900 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-400 dark:hover:text-gray-200'
            )}
          >
            {isActive && (
              <motion.span
                layoutId="project-filter-pill"
                className="absolute inset-0 bg-green-500/10 dark:bg-green-500/20"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {label}
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[10px] font-bold',
                  isActive
                    ? 'bg-green-500/15 text-green-700 dark:bg-green-500/25 dark:text-emerald-300'
                    : 'bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-500'
                )}
              >
                {counts[id]}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ProjectFilters;
