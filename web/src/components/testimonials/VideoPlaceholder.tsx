import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

type VideoPlaceholderProps = {
  className?: string;
};

const VideoPlaceholder = ({ className }: VideoPlaceholderProps) => {
  return (
    <div className={cn('testimonial-video-card group relative flex min-h-[180px] flex-1 flex-col overflow-hidden', className)}>
      <div className="testimonial-video-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="testimonial-video-mesh pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-4 p-6 transition-transform duration-500 group-hover:-translate-y-0.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-400/90">
          Founder story
        </span>

        <button
          type="button"
          className="flex flex-col items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-full"
          aria-label="Video testimonial coming soon"
        >
          <span className="relative flex h-14 w-14 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full bg-emerald-400/20"
              animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              aria-hidden
            />
            <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-[0_0_32px_rgba(16,185,129,0.25)] backdrop-blur-md transition-all duration-500 group-hover:border-emerald-400/40 group-hover:bg-white/15 group-hover:shadow-[0_0_40px_rgba(16,185,129,0.35)]">
              <Play className="ml-0.5 h-6 w-6 fill-emerald-400 text-emerald-400" aria-hidden />
            </span>
          </span>
          <div className="text-center">
            <p className="text-sm font-medium text-white/95">Client story video</p>
            <p className="mt-0.5 text-xs text-gray-400">Coming soon · ~2 min</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default VideoPlaceholder;
