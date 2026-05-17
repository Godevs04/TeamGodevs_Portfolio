import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { scrollToSection } from '@/lib/scroll';

const MobileCTABar = () => (
  <div
    className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden"
    aria-hidden={false}
  >
    <Button
      variant="cta"
      size="lg"
      className="w-full shadow-glow"
      onClick={() => scrollToSection('contact')}
    >
      Get started
      <ArrowRight className="h-4 w-4" />
    </Button>
  </div>
);

export default MobileCTABar;
