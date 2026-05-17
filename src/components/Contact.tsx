import { useState } from 'react';
import { Send, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import PageContainer from '@/components/layout/PageContainer';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/SectionHeader';
import BrandLogo from '@/components/BrandLogo';
import toast from 'react-hot-toast';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit our office',
    content: 'HSR Layout, Bangalore, 640022, India',
    subContent: 'Monday – Friday, 10:00 AM – 7:00 PM IST',
  },
  {
    icon: Phone,
    title: 'Call us',
    content: '+91 96777 23429',
    subContent: 'Available 24/7 for urgent matters',
  },
  {
    icon: Mail,
    title: 'Email us',
    content: 'hello@teamgodevs.com',
    subContent: 'We respond within 2 hours',
  },
  {
    icon: Clock,
    title: 'Business hours',
    content: 'Mon – Fri: 10:00 AM – 7:00 PM',
    subContent: 'Sat – Sun: By appointment only',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Message sent! We'll get back to you within 24 hours.", {
        duration: 5000,
        style: {
          background: 'hsl(var(--card))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--primary))',
        },
      });
      setFormData({ name: '', email: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please try again.', { duration: 5000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section id="contact">
      <PageContainer>
        <SectionHeader
          badge="Get in touch"
          title="Ready to start"
          highlight="your project?"
          description="Let's discuss how we can transform your digital presence and drive business growth."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Card variant="elevated" className="shadow-large">
            <CardContent className="p-6 md:p-10">
              <h3 className="text-h3 mb-8">Send us a message</h3>

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                    Full name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                    Email address <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@company.com"
                    className="h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                    Project details <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project, goals, and timeline..."
                    rows={5}
                    className="resize-none rounded-xl"
                  />
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  disabled={isSubmitting}
                  className="h-12 w-full rounded-xl"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send message
                    </>
                  )}
                </Button>
              </form>

              <p className="text-caption mt-8 border-t border-border pt-8 text-center text-muted-foreground">
                By submitting, you agree to our Privacy Policy and Terms of Service.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card variant="gradient">
              <CardContent className="p-6 md:p-10">
                <div className="mb-8 flex justify-center md:justify-start">
                  <BrandLogo size="sm" />
                </div>
                <h3 className="text-h3 mb-4">Let&apos;s connect</h3>
                <p className="text-body mb-8 text-muted-foreground">
                  We&apos;d love to hear about your project. Our team is ready to provide expert
                  guidance and solutions that drive results.
                </p>
                <div className="space-y-6">
                  {contactInfo.map((info) => {
                    const Icon = info.icon;
                    return (
                      <div key={info.title} className="flex gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-primary">
                          <Icon className="h-5 w-5 text-white" aria-hidden />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{info.title}</h4>
                          <p className="text-body text-foreground">{info.content}</p>
                          <p className="text-caption text-muted-foreground">{info.subContent}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary">
                  <Clock className="h-7 w-7 text-white" aria-hidden />
                </div>
                <h4 className="text-h3 mb-2">Quick response guarantee</h4>
                <p className="text-body text-muted-foreground">
                  Expect a response within 2 hours during business hours, or by the next morning
                  for after-hours inquiries.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
};

export default Contact;
