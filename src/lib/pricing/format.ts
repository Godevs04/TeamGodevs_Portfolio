import {
  REGION_CONFIG,
  type PricingCurrency,
  type PricingRegion,
  type RegionConfig,
} from './regions';

function getConfig(region: PricingRegion): RegionConfig {
  return REGION_CONFIG[region];
}

function roundForCurrency(amount: number, currency: PricingCurrency): number {
  if (currency === 'INR') {
    if (amount >= 100_000) return Math.round(amount / 10_000) * 10_000;
    if (amount >= 10_000) return Math.round(amount / 1_000) * 1_000;
    return Math.round(amount / 100) * 100;
  }

  if (currency === 'IDR') {
    if (amount >= 1_000_000) return Math.round(amount / 100_000) * 100_000;
    return Math.round(amount / 50_000) * 50_000;
  }

  if (amount >= 10_000) return Math.round(amount / 100) * 100;
  if (amount >= 1_000) return Math.round(amount / 50) * 50;
  return Math.round(amount / 10) * 10;
}

export function convertInrToLocal(amountInr: number, region: PricingRegion): number {
  const { inrPerUnit } = getConfig(region);
  if (inrPerUnit <= 0) return amountInr;
  return roundForCurrency(amountInr / inrPerUnit, getConfig(region).currency);
}

export function getCurrencySymbol(region: PricingRegion): string {
  const { currency, locale } = getConfig(region);
  const parts = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  }).formatToParts(0);

  return parts.find((part) => part.type === 'currency')?.value ?? currency;
}

export function formatMoney(amountInr: number, region: PricingRegion): string {
  const config = getConfig(region);
  const localAmount = convertInrToLocal(amountInr, region);

  return new Intl.NumberFormat(config.locale, {
    style: 'currency',
    currency: config.currency,
    maximumFractionDigits: 0,
  }).format(localAmount);
}

export function formatCompactMoney(amountInr: number, region: PricingRegion): string {
  const config = getConfig(region);
  const localAmount = convertInrToLocal(amountInr, region);

  if (region === 'IN' && localAmount >= 100_000) {
    const lakhs = localAmount / 100_000;
    const formatted = Number.isInteger(lakhs) ? String(lakhs) : lakhs.toFixed(1);
    return `₹${formatted}L`;
  }

  if (localAmount >= 1_000_000) {
    const millions = localAmount / 1_000_000;
    const formatted = Number.isInteger(millions) ? String(millions) : millions.toFixed(1);
    return `${getCurrencySymbol(region)}${formatted}M`;
  }

  if (localAmount >= 1_000 && config.currency !== 'INR') {
    const thousands = localAmount / 1_000;
    const formatted = Number.isInteger(thousands) ? String(thousands) : thousands.toFixed(1);
    return `${getCurrencySymbol(region)}${formatted}K`;
  }

  return formatMoney(amountInr, region);
}

export function formatFromPrice(
  amountInr: number,
  region: PricingRegion,
  recurring?: 'month'
): string {
  const price = formatMoney(amountInr, region);
  return recurring ? `From ${price}/mo` : `From ${price}`;
}

export type BudgetRangeKey =
  | 'under-50k'
  | '50k-1.5l'
  | '1.5l-5l'
  | '5l-plus'
  | 'undecided';

export function formatBudgetRange(key: string, region: PricingRegion): string {
  switch (key as BudgetRangeKey) {
    case 'under-50k':
      return `Under ${formatMoney(50_000, region)}`;
    case '50k-1.5l':
      return `${formatMoney(50_000, region)} – ${formatCompactMoney(150_000, region)}`;
    case '1.5l-5l':
      return `${formatCompactMoney(150_000, region)} – ${formatCompactMoney(500_000, region)}`;
    case '5l-plus':
      return `${formatCompactMoney(500_000, region)}+`;
    case 'undecided':
      return 'Not sure yet';
    default:
      return key;
  }
}

export function getBudgetRangeOptions(region: PricingRegion) {
  return [
    { value: 'under-50k', label: formatBudgetRange('under-50k', region) },
    { value: '50k-1.5l', label: formatBudgetRange('50k-1.5l', region) },
    { value: '1.5l-5l', label: formatBudgetRange('1.5l-5l', region) },
    { value: '5l-plus', label: formatBudgetRange('5l-plus', region) },
    { value: 'undecided', label: formatBudgetRange('undecided', region) },
  ] as const;
}

export function formatMrrExample(amountInr: number, region: PricingRegion): string {
  return formatCompactMoney(amountInr, region);
}

export const CURRENCY_METRIC_TOKEN = '__CURRENCY__';

export function resolveMetricDisplayValue(value: string, currencySymbol: string): string {
  if (value === CURRENCY_METRIC_TOKEN) return currencySymbol;
  return value;
}
