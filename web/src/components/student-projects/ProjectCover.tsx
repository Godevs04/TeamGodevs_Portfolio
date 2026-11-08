import { useState } from 'react';
import { cn } from '@/lib/utils';
import { DOMAIN_ICONS } from './helpers';
import { COVER_PHOTOS, DOMAIN_BY_ID, type StudentProject } from './data';

type ProjectCoverProps = {
  project: StudentProject;
  className?: string;
  priority?: boolean;
  showCode?: boolean;
};

/** Category photo over a domain gradient; the gradient alone is the fallback. */
const ProjectCover = ({ project, className, priority = false, showCode = true }: ProjectCoverProps) => {
  const [failed, setFailed] = useState(false);
  const domain = DOMAIN_BY_ID[project.domain];
  const Icon = DOMAIN_ICONS[project.domain];

  return (
    <div
      className={cn(
        'relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br',
        domain.gradient,
        className
      )}
    >
      {!failed && (
        <img
          src={COVER_PHOTOS[project.cover]}
          alt=""
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          width={720}
          height={450}
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" aria-hidden />

      <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
        <Icon className="h-3.5 w-3.5" aria-hidden />
        {domain.short}
      </span>
      {showCode && (
        <span className="absolute right-3 top-3 rounded-md bg-white/90 px-2 py-0.5 font-mono text-[10px] font-semibold text-gray-900">
          {project.code}
        </span>
      )}

      {failed && (
        <Icon className="absolute bottom-4 right-4 h-14 w-14 text-white/30" aria-hidden />
      )}
    </div>
  );
};

export default ProjectCover;
