import { Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const VideoPlaceholder = () => {
  return (
    <Card
      variant="elevated"
      className="group relative min-h-[200px] overflow-hidden border-border/60 p-0 sm:min-h-[220px] lg:min-h-[240px]"
    >
      <CardContent className="relative flex min-h-[200px] flex-col items-center justify-center p-0 sm:min-h-[220px] lg:min-h-[240px]">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#052e16]/80 to-[#0f172a]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(22,163,74,0.25),transparent_70%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
          }}
          aria-hidden
        />

        <button
          type="button"
          className="relative z-10 flex flex-col items-center gap-4 transition-transform duration-300 group-hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full"
          aria-label="Video testimonial coming soon"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-glow ring-4 ring-primary/30 transition-smooth group-hover:bg-white">
            <Play className="h-7 w-7 fill-[#16a34a] text-[#16a34a]" aria-hidden />
          </span>
          <div className="text-center">
            <p className="text-sm font-semibold text-white">Client story video</p>
            <p className="text-caption text-white/55">Coming soon · 2 min watch</p>
          </div>
        </button>
      </CardContent>
    </Card>
  );
};

export default VideoPlaceholder;
