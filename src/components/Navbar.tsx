import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import BrandMark from '@/components/BrandMark';
import PageContainer from '@/components/layout/PageContainer';
import { scrollToSection } from '@/lib/scroll';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Features' },
  { id: 'process', label: 'Process' },
  { id: 'projects', label: 'Work' },
  { id: 'testimonials', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsOpen(false);
  };

  return (
    <nav className="nav-elegant fixed inset-x-0 top-0 z-50" aria-label="Main navigation">
      <PageContainer>
        <div className="flex items-center justify-between py-4">
          <BrandMark variant="header" onClick={() => handleNav('home')} />

          <div className="hidden items-center gap-1 md:flex">
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
            <div className="mx-2 h-6 w-px bg-border/80" aria-hidden />
            <ThemeToggle />
            <Button
              variant="cta"
              size="sm"
              className="ml-2"
              onClick={() => handleNav('contact')}
            >
              Get started
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle size="sm" />
            <Button
              variant="ghost"
              size="icon"
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
            className="animate-slide-in-right border-t border-border/50 py-4 md:hidden"
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
                onClick={() => handleNav('contact')}
              >
                Get started
              </Button>
            </div>
          </div>
        )}
      </PageContainer>
    </nav>
  );
};

export default Navbar;
