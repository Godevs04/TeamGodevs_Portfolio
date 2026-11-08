import { SITE } from '@/lib/site';

/** Replace with your Calendly embed URL when ready */
export const CALENDLY_EMBED_URL = 'https://calendly.com/godevsteam/30min';

export const WHATSAPP_NUMBER = '919677723429';
export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi TeamGoDevs! I'd like to discuss a project."
);
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export const PROJECT_TYPES = [
  { value: 'web', label: 'Web application' },
  { value: 'mobile', label: 'Mobile app' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'seo', label: 'SEO & growth' },
  { value: 'design', label: 'UI/UX & branding' },
  { value: 'other', label: 'Other / not sure' },
] as const;

export const BUDGET_RANGE_KEYS = [
  'under-50k',
  '50k-1.5l',
  '1.5l-5l',
  '5l-plus',
  'undecided',
] as const;

export const QUICK_BENEFITS = [
  'Free 30-min discovery call',
  'Fixed quote within 48 hours',
  'NDA available on request',
  'No commitment to start',
];

export const CONTACT_DETAILS = {
  email: SITE.email,
  phone: SITE.phone,
  address: SITE.addressDisplay,
  hours: SITE.hours,
};
