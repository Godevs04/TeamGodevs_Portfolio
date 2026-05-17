import { cn } from '@/lib/utils';

type BrandLogoProps = {
  size?: 'sm' | 'md' | 'lg';
  framed?: boolean;
  className?: string;
};

const sizeClasses = {
  sm: 'h-28 w-28 sm:h-32 sm:w-32',
  md: 'h-36 w-36 sm:h-44 sm:w-44 md:h-48 md:w-48',
  lg: 'h-44 w-44 sm:h-52 sm:w-52 md:h-60 md:w-60',
};

const BrandLogo = ({ size = 'md', framed = true, className }: BrandLogoProps) => {
  const image = (
    <img
      src="/Logo_1.png"
      alt="TeamGoDevs — Building solutions. Delivering impact."
      className={cn('object-contain', sizeClasses[size])}
      decoding="async"
    />
  );

  if (!framed) {
    return <span className={cn('inline-flex', className)}>{image}</span>;
  }

  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-2xl bg-white p-4 shadow-lg ring-1 ring-border/50 dark:shadow-xl',
        className
      )}
    >
      {image}
    </span>
  );
};

export default BrandLogo;
