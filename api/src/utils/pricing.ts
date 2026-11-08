/**
 * Server copy of the regional pricing helpers used to format budgets in emails.
 * Keep REGION_CONFIG in sync with web/src/lib/pricing/regions.ts.
 */
export type PricingRegion = 'IN' | 'US' | 'GB' | 'EU' | 'ID' | 'AU' | 'SG' | 'AE';

type PricingCurrency = 'INR' | 'USD' | 'GBP' | 'EUR' | 'IDR' | 'AUD' | 'SGD' | 'AED';

type RegionConfig = {
  currency: PricingCurrency;
  locale: string;
  /** How many INR equal one unit of this currency */
  inrPerUnit: number;
};

const REGION_CONFIG: Record<PricingRegion, RegionConfig> = {
  IN: { currency: 'INR', locale: 'en-IN', inrPerUnit: 1 },
  US: { currency: 'USD', locale: 'en-US', inrPerUnit: 84 },
  GB: { currency: 'GBP', locale: 'en-GB', inrPerUnit: 106 },
  EU: { currency: 'EUR', locale: 'en-DE', inrPerUnit: 91 },
  ID: { currency: 'IDR', locale: 'id-ID', inrPerUnit: 0.0053 },
  AU: { currency: 'AUD', locale: 'en-AU', inrPerUnit: 55 },
  SG: { currency: 'SGD', locale: 'en-SG', inrPerUnit: 62 },
  AE: { currency: 'AED', locale: 'en-AE', inrPerUnit: 23 },
};

const EU_COUNTRY_CODES = new Set([
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT',
  'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE', 'CH', 'NO', 'IS',
]);

const GULF_COUNTRY_CODES = new Set(['AE', 'SA', 'QA', 'KW', 'BH', 'OM']);

export function resolvePricingRegion(countryCode: string | null | undefined): PricingRegion {
  if (!countryCode) return 'US';

  const code = countryCode.trim().toUpperCase();
  if (code === 'IN') return 'IN';
  if (code === 'US' || code === 'CA') return 'US';
  if (code === 'GB') return 'GB';
  if (code === 'ID') return 'ID';
  if (code === 'AU' || code === 'NZ') return 'AU';
  if (code === 'SG') return 'SG';
  if (GULF_COUNTRY_CODES.has(code)) return 'AE';
  if (EU_COUNTRY_CODES.has(code)) return 'EU';

  return 'US';
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

function convertInrToLocal(amountInr: number, region: PricingRegion): number {
  const { inrPerUnit, currency } = REGION_CONFIG[region];
  if (inrPerUnit <= 0) return amountInr;
  return roundForCurrency(amountInr / inrPerUnit, currency);
}

function getCurrencySymbol(region: PricingRegion): string {
  const { currency, locale } = REGION_CONFIG[region];
  const parts = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
  }).formatToParts(0);

  return parts.find((part) => part.type === 'currency')?.value ?? currency;
}

function formatMoney(amountInr: number, region: PricingRegion): string {
  const { locale, currency } = REGION_CONFIG[region];
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(convertInrToLocal(amountInr, region));
}

function formatCompactMoney(amountInr: number, region: PricingRegion): string {
  const { currency } = REGION_CONFIG[region];
  const localAmount = convertInrToLocal(amountInr, region);

  if (region === 'IN' && localAmount >= 100_000) {
    const lakhs = localAmount / 100_000;
    return `₹${Number.isInteger(lakhs) ? String(lakhs) : lakhs.toFixed(1)}L`;
  }

  if (localAmount >= 1_000_000) {
    const millions = localAmount / 1_000_000;
    return `${getCurrencySymbol(region)}${Number.isInteger(millions) ? String(millions) : millions.toFixed(1)}M`;
  }

  if (localAmount >= 1_000 && currency !== 'INR') {
    const thousands = localAmount / 1_000;
    return `${getCurrencySymbol(region)}${Number.isInteger(thousands) ? String(thousands) : thousands.toFixed(1)}K`;
  }

  return formatMoney(amountInr, region);
}

export function formatBudgetRange(key: string, region: PricingRegion): string {
  switch (key) {
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

/** Formats an amount in the smallest currency unit (paise) for display. */
export function formatMinorAmount(amountMinor: number, currency: string): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: amountMinor % 100 === 0 ? 0 : 2,
  }).format(amountMinor / 100);
}
