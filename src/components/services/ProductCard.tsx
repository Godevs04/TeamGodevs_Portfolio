import { ArrowRight, Check, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { scrollToSection } from '@/lib/scroll';
import { cn } from '@/lib/utils';

export type ProductOffering = {
  icon: LucideIcon;
  title: string;
  valueProposition: [string, string];
  benefits: string[];
  priceFrom: string;
  priceNote?: string;
};

type ProductCardProps = {
  product: ProductOffering;
  className?: string;
};

const ProductCard = ({ product, className }: ProductCardProps) => {
  const Icon = product.icon;

  return (
    <Card
      variant="elevated"
      className={cn(
        'product-card group relative flex h-full flex-col overflow-hidden',
        'border-border/60 hover:border-primary/35 hover:shadow-large',
        className
      )}
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
      <CardContent className="relative flex flex-1 flex-col p-6 md:p-8">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
            <Icon className="h-7 w-7 text-white" aria-hidden />
          </div>
          <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-caption font-semibold text-primary">
            {product.priceFrom}
          </span>
        </div>

        <h3 className="text-h3 mb-3 transition-colors group-hover:text-primary">{product.title}</h3>

        <div className="mb-5 space-y-1">
          <p className="text-body font-medium text-foreground">{product.valueProposition[0]}</p>
          <p className="text-body text-muted-foreground">{product.valueProposition[1]}</p>
        </div>

        <ul className="mb-6 flex-1 space-y-2.5">
          {product.benefits.map((benefit) => (
            <li key={benefit} className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                <Check className="h-3 w-3 text-primary" aria-hidden />
              </span>
              {benefit}
            </li>
          ))}
        </ul>

        {product.priceNote && (
          <p className="text-caption mb-4 text-muted-foreground">{product.priceNote}</p>
        )}

        <Button
          variant="ctaOutline"
          className="mt-auto w-full transition-smooth group-hover:border-primary/40 group-hover:bg-primary/5 group-hover:text-primary"
          onClick={() => scrollToSection('contact')}
        >
          Learn more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
