import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PageContainer from '@/components/layout/PageContainer';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/SectionHeader';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'TechStart Solutions',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format',
    content:
      'TeamGodevs transformed our online presence completely. Their SEO strategy increased our organic traffic by 400% in just 6 months. The mobile app they built has over 25,000 downloads and growing!',
    rating: 5,
    project: 'SEO & Mobile App Development',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Marketing Director',
    company: 'EcoCommerce Ltd',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format',
    content:
      'The e-commerce platform they developed exceeded all our expectations. Our conversion rates doubled, and the user experience is phenomenal.',
    rating: 5,
    project: 'E-commerce Development',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Founder',
    company: 'HealthFirst Clinic',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face&auto=format',
    content:
      'Their healthcare management app revolutionized how we serve our patients. Appointment bookings increased by 300%, and patient satisfaction is at an all-time high.',
    rating: 5,
    project: 'Healthcare App Development',
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Operations Manager',
    company: 'LogiFlow Industries',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format',
    content:
      "The web application they built streamlined our entire workflow. We've seen a 250% increase in productivity and our team collaboration has never been better.",
    rating: 5,
    project: 'Web Application Development',
  },
];

const stats = [
  { value: '98%', label: 'Client satisfaction' },
  { value: '4.9/5', label: 'Average rating' },
  { value: '85%', label: 'Repeat clients' },
  { value: '24/7', label: 'Support available' },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const current = testimonials[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  };

  const goToNext = () => {
    setCurrentIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  };

  return (
    <Section id="testimonials" variant="muted">
      <PageContainer>
        <SectionHeader
          badge="Client success"
          title="What our clients"
          highlight="say about us"
          description="Hear from businesses we've helped transform their digital presence and achieve remarkable growth."
        />

        <div className="mx-auto max-w-5xl">
          <Card variant="glass" className="relative overflow-hidden shadow-large">
            <Quote className="absolute right-6 top-6 h-16 w-16 text-primary/10 md:right-8 md:top-8 md:h-20 md:w-20" aria-hidden />
            <CardContent className="relative p-8 md:p-12">
              <div className="mb-8 flex justify-center gap-1" role="img" aria-label={`${current.rating} out of 5 stars`}>
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400 md:h-6 md:w-6" />
                ))}
              </div>

              <blockquote className="text-h3 mb-10 text-center font-medium leading-relaxed md:mb-12">
                &ldquo;{current.content}&rdquo;
              </blockquote>

              <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
                <div className="flex items-center gap-4">
                  <img
                    src={current.avatar}
                    alt=""
                    className="h-14 w-14 rounded-full object-cover shadow-medium ring-2 ring-primary/20 md:h-16 md:w-16"
                  />
                  <div className="text-center md:text-left">
                    <div className="font-semibold text-foreground">{current.name}</div>
                    <div className="text-body text-muted-foreground">
                      {current.role} at {current.company}
                    </div>
                  </div>
                </div>
                <div className="hidden h-12 w-px bg-border md:block" aria-hidden />
                <div className="text-center">
                  <div className="text-caption text-muted-foreground">Project type</div>
                  <div className="font-semibold text-primary">{current.project}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="rounded-full hover-lift"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Go to testimonial ${index + 1}`}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-3 w-3 min-h-[12px] min-w-[12px] rounded-full transition-smooth focus-visible:ring-2 focus-visible:ring-ring ${
                    index === currentIndex ? 'bg-primary' : 'bg-border hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="rounded-full hover-lift"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-8 border-t border-border pt-16 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-h2 text-gradient mb-2">{stat.value}</div>
              <div className="text-caption text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </PageContainer>
    </Section>
  );
};

export default Testimonials;
