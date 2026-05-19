import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Lightbulb, Sparkles, Target } from 'lucide-react';
import LazyImage from '@/components/ui/lazy-image';
import { Button } from '@/components/ui/button';
import { scrollToSection } from '@/lib/scroll';
import { cn } from '@/lib/utils';
import type { CaseStudy } from './caseStudies';

type CaseStudyCardProps = {
  study: CaseStudy;
  index?: number;
  className?: string;
};

const CaseStudyCard = ({ study, index = 0, className }: CaseStudyCardProps) => {
  const isFlagship = study.variant === 'flagship';

  const openProject = () => {
    if (study.website) {
      window.open(study.website, '_blank', 'noopener,noreferrer');
    } else {
      scrollToSection('contact');
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className={cn(
        'project-case-card group relative flex h-full w-full flex-col overflow-hidden rounded-3xl border',
        'bg-white border-gray-200 shadow-[0_10px_40px_rgba(0,0,0,0.08)]',
        'transition-all duration-500 ease-out',
        'hover:border-green-500/35 hover:shadow-[0_20px_50px_rgba(16,185,129,0.14)]',
        'dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_10px_40px_rgba(0,0,0,0.28)]',
        'dark:hover:border-green-400/35 dark:hover:shadow-[0_24px_64px_rgba(16,185,129,0.14)]',
        isFlagship &&
          'ring-1 ring-green-500/25 dark:ring-green-400/30 dark:shadow-[0_10px_48px_rgba(16,185,129,0.1)]',
        className
      )}
    >
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden rounded-t-3xl bg-muted/30 dark:bg-white/5">
        <LazyImage
          src={study.image}
          alt={`${study.title} — product preview`}
          className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/95 via-white/25 to-transparent dark:from-[#071018] dark:via-[#071018]/45 dark:to-transparent"
          aria-hidden
        />
        {isFlagship && (
          <span className="project-flagship-badge absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Sparkles className="h-3 w-3" aria-hidden />
            Flagship
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-1 flex-col space-y-4">
          <span className="project-category-badge inline-flex w-fit max-w-full truncate rounded-full px-3 py-1 text-xs font-medium">
            {study.category}
          </span>

          <header className="min-h-[4.5rem]">
            <h3 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
              {study.title}
            </h3>
            <p className="mt-2 min-h-[3.75rem] text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {study.shortDescription}
            </p>
          </header>

          <div className="project-insight-box project-insight-problem flex min-h-[5.5rem] gap-3 rounded-2xl p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/10 dark:bg-red-500/15">
              <Target className="h-3.5 w-3.5 text-red-500 dark:text-red-400" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600/90 dark:text-red-400/90">
                Problem
              </p>
              <p className="mt-1.5 text-sm leading-snug text-gray-700 dark:text-gray-300">
                {study.problem}
              </p>
            </div>
          </div>

          <div className="project-insight-box project-insight-solution flex min-h-[5.5rem] gap-3 rounded-2xl p-4">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10 dark:bg-green-500/15">
              <Lightbulb className="h-3.5 w-3.5 text-green-600 dark:text-emerald-400" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-green-700/90 dark:text-emerald-400/90">
                Solution
              </p>
              <p className="mt-1.5 text-sm leading-snug text-gray-700 dark:text-gray-300">
                {study.solution}
              </p>
            </div>
          </div>

          <div className="grid min-h-[4.75rem] grid-cols-3 gap-3">
            {study.results.map((metric) => (
              <div
                key={metric.label}
                className="project-metric-cell flex flex-col justify-center rounded-2xl py-3 text-center"
              >
                <p className="text-lg font-bold leading-none text-green-600 dark:text-green-400">
                  {metric.value}
                </p>
                <p className="mt-1.5 px-1 text-[10px] leading-tight text-gray-500 dark:text-gray-400">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex min-h-[4.5rem] flex-wrap content-start gap-2">
            {study.tags.map((tag) => (
              <span key={tag} className="project-tech-pill inline-flex h-8 items-center rounded-full px-3 text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto flex gap-3 pt-6">
          <Button
            size="default"
            className="h-11 min-h-[44px] flex-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 text-sm font-semibold text-[#052e16] shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-500 hover:brightness-110 hover:shadow-[0_0_28px_rgba(16,185,129,0.4)]"
            onClick={openProject}
          >
            View project
            <ExternalLink className="h-4 w-4 shrink-0" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="default"
            className="project-case-btn-secondary h-11 min-h-[44px] flex-1 rounded-full text-sm font-semibold transition-all duration-500"
            onClick={openProject}
          >
            Case study
            <ArrowUpRight className="h-4 w-4 shrink-0" />
          </Button>
        </div>
      </div>
    </motion.article>
  );
};

export default CaseStudyCard;
