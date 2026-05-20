import { Check, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import BrandMark from '@/components/BrandMark';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CONTACT_DETAILS, QUICK_BENEFITS, WHATSAPP_URL } from './constants';
import { usePostHog } from '@posthog/react';

const ContactSidePanel = () => {
  const posthog = usePostHog();

  return (
    <div className="space-y-6 lg:sticky lg:top-24">
      <Card variant="gradient" className="overflow-hidden border-primary/15">
        <CardContent className="p-6 md:p-8">
          <BrandMark variant="panel" className="mb-6" />
          <p className="text-body mb-6 text-muted-foreground">
            We partner with startups and growing businesses to ship web, mobile, and growth
            products—fast, transparent, and built to scale.
          </p>
          <ul className="space-y-3">
            {QUICK_BENEFITS.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2.5 text-sm text-foreground">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                  <Check className="h-3 w-3 text-primary" aria-hidden />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card variant="elevated">
        <CardContent className="space-y-5 p-6">
          <h4 className="text-h3">Contact info</h4>
          {[
            { icon: Mail, label: 'Email', value: CONTACT_DETAILS.email, href: `mailto:${CONTACT_DETAILS.email}` },
            { icon: Phone, label: 'Phone', value: CONTACT_DETAILS.phone, href: `tel:${CONTACT_DETAILS.phone.replace(/\s/g, '')}` },
            { icon: MapPin, label: 'Office', value: CONTACT_DETAILS.address },
          ].map(({ icon: Icon, label, value, href }) => (
            <div key={label} className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-4 w-4 text-primary" aria-hidden />
              </span>
              <div>
                <p className="text-caption text-muted-foreground">{label}</p>
                {href ? (
                  <a href={href} className="text-sm font-medium text-foreground hover:text-primary">
                    {value}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-foreground">{value}</p>
                )}
              </div>
            </div>
          ))}
          <p className="text-caption border-t border-border pt-4 text-muted-foreground">
            {CONTACT_DETAILS.hours}
          </p>
        </CardContent>
      </Card>

      <Button
        asChild
        variant="outline"
        className="h-12 w-full rounded-xl border-[#25D366]/40 bg-[#25D366]/5 text-[#128C7E] hover:border-[#25D366] hover:bg-[#25D366]/10 dark:text-[#25D366]"
      >
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => posthog?.capture('whatsapp_chat_clicked', { source: 'contact_side_panel' })}
        >
          <MessageCircle className="h-5 w-5" />
          Chat on WhatsApp
        </a>
      </Button>
    </div>
  );
};

export default ContactSidePanel;
