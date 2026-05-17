import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import BrandMark from '@/components/BrandMark';
import PageContainer from '@/components/layout/PageContainer';
import { scrollToSection } from '@/lib/scroll';

const quickLinks = [
  { name: 'Home', href: 'home' },
  { name: 'Features', href: 'services' },
  { name: 'Process', href: 'process' },
  { name: 'Work', href: 'projects' },
  { name: 'Reviews', href: 'testimonials' },
  { name: 'Contact', href: 'contact' },
];

const services = [
  'Digital Marketing & SEO',
  'Web Applications',
  'Mobile App Development',
  'UI/UX Design',
  'Brand Identity',
  'Cloud Hosting',
];

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#' },
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-elegant dark:bg-card dark:text-foreground">
      <PageContainer className="relative">
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="lg:col-span-1">
            <div className="mb-6">
              <BrandMark variant="footer" onClick={() => scrollToSection('home')} />
            </div>
            <p className="mb-6 text-body text-white/60 dark:text-muted-foreground">
              We create digital experiences that drive business growth—from marketing to mobile
              apps, we deliver complete solutions that transform your online presence.
            </p>
            <div className="space-y-4">
              {[
                { icon: Mail, text: 'hello@teamgodevs.com' },
                { icon: Phone, text: '+91 96777 23429' },
                { icon: MapPin, text: 'HSR Layout, Bangalore, 640022, India' },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 text-sm text-white/70 dark:text-muted-foreground"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/25">
                    <Icon className="h-4 w-4 text-primary" aria-hidden />
                  </span>
                  {text}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="footer-heading">Quick links</h3>
            <ul className="space-y-1">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className="footer-link flex w-full items-center rounded-lg px-2 py-2"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Our services</h3>
            <ul className="space-y-1">
              {services.map((name) => (
                <li key={name}>
                  <button
                    type="button"
                    onClick={() => scrollToSection('services')}
                    className="footer-link flex w-full items-center rounded-lg px-2 py-2 text-left"
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Stay connected</h3>
            <p className="mb-6 text-body text-white/60 dark:text-muted-foreground">
              Subscribe for insights on digital marketing, web development, and industry trends.
            </p>

            <div className="mb-8">
              <div className="flex overflow-hidden rounded-xl ring-1 ring-white/10">
                <input
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email for newsletter"
                  className="min-h-[48px] flex-1 border-0 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:bg-muted dark:text-foreground"
                />
                <button
                  type="button"
                  className="flex min-h-[48px] min-w-[48px] items-center justify-center bg-gradient-primary px-5 transition-smooth hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Subscribe"
                >
                  <Mail className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>

            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-white/15 text-white/70 transition-smooth hover:border-primary/50 hover:bg-primary/15 hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-8 dark:border-border">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-caption text-white/45 dark:text-muted-foreground">
              © {currentYear} TeamGoDevs. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((label) => (
                <button key={label} type="button" className="footer-link px-2 py-2">
                  {label}
                </button>
              ))}
            </div>
          </div>
          <p className="text-caption mt-8 border-t border-white/5 pt-8 text-center text-white/40 dark:border-border dark:text-muted-foreground">
            Built with care by TeamGoDevs · Helping businesses thrive digitally since 2019
          </p>
        </div>
      </PageContainer>
    </footer>
  );
};

export default Footer;
