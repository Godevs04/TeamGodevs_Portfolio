import { createContext, useContext } from 'react';
import type { getBudgetRangeOptions } from '@/lib/pricing';
import type { PricingRegion } from '@/lib/pricing';

export type LocalePricingContextValue = {
  country: string | null;
  region: PricingRegion;
  isReady: boolean;
  formatMoney: (amountInr: number) => string;
  formatCompactMoney: (amountInr: number) => string;
  formatFromPrice: (amountInr: number, recurring?: 'month') => string;
  formatBudgetRange: (key: string) => string;
  formatMrrExample: (amountInr: number) => string;
  getBudgetRangeOptions: () => ReturnType<typeof getBudgetRangeOptions>;
  currencySymbol: string;
};

export const LocalePricingContext = createContext<LocalePricingContextValue | null>(null);

export function useLocalePricing(): LocalePricingContextValue {
  const context = useContext(LocalePricingContext);
  if (!context) {
    throw new Error('useLocalePricing must be used within LocalePricingProvider');
  }
  return context;
}
