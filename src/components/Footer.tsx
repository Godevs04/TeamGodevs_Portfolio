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
import { scrollToSection } from '@/lib/scroll';
import toast from 'react-hot-toast';

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

const Footer = () => {
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
        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 py-20 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-16">
          {/* About */}
          <div className="lg:col-span-4">
            <BrandMark variant="footer" onClick={() => scrollToSection('home')} />
            <p className="mt-6 max-w-sm text-body leading-relaxed text-white/55">
              TeamGoDevs is a product studio helping startups and SMBs ship web apps, mobile
              experiences, and growth systems that drive real revenue—not just pretty pixels.
            </p>
            <div className="footer-divider my-8" />
            <ul className="space-y-3">
              {[
                { icon: Mail, text: 'hello@teamgodevs.com', href: 'mailto:hello@teamgodevs.com' },
                { icon: Phone, text: '+91 96777 23429', href: 'tel:+919677723429' },
                { icon: MapPin, text: 'HSR Layout, Bangalore, India' },
              ].map(({ icon: Icon, text, href }) => (
                <li key={text}>
                  {href ? (
                    <a
                      href={href}
                      className="flex items-center gap-3 text-sm text-white/60 transition-smooth hover:text-[#10b981]"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-[#10b981]" aria-hidden />
                      {text}
                    </a>
                  ) : (
                    <span className="flex items-center gap-3 text-sm text-white/60">
                      <Icon className="h-4 w-4 shrink-0 text-[#10b981]" aria-hidden />
                      {text}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h3 className="footer-heading">Explore</h3>
            <ul className="space-y-0.5">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className="footer-link w-full"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="footer-heading">Services</h3>
            <ul className="space-y-0.5">
              {serviceLinks.map((name) => (
                <li key={name}>
                  <button
                    type="button"
                    onClick={() => scrollToSection('services')}
                    className="footer-link w-full"
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter + social */}
          <div className="lg:col-span-4">
            <h3 className="footer-heading">Stay in the loop</h3>
            <div className="footer-newsletter">
              <p className="text-sm font-semibold text-white">Product & growth insights</p>
              <p className="mt-1 text-caption text-white/50">
                Monthly tips on shipping faster, converting better, and scaling smarter.
              </p>
              <form onSubmit={handleNewsletter} className="mt-5 space-y-3">
                <label htmlFor="footer-email" className="sr-only">
                  Email for newsletter
                </label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <input
                    id="footer-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="min-h-[48px] flex-1 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/35 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/30"
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
                <p className="text-caption text-white/40">No spam. Unsubscribe anytime.</p>
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

        {/* Bottom bar */}
        <div className="footer-divider py-8">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <p className="text-caption text-white/40">
              © {currentYear} TeamGoDevs. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-1 md:gap-2">
              {legalLinks.map((label) => (
                <button key={label} type="button" className="footer-link !min-h-0 py-2 text-caption">
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-divider pb-10 pt-8 text-center">
          <p className="inline-flex flex-wrap items-center justify-center gap-1.5 text-caption text-white/35">
            Built with
            <Heart className="h-3.5 w-3.5 fill-[#10b981] text-[#10b981]" aria-hidden />
            by
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="font-medium text-white/55 transition-smooth hover:text-[#10b981]"
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
