import { motion } from 'framer-motion';
import { Sparkles, TrendingUp } from 'lucide-react';
import LazyImage from '@/components/ui/lazy-image';
import { cn } from '@/lib/utils';
import type { CaseStudy } from './caseStudies';

type ProjectMediaProps = {
  study: CaseStudy;
  isHovered: boolean;
};

const LiveIndicator = () => (
  <span className="project-live-dot flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-white/90 backdrop-blur-md">
    <span className="relative flex h-1.5 w-1.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
    </span>
    Live
  </span>
);

const FloatingChip = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.span
    animate={{ y: [0, -4, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    className={cn(
      'project-float-chip pointer-events-none absolute z-20 rounded-lg border border-white/15 bg-white/10 px-2 py-1 text-[10px] font-medium text-white/90 shadow-lg backdrop-blur-md',
      className
    )}
  >
    {children}
  </motion.span>
);

const ProjectMedia = ({ study, isHovered }: ProjectMediaProps) => {
  const { cardType, variant } = study;
  const isFlagship = variant === 'flagship';
  const isMobile = cardType === 'mobile';
  const is3d = cardType === 'showcase3d';
  const isEcom = cardType === 'ecommerce';
  const isSaas = cardType === 'saas';
  const isSplit = cardType === 'split';

  return (
    <div
      className={cn(
        'project-card-media relative aspect-[16/10] w-full shrink-0 overflow-hidden',
        isMobile && 'project-card-media--mobile flex items-center justify-center bg-gradient-to-b from-gray-100 to-gray-50 dark:from-[#0c1219] dark:to-[#060d14]',
        is3d && 'project-card-media--3d',
        isEcom && 'project-card-media--ecommerce'
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Ambient glow behind media */}
      <div className="project-card-media-glow pointer-events-none absolute inset-0" aria-hidden />

      {isMobile ? (
        <div
          className="project-phone-frame relative z-10 mx-auto mt-2 h-[88%] w-[42%] max-w-[140px] overflow-hidden rounded-[22px] border border-white/20 bg-black/80 p-[3px] shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
          style={{ transform: isHovered ? 'translateZ(24px)' : 'translateZ(12px)' }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-black">
            <LazyImage
              src={study.image}
              alt={`${study.title} app preview`}
              className={cn(
                'h-full w-full object-cover object-top transition-transform duration-700 ease-out',
                isHovered && 'scale-110'
              )}
            />
            <div className="project-media-treatment pointer-events-none absolute inset-0 mix-blend-overlay" />
          </div>
          <div className="absolute left-1/2 top-1.5 h-1 w-8 -translate-x-1/2 rounded-full bg-white/20" />
        </div>
      ) : is3d ? (
        <div className="relative h-full w-full" style={{ perspective: '900px' }}>
          <motion.div
            animate={isHovered ? { rotateY: 6, rotateX: -4, scale: 1.04 } : { rotateY: 0, rotateX: 0, scale: 1 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="project-3d-stack relative h-full w-full"
          >
            <div className="project-3d-layer project-3d-layer--back absolute inset-[8%] rounded-2xl opacity-40 blur-sm" />
            <div className="project-3d-layer project-3d-layer--mid absolute inset-[4%] rounded-2xl opacity-70" />
            <LazyImage
              src={study.image}
              alt={`${study.title} 3D preview`}
              className="project-3d-layer--front relative z-10 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        </div>
      ) : isSplit ? (
        <div className="flex h-full w-full">
          <div className="relative w-1/2 overflow-hidden border-r border-white/10">
            <LazyImage
              src={study.image}
              alt={`${study.title} preview`}
              className={cn('h-full w-full object-cover object-left transition-transform duration-700', isHovered && 'scale-105')}
            />
          </div>
          <div className="relative flex w-1/2 flex-col justify-center gap-2 bg-gradient-to-br from-emerald-500/10 to-transparent p-3">
            <div className="h-2 w-3/4 rounded-full bg-white/20" />
            <div className="h-2 w-1/2 rounded-full bg-white/15" />
            <div className="mt-2 h-16 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm" />
          </div>
        </div>
      ) : (
        <LazyImage
          src={study.image}
          alt={`${study.title} preview`}
          className={cn(
            'relative z-10 h-full w-full object-cover object-top transition-transform duration-700 ease-out',
            isHovered && 'scale-105',
            isEcom && 'object-center'
          )}
        />
      )}

      <div className="project-media-treatment pointer-events-none absolute inset-0 z-[11] mix-blend-overlay" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-[12] bg-gradient-to-t from-[#071018]/90 via-[#071018]/25 to-transparent dark:from-[#071018] dark:via-[#071018]/30" />
      <div className="project-media-sweep pointer-events-none absolute inset-0 z-[13]" aria-hidden />
      <div className="project-media-reflection pointer-events-none absolute inset-0 z-[14]" aria-hidden />

      <div className="absolute left-3 top-3 z-20 flex flex-wrap gap-2">
        <span className="project-category-badge rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide">
          {study.category}
        </span>
        {isFlagship && (
          <span className="project-flagship-badge inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">
            <Sparkles className="h-3 w-3 opacity-80" />
            Flagship
          </span>
        )}
      </div>

      <div className="absolute right-3 top-3 z-20">
        <LiveIndicator />
      </div>

      {isSaas && (
        <>
          <FloatingChip className="bottom-10 left-3">
            <TrendingUp className="mr-1 inline h-3 w-3 text-emerald-400" />
            +24% growth
          </FloatingChip>
          <FloatingChip className="bottom-4 right-3">Analytics</FloatingChip>
        </>
      )}

      {isEcom && (
        <FloatingChip className="bottom-8 left-1/2 -translate-x-1/2">Premium storefront</FloatingChip>
      )}

      {isMobile && (
        <motion.span
          className="project-fake-cursor pointer-events-none absolute z-20 h-3 w-3 rounded-full border-2 border-white/80 bg-emerald-400/80 shadow-lg"
          animate={{ x: [40, 52, 44], y: [60, 72, 65] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ left: '55%', top: '35%' }}
        />
      )}

      {is3d && isHovered && (
        <div className="pointer-events-none absolute inset-0 z-[15] bg-gradient-to-tr from-emerald-500/10 via-transparent to-violet-500/10" />
      )}
    </div>
  );
};

export default ProjectMedia;
