import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Landmark,
  Loader2,
  Lock,
  MessageCircle,
  ShieldCheck,
  Smartphone,
  Wallet,
} from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageContainer from '@/components/layout/PageContainer';
import PageMeta from '@/components/seo/PageMeta';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { buildWhatsAppUrl } from '@/components/student-projects/helpers';
import {
  DOMAIN_BY_ID,
  LEVEL_LABELS,
  PRICE_TIERS,
  STUDENT_PROJECTS,
  formatINR,
  type StudentProject,
} from '@/components/student-projects/data';
import { useRazorpayCheckout } from '@/hooks/use-razorpay-checkout';
import { captureEvent } from '@/lib/captureEvent';
import { IS_PAYMENTS_ENABLED, PAYMENT_PATH, STUDENT_PROJECTS_PATH } from '@/lib/features';
import { SITE } from '@/lib/site';

type FormState = {
  name: string;
  email: string;
  phone: string;
  college: string;
  notes: string;
  amount: string;
  paymentFor: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9\s-]{7,20}$/;
const MAX_AMOUNT_INR = 500_000;

const PAYMENT_METHODS = [
  { icon: Smartphone, label: 'UPI' },
  { icon: CreditCard, label: 'Cards' },
  { icon: Landmark, label: 'Netbanking' },
  { icon: Wallet, label: 'Wallets' },
];

const formatAmount = (amountInr: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
    minimumFractionDigits: Number.isInteger(amountInr) ? 0 : 2,
  }).format(amountInr);

function validate(form: FormState, project: StudentProject | null): string | null {
  if (!form.name.trim()) return 'Please enter your name.';
  if (!EMAIL_PATTERN.test(form.email.trim())) return 'Please enter a valid email address.';
  if (!PHONE_PATTERN.test(form.phone.trim())) return 'Please enter a valid phone / WhatsApp number.';
  if (!project) {
    const amount = Number(form.amount);
    if (!Number.isFinite(amount) || amount < 1) return 'Please enter an amount of at least ₹1.';
    if (amount > MAX_AMOUNT_INR) {
      return `Online payments are limited to ${formatAmount(MAX_AMOUNT_INR)}. Please contact us for larger payments.`;
    }
    if (!form.paymentFor.trim()) return 'Please tell us what this payment is for (invoice no. or project name).';
  }
  return null;
}

const Field = ({ id, label, children }: { id: string; label: string; children: ReactNode }) => (
  <div className="space-y-1.5">
    <Label htmlFor={id} className="text-sm font-medium text-foreground">
      {label}
    </Label>
    {children}
  </div>
);

