import { z } from 'zod';

export const contactInquirySchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120),
  email: z.string().trim().email('Valid email is required').max(254),
  projectType: z.string().trim().min(1, 'Project type is required'),
  budget: z.string().trim().min(1, 'Budget is required'),
  message: z.string().trim().min(1, 'Message is required').max(5000),
});

/** Client payload — includes anti-bot fields stripped server-side before persistence */
export const contactSubmissionBodySchema = contactInquirySchema.extend({
  companyWebsite: z.string().max(200).optional().default(''),
  formStartedAt: z.number().int().positive().optional(),
});

export type ContactInquiryPayload = z.infer<typeof contactInquirySchema>;
export type ContactSubmissionBody = z.infer<typeof contactSubmissionBodySchema>;

export const PROJECT_TYPE_LABELS: Record<string, string> = {
  web: 'Web application',
  mobile: 'Mobile app',
  ecommerce: 'E-commerce',
  seo: 'SEO & growth',
  design: 'UI/UX & branding',
  other: 'Other / not sure',
};

export const BUDGET_LABELS: Record<string, string> = {
  'under-50k': 'Under ₹50,000',
  '50k-1.5l': '₹50,000 – ₹1.5L',
  '1.5l-5l': '₹1.5L – ₹5L',
  '5l-plus': '₹5L+',
  undecided: 'Not sure yet',
};

export function formatProjectType(value: string): string {
  return PROJECT_TYPE_LABELS[value] ?? value;
}

export function formatBudget(value: string): string {
  return BUDGET_LABELS[value] ?? value;
}
