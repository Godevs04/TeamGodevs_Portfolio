import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { captureEvent } from '@/lib/captureEvent';
import { SITE } from '@/lib/site';
import { STUDENT_SERVICES, buildWhatsAppUrl, studentWhatsAppUrl } from './helpers';

/** "Need anything else? DM us on WhatsApp" — service tiles with pre-filled chats. */
const NeedSomethingElse = () => (
  <section aria-labelledby="need-else-heading" className="mt-16 overflow-hidden rounded-3xl border border-border bg-card">
    <div className="bg-gradient-primary px-6 py-10 text-center text-primary-foreground sm:px-12">
      <h2 id="need-else-heading" className="text-2xl font-bold sm:text-3xl">
        Need anything else? DM us on WhatsApp
      </h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm opacity-90 sm:text-base">
        Custom ideas, IEEE papers, only docs or PPT, bug fixes, viva prep — if it&apos;s for your college
        project, we can help. Pick one below and your message is ready to send.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild variant="ctaWhite" size="lg">
          <a
            href={studentWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => captureEvent('student_need_else_whatsapp_clicked', { service: 'general' })}
          >
            <MessageCircle aria-hidden />
            Chat on WhatsApp
          </a>
        </Button>
        <Button asChild variant="ctaGhost" size="lg">
          <a href={`mailto:${SITE.email}?subject=${encodeURIComponent('College project enquiry')}`}>
            <Mail aria-hidden />
            {SITE.email}
          </a>
        </Button>
      </div>
    </div>

    <ul className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
      {STUDENT_SERVICES.map((service) => {
        const Icon = service.icon;
        return (
          <li key={service.id} className="bg-card">
            <a
              href={buildWhatsAppUrl(service.message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => captureEvent('student_need_else_whatsapp_clicked', { service: service.id })}
              className="group flex h-full items-start gap-4 p-6 transition-colors hover:bg-primary/5 focus-visible:bg-primary/5 focus-visible:outline-none"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <span className="flex-1">
                <span className="block font-semibold text-foreground">
                  {service.title}
                  <ArrowUpRight className="ml-1 inline h-4 w-4 align-[-2px] text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden />
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </span>
                <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#1da851] dark:text-[#25D366]">
                  <MessageCircle className="h-3.5 w-3.5" aria-hidden />
                  DM on WhatsApp
                </span>
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  </section>
);

export default NeedSomethingElse;
