/** Canonical site configuration — single source of truth for domain & contact */
export const SITE = {
  name: 'TeamGoDevs',
  legalName: 'TeamGoDevs',
  tagline: 'Web, mobile & growth studio',
  url: 'https://teamgodevs.in',
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
  'TeamGoDevs — Web & Mobile App Development, SEO & Digital Growth Studio';

export const SITE_DESCRIPTION =
  'TeamGoDevs (teamgodevs.in) designs and ships high-converting websites, mobile apps, and SEO growth systems for startups and SMBs in India. Free discovery call — hello@teamgodevs.in.';

export const SITE_KEYWORDS = [
  'TeamGoDevs',
  'teamgodevs.in',
  'web development company India',
  'mobile app development Bangalore',
  'React development agency',
  'SEO services India',
  'digital product studio',
  'UI UX design',
  'e-commerce development',
  'startup development partner',
  'SaaS development',
  'HSR Layout web developers',
].join(', ');

export const OG_IMAGE_PATH = '/logo-nav.png';

export const absoluteUrl = (path = '/') => {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE.url}${normalized}`;
};

export const mailto = (subject?: string, body?: string) => {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return `mailto:${SITE.email}${query ? `?${query}` : ''}`;
};
