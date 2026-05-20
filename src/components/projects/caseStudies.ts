import imgLpFuture from '@/assets/projects/Client1_LPFuture.png';
import imgKsMensWear from '@/assets/projects/Client2_KsMensWear.png';
import imgTaatom from '@/assets/projects/Client3_Taatom.png';
import imgBhuvinTodos from '@/assets/projects/Client4_BhuvintoDos.png';
import imgBudgetBoy from '@/assets/projects/Clinet5_BudgetBoy.png';
import imgSpotLight from '@/assets/projects/Client6_SpotLight.png';
import imgSana from '@/assets/projects/Client7_Sana.png';
import imgPortfolio3d from '@/assets/projects/Client8_PersonalPortfolio.png';
import imgWhiteberry from '@/assets/projects/Client9_TheWhiteberry.jpeg';

export type ProjectFilter = 'all' | 'web' | 'mobile' | 'ecommerce' | 'saas';

export type CaseStudyVariant = 'default' | 'flagship' | 'showcase3d';

/** Visual layout variant for interactive showcase cards */
export type CaseStudyCardType =
  | 'saas'
  | 'mobile'
  | 'ecommerce'
  | 'showcase3d'
  | 'split'
  | 'cinematic';

export type CaseStudyMetric = {
  value: string;
  label: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  shortDescription: string;
  client: string;
  category: string;
  filters: Exclude<ProjectFilter, 'all'>[];
  variant?: CaseStudyVariant;
  cardType: CaseStudyCardType;
  problem: string;
  solution: string;
  results: CaseStudyMetric[];
  image: string;
  tags: string[];
  website: string | null;
};

export const filterOptions: { id: ProjectFilter; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'web', label: 'Web platforms' },
  { id: 'mobile', label: 'Mobile apps' },
  { id: 'saas', label: 'SaaS & tools' },
  { id: 'ecommerce', label: 'E-commerce' },
];

