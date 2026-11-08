export type TestimonialMetric = {
  value: string;
  label: string;
};

export type BeforeAfter = {
  metric: string;
  before: string;
  after: string;
  growth: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  result: string;
  name: string;
  role: string;
  company: string;
  category: string;
  avatar: string;
  rating: number;
  project: string;
  beforeAfter: BeforeAfter;
  impact: TestimonialMetric[];
};

const avatar = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=059669&color=fff&size=128&bold=true`;

export const testimonials: Testimonial[] = [
  {
    id: 'lp-future',
    quote:
      'We went from scattered WhatsApp threads to a platform students actually finish applications on. TeamGoDevs understood admissions—not just pixels.',
    result:
      'Inquiry follow-ups got faster and the student journey finally felt intentional, not like a PDF dump.',
    name: 'Ram',
    role: 'Founder',
    company: 'LP Future',
    category: 'Education',
    avatar: avatar('Ram'),
    rating: 5,
    project: 'Admissions platform',
    beforeAfter: {
      metric: 'Inquiry response workflow',
      before: 'Manual, scattered',
      after: 'Structured + trackable',
      growth: 'Clearer ops',
    },
    impact: [
      { value: 'PWA', label: 'Student-ready' },
      { value: 'WhatsApp', label: 'Inquiry flow' },
      { value: 'Responsive', label: 'Mobile-first' },
    ],
  },
  {
    id: 'ks-mens-wear',
    quote:
      'Stock and billing used to disagree every week. Now one dashboard tells the truth—and my team trusts the numbers.',
    result:
      'Inventory mismatches dropped and end-of-day billing stopped being a two-hour reconciliation exercise.',
    name: 'Niranjan',
    role: 'Founder',
    company: 'KS Mens Wear',
    category: 'Retail ERP',
    avatar: avatar('Niranjan'),
    rating: 5,
    project: 'Business ERP',
    beforeAfter: {
      metric: 'Stock vs books alignment',
      before: 'Weekly mismatches',
      after: 'Daily confidence',
      growth: 'Ops clarity',
    },
    impact: [
      { value: 'Live', label: 'Reports' },
      { value: 'Roles', label: 'Admin access' },
      { value: 'Faster', label: 'Billing' },
    ],
  },
  {
    id: 'taatom',
    quote:
      'Taatom is not a landing page—it is feeds, payments, admin, and two app stores. They treated it like a product company, not a vendor ticket queue.',
    result:
      'We shipped a real multi-platform travel social product with room to iterate without rewriting the foundation.',
    name: 'Kavin & Ayush',
    role: 'Co-founders',
    company: 'Taatom',
    category: 'Social · Travel',
    avatar: avatar('Kavin Ayush'),
    rating: 5,
    project: 'Travel social platform',
    beforeAfter: {
      metric: 'Platform surface area',
      before: 'Concept + fragments',
      after: 'iOS, Android, admin',
      growth: 'Full stack',
    },
    impact: [
      { value: 'Realtime', label: 'Feeds' },
      { value: 'Payments', label: 'Integrated' },
      { value: 'Multi-cloud', label: 'Infra' },
    ],
  },
  {
    id: 'budget-boy',
    quote:
      'BudgetBoy does not preach savings—it shows where money leaks on recharge plans. That clarity is what we wanted, and they built it without bloat.',
    result:
      'Families finally compare plans with context instead of guessing from bill shock at month-end.',
    name: 'Rajesh',
    role: 'Working professional',
    company: 'BudgetBoy',
    category: 'Fintech utility',
    avatar: avatar('Rajesh'),
    rating: 5,
    project: 'Recharge optimization',
    beforeAfter: {
      metric: 'Plan comparison clarity',
      before: 'Guesswork',
      after: 'Usage-based picks',
      growth: 'Smarter spend',
    },
    impact: [
      { value: 'Usage', label: 'Insights' },
      { value: 'Transparent', label: 'Analysis' },
      { value: 'Simple', label: 'UX' },
    ],
  },
  {
    id: 'spotlight',
    quote:
      'We needed an iOS MVP to test social loops—not a six-month roadmap deck. They moved fast, integrated realtime chat, and left us room to learn.',
    result:
      'SpotLight hit TestFlight with the core loop intact, so we could validate engagement before overbuilding.',
    name: 'Roshan',
    role: 'Founder',
    company: 'SpotLight',
    category: 'Social MVP',
    avatar: avatar('Roshan'),
    rating: 5,
    project: 'iOS social MVP',
    beforeAfter: {
      metric: 'Time to testable MVP',
      before: 'Unclear scope',
      after: 'Shipped on iOS',
      growth: 'Validation-ready',
    },
    impact: [
      { value: 'Realtime', label: 'Chat' },
      { value: 'MVP', label: 'Shipped' },
      { value: 'iOS', label: 'First platform' },
    ],
  },
  {
    id: 'sana',
    quote:
      'Shared rent math was breaking friendships. Balances update live, settlements are obvious, and Telegram pings mean nobody chases spreadsheets at midnight.',
    result:
      'Our house runs on one source of truth—fewer awkward conversations, fewer “I already paid” disputes.',
    name: 'Abdullah & Dinesh',
    role: 'HR & Management',
    company: 'Sana Fathima Mansion',
    category: 'Expense sharing',
    avatar: avatar('Abdullah Dinesh'),
    rating: 5,
    project: 'Shared expenses',
    beforeAfter: {
      metric: 'Settlement clarity',
      before: 'Manual splits',
      after: 'Live balances',
      growth: 'Less friction',
    },
    impact: [
      { value: 'Live', label: 'Balances' },
      { value: 'Telegram', label: 'Alerts' },
      { value: '1-tap', label: 'Settlements' },
    ],
  },
  {
    id: 'whiteberry',
    quote:
      'The WhiteBerry had to feel boutique online—not marketplace generic. The storefront, checkout, and mobile experience finally match how we sell in person.',
    result:
      'Customers browse collections comfortably on phone, and the brand reads premium end-to-end.',
    name: 'Arthi',
    role: 'Founder',
    company: 'The WhiteBerry',
    category: 'E-commerce',
    avatar: avatar('Arthi'),
    rating: 5,
    project: 'Boutique storefront',
    beforeAfter: {
      metric: 'Online brand feel',
      before: 'Inconsistent',
      after: 'Premium, cohesive',
      growth: 'Store-ready',
    },
    impact: [
      { value: 'Shopify', label: 'Commerce' },
      { value: 'Mobile', label: 'Optimized' },
      { value: 'Payments', label: 'Integrated' },
    ],
  },
];

export const aggregateMetrics: {
  end: number;
  suffix: string;
  label: string;
  decimals?: number;
  /** Static value when counter animation is not appropriate */
  display?: string;
}[] = [
  { end: 9, suffix: '+', label: 'Products shipped' },
  { end: 5, suffix: '/5', label: 'Founder-rated delivery', decimals: 0 },
  { end: 0, suffix: '', label: 'Typical MVP window', display: '6–8 wk' },
  { end: 100, suffix: '%', label: 'Scope-first builds' },
];
