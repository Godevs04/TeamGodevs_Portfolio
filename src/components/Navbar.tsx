import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import BrandMark from '@/components/BrandMark';
import PageContainer from '@/components/layout/PageContainer';
import { scrollToSection } from '@/lib/scroll';
import { cn } from '@/lib/utils';
import { usePostHog } from '@posthog/react';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Features' },
  { id: 'process', label: 'Process' },
  { id: 'projects', label: 'Work' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const posthog = usePostHog();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);

      const sections = navItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsOpen(false);
  };

  return (
    <nav className="nav-elegant fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4" aria-label="Main navigation">
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-background/95 md:hidden"
          aria-label="Close menu"
          onClick={() => setIsOpen(false)}
        />
      )}

      <PageContainer className="relative z-50 !px-0 sm:!px-2">
        <div
          className={cn(
            'nav-glass-floating transition-all duration-300',
            isOpen && 'nav-menu-open',
            scrolled && !isOpen ? 'shadow-xl' : 'shadow-lg'
          )}
        >
          <div className="flex items-center justify-between px-3 py-2 sm:px-4 sm:py-2.5">
            <BrandMark variant="header" onClick={() => handleNav('home')} className="-ml-0.5" />

            <div className="hidden items-center gap-0.5 md:flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  data-active={activeSection === item.id}
                  className="nav-link-elegant"
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ))}
              <div className="mx-2 h-6 w-px bg-border/80 dark:bg-white/15" aria-hidden />
              <ThemeToggle />
              <Button
                variant="cta"
                size="sm"
                className="ml-2 transition-all duration-300"
                onClick={() => {
                  posthog?.capture('navbar_cta_clicked', { position: 'desktop' });
                  handleNav('contact');
                }}
              >
                Get started
              </Button>
            </div>

            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle className="min-h-11 min-w-11" />
              <Button
                variant="ghost"
                size="icon"
                className="min-h-11 min-w-11"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                aria-controls="mobile-nav"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {isOpen && (
            <div
              id="mobile-nav"
              className="nav-mobile-panel animate-fade-in border-t border-border/50 px-3 py-4 md:hidden"
            >
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNav(item.id)}
                    data-active={activeSection === item.id}
                    className="nav-link-elegant px-4 py-3 text-left text-base"
                    aria-current={activeSection === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                ))}
                <Button
                  variant="cta"
                  className="mt-4 w-full"
                  onClick={() => {
                    posthog?.capture('navbar_cta_clicked', { position: 'mobile_menu' });
                    handleNav('contact');
                  }}
                >
                  Get started
                </Button>
              </div>
            </div>
          )}
        </div>
      </PageContainer>
    </nav>
  );
};

export default Navbar;
