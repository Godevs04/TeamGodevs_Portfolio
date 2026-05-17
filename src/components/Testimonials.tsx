import { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/SectionHeader';
import BeforeAfterPanel from '@/components/testimonials/BeforeAfterPanel';
import TestimonialCarousel from '@/components/testimonials/TestimonialCarousel';
import TrustMetrics from '@/components/testimonials/TrustMetrics';
import VideoPlaceholder from '@/components/testimonials/VideoPlaceholder';
import { testimonials } from '@/components/testimonials/data';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = testimonials[activeIndex];

  return (
    <Section id="testimonials">
      <PageContainer>
        <SectionHeader
          badge="Social proof"
          title="Trusted by founders"
          highlight="who ship fast"
          description="Real quotes, real numbers. See what changes when you work with a team that treats your product like their own."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          <div className="lg:col-span-2">
            <TestimonialCarousel
              items={testimonials}
              activeIndex={activeIndex}
              onIndexChange={setActiveIndex}
            />

            {/* Per-client impact metrics */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {current.impact.map((metric) => (
                <Card key={metric.label} variant="glass" className="border-primary/10">
                  <CardContent className="p-4 text-center">
                    <p className="text-lg font-bold text-gradient md:text-xl">{metric.value}</p>
                    <p className="text-caption text-muted-foreground">{metric.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <VideoPlaceholder />
            <BeforeAfterPanel
              key={current.id}
              data={current.beforeAfter}
              className="animate-testimonial-fade"
            />
          </div>
        </div>

        <TrustMetrics />

        <p className="text-caption mt-10 text-center text-muted-foreground">
          <TrendingUp className="mr-1 inline h-3.5 w-3.5 text-primary" aria-hidden />
          Results based on client-reported outcomes · Individual results may vary
        </p>
      </PageContainer>
    </Section>
  );
};

export default Testimonials;
