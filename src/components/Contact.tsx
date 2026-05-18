import { useState } from 'react';
import { Calendar, Clock, MessageSquare, Sparkles } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/SectionHeader';
import BookCallPanel from '@/components/contact/BookCallPanel';
import ContactSidePanel from '@/components/contact/ContactSidePanel';
import MultiStepForm from '@/components/contact/MultiStepForm';
import { cn } from '@/lib/utils';

type ContactMode = 'form' | 'calendar';

const Contact = () => {
  const [mode, setMode] = useState<ContactMode>('form');

  return (
    <Section id="contact" variant="muted">
      <PageContainer>
        <SectionHeader
          badge="Get started"
          title="Let's build"
          highlight="something great"
          description="Book a call or send details—we reply within 2 hours."
        />

        {/* Trust strip */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:mb-10 sm:gap-3 md:gap-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-2 text-xs font-semibold text-primary sm:px-4 sm:text-sm">
            <Sparkles className="h-4 w-4" aria-hidden />
            Free consultation
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs font-medium text-foreground shadow-soft sm:px-4 sm:text-sm">
            <Clock className="h-4 w-4 text-primary" aria-hidden />
            Reply within 2 hours
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-xs font-medium text-muted-foreground sm:px-4 sm:text-sm">
            No spam · NDA on request
          </span>
        </div>

        {/* Mode toggle */}
        <div
          className="mx-auto mb-8 flex w-full max-w-md rounded-2xl border border-border bg-card p-1 shadow-soft sm:mb-10"
          role="tablist"
          aria-label="Contact method"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'form'}
            onClick={() => setMode('form')}
            className={cn(
              'flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-smooth',
              mode === 'form'
                ? 'bg-gradient-primary text-white shadow-glow'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <MessageSquare className="h-4 w-4" />
            Send inquiry
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'calendar'}
            onClick={() => setMode('calendar')}
            className={cn(
              'flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-smooth',
              mode === 'calendar'
                ? 'bg-gradient-primary text-white shadow-glow'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Calendar className="h-4 w-4" />
            Book a call
          </button>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            {mode === 'form' ? <MultiStepForm /> : <BookCallPanel />}
          </div>
          <div className="lg:col-span-5">
            <ContactSidePanel />
          </div>
        </div>
      </PageContainer>
    </Section>
  );
};

export default Contact;
