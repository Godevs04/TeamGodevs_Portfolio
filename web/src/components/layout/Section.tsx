import { cn } from '@/lib/utils';

type SectionVariant = 'default' | 'muted' | 'contrast';

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  variant?: SectionVariant;
};

const variantClasses: Record<SectionVariant, string> = {
  default: 'bg-background',
  muted: 'bg-muted/40',
  contrast: 'bg-foreground text-background',
};

const Section = ({ id, children, className, variant = 'default' }: SectionProps) => (
  <section id={id} className={cn('section-padding', variantClasses[variant], className)}>
    {children}
  </section>
);

export default Section;
