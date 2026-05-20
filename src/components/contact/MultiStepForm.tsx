import { useState } from 'react';
import { ArrowLeft, ArrowRight, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import OptionPicker from '@/components/contact/OptionPicker';
import { BUDGET_RANGES, PROJECT_TYPES } from './constants';
import { CLARITY_EVENTS, trackClarityEvent } from '@/lib/clarity';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

export type LeadFormData = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
};

const initialData: LeadFormData = {
  name: '',
  email: '',
  projectType: '',
  budget: '',
  message: '',
};

const STEPS = [
  { id: 1, title: 'About you', description: 'How can we reach you?' },
  { id: 2, title: 'Your project', description: 'What are you building?' },
  { id: 3, title: 'Details', description: 'Tell us more' },
];

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<LeadFormData>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const progress = (step / STEPS.length) * 100;

  const updateField = (field: keyof LeadFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (): boolean => {
    if (step === 1) {
      if (!formData.name.trim() || !formData.email.trim()) {
        toast.error('Please enter your name and email.');
        return false;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast.error('Please enter a valid email address.');
        return false;
      }
    }
    if (step === 2) {
      if (!formData.projectType || !formData.budget) {
        toast.error('Please select project type and budget range.');
        return false;
      }
    }
    if (step === 3 && !formData.message.trim()) {
      toast.error('Please tell us about your project.');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, STEPS.length));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      trackClarityEvent(CLARITY_EVENTS.CONTACT_SUBMIT, {
        project_type: formData.projectType,
        budget: formData.budget,
      });
      toast.success("You're in! We'll reply within 2 hours with next steps.", {
        duration: 5000,
        style: {
          background: 'hsl(var(--card))',
          color: 'hsl(var(--foreground))',
          border: '1px solid hsl(var(--primary))',
        },
      });
      setFormData(initialData);
      setStep(1);
    } catch {
      toast.error('Something went wrong. Try WhatsApp or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card variant="elevated" className="shadow-large">
      <CardContent className="p-4 sm:p-6 md:p-10">
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-between text-sm">
            <span className="font-medium text-foreground">
              Step {step} of {STEPS.length}
            </span>
            <span className="text-muted-foreground">{STEPS[step - 1].title}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-caption mt-2 text-muted-foreground">{STEPS[step - 1].description}</p>
        </div>

        <form onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()}>
          <div key={step} className={cn(step === 2 && 'space-y-8')}>
            {step === 1 && (
              <div className="space-y-5">
                <div>
                  <label htmlFor="lead-name" className="mb-2 block text-sm font-medium">
                    Full name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="lead-name"
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    className="h-12 rounded-xl"
                  />
                </div>
                <div>
                  <label htmlFor="lead-email" className="mb-2 block text-sm font-medium">
                    Work email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="lead-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="you@company.com"
                    autoComplete="email"
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <>
                <OptionPicker
                  label="Project type"
                  required
                  value={formData.projectType}
                  options={PROJECT_TYPES}
                  onChange={(v) => updateField('projectType', v)}
                  columns={2}
                />
                <OptionPicker
                  label="Budget range"
                  required
                  value={formData.budget}
                  options={BUDGET_RANGES}
                  onChange={(v) => updateField('budget', v)}
                />
              </>
            )}

            {step === 3 && (
              <div>
                <label htmlFor="lead-message" className="mb-2 block text-sm font-medium">
                  Project details <span className="text-destructive">*</span>
                </label>
                <Textarea
                  id="lead-message"
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  placeholder="Goals, timeline, links to references..."
                  rows={6}
                  className="resize-none rounded-xl"
                />
                <p className="text-caption mt-3 flex items-center gap-1.5 text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
                  Free consultation included
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 flex gap-3 border-t border-border pt-6">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                className="h-12 flex-1 rounded-xl"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            {step < 3 ? (
              <Button
                type="button"
                variant="gradient"
                onClick={handleNext}
                className="h-12 flex-1 rounded-xl"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="gradient"
                disabled={isSubmitting}
                className="h-12 flex-1 rounded-xl"
              >
                {isSubmitting ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Submit inquiry
                  </>
                )}
              </Button>
            )}
          </div>
        </form>

        <p className="text-caption mt-6 border-t border-border pt-6 text-center text-muted-foreground">
          By submitting, you agree to our Privacy Policy. We never share your data.
        </p>
      </CardContent>
    </Card>
  );
};

export default MultiStepForm;
