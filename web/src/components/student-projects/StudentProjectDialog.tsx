import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  BookOpen,
  Check,
  CheckCircle2,
  Clock,
  Code2,
  FileText,
  GraduationCap,
  Info,
  Layers,
  Lock,
  Mail,
  MessageCircle,
  Send,
  Users,
  Wrench,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { submitContactInquiry } from '@/lib/contact-api';
import { captureEvent } from '@/lib/captureEvent';
import { IS_PAYMENTS_ENABLED, studentProjectPaymentUrl } from '@/lib/features';
import { cn } from '@/lib/utils';
import { DOMAIN_ICONS, projectChangeWhatsAppUrl, studentWhatsAppUrl } from './helpers';
import {
  COVER_PHOTOS,
  DOMAIN_BY_ID,
  INCLUDED_DELIVERABLES,
  LEVEL_AUDIENCE,
  LEVEL_LABELS,
  OPTIONAL_ADDONS,
  PRICE_TIERS,
  TEAM_SIZE,
  formatINR,
  perPersonPrice,
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
    <form onSubmit={handleSubmit} className="space-y-2.5">
      <Input placeholder="Your name *" value={form.name} onChange={(e) => update('name')(e.target.value)} autoComplete="name" required />
      <Input type="email" placeholder="Email *" value={form.email} onChange={(e) => update('email')(e.target.value)} autoComplete="email" required />
      <Input type="tel" placeholder="Phone / WhatsApp *" value={form.phone} onChange={(e) => update('phone')(e.target.value)} autoComplete="tel" required />
      <Input placeholder="College, course & year" value={form.college} onChange={(e) => update('college')(e.target.value)} />
      <Textarea
        placeholder="Changes needed, deadline, review dates… (optional)"
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
        {submitting ? 'Sending…' : 'Send request'}
      </Button>
    </form>
  );
};

type PricePanelProps = {
  project: StudentProject;
  showForm: boolean;
  sent: boolean;
  onToggleForm: () => void;
  onSent: () => void;
};

