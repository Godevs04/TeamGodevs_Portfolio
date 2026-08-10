import {
  TrendingUp,
  Rocket,
  Smartphone,
  MousePointerClick,
  Sparkles,
  Server,
} from 'lucide-react';
import type { ProductOffering } from './ProductCard';

/** Base amounts in INR — displayed in the visitor's local currency via LocalePricingProvider */
export const offerings: ProductOffering[] = [
  {
    icon: TrendingUp,
    title: 'SEO & Growth',
    valueProposition: [
      'Capture demand when buyers are searching.',
      'Technical SEO, on-page optimization, and content strategy that turn rankings into qualified pipeline—not vanity traffic.',
    ],
    benefits: [
      'Technical SEO audit & fixes',
      'Content strategy + on-page optimization',
      'Monthly performance reporting',
    ],
    priceFromInr: 5_000,
    priceRecurring: 'month',
    priceNote: 'Scoped to your market & competition',
  },
  {
    icon: Rocket,
    title: 'Web Applications',
    valueProposition: [
      'Custom web applications built with React and Next.js.',
      'Scalable APIs, auth, payments, and admin dashboards—from MVP to production.',
    ],
    benefits: [
      'React / Next.js frontends',
      'API design & Node.js backends',
      'Auth, payments & admin dashboards',
    ],
    priceFromInr: 20_000,
    priceNote: 'Fixed-scope MVP packages available',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    valueProposition: [
      'Cross-platform iOS and Android apps with React Native.',
      'Authentication, payments, notifications, and analytics in one shared codebase.',
    ],
    benefits: [
      'React Native cross-platform builds',
      'Push notifications & offline support',
      'Store submission & release management',
    ],
    priceFromInr: 40_000,
    priceNote: 'Includes 30-day post-launch support',
  },
  {
    icon: MousePointerClick,
    title: 'UI/UX Design',
    valueProposition: [
      'Product interfaces built around conversion and usability.',
      'Flows, wireframes, and Figma systems that reduce friction from landing to checkout.',
    ],
    benefits: [
      'User flows & wireframes',
      'High-fidelity Figma design system',
      'Prototype for stakeholder sign-off',
    ],
    priceFromInr: 10_000,
    priceNote: 'Design-only or dev handoff included',
  },
  {
    icon: Sparkles,
    title: 'Brand Identity',
    valueProposition: [
      'Clear visual identity for product, pitch, and marketing.',
      'Logo systems, guidelines, and assets that look consistent from day one.',
    ],
    benefits: [
      'Logo & visual identity system',
      'Brand guidelines & asset kit',
      'Social & marketing templates',
    ],
    priceFromInr: 5_000,
    priceNote: 'Full rebrand packages on request',
  },
  {
    icon: Server,
    title: 'Cloud & DevOps',
    valueProposition: [
      'CI/CD, staging, and cloud deployment you can trust at launch.',
      'Setup on Vercel, AWS, and Firebase with monitoring that scales with traffic.',
    ],
    benefits: [
      'CI/CD pipelines & staging environments',
      'AWS / Firebase / Vercel setup',
      'Monitoring, alerts & uptime targets',
    ],
    priceFromInr: 5_000,
    priceRecurring: 'month',
    priceNote: 'Retainer or per-project setup',
  },
];

export const differentiators = [
  {
    title: 'Speed without shortcuts',
    description: '2-week sprints with weekly demos—no month-three surprises.',
    stat: '6–8 wk',
    statLabel: 'avg. MVP launch',
  },
  {
    title: 'Production-grade quality',
    description: 'Typed, tested code—not throwaway prototypes.',
    stat: '100%',
    statLabel: 'typed codebase',
  },
  {
    title: 'Dedicated support',
    description: 'Slack + 2hr response. We stay after launch.',
    stat: '24/7',
    statLabel: 'urgent coverage',
  },
  {
    title: 'Transparent pricing',
    description: 'Fixed quotes upfront. No surprise change orders.',
    stat: '0',
    statLabel: 'hidden fees',
  },
];

export type TechStackItem = {
  name: string;
  /** Simple Icons slug — https://simpleicons.org */
  slug: string;
  color: string;
  abbr: string;
};

export const techStack: TechStackItem[] = [
  { name: 'React', slug: 'react', color: '#61DAFB', abbr: 'Re' },
  { name: 'Next.js', slug: 'nextdotjs', color: '#000000', abbr: 'Nx' },
  { name: 'Vue.js', slug: 'vuedotjs', color: '#4FC08D', abbr: 'Vu' },
  { name: 'Angular', slug: 'angular', color: '#DD0031', abbr: 'Ng' },
  { name: 'TypeScript', slug: 'typescript', color: '#3178C6', abbr: 'TS' },
  { name: 'Node.js', slug: 'nodedotjs', color: '#339933', abbr: 'No' },
  { name: 'Shopify', slug: 'shopify', color: '#7AB55C', abbr: 'Sh' },
  { name: 'n8n automations', slug: 'n8n', color: '#EA4B71', abbr: 'n8' },
  { name: 'Supabase', slug: 'supabase', color: '#3FCF8E', abbr: 'Sb' },
  { name: 'Firebase', slug: 'firebase', color: '#FFCA28', abbr: 'Fi' },
  { name: 'MongoDB', slug: 'mongodb', color: '#47A248', abbr: 'Mo' },
  { name: 'PostgreSQL', slug: 'postgresql', color: '#4169E1', abbr: 'Pg' },
  { name: 'Tailwind CSS', slug: 'tailwindcss', color: '#06B6D4', abbr: 'Tw' },
  { name: 'AWS', slug: 'amazonwebservices', color: '#FF9900', abbr: 'AW' },
  { name: 'Docker', slug: 'docker', color: '#2496ED', abbr: 'Dc' },
  { name: 'React Native', slug: 'react', color: '#61DAFB', abbr: 'RN' },
  { name: 'Flutter', slug: 'flutter', color: '#02569B', abbr: 'Fl' },
  { name: 'Stripe', slug: 'stripe', color: '#635BFF', abbr: 'St' },
  { name: 'Vercel', slug: 'vercel', color: '#000000', abbr: 'Ve' },
];
