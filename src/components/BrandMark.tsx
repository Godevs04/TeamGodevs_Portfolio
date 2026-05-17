import { cn } from '@/lib/utils';

type BrandMarkProps = {
  variant?: 'header' | 'footer';
  onClick?: () => void;
  className?: string;
};

const BrandMark = ({ variant = 'header', onClick, className }: BrandMarkProps) => {
  const isFooter = variant === 'footer';

  const content = (
    <>
      <span
        className={cn(
          'relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl',
          'ring-1 shadow-sm transition-smooth group-hover:shadow-md group-hover:ring-primary/40',
          isFooter
            ? 'h-11 w-11 ring-white/15 shadow-black/20'
            : 'h-10 w-10 ring-primary/20'
        )}
      >
        <img
          src="/favicon-48.png"
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
          width={44}
          height={44}
        />
        <span
          className={cn(
            'pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100',
            isFooter
              ? 'bg-gradient-to-br from-primary/25 to-transparent'
              : 'bg-gradient-to-br from-primary/15 to-transparent'
          )}
        />
      </span>

      <span className="flex flex-col items-start leading-none">
        <span
          className={cn(
            'text-lg font-semibold tracking-tight sm:text-xl',
            isFooter ? 'text-white' : 'text-foreground'
          )}
        >
          Team<span className="text-primary">Go</span>Devs
        </span>
        <span
          className={cn(
            'mt-1.5 text-[10px] font-medium uppercase tracking-[0.22em]',
            isFooter ? 'text-white/50' : 'text-muted-foreground'
          )}
        >
          Digital studio
        </span>
      </span>
    </>
  );

  const baseClass = cn(
    'brand-mark group inline-flex items-center gap-3 text-left transition-smooth',
    onClick && 'cursor-pointer rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
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
