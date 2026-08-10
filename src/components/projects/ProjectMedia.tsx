import { motion } from 'framer-motion';
import { Sparkles, TrendingUp } from 'lucide-react';
import LazyImage from '@/components/ui/lazy-image';
import { cn } from '@/lib/utils';
import type {
  CaseStudy,
  ProjectImageConfig,
  ProjectImageFit,
  ProjectImageOverlay,
  ProjectImagePresentation,
} from './caseStudies';

type ProjectMediaProps = {
  study: CaseStudy;
  isHovered: boolean;
};

const HOVER_SCALE = 1.03;
const easePremium = [0.22, 1, 0.36, 1] as const;

type ResolvedImageConfig = {
  fit: ProjectImageFit;
  position: string;
  scale: number;
  overlay: ProjectImageOverlay;
  presentation: ProjectImagePresentation;
};

function resolveImageConfig(study: CaseStudy): ResolvedImageConfig {
  const cfg: ProjectImageConfig = study.imageConfig ?? {};
  const fromCardType: ProjectImagePresentation =
    study.cardType === 'mobile'
      ? 'phone'
      : study.cardType === 'showcase3d'
        ? '3d'
        : study.cardType === 'split'
          ? 'split'
          : 'default';

  return {
    fit: cfg.fit ?? 'cover',
    position: cfg.position ?? 'center top',
    scale: cfg.scale ?? 1,
    overlay: cfg.overlay ?? 'soft',
    presentation: cfg.presentation ?? fromCardType,
  };
}

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

type ShotProps = {
  study: CaseStudy;
  config: ResolvedImageConfig;
  isHovered: boolean;
  alt: string;
  className?: string;
};

const ProjectShot = ({ study, config, isHovered, alt, className }: ShotProps) => {
  const baseScale = config.scale;
  const activeScale = isHovered ? baseScale * HOVER_SCALE : baseScale;
  const resolvedAlt = alt || study.imageAlt || `${study.title} product preview`;

  return (
    <LazyImage
      src={study.image}
      alt={resolvedAlt}
      className={cn(
        'project-shot relative z-10 h-full w-full transition-transform duration-500 ease-out will-change-transform',
        className
      )}
      style={{
        objectFit: config.fit,
        objectPosition: config.position,
        transform: `scale(${activeScale})`,
      }}
    />
  );
};

const ProjectMedia = ({ study, isHovered }: ProjectMediaProps) => {
  const { cardType, variant } = study;
  const config = resolveImageConfig(study);
  const isFlagship = variant === 'flagship';
  const isSaas = cardType === 'saas';
  const isEcom = cardType === 'ecommerce';
  const { presentation, fit, overlay } = config;

  return (
    <div
      className={cn(
        'project-card-media relative aspect-[16/9] w-full shrink-0 overflow-hidden',
        'ring-1 ring-inset ring-gray-200/70 dark:ring-white/10',
        fit === 'contain' && 'project-card-media--contain',
        presentation === 'phone' && 'project-card-media--mobile flex items-center justify-center',
        presentation === '3d' && 'project-card-media--3d',
        isEcom && 'project-card-media--ecommerce'
      )}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="project-card-media-glow pointer-events-none absolute inset-0" aria-hidden />

      {presentation === 'phone' ? (
        <div
          className="project-phone-frame relative z-10 mx-auto mt-1.5 h-[90%] w-[40%] max-w-[132px] overflow-hidden rounded-[22px] border border-white/20 bg-black/80 p-[3px] shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
          style={{ transform: isHovered ? 'translateZ(24px)' : 'translateZ(12px)' }}
        >
          <div className="relative h-full w-full overflow-hidden rounded-[18px] bg-black">
            <ProjectShot
              study={study}
              config={{ ...config, fit: 'cover', position: 'center top' }}
              isHovered={isHovered}
              alt={study.imageAlt || `${study.title} app preview`}
            />
          </div>
          <div className="absolute left-1/2 top-1.5 h-1 w-8 -translate-x-1/2 rounded-full bg-white/20" />
        </div>
      ) : presentation === '3d' ? (
        <div className="relative h-full w-full" style={{ perspective: '900px' }}>
          <motion.div
            animate={
              isHovered
                ? { rotateY: 6, rotateX: -4, scale: 1.03 }
                : { rotateY: 0, rotateX: 0, scale: 1 }
            }
            transition={{ duration: 0.5, ease: easePremium }}
            className="project-3d-stack relative h-full w-full"
          >
            <div className="project-3d-layer project-3d-layer--back absolute inset-[8%] rounded-2xl opacity-40 blur-sm" />
            <div className="project-3d-layer project-3d-layer--mid absolute inset-[4%] rounded-2xl opacity-70" />
            <ProjectShot
              study={study}
              config={config}
              isHovered={false}
              alt={study.imageAlt || `${study.title} 3D preview`}
              className="project-3d-layer--front relative z-10"
            />
          </motion.div>
        </div>
      ) : presentation === 'split' ? (
        <div className="flex h-full w-full">
          <div className="relative w-1/2 overflow-hidden border-r border-white/10">
            <ProjectShot
              study={study}
              config={{ ...config, fit: 'cover', position: 'left center' }}
              isHovered={isHovered}
              alt={study.imageAlt || `${study.title} preview`}
            />
          </div>
          <div className="relative flex w-1/2 flex-col justify-center gap-2 bg-gradient-to-br from-emerald-500/10 to-transparent p-3">
            <div className="h-2 w-3/4 rounded-full bg-white/20" />
            <div className="h-2 w-1/2 rounded-full bg-white/15" />
            <div className="mt-2 h-16 rounded-lg border border-white/10 bg-white/5" />
          </div>
        </div>
      ) : (
        <ProjectShot
          study={study}
          config={config}
          isHovered={isHovered}
          alt={study.imageAlt || `${study.title} product preview`}
        />
      )}

      {/* Subtle bottom-only contrast — never a full-image blackout */}
      {overlay !== 'none' && (
        <div
          className={cn(
            'project-media-overlay pointer-events-none absolute inset-0 z-[12]',
            overlay === 'soft' && 'project-media-overlay--soft'
          )}
          aria-hidden
        />
      )}

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

      {/* Decorative chips only on hover so resting screenshot stays readable */}
      {isSaas && isHovered && (
        <>
          <FloatingChip className="bottom-10 left-3">
            <TrendingUp className="mr-1 inline h-3 w-3 text-emerald-400" />
            Analytics
          </FloatingChip>
          <FloatingChip className="bottom-4 right-3">Live ops</FloatingChip>
        </>
      )}

      {isEcom && isHovered && (
        <FloatingChip className="bottom-8 left-1/2 -translate-x-1/2">Premium storefront</FloatingChip>
      )}

      {presentation === 'phone' && (
        <motion.span
          className="project-fake-cursor pointer-events-none absolute z-20 h-3 w-3 rounded-full border-2 border-white/80 bg-emerald-400/80 shadow-lg"
          animate={{ x: [40, 52, 44], y: [60, 72, 65] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ left: '55%', top: '35%' }}
        />
      )}

      {presentation === '3d' && isHovered && (
        <div className="pointer-events-none absolute inset-0 z-[15] bg-gradient-to-tr from-emerald-500/10 via-transparent to-violet-500/10" />
      )}
    </div>
  );
};

export default ProjectMedia;
