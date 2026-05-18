import { ArrowUpRight, Target, Lightbulb, TrendingUp } from 'lucide-react';
import LazyImage from '@/components/ui/lazy-image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { scrollToSection } from '@/lib/scroll';
import { cn } from '@/lib/utils';
import type { CaseStudy } from './caseStudies';

type CaseStudyCardProps = {
  study: CaseStudy;
  className?: string;
};

const CaseStudyCard = ({ study, className }: CaseStudyCardProps) => {
  const handleViewCaseStudy = () => {
    if (study.website) {
      window.open(study.website, '_blank', 'noopener,noreferrer');
    } else {
      scrollToSection('contact');
    }
  };

  return (
    <Card
      variant="elevated"
      className={cn(
        'case-study-card group flex h-full flex-col overflow-hidden p-0',
        'border-border/60 hover:border-primary/30',
        className
      )}
    >
      {/* Image + overlay */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <LazyImage
          src={study.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#16a34a]/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {study.filters.map((f) => (
            <span
              key={f}
              className="rounded-full border border-white/20 bg-black/40 px-2.5 py-1 text-xs font-medium capitalize text-white backdrop-blur-sm"
            >
              {f === 'ecommerce' ? 'E-commerce' : f}
            </span>
          ))}
        </div>

        <div className="absolute inset-0 hidden items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 md:flex">
          <Button
            size="lg"
            onClick={handleViewCaseStudy}
            className="translate-y-4 rounded-full border-0 bg-white text-[#16a34a] shadow-large transition-transform duration-300 group-hover:translate-y-0"
          >
            View case study
            <ArrowUpRight className="h-5 w-5" />
          </Button>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <p className="text-caption font-medium uppercase tracking-wider text-white/70">
            {study.client}
          </p>
          <h3 className="text-h3 text-white">{study.title}</h3>
        </div>
      </div>

      {/* Case study body */}
      <div className="flex flex-1 flex-col p-6 md:p-8">
        <div className="mb-5 space-y-4">
          <div className="flex gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
              <Target className="h-4 w-4 text-destructive" aria-hidden />
            </span>
            <div>
              <p className="text-caption font-semibold uppercase tracking-wide text-muted-foreground">
                Problem
              </p>
              <p className="text-body text-foreground/90">{study.problem}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Lightbulb className="h-4 w-4 text-primary" aria-hidden />
            </span>
            <div>
              <p className="text-caption font-semibold uppercase tracking-wide text-muted-foreground">
                Solution
              </p>
              <p className="text-body text-foreground/90">{study.solution}</p>
            </div>
          </div>
        </div>

        <div className="mb-5 grid grid-cols-1 gap-3 rounded-xl border border-border/60 bg-muted/30 p-4 min-[420px]:grid-cols-3">
          {study.results.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="flex items-center justify-center gap-1">
                <TrendingUp className="hidden h-3.5 w-3.5 text-primary sm:block" aria-hidden />
                <span className="text-lg font-bold text-gradient md:text-xl">{metric.value}</span>
              </div>
              <p className="text-caption text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>

        <Button
          variant="ctaOutline"
          className="mb-4 w-full md:hidden"
          onClick={handleViewCaseStudy}
        >
          View case study
          <ArrowUpRight className="h-4 w-4" />
        </Button>

        <div className="mt-auto flex flex-wrap gap-2">
          {study.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-background px-3 py-1 text-caption font-medium text-muted-foreground transition-colors group-hover:border-primary/20 group-hover:text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default CaseStudyCard;
