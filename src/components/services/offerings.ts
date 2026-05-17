import {
  TrendingUp,
  Rocket,
  Smartphone,
  MousePointerClick,
  Sparkles,
  Server,
} from 'lucide-react';
import type { ProductOffering } from './ProductCard';

export const offerings: ProductOffering[] = [
  {
    icon: TrendingUp,
    title: 'SEO & Growth',
    valueProposition: [
      'Capture demand when buyers are searching.',
      'Turn rankings into qualified pipeline—not vanity traffic.',
    ],
    benefits: [
      'Technical SEO audit & fixes',
      'Content strategy + on-page optimization',
      'Monthly performance reporting',
    ],
    priceFrom: 'From ₹25,000/mo',
    priceNote: 'Scoped to your market & competition',
  },
  {
    icon: Rocket,
    title: 'Web Applications',
    valueProposition: [
      'Ship production-ready web apps in weeks.',
      'Architecture that scales from MVP to enterprise.',
    ],
    benefits: [
      'React / Next.js frontends',
      'API design & Node.js backends',
      'Auth, payments & admin dashboards',
    ],
    priceFrom: 'From ₹1,50,000',
    priceNote: 'Fixed-scope MVP packages available',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    valueProposition: [
      'One codebase. iOS & Android. App Store ready.',
      'Ship faster without maintaining two native teams.',
    ],
    benefits: [
      'React Native cross-platform builds',
      'Push notifications & offline support',
      'Store submission & release management',
    ],
    priceFrom: 'From ₹2,00,000',
    priceNote: 'Includes 30-day post-launch support',
  },
  {
    icon: MousePointerClick,
    title: 'UI/UX Design',
    valueProposition: [
      'Interfaces built around conversion, not aesthetics alone.',
      'Reduce friction from landing page to checkout.',
    ],
    benefits: [
      'User flows & wireframes',
      'High-fidelity Figma design system',
      'Prototype for stakeholder sign-off',
    ],
    priceFrom: 'From ₹40,000',
    priceNote: 'Design-only or dev handoff included',
  },
  {
    icon: Sparkles,
    title: 'Brand Identity',
    valueProposition: [
      'Look funded and trustworthy from day one.',
      'Stand out in pitch decks, ads, and product UI.',
    ],
    benefits: [
      'Logo & visual identity system',
      'Brand guidelines & asset kit',
      'Social & marketing templates',
    ],
    priceFrom: 'From ₹30,000',
    priceNote: 'Full rebrand packages on request',
  },
  {
    icon: Server,
    title: 'Cloud & DevOps',
    valueProposition: [
      'Deploy with confidence. Sleep through launch night.',
      'Infra that grows with traffic—not your AWS bill panic.',
    ],
    benefits: [
      'CI/CD pipelines & staging environments',
      'AWS / Firebase / Vercel setup',
      'Monitoring, alerts & 99.9% uptime targets',
    ],
    priceFrom: 'From ₹20,000/mo',
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

export const techStack = [
  { name: 'React', color: '#61DAFB', abbr: 'React' },
  { name: 'Next.js', color: '#171717', abbr: 'Next' },
  { name: 'TypeScript', color: '#3178C6', abbr: 'TS' },
  { name: 'Node.js', color: '#339933', abbr: 'Node' },
  { name: 'Firebase', color: '#FFCA28', abbr: 'Firebase' },
  { name: 'MongoDB', color: '#47A248', abbr: 'Mongo' },
  { name: 'Tailwind CSS', color: '#06B6D4', abbr: 'Tailwind' },
  { name: 'AWS', color: '#FF9900', abbr: 'AWS' },
  { name: 'React Native', color: '#61DAFB', abbr: 'RN' },
  { name: 'Stripe', color: '#635BFF', abbr: 'Stripe' },
];
