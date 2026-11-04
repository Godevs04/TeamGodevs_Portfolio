import { MessageCircle, Sparkles } from 'lucide-react';
import { captureEvent } from '@/lib/captureEvent';
import { searchWhatsAppUrl } from './helpers';

type CustomProjectCardProps = { query?: string };

/** Sits inside the project grid: "Didn't find yours? DM us on WhatsApp". */
const CustomProjectCard = ({ query = '' }: CustomProjectCardProps) => (
  <article className="flex h-full flex-col justify-between rounded-2xl border-2 border-dashed border-primary/40 bg-gradient-to-br from-primary/10 via-background to-emerald-500/10 p-6">
    <div>
      <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 text-primary">
        <Sparkles className="h-5 w-5" aria-hidden />
      </span>
      <h3 className="text-lg font-bold leading-snug text-foreground">Didn&apos;t find your project?</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        We build custom projects on any topic, implement IEEE papers, or modify these to your guide&apos;s
        requirements — same package: abstract, documentation &amp; source code.
      </p>
      <ul className="mt-4 space-y-1.5 text-sm text-foreground/80">
        <li>• Your own idea or title</li>
        <li>• Different tech stack or extra modules</li>
        <li>• Only documentation / PPT</li>
      </ul>
    </div>
    <a
      href={searchWhatsAppUrl(query)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => captureEvent('student_custom_card_whatsapp_clicked', { query })}
      className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
    >
      <MessageCircle className="h-4 w-4" aria-hidden />
      DM us on WhatsApp
    </a>
  </article>
);

export default CustomProjectCard;
