/** Canonical site configuration — single source of truth for domain & contact */
export const SITE = {
  name: 'TeamGoDevs',
  legalName: 'TeamGoDevs',
  tagline: 'Web, Mobile & SaaS Product Development Studio',
  /** Prefer www — keep consistent across canonical, sitemap, schema, and OG */
  url: 'https://www.teamgodevs.in',
  email: 'hello@teamgodevs.in',
  phone: '+91 96777 23429',
  phoneTel: '+919677723429',
  locale: 'en_IN',
  language: 'en',
  foundingYear: 2019,
  address: {
    streetAddress: 'HSR Layout',
    addressLocality: 'Bengaluru',
    addressRegion: 'Karnataka',
    postalCode: '560102',
    addressCountry: 'IN',
  },
  addressDisplay: 'HSR Layout, Bengaluru, Karnataka, India',
  hours: 'Mon – Fri, 10:00 AM – 7:00 PM IST',
  /** Add verified profile URLs when available — used in JSON-LD sameAs */
  sameAs: [] as string[],
} as const;

export const SITE_TITLE =
  'TeamGoDevs — Web, Mobile & SaaS Product Development Studio';

export const SITE_DESCRIPTION =
  'TeamGoDevs designs and builds web apps, mobile apps, SaaS products, and digital platforms for startups and growing businesses. React, Next.js, React Native — hello@teamgodevs.in.';

export const SITE_KEYWORDS = [
  'TeamGoDevs',
  'software development company',
  'web development company',
  'mobile app development',
  'SaaS development',
  'React development',
  'Next.js development',
  'React Native app development',
  'MVP development',
  'digital product studio',
  'UI UX design',
  'ecommerce development',
  'CRM development',
  'custom software development',
].join(', ');

/** Social share preview — 1200×630 */
export const OG_IMAGE_PATH = '/og-image.png';

export const absoluteUrl = (path = '/') => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === '/') return `${SITE.url}/`;
  return `${SITE.url}${normalized}`;
};

export const mailto = (subject?: string, body?: string) => {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return `mailto:${SITE.email}${query ? `?${query}` : ''}`;
};
