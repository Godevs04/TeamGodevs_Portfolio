import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  align?: 'center' | 'left';
  className?: string;
};

const SectionHeader = ({
  badge,
  title,
  highlight,
  description,
  align = 'center',
  className,
}: SectionHeaderProps) => (
  <div
    className={cn(
      'mb-10 max-w-3xl px-1 sm:px-0 md:mb-16',
      align === 'center' ? 'mx-auto text-center' : 'text-left',
      className
    )}
  >
    {badge && (
      <span className="badge-pill mb-6 inline-flex">{badge}</span>
    )}
    <h2 className="text-h2 text-foreground">
      {title}
      {highlight && <span className="mt-1 block text-gradient">{highlight}</span>}
    </h2>
    {description && (
      <p className="text-body-lg mt-6 text-muted-foreground">{description}</p>
    )}
  </div>
);

export default SectionHeader;
