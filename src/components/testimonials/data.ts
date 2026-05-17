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
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  rating: number;
  project: string;
  beforeAfter: BeforeAfter;
  impact: TestimonialMetric[];
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechStart Solutions',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format',
    quote:
      'TeamGoDevs didn’t just redesign our site—they built a growth engine. Organic leads tripled in six months.',
    rating: 5,
    project: 'SEO & Mobile App',
    beforeAfter: {
      metric: 'Monthly organic leads',
      before: '42',
      after: '168',
      growth: '+300%',
    },
    impact: [
      { value: '400%', label: 'Traffic growth' },
      { value: '25K+', label: 'App downloads' },
      { value: '6 mo', label: 'To results' },
    ],
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Marketing Director',
    company: 'EcoCommerce Ltd',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format',
    quote:
      'Our checkout used to live in DMs. Now it’s a real store—and revenue finally matches our Instagram demand.',
    rating: 5,
    project: 'E-commerce Platform',
    beforeAfter: {
      metric: 'Online conversion rate',
      before: '1.2%',
      after: '2.8%',
      growth: '+133%',
    },
    impact: [
      { value: '2×', label: 'Conversion rate' },
      { value: '180%', label: 'Online revenue' },
      { value: '<2s', label: 'Load time' },
    ],
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Founder',
    company: 'HealthFirst Clinic',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format',
    quote:
      'Patients book online in seconds. Our front desk finally focuses on care—not phone tag.',
    rating: 5,
    project: 'Healthcare App',
    beforeAfter: {
      metric: 'Online appointments / week',
      before: '28',
      after: '112',
      growth: '+300%',
    },
    impact: [
      { value: '300%', label: 'Bookings' },
      { value: '4.9★', label: 'Patient rating' },
      { value: '40%', label: 'Less no-shows' },
    ],
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Operations Manager',
    company: 'LogiFlow Industries',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format',
    quote:
      'One dashboard replaced five spreadsheets. The team actually uses it—because it was built for how we work.',
    rating: 5,
    project: 'Web Application',
    beforeAfter: {
      metric: 'Team productivity index',
      before: '62',
      after: '155',
      growth: '+150%',
    },
    impact: [
      { value: '250%', label: 'Productivity' },
      { value: '5→1', label: 'Tools replaced' },
      { value: '8 wk', label: 'Delivery' },
    ],
  },
];

export const aggregateMetrics: {
  end: number;
  suffix: string;
  label: string;
  decimals?: number;
}[] = [
  { end: 98, suffix: '%', label: 'Client satisfaction' },
  { end: 4.9, suffix: '/5', label: 'Average rating', decimals: 1 },
  { end: 300, suffix: '%', label: 'Avg. growth delivered' },
  { end: 50, suffix: '+', label: 'Projects completed' },
];
