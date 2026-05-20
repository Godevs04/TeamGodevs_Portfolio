import { useState } from 'react';
import { cn } from '@/lib/utils';
import { techStack, type TechStackItem } from './offerings';

/** AWS is not served on cdn.simpleicons.org — use jsDelivr SVG instead */
const ICON_URL_OVERRIDES: Record<string, string> = {
  amazonwebservices:
    'https://cdn.jsdelivr.net/npm/simple-icons@14/icons/amazonwebservices.svg',
  amazonaws:
    'https://cdn.jsdelivr.net/npm/simple-icons@14/icons/amazonwebservices.svg',
};

const iconUrl = (slug: string, color: string) => {
  const override = ICON_URL_OVERRIDES[slug];
  if (override) return override;
  return `https://cdn.simpleicons.org/${slug}/${color.replace('#', '')}`;
};

const TechIcon = ({ tech }: { tech: TechStackItem }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white"
        style={{ backgroundColor: tech.color }}
        aria-hidden
      >
        {tech.abbr}
      </span>
    );
  }

  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white p-1.5 shadow-inner ring-1 ring-black/5 dark:bg-white/95"
      aria-hidden
    >
      <img
        src={iconUrl(tech.slug, tech.color)}
        alt=""
        width={22}
        height={22}
        className="h-[22px] w-[22px] object-contain"
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    </span>
  );
};

const TechStack = ({ className }: { className?: string }) => {
  return (
    <div className={cn('marquee-mask w-full overflow-hidden', className)}>
      <div className="marquee-track gap-4 px-2">
        {[...techStack, ...techStack].map((tech, i) => (
          <div
            key={`${tech.slug}-${i}`}
            className="flex shrink-0 items-center gap-3 rounded-xl border border-border/60 bg-card px-5 py-3 shadow-soft transition-smooth hover:border-primary/30 hover:shadow-medium dark:border-white/10 dark:bg-white/[0.04]"
            title={tech.name}
          >
            <TechIcon tech={tech} />
            <span className="whitespace-nowrap text-sm font-semibold text-foreground">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
