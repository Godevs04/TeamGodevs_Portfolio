import { cn } from '@/lib/utils';
import { techStack } from './offerings';

const TechStack = ({ className }: { className?: string }) => {
  return (
    <div className={cn('marquee-mask w-full overflow-hidden', className)}>
      <div className="marquee-track gap-4 px-2">
        {[...techStack, ...techStack].map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="flex shrink-0 items-center gap-3 rounded-xl border border-border/60 bg-card px-5 py-3 shadow-soft transition-smooth hover:border-primary/30 hover:shadow-medium"
            title={tech.name}
          >
            <span
              className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-white"
              style={{ backgroundColor: tech.color }}
              aria-hidden
            >
              {tech.abbr.slice(0, 2)}
            </span>
            <span className="whitespace-nowrap text-sm font-semibold text-foreground">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