const Payment = () => {
  const [params] = useSearchParams();
  const projectId = params.get('project');
  const project = useMemo(
    () => (projectId ? STUDENT_PROJECTS.find((p) => p.id === projectId) ?? null : null),
    [projectId]
  );
  const presetAmount = Number(params.get('amount'));

  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    college: '',
    notes: '',
    amount: Number.isFinite(presetAmount) && presetAmount > 0 ? String(presetAmount) : '',
    paymentFor: params.get('for') ?? '',
  });
  const { status, error, result, pay, reset, isBusy } = useRazorpayCheckout();

  const amountInr = project ? project.price : Number(form.amount) || 0;
  const itemName = project ? project.title : form.paymentFor.trim() || 'Custom payment';

  const update = (field: keyof FormState) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    if (status === 'cancelled') {
      toast('Payment cancelled — you have not been charged.', { icon: 'ℹ️' });
      captureEvent('payment_cancelled', { purpose: project ? 'student-project' : 'custom' });
    }
    if (status === 'failed' && error) {
      toast.error(error, { duration: 6000 });
      captureEvent('payment_failed', { purpose: project ? 'student-project' : 'custom' });
    }
    if (status === 'success') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      captureEvent('payment_succeeded', {
        purpose: project ? 'student-project' : 'custom',
        project_id: project?.id,
        amount: amountInr,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const validationError = validate(form, project);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    captureEvent('payment_started', { purpose: project ? 'student-project' : 'custom', amount: amountInr });

    await pay(
      {
        purpose: project ? 'student-project' : 'custom',
        ...(project ? {} : { amount: Math.round(Number(form.amount) * 100) }),
        currency: 'INR',
        item: project
          ? { id: project.id, name: project.title, code: project.code, tier: project.tier }
          : { name: form.paymentFor.trim() },
        customer: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          ...(form.college.trim() ? { college: form.college.trim() } : {}),
        },
        ...(form.notes.trim() ? { notes: form.notes.trim() } : {}),
      },
      { description: project ? `${project.code} · ${project.title}` : itemName }
    );
  };

  const helpUrl = buildWhatsAppUrl(
    result
      ? `Hi TeamGoDevs! I just paid ${formatAmount(result.amount / 100)} for "${itemName}". Payment ID: ${result.paymentId}`
      : `Hi TeamGoDevs! I need help with an online payment for "${itemName}".`
  );

  const buttonLabel =
    status === 'creating'
      ? 'Starting secure checkout…'
      : status === 'awaiting'
        ? 'Complete payment in the popup…'
        : status === 'verifying'
          ? 'Verifying payment…'
          : `Pay ${amountInr > 0 ? formatAmount(amountInr) : ''} securely`;

  return (
    <>
      <PageMeta
        title={`Secure payment | ${SITE.name}`}
        description={`Pay ${SITE.name} securely online with UPI, cards, netbanking or wallets via Razorpay.`}
        canonicalPath={PAYMENT_PATH}
        noIndex
      />
      <div className="min-h-screen bg-background">
        <Navbar />

        <main id="main-content" className="pb-20 pt-28 sm:pt-32">
          <PageContainer>
            {status === 'success' && result ? (
              <section className="mx-auto max-w-xl rounded-3xl border border-primary/30 bg-gradient-to-b from-primary/[0.08] to-transparent p-6 text-center shadow-soft sm:p-10">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
                  <CheckCircle2 className="h-9 w-9 text-primary" aria-hidden />
                </span>
                <h1 className="mt-5 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Payment successful</h1>
                <p className="mt-2 text-muted-foreground">
                  Thank you, {form.name.trim().split(/\s+/)[0]}! We&apos;ve received{' '}
                  <span className="font-semibold text-foreground">{formatAmount(result.amount / 100)}</span> for{' '}
                  <span className="font-semibold text-foreground">{itemName}</span>.
                </p>

                <dl className="mt-6 divide-y divide-border rounded-2xl border border-border bg-background text-left text-sm">
                  {[
                    ['Payment ID', result.paymentId],
                    ['Order ID', result.orderId],
                    ['Receipt', result.receipt],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-4 px-4 py-3">
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="break-all font-mono text-xs font-medium text-foreground sm:text-sm">{value}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-5 text-sm text-muted-foreground">
                  A receipt has been sent to <span className="font-medium text-foreground">{form.email.trim()}</span>. Our
                  team will contact you within 24 hours to confirm the next steps.
                </p>

                <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
                  <Button asChild variant="cta">
                    <Link to="/">Back to home</Link>
                  </Button>
                  <Button asChild variant="ctaOutline">
                    <a href={helpUrl} target="_blank" rel="noopener noreferrer">
                      <MessageCircle aria-hidden />
                      Message us on WhatsApp
                    </a>
                  </Button>
                </div>
              </section>
            ) : (
              <>
                <header className="mx-auto max-w-3xl text-center">
                  <span className="badge-pill mb-5 inline-flex items-center gap-1.5">
                    <Lock className="h-3.5 w-3.5" aria-hidden />
                    Secure checkout
                  </span>
                  <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                    {project ? 'Complete your order' : 'Make a payment'}
                  </h1>
                  <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
                    Pay with UPI, cards, netbanking or wallets. Payments are processed by Razorpay — we never see your
                    card details.
                  </p>
                </header>

                {projectId && !project && (
                  <p className="mx-auto mt-8 flex max-w-3xl items-start gap-2 rounded-2xl bg-amber-500/10 p-4 text-sm text-amber-800 dark:text-amber-300">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                    We couldn&apos;t find that project. You can still make a custom payment below, or{' '}
                    <Link to={STUDENT_PROJECTS_PATH} className="font-semibold underline">
                      browse student projects
                    </Link>
                    .
                  </p>
                )}

                {!IS_PAYMENTS_ENABLED ? (
                  <div className="mx-auto mt-10 max-w-xl rounded-3xl border border-border p-8 text-center">
                    <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground" aria-hidden />
                    <p className="mt-3 font-semibold text-foreground">Online payments are not available right now</p>
                    <p className="mt-1 text-sm text-muted-foreground">Message us and we&apos;ll share a payment link.</p>
                    <Button asChild variant="cta" className="mt-5">
                      <a href={helpUrl} target="_blank" rel="noopener noreferrer">
                        <MessageCircle aria-hidden />
                        Pay via WhatsApp
                      </a>
                    </Button>
                  </div>
                ) : (
                  <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
                    <form
                      onSubmit={handleSubmit}
                      className="space-y-5 rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-7"
                      noValidate
                    >
                      {!project && (
                        <fieldset className="space-y-4">
                          <legend className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            Payment details
                          </legend>
                          <Field id="paymentFor" label="Payment for *">
                            <Input
                              id="paymentFor"
                              placeholder="Invoice number or project name"
                              value={form.paymentFor}
                              onChange={(e) => update('paymentFor')(e.target.value)}
                              maxLength={200}
                              disabled={isBusy}
                            />
                          </Field>
                          <Field id="amount" label="Amount (₹) *">
                            <Input
                              id="amount"
                              type="number"
                              inputMode="decimal"
                              min={1}
                              max={MAX_AMOUNT_INR}
                              step="0.01"
                              placeholder="e.g. 5000"
                              value={form.amount}
                              onChange={(e) => update('amount')(e.target.value)}
                              disabled={isBusy}
                            />
                          </Field>
                        </fieldset>
                      )}

                      <fieldset className="space-y-4">
                        <legend className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                          Your details
                        </legend>
                        <Field id="name" label="Full name *">
                          <Input
                            id="name"
                            autoComplete="name"
                            value={form.name}
                            onChange={(e) => update('name')(e.target.value)}
                            maxLength={120}
                            disabled={isBusy}
                          />
                        </Field>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field id="email" label="Email *">
                            <Input
                              id="email"
                              type="email"
                              autoComplete="email"
                              value={form.email}
                              onChange={(e) => update('email')(e.target.value)}
                              maxLength={254}
                              disabled={isBusy}
                            />
                          </Field>
                          <Field id="phone" label="Phone / WhatsApp *">
                            <Input
                              id="phone"
                              type="tel"
                              autoComplete="tel"
                              placeholder="+91 98765 43210"
                              value={form.phone}
                              onChange={(e) => update('phone')(e.target.value)}
                              maxLength={20}
                              disabled={isBusy}
                            />
                          </Field>
                        </div>
                        {project && (
                          <Field id="college" label="College, course & year">
                            <Input
                              id="college"
                              value={form.college}
                              onChange={(e) => update('college')(e.target.value)}
                              maxLength={200}
                              disabled={isBusy}
                            />
                          </Field>
                        )}
                        <Field id="notes" label="Notes (optional)">
                          <Textarea
                            id="notes"
                            rows={3}
                            placeholder={project ? 'Changes needed, deadline, review dates…' : 'Anything we should know'}
                            value={form.notes}
                            onChange={(e) => update('notes')(e.target.value)}
                            maxLength={500}
                            disabled={isBusy}
                          />
                        </Field>
                      </fieldset>

                      {status === 'failed' && error && (
                        <p role="alert" className="flex items-start gap-2 rounded-xl bg-destructive/10 p-3 text-sm text-destructive">
                          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                          <span>{error}</span>
                        </p>
                      )}

                      <Button type="submit" variant="cta" size="lg" className="w-full" disabled={isBusy}>
                        {isBusy ? <Loader2 className="animate-spin" aria-hidden /> : <Lock aria-hidden />}
                        {buttonLabel}
                      </Button>

                      {status === 'failed' && (
                        <button
                          type="button"
                          onClick={reset}
                          className="w-full text-center text-sm font-medium text-muted-foreground hover:text-foreground"
                        >
                          Dismiss error
                        </button>
                      )}

                      <p className="text-center text-xs text-muted-foreground">
                        By paying you agree to our terms. Need help?{' '}
                        <a href={helpUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-primary hover:underline">
                          WhatsApp us
                        </a>
                      </p>
                    </form>

                    <aside className="order-first lg:sticky lg:top-24 lg:order-last lg:self-start">
                      <div className="rounded-3xl border border-border bg-gradient-to-b from-primary/[0.07] to-transparent p-5 shadow-soft sm:p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Order summary</p>

                        {project ? (
                          <div className="mt-4">
                            <div className="flex items-center justify-between">
                              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                                {PRICE_TIERS[project.tier].label}
                              </span>
                              <span className="font-mono text-[11px] text-muted-foreground">{project.code}</span>
                            </div>
                            <p className="mt-3 font-semibold leading-snug text-foreground">{project.title}</p>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {DOMAIN_BY_ID[project.domain].label} · {LEVEL_LABELS[project.level]}
                            </p>
                            <ul className="mt-4 space-y-1.5 text-sm text-foreground/85">
                              {['Abstract', 'Full documentation', 'Source code', 'Setup guide & installation help'].map((item) => (
                                <li key={item} className="flex items-center gap-2">
                                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                                  {item}
                                </li>
                              ))}
                            </ul>
                            <Link
                              to={`${STUDENT_PROJECTS_PATH}?project=${project.id}`}
                              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                            >
                              <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
                              Back to project
                            </Link>
                          </div>
                        ) : (
                          <p className="mt-4 font-semibold leading-snug text-foreground">{itemName}</p>
                        )}

                        <div className="mt-5 flex items-end justify-between border-t border-border/70 pt-4">
                          <span className="text-sm text-muted-foreground">Total</span>
                          <span className="text-3xl font-bold tracking-tight text-foreground">
                            {amountInr > 0 ? (project ? formatINR(amountInr) : formatAmount(amountInr)) : '—'}
                          </span>
                        </div>

                        <ul className="mt-5 grid grid-cols-4 gap-2" aria-label="Accepted payment methods">
                          {PAYMENT_METHODS.map(({ icon: Icon, label }) => (
                            <li
                              key={label}
                              className="flex flex-col items-center gap-1 rounded-xl border border-border bg-background px-1 py-2 text-[11px] font-medium text-muted-foreground"
                            >
                              <Icon className="h-4 w-4 text-primary" aria-hidden />
                              {label}
                            </li>
                          ))}
                        </ul>

                        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                          <ShieldCheck className="h-3.5 w-3.5 text-primary" aria-hidden />
                          256-bit encrypted · Secured by Razorpay
                        </p>
                      </div>
                    </aside>
                  </div>
                )}
              </>
            )}
          </PageContainer>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Payment;
