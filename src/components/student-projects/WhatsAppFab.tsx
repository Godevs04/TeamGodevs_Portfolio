import { MessageCircle } from 'lucide-react';
import { captureEvent } from '@/lib/captureEvent';
import { studentWhatsAppUrl } from './helpers';

/** Floating "DM us on WhatsApp" button for the student pages. */
const WhatsAppFab = () => (
  <a
    href={studentWhatsAppUrl()}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => captureEvent('student_whatsapp_fab_clicked', {})}
    className="group fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-40 inline-flex items-center gap-2 rounded-full bg-[#25D366] py-3 pl-3 pr-4 text-sm font-semibold text-white shadow-large transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:bottom-6 sm:right-6"
    aria-label="Need something else? DM us on WhatsApp"
    title="Need something else? DM us on WhatsApp"
  >
    <span className="relative flex h-6 w-6 items-center justify-center">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40 motion-reduce:hidden" aria-hidden />
      <MessageCircle className="relative h-5 w-5" aria-hidden />
    </span>
    DM us
  </a>
);

export default WhatsAppFab;
