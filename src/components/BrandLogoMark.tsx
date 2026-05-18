import { cn } from '@/lib/utils';

export type BrandLogoVariant = 'header' | 'footer' | 'panel';

const variantStyles: Record<
  BrandLogoVariant,
  { wrap: string; img: string; glow?: string }
> = {
  header: {
    wrap: cn(
      'h-11 w-11 rounded-2xl bg-white p-1',
      'shadow-[0_2px_12px_rgba(15,23,42,0.08)] ring-1 ring-gray-200/90',
      'dark:bg-white dark:ring-white/20 dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)]'
    ),
    img: 'rounded-[10px]',
    glow: 'from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/10 group-hover:to-transparent',
  },
  panel: {
    wrap: cn(
      'h-14 w-14 rounded-2xl bg-white p-1.5',
      'shadow-[0_8px_24px_rgba(15,23,42,0.12)] ring-1 ring-white/90',
      'dark:bg-white dark:shadow-[0_8px_28px_rgba(0,0,0,0.25)]'
    ),
    img: 'rounded-[11px]',
    glow: 'from-primary/5 via-transparent to-transparent',
  },
  footer: {
    wrap: cn(
      'h-11 w-11 rounded-2xl bg-white p-1',
      'shadow-[0_2px_14px_rgba(0,0,0,0.35)] ring-1 ring-white/25',
      'group-hover:ring-white/40'
    ),
    img: 'rounded-[10px]',
    glow: 'from-transparent via-transparent to-transparent',
  },
};

type BrandLogoMarkProps = {
  variant?: BrandLogoVariant;
  className?: string;
};

/** Square mark — sits on a white or gradient pedestal so it doesn’t blend into the page */
const BrandLogoMark = ({ variant = 'header', className }: BrandLogoMarkProps) => {
  const styles = variantStyles[variant];

  return (
    <span
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden transition-all duration-300',
        'group-hover:scale-[1.02]',
        styles.wrap,
        className
      )}
    >
      <img
        src="/favicon-48.png"
        alt=""
        width={48}
        height={48}
        className={cn('h-full w-full object-contain', styles.img)}
        aria-hidden
      />
      <span
        className={cn(
          'pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br opacity-100 transition-opacity duration-300',
          styles.glow
        )}
        aria-hidden
      />
    </span>
  );
};

export default BrandLogoMark;