/** Right-hand (desktop) / inline (mobile) purchase panel. */
const PricePanel = ({ project, showForm, sent, onToggleForm, onSent }: PricePanelProps) => {
  const tier = PRICE_TIERS[project.tier];

  return (
    <div className="rounded-2xl border border-border bg-gradient-to-b from-primary/[0.07] to-transparent p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
          {tier.label}
        </span>
        <span className="font-mono text-[11px] text-muted-foreground">{project.code}</span>
      </div>

      <p className="mt-4 text-4xl font-bold tracking-tight text-foreground">{formatINR(project.price)}</p>
      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
        <Users className="h-4 w-4 shrink-0 text-primary" aria-hidden />
        <span>
          Just <span className="font-semibold text-foreground">{formatINR(perPersonPrice(project.price))}</span> each
          for a team of {TEAM_SIZE}
        </span>
      </p>

      <ul className="mt-5 space-y-2 border-t border-border/70 pt-4 text-sm">
        {[...INCLUDED_DELIVERABLES.map((d) => d.title), 'Setup guide & installation help'].map((item) => (
          <li key={item} className="flex items-center gap-2 text-foreground/90">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
              <Check className="h-3 w-3 text-primary" aria-hidden />
            </span>
            {item}
          </li>
        ))}
      </ul>

      {sent ? (
        <p className="mt-5 flex items-center gap-2 rounded-xl bg-primary/10 p-3 text-sm font-medium text-primary">
          <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden />
          Request received — we&apos;ll contact you within 24 hours.
        </p>
      ) : (
        <div className="mt-5 space-y-2.5">
          {IS_PAYMENTS_ENABLED && (
            <Button asChild variant="cta" className="w-full">
              <Link
                to={studentProjectPaymentUrl(project.id)}
                onClick={() => captureEvent('student_project_pay_clicked', { project_id: project.id })}
              >
                <Lock aria-hidden />
                Pay {formatINR(project.price)} online
              </Link>
            </Button>
          )}
          <Button asChild variant={IS_PAYMENTS_ENABLED ? 'ctaOutline' : 'cta'} className="w-full">
            <a
              href={studentWhatsAppUrl(project)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => captureEvent('student_project_whatsapp_clicked', { project_id: project.id })}
            >
              <MessageCircle aria-hidden />
              Order on WhatsApp
            </a>
          </Button>
          <Button type="button" variant="ctaOutline" className="w-full" onClick={onToggleForm} aria-expanded={showForm}>
            <Mail aria-hidden />
            {showForm ? 'Hide form' : 'Request by email'}
          </Button>
          {showForm && (
            <div className="pt-1">
              <EnquiryForm project={project} onDone={onSent} />
            </div>
          )}
        </div>
      )}

      <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="h-3.5 w-3.5" aria-hidden />
        We reply within 24 hours
      </p>
    </div>
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
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    if (open) {
      setShowForm(false);
      setSent(false);
      setImageFailed(false);
    }
  }, [open, project?.id]);

  useEffect(() => {
    if (open && project) {
      captureEvent('student_project_viewed', { project_id: project.id, domain: project.domain });
    }
  }, [open, project]);

  if (!project) return null;
  const domain = DOMAIN_BY_ID[project.domain];
  const DomainIcon = DOMAIN_ICONS[project.domain];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[94vh] w-[calc(100%-1.5rem)] max-w-5xl flex-col gap-0 overflow-hidden rounded-3xl border-border/70 p-0 sm:rounded-3xl [&>button]:right-4 [&>button]:top-4 [&>button]:z-20 [&>button]:rounded-full [&>button]:bg-black/50 [&>button]:p-2 [&>button]:text-white [&>button]:opacity-100 [&>button]:backdrop-blur-sm [&>button:hover]:bg-black/70"
        // Keep the dialog scrolled to the top (Radix would focus & scroll to the first link)
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          (event.currentTarget as HTMLElement | null)?.focus();
        }}
      >
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain" data-dialog-scroll>
          {/* Hero */}
          <header className={cn('relative isolate overflow-hidden bg-gradient-to-br', domain.gradient)}>
            {!imageFailed && (
              <img
                src={COVER_PHOTOS[project.cover]}
                alt=""
                className="absolute inset-0 -z-10 h-full w-full object-cover"
                onError={() => setImageFailed(true)}
              />
            )}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/90 via-black/55 to-black/20" aria-hidden />
            <div className="flex min-h-[230px] flex-col justify-end px-5 pb-6 pt-16 sm:min-h-[300px] sm:px-8 sm:pb-8">
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-white">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 backdrop-blur-md">
                  <DomainIcon className="h-3.5 w-3.5" aria-hidden />
                  {domain.label}
                </span>
                <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur-md">{LEVEL_LABELS[project.level]}</span>
                {project.popular && (
                  <span className="rounded-full bg-orange-500/90 px-3 py-1">Popular choice</span>
                )}
              </div>
              <DialogTitle className="max-w-3xl text-2xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
                {project.title}
              </DialogTitle>
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technology stack">
                {project.tech.map((tech) => (
                  <li key={tech} className="rounded-md border border-white/20 bg-black/30 px-2 py-0.5 text-xs font-medium text-white/90 backdrop-blur-sm">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </header>

          {/* Body */}
          <div className="grid gap-8 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-8">
              <section>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Overview</h3>
                <DialogDescription className="text-base leading-relaxed text-foreground/85 sm:text-lg">
                  {project.abstract}
                </DialogDescription>
              </section>

              <section>
                <h3 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  <Layers className="h-4 w-4" aria-hidden />
                  Key modules
                </h3>
                <ol className="grid gap-3 sm:grid-cols-3">
                  {project.features.map((feature, i) => (
                    <li key={feature} className="rounded-2xl border border-border bg-muted/30 p-4">
                      <span className="font-mono text-xs font-semibold text-primary">0{i + 1}</span>
                      <p className="mt-1.5 text-sm font-medium leading-snug text-foreground">{feature}</p>
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  What&apos;s in the package
                </h3>
                <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
                  {INCLUDED_DELIVERABLES.map((item) => {
                    const Icon = DELIVERABLE_ICONS[item.key];
                    return (
                      <div key={item.key} className="flex items-start gap-4 p-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" aria-hidden />
                        </span>
                        <div>
                          <p className="font-semibold text-foreground">{item.title}</p>
                          <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              <section className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border p-4">
                  <p className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <GraduationCap className="h-4 w-4 text-primary" aria-hidden />
                    Suitable for
                  </p>
                  <p className="text-sm text-muted-foreground">{LEVEL_AUDIENCE[project.level].join(' · ')}</p>
                </div>
                <div className="rounded-2xl border border-border p-4">
                  <p className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Wrench className="h-4 w-4 text-primary" aria-hidden />
                    Add-ons on request
                  </p>
                  <p className="text-sm text-muted-foreground">{OPTIONAL_ADDONS.join(' · ')}</p>
                </div>
              </section>

              {project.note && (
                <p className="flex items-start gap-2 rounded-2xl bg-amber-500/10 p-4 text-sm text-amber-800 dark:text-amber-300">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                  {project.note}
                </p>
              )}

              <p className="rounded-2xl border border-dashed border-primary/40 p-4 text-sm text-muted-foreground">
                Need changes, a different tech stack, or only docs / PPT?{' '}
                <a
                  href={projectChangeWhatsAppUrl(project)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => captureEvent('student_project_change_whatsapp_clicked', { project_id: project.id })}
                  className="font-semibold text-[#1da851] hover:underline dark:text-[#25D366]"
                >
                  DM us on WhatsApp →
                </a>
              </p>
            </div>

            <aside className="lg:sticky lg:top-16 lg:self-start">
              <PricePanel
                project={project}
                showForm={showForm}
                sent={sent}
                onToggleForm={() => setShowForm((v) => !v)}
                onSent={() => setSent(true)}
              />
            </aside>
          </div>
        </div>

        {/* Mobile sticky buy bar */}
        {!sent && (
          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border bg-background/95 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
            <div>
              <p className="text-lg font-bold leading-none text-foreground">{formatINR(project.price)}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {formatINR(perPersonPrice(project.price))} each · team of {TEAM_SIZE}
              </p>
            </div>
            {IS_PAYMENTS_ENABLED ? (
              <div className="flex items-center gap-2">
                <Button asChild variant="ctaOutline" size="sm" className="h-11 w-11 px-0">
                  <a
                    href={studentWhatsAppUrl(project)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Order on WhatsApp"
                    onClick={() =>
                      captureEvent('student_project_whatsapp_clicked', { project_id: project.id, position: 'mobile_bar' })
                    }
                  >
                    <MessageCircle aria-hidden />
                  </a>
                </Button>
                <Button asChild variant="cta" size="sm" className="h-11 px-5">
                  <Link
                    to={studentProjectPaymentUrl(project.id)}
                    onClick={() =>
                      captureEvent('student_project_pay_clicked', { project_id: project.id, position: 'mobile_bar' })
                    }
                  >
                    <Lock aria-hidden />
                    Pay now
                  </Link>
                </Button>
              </div>
            ) : (
              <Button asChild variant="cta" size="sm" className="h-11 px-5">
                <a
                  href={studentWhatsAppUrl(project)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    captureEvent('student_project_whatsapp_clicked', { project_id: project.id, position: 'mobile_bar' })
                  }
                >
                  <MessageCircle aria-hidden />
                  Order on WhatsApp
                </a>
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StudentProjectDialog;
