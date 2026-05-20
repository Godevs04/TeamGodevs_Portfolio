import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Lightbulb, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { scrollToSection } from '@/lib/scroll';
import type { CaseStudy } from './caseStudies';
import ProjectMedia from './ProjectMedia';
import { useTilt3D } from './useTilt3D';

const easePremium = [0.22, 1, 0.36, 1] as const;

type CaseStudyCardProps = {
  study: CaseStudy;
  index?: number;
  onOpenCaseStudy: (study: CaseStudy) => void;
  className?: string;
};

const CaseStudyCard = ({ study, index = 0, onOpenCaseStudy, className }: CaseStudyCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const tiltEnabled = !prefersReducedMotion;
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt3D(tiltEnabled);

  const openLive = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (study.website) {
      window.open(study.website, '_blank', 'noopener,noreferrer');
    } else {
      scrollToSection('contact');
    }
  };

  const visibleTags = study.tags.slice(0, 4);
  const extraTags = study.tags.length - visibleTags.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-32px' }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: easePremium }}
      className={cn('relative w-full max-w-[380px]', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        onMouseLeave();
      }}
    >
      {/* Layer 1 — card ambient glow */}
      <div
        className={cn(
          'project-card-ambient pointer-events-none absolute -inset-3 rounded-[36px] opacity-0 transition-opacity duration-700',
          isHovered && 'opacity-100'
        )}
        aria-hidden
      />

      <motion.article
        ref={ref}
        onMouseMove={tiltEnabled ? onMouseMove : undefined}
        style={{
          rotateX: tiltEnabled ? rotateX : 0,
          rotateY: tiltEnabled ? rotateY : 0,
          transformStyle: 'preserve-3d',
          transformPerspective: 1200,
        }}
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: isHovered ? -10 : 0,
                scale: isHovered ? 1.02 : 1,
              }
        }
        transition={{ duration: 0.6, ease: easePremium }}
        className={cn(
          'project-showcase-card group relative flex w-full flex-col overflow-hidden rounded-[32px]',
          study.variant === 'flagship' && 'project-showcase-card--flagship'
        )}
      >
        {/* Layer 2 — glass card */}
        <div className="project-showcase-card-inner relative flex flex-col" style={{ transformStyle: 'preserve-3d' }}>
          <div style={{ transform: 'translateZ(20px)' }}>
            <ProjectMedia study={study} isHovered={isHovered} />
          </div>

          <div className="relative flex flex-col px-4 pb-4 pt-3.5" style={{ transform: 'translateZ(28px)' }}>
            <h3 className="truncate text-lg font-bold tracking-tight text-gray-900 dark:text-white">
              {study.title}
            </h3>
            <p className="mt-1 line-clamp-2 text-[13px] leading-snug text-gray-600 dark:text-gray-400/95">
              {study.shortDescription}
            </p>

            <div className="mt-3 flex gap-2">
              {study.results.map((m, i) => (
                <motion.div
                  key={m.label}
                  initial={false}
                  animate={{ opacity: 1, y: isHovered ? 0 : 2 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  className="project-metric-mini flex flex-1 flex-col items-center rounded-xl py-2 text-center"
                >
                  <span className="text-sm font-semibold text-green-600 dark:text-emerald-400/95">
                    {m.value}
                  </span>
                  <span className="mt-0.5 text-[9px] uppercase tracking-wide text-gray-500 dark:text-gray-500">
                    {m.label}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-3 flex min-h-[28px] flex-wrap gap-1.5">
              {visibleTags.map((tag) => (
                <span key={tag} className="project-tech-pill rounded-full px-2 py-0.5 text-[10px]">
                  {tag}
                </span>
              ))}
              {extraTags > 0 && (
                <span className="project-tech-pill rounded-full px-2 py-0.5 text-[10px] opacity-70">
                  +{extraTags}
                </span>
              )}
            </div>

            <div className="mt-3.5 flex gap-2">
              <Button
                type="button"
                size="sm"
                className="project-btn-primary h-9 flex-1 rounded-xl text-xs font-semibold"
                onClick={() => onOpenCaseStudy(study)}
              >
                Case study
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="project-btn-secondary h-9 flex-1 rounded-xl text-xs font-semibold"
                onClick={openLive}
              >
                {study.website ? 'Live' : 'Contact'}
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Hover reveal — problem / solution */}
          <div
            className={cn(
              'grid border-t border-white/5 transition-[grid-template-rows,opacity] duration-500 ease-out',
              isHovered ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
            )}
            style={{ transform: 'translateZ(16px)' }}
          >
            <div className="min-h-0 overflow-hidden">
              <div className="space-y-2.5 px-4 py-3.5">
                <div className="project-hover-insight flex gap-2 rounded-xl p-2.5">
                  <Target className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400/90" aria-hidden />
                  <p className="text-[11px] leading-relaxed text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-red-500/90 dark:text-red-400/80">Challenge · </span>
                    {study.problem}
                  </p>
                </div>
                <div className="project-hover-insight project-hover-insight--solution flex gap-2 rounded-xl p-2.5">
                  <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400/90" aria-hidden />
                  <p className="text-[11px] leading-relaxed text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-emerald-600/90 dark:text-emerald-400/80">Solution · </span>
                    {study.solution}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="project-card-shine pointer-events-none absolute inset-0 rounded-[32px]" aria-hidden />
      </motion.article>
    </motion.div>
  );
};

export default CaseStudyCard;
