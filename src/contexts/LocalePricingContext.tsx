import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  formatBudgetRange,
  formatCompactMoney,
  formatFromPrice,
  formatMoney,
  formatMrrExample,
  getBudgetRangeOptions,
  getCurrencySymbol,
  guessCountryFromNavigator,
  resolvePricingRegion,
  type PricingRegion,
} from '@/lib/pricing';
import {
  LocalePricingContext,
  type LocalePricingContextValue,
} from '@/hooks/use-locale-pricing';

type GeoResponse = {
  country?: string | null;
  region?: PricingRegion;
};

export function LocalePricingProvider({ children }: { children: ReactNode }) {
  const [country, setCountry] = useState<string | null>(() => guessCountryFromNavigator());
  const [region, setRegion] = useState<PricingRegion>(() =>
    resolvePricingRegion(guessCountryFromNavigator())
  );
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const resolveFromFallback = () => {
      const guessedCountry = guessCountryFromNavigator();
      setCountry(guessedCountry);
      setRegion(resolvePricingRegion(guessedCountry));
    };

    fetch('/api/geo')
      .then((response) => (response.ok ? response.json() : Promise.reject(response)))
      .then((data: GeoResponse) => {
        if (cancelled) return;
        const detectedCountry = data.country ?? null;
        setCountry(detectedCountry);
        setRegion(data.region ?? resolvePricingRegion(detectedCountry));
      })
      .catch(() => {
        if (!cancelled) resolveFromFallback();
      })
      .finally(() => {
        if (!cancelled) setIsReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<LocalePricingContextValue>(
    () => ({
      country,
      region,
      isReady,
      formatMoney: (amountInr) => formatMoney(amountInr, region),
      formatCompactMoney: (amountInr) => formatCompactMoney(amountInr, region),
      formatFromPrice: (amountInr, recurring) => formatFromPrice(amountInr, region, recurring),
      formatBudgetRange: (key) => formatBudgetRange(key, region),
      formatMrrExample: (amountInr) => formatMrrExample(amountInr, region),
      getBudgetRangeOptions: () => getBudgetRangeOptions(region),
      currencySymbol: getCurrencySymbol(region),
    }),
    [country, region, isReady]
  );

  return (
    <LocalePricingContext.Provider value={value}>{children}</LocalePricingContext.Provider>
  );
}
