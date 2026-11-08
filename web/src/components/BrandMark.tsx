import BrandLogoMark, { type BrandLogoVariant } from '@/components/BrandLogoMark';
import { cn } from '@/lib/utils';

type BrandMarkProps = {
  variant?: BrandLogoVariant;
  onClick?: () => void;
  className?: string;
  /** Hide tagline on tight layouts */
  compact?: boolean;
};

const BrandMark = ({
  variant = 'header',
  onClick,
  className,
  compact = false,
}: BrandMarkProps) => {
  const isFooter = variant === 'footer';
  const isPanel = variant === 'panel';

  const content = (
    <>
      <BrandLogoMark variant={variant} />

      {!compact && (
        <span className="flex min-w-0 flex-col items-start leading-none">
          <span
            className={cn(
              'text-[1.05rem] font-bold tracking-tight sm:text-xl',
              isFooter ? 'text-white' : 'text-gray-900 dark:text-foreground'
            )}
          >
            Team
            <span
              className={cn(
                isFooter
                  ? 'text-emerald-400'
                  : 'bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent'
              )}
            >
              Go
            </span>
            Devs
          </span>
          <span
            className={cn(
              'mt-1.5 text-[10px] font-semibold uppercase tracking-[0.2em]',
              isFooter ? 'text-white/55' : 'text-gray-500 dark:text-muted-foreground',
              isPanel && 'text-gray-600 dark:text-muted-foreground'
            )}
          >
            Digital studio
          </span>
        </span>
      )}
    </>
  );

  const baseClass = cn(
    'brand-mark group inline-flex max-w-full items-center gap-3.5 text-left',
    'transition-all duration-300',
    onClick &&
      'cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
    isPanel && 'gap-4',
    className
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={baseClass} aria-label="TeamGoDevs home">
        {content}
      </button>
    );
  }

  return <span className={baseClass}>{content}</span>;
};

export default BrandMark;
