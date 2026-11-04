import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  BookOpen,
  Check,
  CheckCircle2,
  Code2,
  FileText,
  GraduationCap,
  Info,
  Mail,
  MessageCircle,
  Send,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { projectChangeWhatsAppUrl, studentWhatsAppUrl } from './helpers';
import { submitContactInquiry } from '@/lib/contact-api';
import { captureEvent } from '@/lib/captureEvent';
import ProjectCover from './ProjectCover';
import {
  DOMAIN_BY_ID,
  INCLUDED_DELIVERABLES,
  LEVEL_AUDIENCE,
  LEVEL_LABELS,
  OPTIONAL_ADDONS,
  formatINR,
  type StudentProject,
} from './data';

const DELIVERABLE_ICONS = {
  abstract: FileText,
  documentation: BookOpen,
  source: Code2,
} as const;

type FormState = {
  name: string;
  email: string;
  phone: string;
  college: string;
  message: string;
};

const emptyForm: FormState = { name: '', email: '', phone: '', college: '', message: '' };

type EnquiryFormProps = { project: StudentProject; onDone: () => void };

const EnquiryForm = ({ project, onDone }: EnquiryFormProps) => {
  const startedAt = useRef(Date.now());
  const [form, setForm] = useState<FormState>(emptyForm);
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const update = (field: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      toast.error('Please enter your name, email and phone number.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    const message = [
      `Student project request: ${project.title} (${project.code})`,
      `Domain: ${DOMAIN_BY_ID[project.domain].label} · ${LEVEL_LABELS[project.level]}`,
      `Tech: ${project.tech.join(', ')}`,
      `Phone / WhatsApp: ${form.phone.trim()}`,
      form.college.trim() ? `College / course / year: ${form.college.trim()}` : null,
      form.message.trim() ? `\nNotes from student:\n${form.message.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    const result = await submitContactInquiry({
      name: form.name.trim(),
      email: form.email.trim(),
      projectType: 'student-project',
      budget: formatINR(project.price),
      message,
      companyWebsite: honeypot,
      formStartedAt: startedAt.current,
    });
    setSubmitting(false);

    if (result.ok === false) {
      toast.error(`${result.message} You can also reach us on WhatsApp.`, { duration: 6000 });
      return;
    }

    captureEvent('student_project_enquiry_submitted', {
      project_id: project.id,
      project_code: project.code,
      domain: project.domain,
      price: project.price,
    });
    toast.success('Request sent! We will contact you within 24 hours.');
    onDone();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-2xl border border-border bg-muted/30 p-4">
      <p className="text-sm font-semibold text-foreground">Request this project</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Input placeholder="Your name *" value={form.name} onChange={(e) => update('name')(e.target.value)} autoComplete="name" required />
        <Input type="email" placeholder="Email *" value={form.email} onChange={(e) => update('email')(e.target.value)} autoComplete="email" required />
        <Input type="tel" placeholder="Phone / WhatsApp *" value={form.phone} onChange={(e) => update('phone')(e.target.value)} autoComplete="tel" required />
        <Input placeholder="College, course & year" value={form.college} onChange={(e) => update('college')(e.target.value)} />
      </div>
      <Textarea
        placeholder="Any changes you need, deadline, review dates… (optional)"
        value={form.message}
        onChange={(e) => update('message')(e.target.value)}
        rows={3}
      />
      {/* Honeypot — hidden from humans */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        aria-hidden
      />
      <Button type="submit" variant="cta" className="w-full" disabled={submitting}>
        <Send aria-hidden />
        {submitting ? 'Sending…' : `Send request · ${formatINR(project.price)}`}
      </Button>
    </form>
  );
};

type StudentProjectDialogProps = {
  project: StudentProject | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const StudentProjectDialog = ({ project, open, onOpenChange }: StudentProjectDialogProps) => {
  const [showForm, setShowForm] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (open) {
      setShowForm(false);
      setSent(false);
    }
  }, [open, project?.id]);

  useEffect(() => {
    if (open && project) {
      captureEvent('student_project_viewed', { project_id: project.id, domain: project.domain });
    }
  }, [open, project]);

  if (!project) return null;
  const domain = DOMAIN_BY_ID[project.domain];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[92vh] max-w-2xl flex-col gap-0 overflow-y-auto p-0 sm:rounded-2xl [&>button]:rounded-full [&>button]:bg-black/60 [&>button]:p-1.5 [&>button]:text-white [&>button]:opacity-100 [&>button:hover]:bg-black/80"
        // Keep the dialog scrolled to the top (Radix would focus & scroll to the first link)
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          (event.currentTarget as HTMLElement | null)?.focus();
        }}
      >
        <ProjectCover project={project} priority showCode={false} className="aspect-[16/7] shrink-0" />

        <div className="space-y-6 p-5 sm:p-7">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
              {domain.label} · {LEVEL_LABELS[project.level]}
            </p>
            <DialogTitle className="text-xl font-bold leading-tight sm:text-2xl">{project.title}</DialogTitle>
            <DialogDescription className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              {project.abstract}
            </DialogDescription>
          </div>

          <section>
            <h4 className="mb-2 text-sm font-semibold text-foreground">Key modules</h4>
            <ul className="space-y-1.5">
              {project.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="mb-2 text-sm font-semibold text-foreground">Technology stack</h4>
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li key={tech} className="rounded-lg border border-border bg-muted/40 px-2.5 py-1 text-xs font-medium">
                  {tech}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="mb-3 text-sm font-semibold text-foreground">What you get</h4>
            <div className="grid gap-3 sm:grid-cols-3">
              {INCLUDED_DELIVERABLES.map((item) => {
                const Icon = DELIVERABLE_ICONS[item.key];
                return (
                  <div key={item.key} className="rounded-xl border border-primary/20 bg-primary/5 p-3">
                    <Icon className="mb-2 h-5 w-5 text-primary" aria-hidden />
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                );
              })}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Add-ons on request:</span>{' '}
              {OPTIONAL_ADDONS.join(' · ')}
            </p>
          </section>

          <section className="flex items-start gap-2 text-sm text-muted-foreground">
            <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span>
              <span className="font-medium text-foreground">Suitable for:</span>{' '}
              {LEVEL_AUDIENCE[project.level].join(', ')}
            </span>
          </section>

          {project.note && (
            <p className="flex items-start gap-2 rounded-xl bg-amber-500/10 p-3 text-xs text-amber-800 dark:text-amber-300">
              <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
              {project.note}
            </p>
          )}

          <div className="rounded-2xl border border-border p-4">
            <div className="mb-4 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Abstract + Documentation + Source code</p>
                <p className="text-2xl font-bold text-foreground">{formatINR(project.price)}</p>
              </div>
              <span className="font-mono text-xs text-muted-foreground">{project.code}</span>
            </div>

            {sent ? (
              <p className="flex items-center gap-2 rounded-xl bg-primary/10 p-3 text-sm font-medium text-primary">
                <CheckCircle2 className="h-5 w-5" aria-hidden />
                Request received — we&apos;ll contact you within 24 hours.
              </p>
            ) : (
              <div className="space-y-3">
                <div className="grid gap-2 sm:grid-cols-2">
                  <Button asChild variant="cta">
                    <a
                      href={studentWhatsAppUrl(project)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        captureEvent('student_project_whatsapp_clicked', { project_id: project.id })
                      }
                    >
                      <MessageCircle aria-hidden />
                      Order on WhatsApp
                    </a>
                  </Button>
                  <Button
                    type="button"
                    variant="ctaOutline"
                    onClick={() => setShowForm((v) => !v)}
                    aria-expanded={showForm}
                  >
                    <Mail aria-hidden />
                    {showForm ? 'Hide form' : 'Request by email'}
                  </Button>
                </div>
                {showForm && <EnquiryForm project={project} onDone={() => setSent(true)} />}
                <p className="text-center text-xs text-muted-foreground">
                  Need changes, a different tech stack, or only docs / PPT?{' '}
                  <a
                    href={projectChangeWhatsAppUrl(project)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      captureEvent('student_project_change_whatsapp_clicked', { project_id: project.id })
                    }
                    className="font-semibold text-[#1da851] hover:underline dark:text-[#25D366]"
                  >
                    DM us on WhatsApp
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StudentProjectDialog;
