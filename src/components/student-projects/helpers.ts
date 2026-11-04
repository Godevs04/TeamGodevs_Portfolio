import {
  BarChart3,
  Blocks,
  Brain,
  Cloud,
  Cpu,
  FileSearch,
  GraduationCap,
  Lightbulb,
  MessageCircle,
  Presentation,
  Wrench,
  Globe,
  MessagesSquare,
  Monitor,
  ScanEye,
  ShieldCheck,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/components/contact/constants';
import { formatINR, type StudentDomain, type StudentProject } from './data';

export const DOMAIN_ICONS: Record<StudentDomain, LucideIcon> = {
  'ai-ml': Brain,
  'deep-learning': ScanEye,
  nlp: MessagesSquare,
  'data-science': BarChart3,
  web: Globe,
  mobile: Smartphone,
  iot: Cpu,
  cyber: ShieldCheck,
  blockchain: Blocks,
  cloud: Cloud,
  desktop: Monitor,
};

/** Any WhatsApp deep link with a pre-filled message. */
export const buildWhatsAppUrl = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const studentWhatsAppUrl = (project?: StudentProject) =>
  buildWhatsAppUrl(
    project
      ? `Hi TeamGoDevs! I'm interested in the student project "${project.title}" (${project.code}, ${formatINR(project.price)}). Please share the details.`
      : "Hi TeamGoDevs! I'm looking for a college project. Please share the details."
  );

/** Ask for changes to a listed project (different stack, extra module, docs only…). */
export const projectChangeWhatsAppUrl = (project: StudentProject) =>
  buildWhatsAppUrl(
    `Hi TeamGoDevs! I like "${project.title}" (${project.code}) but I need some changes: `
  );

/** Student searched and found nothing — carry their search into the chat. */
export const searchWhatsAppUrl = (query: string) =>
  buildWhatsAppUrl(
    query
      ? `Hi TeamGoDevs! I couldn't find a project on "${query}" on your site. Can you build one for me?`
      : "Hi TeamGoDevs! I couldn't find the project I need on your site. Can you help?"
  );

export type StudentService = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  message: string;
};

/** "Need anything else?" — each opens WhatsApp with a tailored message. */
export const STUDENT_SERVICES: StudentService[] = [
  {
    id: 'custom',
    title: 'Custom project on your idea',
    description: 'Tell us your idea or your guide’s requirement — we scope, build and document it.',
    icon: Lightbulb,
    message: "Hi TeamGoDevs! I have my own project idea and need it built. Here's the idea: ",
  },
  {
    id: 'ieee',
    title: 'IEEE / research paper implementation',
    description: 'Share the paper — we implement the proposed system with results and comparison.',
    icon: FileSearch,
    message: 'Hi TeamGoDevs! I need an IEEE / research paper implemented. Paper title / link: ',
  },
  {
    id: 'docs',
    title: 'Only documentation or PPT',
    description: 'Already have the code? Get the report, abstract, UML diagrams or review PPT.',
    icon: Presentation,
    message: 'Hi TeamGoDevs! I already have my project and need only documentation / PPT for: ',
  },
  {
    id: 'modify',
    title: 'Fix or modify my project',
    description: 'Bugs, errors, new modules, UI changes or a different tech stack for your existing project.',
    icon: Wrench,
    message: 'Hi TeamGoDevs! I need help fixing / modifying my existing project. Details: ',
  },
  {
    id: 'viva',
    title: 'Code walkthrough & viva prep',
    description: 'One-to-one session explaining the code, architecture and likely viva questions.',
    icon: GraduationCap,
    message: 'Hi TeamGoDevs! I need a code walkthrough and viva preparation for my project: ',
  },
  {
    id: 'other',
    title: 'Something else?',
    description: 'Hardware kits, installation, deadlines, group discounts — just ask us.',
    icon: MessageCircle,
    message: 'Hi TeamGoDevs! I have a question about student projects: ',
  },
];
