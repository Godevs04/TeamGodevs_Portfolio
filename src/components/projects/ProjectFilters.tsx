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
      className="project-segmented mx-auto mb-12 flex max-w-full gap-1 overflow-x-auto p-1.5 [-ms-overflow-style:none] [scrollbar-width:none] md:mb-14 md:flex-wrap md:justify-center md:overflow-visible [&::-webkit-scrollbar]:hidden"
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
              'project-segment-item relative min-h-[40px] shrink-0 rounded-full px-3.5 py-2 text-xs font-medium transition-colors duration-500 sm:px-4 sm:text-sm',
              isActive ? 'project-segment-item--active text-gray-900 dark:text-white' : 'project-segment-item--idle text-gray-600 dark:text-gray-400'
            )}
          >
            {isActive && (
              <motion.span
                layoutId="project-segment-indicator"
                className="project-segment-indicator absolute inset-0 rounded-full"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {label}
              <span
                className={cn(
                  'rounded-md px-1.5 py-0.5 text-[10px] font-semibold tabular-nums',
                  isActive ? 'project-segment-count--active' : 'project-segment-count'
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
