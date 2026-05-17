import projectMobile from '@/assets/project-mobile.jpg';
import projectWeb from '@/assets/project-web.jpg';
import projectEcommerce from '@/assets/project-ecommerce.jpg';

export type ProjectFilter = 'all' | 'web' | 'mobile' | 'seo' | 'ecommerce';

export type CaseStudyMetric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  id: number;
  title: string;
  client: string;
  category: string;
  filters: Exclude<ProjectFilter, 'all'>[];
  featured?: boolean;
  problem: string;
  solution: string;
  results: CaseStudyMetric[];
  image: string;
  tags: string[];
  website: string | null;
};

export const filterOptions: { id: ProjectFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'seo', label: 'SEO' },
  { id: 'ecommerce', label: 'E-commerce' },
];

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: 'LP Future',
    client: 'Educational consultancy',
    category: 'Web · SEO',
    filters: ['web', 'seo'],
    featured: true,
    problem:
      'Parents couldn’t find clear admission guidance online. The old site had poor SEO and zero lead capture.',
    solution:
      'Rebuilt the site on React with structured content, local SEO, and a guided enquiry funnel for counsellors.',
    results: [
      { value: '3×', label: 'Organic traffic' },
      { value: '62%', label: 'More enquiries' },
      { value: '#1', label: 'Local rankings' },
    ],
    image: projectWeb,
    tags: ['React', 'Node.js', 'TailwindCSS', 'SEO'],
    website: 'https://lpfuture.in',
  },
  {
    id: 2,
    title: 'NaturalWaves',
    client: 'Naturopathy academy',
    category: 'Web · Learning',
    filters: ['web'],
    problem:
      'Course content was scattered across PDFs and WhatsApp. Students dropped off before completing Module 1.',
    solution:
      'Shipped a Next.js learning platform with Stripe payments, progress tracking, and mobile-first lesson UX.',
    results: [
      { value: '4.8★', label: 'Course rating' },
      { value: '2×', label: 'Completion rate' },
      { value: '40%', label: 'Less support tickets' },
    ],
    image: projectWeb,
    tags: ['Next.js', 'MongoDB', 'Stripe', 'Vercel'],
    website: 'https://naturalwaves.com',
  },
  {
    id: 3,
    title: 'The Whiteberry',
    client: "Girls' fashion boutique",
    category: 'E-commerce',
    filters: ['web', 'ecommerce'],
    problem:
      'Instagram-only sales capped growth. Checkout was manual via DMs—slow, error-prone, and unscalable.',
    solution:
      'Launched a full e-commerce store with catalog, PayPal checkout, and brand-forward UI that matches their aesthetic.',
    results: [
      { value: '180%', label: 'Online revenue' },
      { value: '35%', label: 'Repeat customers' },
      { value: '<2s', label: 'Page load' },
    ],
    image: projectEcommerce,
    tags: ['React', 'Node.js', 'PayPal', 'UI/UX'],
    website: 'https://thewhiteberry.in',
  },
  {
    id: 4,
    title: 'Taatom',
    client: 'Travel startup',
    category: 'Mobile app',
    filters: ['mobile'],
    problem:
      'Travelers wanted to share journeys without the noise of generic social feeds. No product existed for memory-first sharing.',
    solution:
      'Designed and built a React Native app with maps, offline journals, and a curated feed focused on trips—not followers.',
    results: [
      { value: '12K+', label: 'Beta signups' },
      { value: '4.6★', label: 'TestFlight rating' },
      { value: '8 wk', label: 'MVP timeline' },
    ],
    image: projectMobile,
    tags: ['React Native', 'Firebase', 'Maps API', 'TypeScript'],
    website: null,
  },
  {
    id: 5,
    title: 'Streamora',
    client: 'Media platform',
    category: 'Web · Streaming',
    filters: ['web'],
    problem:
      'Creators needed a YouTube-style experience without enterprise licensing costs or slow legacy CMS workflows.',
    solution:
      'Built a streaming web app with upload pipelines, adaptive playback, and an admin dashboard on AWS infrastructure.',
    results: [
      { value: '99.9%', label: 'Uptime' },
      { value: '50K+', label: 'Hours streamed' },
      { value: '60%', label: 'Faster uploads' },
    ],
    image: projectWeb,
    tags: ['React', 'Node.js', 'AWS', 'FFmpeg'],
    website: null,
  },
];

export const featuredCaseStudy = caseStudies.find((c) => c.featured) ?? caseStudies[0];

export function filterCaseStudies(filter: ProjectFilter): CaseStudy[] {
  if (filter === 'all') return caseStudies;
  return caseStudies.filter((study) => study.filters.includes(filter));
}
