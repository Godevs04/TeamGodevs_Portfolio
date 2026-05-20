import { useState } from 'react';
import {
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  Heart,
} from 'lucide-react';
import BrandMark from '@/components/BrandMark';
import PageContainer from '@/components/layout/PageContainer';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { scrollToSection } from '@/lib/scroll';
import { SITE } from '@/lib/site';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import { CONTACT_DETAILS } from '@/components/contact/constants';
import { usePostHog } from '@posthog/react';

const exploreLinks = [
  { name: 'Home', href: 'home' },
  { name: 'Features', href: 'services' },
  { name: 'Process', href: 'process' },
  { name: 'Case studies', href: 'projects' },
  { name: 'Reviews', href: 'testimonials' },
  { name: 'Contact', href: 'contact' },
];

const serviceLinks = [
  'Web applications',
  'Mobile apps',
  'SEO & growth',
  'UI/UX design',
  'Brand identity',
  'Cloud & DevOps',
];

const legalLinks = ['Privacy Policy', 'Terms of Service', 'Cookie Policy'];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' },
];

const contactIconClass = cn(
  'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground transition-smooth',
  'group-hover/contact:border-primary/25 group-hover/contact:bg-primary/10 group-hover/contact:text-primary',
  'dark:border-white/10 dark:bg-white/5 dark:text-white/50',
  'dark:group-hover/contact:border-white/20 dark:group-hover/contact:bg-white/10 dark:group-hover/contact:text-white/80'
);

const Footer = () => {
  const posthog = usePostHog();
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setIsSubscribing(true);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      posthog?.capture('newsletter_subscribed', { source: 'footer' });
      toast.success("You're subscribed! Check your inbox soon.", {
        style: {
          background: 'hsl(var(--card))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--primary))',
        },
      });
      setEmail('');
    } catch {
      toast.error('Subscription failed. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="footer-premium">
      <PageContainer className="relative z-10">
        <div className="grid grid-cols-1 items-start gap-10 py-14 sm:gap-12 sm:py-20 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-12">
          <div className="lg:col-span-4">
            <BrandMark
              variant={theme === 'dark' ? 'footer' : 'header'}
              onClick={() => scrollToSection('home')}
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground dark:text-white/55">
              TeamGoDevs is a product studio helping startups and SMBs ship web apps, mobile
              experiences, and growth systems that drive real revenue—not just pretty pixels.
            </p>
            <div className="footer-divider my-6" />
            <ul className="space-y-2.5">
              {[
                {
                  icon: Mail,
                  text: CONTACT_DETAILS.email,
                  href: `mailto:${CONTACT_DETAILS.email}`,
                },
                { icon: Phone, text: CONTACT_DETAILS.phone, href: `tel:${SITE.phoneTel}` },
                { icon: MapPin, text: CONTACT_DETAILS.address },
              ].map(({ icon: Icon, text, href }) => (
                <li key={text}>
                  {href ? (
                    <a
                      href={href}
                      className="group/contact flex items-center gap-3 text-sm text-muted-foreground transition-smooth hover:text-foreground dark:text-white/55 dark:hover:text-white/90"
                    >
                      <span className={contactIconClass}>
                        <Icon className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      {text}
                    </a>
                  ) : (
                    <span className="flex items-center gap-3 text-sm text-muted-foreground dark:text-white/55">
                      <span className={cn(contactIconClass, 'group-hover/contact:border-border')}>
                        <Icon className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      {text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 lg:pt-0.5">
            <h3 className="footer-heading">Explore</h3>
            <ul className="space-y-0.5">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className="footer-link-nav w-full"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 lg:pt-0.5">
            <h3 className="footer-heading">Services</h3>
            <ul className="space-y-0.5">
              {serviceLinks.map((name) => (
                <li key={name}>
                  <button
                    type="button"
                    onClick={() => scrollToSection('services')}
                    className="footer-link-nav w-full"
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="footer-heading">Stay in the loop</h3>
            <div className="footer-newsletter">
              <p className="text-sm font-semibold text-foreground dark:text-white">
                Product & growth insights
              </p>
              <p className="mt-1 text-caption text-muted-foreground dark:text-white/50">
                Monthly tips on shipping faster, converting better, and scaling smarter.
              </p>
              <form onSubmit={handleNewsletter} className="mt-5 space-y-3">
                <label htmlFor="footer-email" className="sr-only">
                  Email for newsletter
                </label>
                <div className="flex flex-col gap-2 md:flex-row">
                  <input
                    id="footer-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="min-h-[48px] flex-1 rounded-xl border border-border bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/35 dark:focus:border-white/25 dark:focus:ring-white/15"
                  />
                  <Button
                    type="submit"
                    variant="gradient"
                    disabled={isSubscribing}
                    className="min-h-[48px] shrink-0 rounded-xl px-5"
                  >
                    {isSubscribing ? (
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-caption text-muted-foreground dark:text-white/40">
                  No spam. Unsubscribe anytime.
                </p>
              </form>
            </div>

            <p className="footer-heading mb-4 mt-8">Follow us</p>
            <div className="flex flex-wrap gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="footer-social"
                    aria-label={social.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="footer-divider py-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-caption text-muted-foreground dark:text-white/40">
              © {currentYear} TeamGoDevs. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-1 md:gap-2">
              {legalLinks.map((label) => (
                <button key={label} type="button" className="footer-link text-caption">
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-divider pb-10 pt-8 text-center">
          <p className="inline-flex flex-wrap items-center justify-center gap-1.5 text-caption text-muted-foreground dark:text-white/35">
            Built with
            <Heart className="h-3.5 w-3.5 fill-primary/50 text-primary/50 dark:fill-white/40 dark:text-white/40" aria-hidden />
            by
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="font-medium text-foreground/70 transition-smooth hover:text-primary dark:text-white/55 dark:hover:text-white/85"
            >
              TeamGoDevs
            </button>
            <span className="hidden sm:inline">·</span>
            <span className="w-full sm:w-auto">Helping businesses thrive digitally since 2019</span>
          </p>
        </div>
      </PageContainer>
    </footer>
  );
};

export default Footer;
