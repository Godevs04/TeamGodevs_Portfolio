import { useCallback, useRef, useState } from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

const HeroVisual = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setTilt({
      rotateY: x * 10,
      rotateX: -y * 8,
      scale: 1.03,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
  }, []);

  return (
    <div
      className="hero-visual-float relative mx-auto w-full max-w-lg lg:max-w-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-green-500/20 to-emerald-400/10 blur-3xl dark:from-green-500/25 dark:to-emerald-400/15"
        aria-hidden
      />

      <div
        ref={cardRef}
        className="hero-visual-card hero-visual-card-glow relative overflow-hidden rounded-2xl border border-border/60 bg-card/80 p-5 shadow-large backdrop-blur-xl sm:p-6 dark:border-white/10 dark:bg-white/[0.05]"
        style={{
          transform: `perspective(1200px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
        }}
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground dark:text-white/50">
              Launch dashboard
            </p>
            <p className="text-lg font-semibold text-foreground dark:text-white">Q2 pipeline</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary backdrop-blur-sm dark:border-green-500/20 dark:bg-green-500/15 dark:text-emerald-300">
            <TrendingUp className="h-3.5 w-3.5" aria-hidden />
            +24%
          </span>
        </div>

        <div className="mb-5 grid grid-cols-3 gap-2">
          {[
            { label: 'Leads', value: '1.2k' },
            { label: 'Conv.', value: '8.4%' },
            { label: 'MRR', value: '₹4.2L' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-border/80 bg-muted/40 px-3 py-2.5 text-center backdrop-blur-sm dark:border-white/10 dark:bg-white/5"
            >
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground dark:text-white/45">
                {stat.label}
              </p>
              <p className="text-sm font-bold text-foreground dark:text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-2 rounded-xl border border-border/80 bg-muted/50 p-3 font-mono text-[11px] leading-relaxed text-emerald-700 backdrop-blur-sm dark:border-white/10 dark:bg-black/25 dark:text-emerald-300/90">
          <p>
            <span className="text-muted-foreground dark:text-white/40">const</span> launch ={' '}
            <span className="text-foreground dark:text-white">await</span> shipProduct({'{'}
          </p>
          <p className="pl-4 text-muted-foreground dark:text-white/70">
            stack: [<span className="text-primary">&quot;React&quot;</span>,{' '}
            <span className="text-primary">&quot;Node&quot;</span>],
          </p>
          <p className="pl-4 text-muted-foreground dark:text-white/70">
            timeline: <span className="text-amber-600 dark:text-amber-300/90">&quot;6 weeks&quot;</span>,
          </p>
          <p className="text-muted-foreground dark:text-white/70">{'}'});</p>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-border/80 bg-primary/5 px-4 py-3 backdrop-blur-sm dark:border-white/10 dark:bg-gradient-to-r dark:from-green-500/10 dark:to-transparent">
          <p className="text-sm text-foreground/80 dark:text-white/80">Ship date confirmed</p>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary transition-colors duration-300 hover:text-emerald-500">
            View build
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </span>
        </div>

        <div
          className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-primary/15 blur-3xl dark:bg-emerald-400/25"
          aria-hidden
        />
      </div>
    </div>
  );
};

export default HeroVisual;
