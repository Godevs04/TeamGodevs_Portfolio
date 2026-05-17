import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scrollToSection } from '@/lib/scroll';
import { cn } from '@/lib/utils';

type SectionCTAProps = {
  title: string;
  description?: string;
  primaryLabel: string;
  primaryTarget?: string;
  secondaryLabel?: string;
  secondaryTarget?: string;
  className?: string;
};

const SectionCTA = ({
  title,
  description,
  primaryLabel,
  primaryTarget = 'contact',
  secondaryLabel,
  secondaryTarget,
  className,
}: SectionCTAProps) => (
  <div
    className={cn(
      'mt-16 flex flex-col items-center gap-6 rounded-2xl border border-border/60 bg-muted/30 px-6 py-10 text-center md:mt-20 md:px-10',
      className
    )}
  >
    <div className="max-w-xl">
      <h3 className="text-h3 mb-2">{title}</h3>
      {description && <p className="text-body text-muted-foreground">{description}</p>}
    </div>
    <div className="flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
      <Button
        variant="cta"
        size="lg"
        className="w-full sm:w-auto"
        onClick={() => scrollToSection(primaryTarget)}
      >
        {primaryLabel}
        <ArrowRight className="h-4 w-4" />
      </Button>
      {secondaryLabel && secondaryTarget && (
        <Button
          variant="ctaOutline"
          size="lg"
          className="w-full sm:w-auto"
          onClick={() => scrollToSection(secondaryTarget)}
        >
          {secondaryLabel}
        </Button>
      )}
    </div>
  </div>
);

export default SectionCTA;