export const caseStudies: CaseStudy[] = [
  {
    id: 'lp-future',
    title: 'LP Future',
    shortDescription:
      'Educational admission platform helping students choose and apply to colleges efficiently.',
    client: 'LP Future',
    category: 'Education Platform',
    filters: ['web'],
    cardType: 'saas',
    problem: 'Students lacked proper guidance and admission clarity.',
    solution:
      'Built a responsive React educational platform with analytics, PWA support, and WhatsApp inquiry integration.',
    results: [
      { value: '+65%', label: 'Inquiries' },
      { value: '3×', label: 'Faster response' },
      { value: 'PWA', label: 'Enabled' },
    ],
    image: imgLpFuture,
    tags: ['React', 'Express', 'Node.js', 'Tailwind', 'AWS', 'Vercel'],
    website: 'https://lpfuture.vercel.app/',
  },
  {
    id: 'ks-mens-wear',
    title: 'KS Mens Wear ERP',
    shortDescription:
      'Complete business management system for inventory, billing, sales, expenses, and reporting.',
    client: 'KS Mens Wear',
    category: 'SaaS Platform',
    filters: ['web', 'saas'],
    cardType: 'saas',
    problem: 'Manual tracking caused stock mismatch and financial confusion.',
    solution:
      'Built a full-stack ERP dashboard with role management, analytics, stock handling, and reporting.',
    results: [
      { value: '99%', label: 'Stock accuracy' },
      { value: '2×', label: 'Faster billing' },
      { value: 'Live', label: 'Reports' },
    ],
    image: imgKsMensWear,
    tags: ['Next.js', 'React', 'Tailwind', 'Render', 'Vercel'],
    website: 'https://www.ksmenswear.shop/',
  },
  {
    id: 'taatom',
    title: 'Taatom',
    shortDescription:
      'Global travel-focused social media app with real-time interactions and admin infrastructure.',
    client: 'Taatom',
    category: 'Social App',
    filters: ['web', 'mobile', 'saas'],
    variant: 'flagship',
    cardType: 'mobile',
    problem: 'Travel creators lacked a dedicated real-time social platform.',
    solution:
      'Built scalable mobile + web ecosystem with admin panel, payments, realtime feeds, and cloud infrastructure.',
    results: [
      { value: 'iOS + Android', label: 'Shipped' },
      { value: 'Realtime', label: 'Feeds' },
      { value: 'Multi-cloud', label: 'Infra' },
    ],
    image: imgTaatom,
    tags: [
      'React Native',
      'Next.js',
      'Express',
      'MongoDB',
      'Vite',
      'Cashfree',
      'Sentry',
    ],
    website: 'https://www.taatom.com',
  },
  {
    id: 'bhuvin-todos',
    title: 'Bhuvin ToDos',
    shortDescription: 'Minimal productivity platform designed for civil service aspirants.',
    client: 'Bhuvin ToDos',
    category: 'SaaS Platform',
    filters: ['web', 'saas'],
    cardType: 'split',
    problem: 'Students struggled with consistency and motivation.',
    solution:
      'Built a calm productivity tracker with motivational UX and mobile-first simplicity.',
    results: [
      { value: 'Fast', label: 'UX' },
      { value: 'Motivational', label: 'UI' },
      { value: 'PWA', label: 'Ready' },
    ],
    image: imgBhuvinTodos,
    tags: ['Next.js', 'Framer Motion', 'Tailwind'],
    website: 'https://bhuvin-todos.vercel.app/',
  },
  {
    id: 'budget-boy',
    title: 'BudgetBoy',
    shortDescription:
      'Smart recharge optimization platform helping families save money on telecom plans.',
    client: 'BudgetBoy',
    category: 'SaaS Platform',
    filters: ['web', 'saas'],
    cardType: 'saas',
    problem: 'Users overpaid due to poor recharge planning and unclear plan comparisons.',
    solution:
      'Built intelligent usage-based recommendation engine with transparent telecom analysis.',
    results: [
      { value: '₹', label: 'Savings optimized' },
      { value: 'Smart', label: 'Plan analysis' },
      { value: 'Usage', label: 'Insights' },
    ],
    image: imgBudgetBoy,
    tags: ['Next.js', 'Tailwind', 'Framer Motion'],
    website: 'https://budgetboy.teamgodevs.in/',
  },
  {
    id: 'spotlight',
    title: 'SpotLight',
    shortDescription: 'Instagram-style MVP social platform delivered for iOS.',
    client: 'SpotLight',
    category: 'Social App',
    filters: ['mobile'],
    cardType: 'mobile',
    problem: 'Client needed rapid MVP launch for social engagement testing.',
    solution:
      'Built scalable React Native MVP with realtime backend integrations.',
    results: [
      { value: 'Realtime', label: 'Chat' },
      { value: 'MVP', label: 'Shipped' },
      { value: 'iOS', label: 'First' },
    ],
    image: imgSpotLight,
    tags: ['React Native', 'Clerk', 'Convex', 'Tailwind', 'Sentry'],
    website: null,
  },
  {
    id: 'sana',
    title: 'Sana Fathima Mansion',
    shortDescription: 'Shared room expense management platform for families and bachelors.',
    client: 'Sana Fathima Mansion',
    category: 'SaaS Platform',
    filters: ['web', 'saas'],
    cardType: 'split',
    problem: 'Manual expense splitting caused confusion and payment imbalance.',
    solution:
      'Built modern expense-sharing dashboard with settlements and Telegram notifications.',
    results: [
      { value: 'Live', label: 'Balances' },
      { value: 'Telegram', label: 'Alerts' },
      { value: '1-tap', label: 'Settlements' },
    ],
    image: imgSana,
    tags: ['Next.js', 'NextAuth', 'Tailwind', 'Framer Motion', 'shadcn/ui'],
    website: 'https://sana.sukeshiitj.me/',
  },
  {
    id: 'portfolio-3d',
    title: '3D Portfolio Experience',
    shortDescription: 'Immersive Three.js portfolio experience with animated interactions.',
    client: 'Developer showcase',
    category: '3D Experience',
    filters: ['web'],
    variant: 'showcase3d',
    cardType: 'showcase3d',
    problem: 'Traditional portfolios lacked creativity and immersion.',
    solution: 'Built fully interactive 3D portfolio using Three.js and GSAP animations.',
    results: [
      { value: '3D', label: 'Interactions' },
      { value: 'GSAP', label: 'Animations' },
      { value: 'Immersive', label: 'UX' },
    ],
    image: imgPortfolio3d,
    tags: ['Three.js', 'GSAP', 'Vercel'],
    website: 'https://three-js-port-folio.vercel.app/',
  },
  {
    id: 'whiteberry',
    title: 'The WhiteBerry',
    shortDescription:
      'Modern fashion ecommerce experience for boutique clothing and curated collections.',
    client: 'The WhiteBerry',
    category: 'E-commerce',
    filters: ['web', 'ecommerce'],
    cardType: 'ecommerce',
    problem: 'Client needed premium online shopping presence for boutique sales.',
    solution:
      'Built Shopify-powered ecommerce with payment integration and modern branding.',
    results: [
      { value: 'Premium', label: 'Storefront' },
      { value: 'Payments', label: 'Integrated' },
      { value: 'Mobile', label: 'Optimized' },
    ],
    image: imgWhiteberry,
    tags: ['Shopify', 'Payment Gateway'],
    website: 'https://www.thewhiteberry.in',
  },
];

export const flagshipStudy = caseStudies.find((c) => c.variant === 'flagship')!;

export function filterCaseStudies(filter: ProjectFilter): CaseStudy[] {
  if (filter === 'all') return caseStudies;
  return caseStudies.filter((study) => study.filters.includes(filter));
}
