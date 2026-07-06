export type PricingRegion = 'IN' | 'US' | 'GB' | 'EU' | 'ID' | 'AU' | 'SG' | 'AE';

export type PricingCurrency = 'INR' | 'USD' | 'GBP' | 'EUR' | 'IDR' | 'AUD' | 'SGD' | 'AED';

export type RegionConfig = {
  region: PricingRegion;
  currency: PricingCurrency;
  locale: string;
  /** How many INR equal one unit of this currency */
  inrPerUnit: number;
};

export const REGION_CONFIG: Record<PricingRegion, RegionConfig> = {
  IN: { region: 'IN', currency: 'INR', locale: 'en-IN', inrPerUnit: 1 },
  US: { region: 'US', currency: 'USD', locale: 'en-US', inrPerUnit: 84 },
  GB: { region: 'GB', currency: 'GBP', locale: 'en-GB', inrPerUnit: 106 },
  EU: { region: 'EU', currency: 'EUR', locale: 'en-DE', inrPerUnit: 91 },
  ID: { region: 'ID', currency: 'IDR', locale: 'id-ID', inrPerUnit: 0.0053 },
  AU: { region: 'AU', currency: 'AUD', locale: 'en-AU', inrPerUnit: 55 },
  SG: { region: 'SG', currency: 'SGD', locale: 'en-SG', inrPerUnit: 62 },
  AE: { region: 'AE', currency: 'AED', locale: 'en-AE', inrPerUnit: 23 },
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

export function guessCountryFromNavigator(): string | null {
  if (typeof navigator === 'undefined') return null;

  const language = navigator.language ?? '';
  const parts = language.split('-');
  if (parts.length >= 2 && parts[1].length === 2) {
    return parts[1].toUpperCase();
  }

  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
    if (timezone.includes('Kolkata') || timezone.includes('Calcutta')) return 'IN';
    if (timezone.includes('Jakarta')) return 'ID';
    if (timezone.includes('Singapore')) return 'SG';
    if (timezone.includes('London')) return 'GB';
    if (timezone.includes('Sydney') || timezone.includes('Melbourne')) return 'AU';
    if (timezone.includes('Dubai')) return 'AE';
  } catch {
    // ignore
  }

  return null;
}

export function getSchemaPriceRange(region: PricingRegion): string {
  const symbol = REGION_CONFIG[region].currency;
  if (symbol === 'INR') return '₹₹';
  if (symbol === 'USD' || symbol === 'AUD' || symbol === 'SGD' || symbol === 'AED') return '$$';
  if (symbol === 'GBP') return '££';
  if (symbol === 'EUR') return '€€';
  if (symbol === 'IDR') return 'Rp';
  return '$$';
}
