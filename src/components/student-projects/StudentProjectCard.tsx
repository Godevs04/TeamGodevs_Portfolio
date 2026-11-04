import { ArrowRight, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProjectCover from './ProjectCover';
import { LEVEL_LABELS, formatINR, type StudentProject } from './data';

type StudentProjectCardProps = {
  project: StudentProject;
  onOpen: (project: StudentProject) => void;
  priority?: boolean;
};

const StudentProjectCard = ({ project, onOpen, priority }: StudentProjectCardProps) => (
  <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-medium">
    <button
      type="button"
      onClick={() => onOpen(project)}
      className="block text-left focus-visible:outline-none"
      aria-label={`View details for ${project.title}`}
    >
      <ProjectCover project={project} priority={priority} />
    </button>

    <div className="flex flex-1 flex-col p-5">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            'rounded-full px-2 py-0.5 text-[11px] font-semibold',
            project.level === 'final-year'
              ? 'bg-primary/10 text-primary'
              : 'bg-muted text-muted-foreground'
          )}
        >
          {LEVEL_LABELS[project.level]}
        </span>
        {project.popular && (
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2 py-0.5 text-[11px] font-semibold text-orange-600 dark:text-orange-400">
            <Flame className="h-3 w-3" aria-hidden />
            Popular
          </span>
        )}
      </div>

      <h3 className="text-base font-semibold leading-snug text-foreground">
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="text-left hover:text-primary focus-visible:outline-none focus-visible:underline"
        >
          {project.title}
        </button>
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
        {project.abstract}
      </p>

      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Technologies">
        {project.tech.slice(0, 4).map((tech) => (
          <li
            key={tech}
            className="rounded-md border border-border bg-background px-2 py-0.5 text-[11px] font-medium text-foreground/80"
          >
            {tech}
          </li>
        ))}
      </ul>

      <p className="mt-auto pt-5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
        Abstract · Docs · Source code
      </p>
      <div className="mt-1 flex items-center justify-between gap-3">
        <p className="text-lg font-bold text-foreground">{formatINR(project.price)}</p>
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-primary/10 px-3.5 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          View details
          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
        </button>
      </div>
    </div>
  </article>
);

export default StudentProjectCard;
