import { ArrowUpRight, Target, Lightbulb, TrendingUp } from 'lucide-react';
import LazyImage from '@/components/ui/lazy-image';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { scrollToSection } from '@/lib/scroll';
import type { CaseStudy } from './caseStudies';
import { usePostHog } from '@posthog/react';

type FeaturedProjectProps = {
  study: CaseStudy;
};

const FeaturedProject = ({ study }: FeaturedProjectProps) => {
  const posthog = usePostHog();

  const openCaseStudy = () => {
    posthog?.capture('case_study_opened', {
      project_title: study.title,
      client: study.client,
      has_website: Boolean(study.website),
    });
    if (study.website) {
      window.open(study.website, '_blank', 'noopener,noreferrer');
    } else {
      scrollToSection('contact');
    }
  };

  return (
    <Card
      variant="elevated"
      className="case-study-card group mb-16 overflow-hidden border-primary/20 p-0 shadow-large lg:mb-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[220px] overflow-hidden sm:min-h-[280px] lg:min-h-[420px]">
          <LazyImage
            src={study.image}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#0f172a]/50 to-transparent lg:bg-gradient-to-t lg:from-[#0f172a] lg:via-[#0f172a]/60 lg:to-transparent" />
          <span className="absolute left-6 top-6 rounded-full bg-gradient-primary px-4 py-1.5 text-caption font-semibold text-white shadow-glow">
            Featured project
          </span>
          <div className="absolute bottom-6 left-6 right-6 lg:hidden">
            <p className="text-caption text-white/70">{study.client}</p>
            <h3 className="text-h2 text-white">{study.title}</h3>
          </div>
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12">
          <p className="text-caption mb-2 hidden font-semibold uppercase tracking-widest text-primary lg:block">
            {study.client}
          </p>
          <h3 className="text-h2 mb-6 hidden lg:block">{study.title}</h3>

          <div className="mb-6 space-y-5">
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10">
                <Target className="h-5 w-5 text-destructive" aria-hidden />
              </span>
              <div>
                <p className="text-caption mb-1 font-semibold uppercase tracking-wide text-muted-foreground">
                  Problem
                </p>
                <p className="text-body-lg text-foreground">{study.problem}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Lightbulb className="h-5 w-5 text-primary" aria-hidden />
              </span>
              <div>
                <p className="text-caption mb-1 font-semibold uppercase tracking-wide text-muted-foreground">
                  Solution
                </p>
                <p className="text-body-lg text-foreground">{study.solution}</p>
              </div>
            </div>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-4 rounded-2xl border border-border bg-muted/40 p-5 min-[420px]:grid-cols-3">
            {study.results.map((metric) => (
              <div key={metric.label} className="text-center min-[420px]:text-left">
                <div className="flex items-center justify-center gap-1 min-[420px]:justify-start">
                  <TrendingUp className="h-4 w-4 text-primary" aria-hidden />
                  <span className="text-lg font-bold text-gradient sm:text-h3">{metric.value}</span>
                </div>
                <p className="text-caption text-muted-foreground">{metric.label}</p>
              </div>
            ))}
          </div>

          <div className="mb-8 flex flex-wrap gap-2">
            {study.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-caption font-medium text-primary"
              >
                {tag}
              </span>
            ))}
          </div>

          <Button variant="cta" size="lg" className="w-full sm:w-fit" onClick={openCaseStudy}>
            View case study
            <ArrowUpRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default FeaturedProject;
