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
      className="mb-10 flex flex-wrap justify-center gap-2"
      role="tablist"
      aria-label="Filter projects by type"
    >
      {filterOptions.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={active === id}
          onClick={() => onChange(id)}
          className={cn(
            'min-h-[44px] rounded-full border px-5 py-2 text-sm font-medium transition-smooth focus-visible:ring-2 focus-visible:ring-ring',
            active === id
              ? 'border-primary bg-gradient-primary text-white shadow-glow'
              : 'border-border bg-card text-muted-foreground hover:border-primary/30 hover:bg-muted/50 hover:text-foreground'
          )}
        >
          {label}
          <span
            className={cn(
              'ml-2 rounded-full px-2 py-0.5 text-xs',
              active === id ? 'bg-white/20' : 'bg-muted'
            )}
          >
            {counts[id]}
          </span>
        </button>
      ))}
    </div>
  );
};

export default ProjectFilters;
