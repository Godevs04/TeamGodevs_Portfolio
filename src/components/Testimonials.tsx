import { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/SectionHeader';
import SectionCTA from '@/components/layout/SectionCTA';
import Reveal from '@/components/layout/Reveal';
import BeforeAfterPanel from '@/components/testimonials/BeforeAfterPanel';
import TestimonialCarousel from '@/components/testimonials/TestimonialCarousel';
import TrustMetrics from '@/components/testimonials/TrustMetrics';
import VideoPlaceholder from '@/components/testimonials/VideoPlaceholder';
import { testimonials } from '@/components/testimonials/data';
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = testimonials[activeIndex];

  return (
    <Section id="testimonials">
      <PageContainer>
        <SectionHeader
          badge="Reviews"
          title="Founders who"
          highlight="shipped faster"
          description="Short quotes. Real before/after numbers."
        />

        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Main quote + metrics */}
          <div className="flex flex-col gap-6 lg:col-span-7 xl:col-span-8">
            <TestimonialCarousel
              items={testimonials}
              activeIndex={activeIndex}
              onIndexChange={setActiveIndex}
            />

            <div
              key={current.id}
              className="grid grid-cols-1 gap-3 sm:grid-cols-3"
              aria-label="Client impact metrics"
            >
              {current.impact.map((metric) => (
                <Card key={metric.label} variant="glass" className="border-primary/10 hover-lift">
                  <CardContent className="flex flex-col items-center justify-center p-4 text-center sm:p-5">
                    <p className="text-lg font-bold text-gradient md:text-xl">{metric.value}</p>
                    <p className="text-caption mt-1 text-muted-foreground">{metric.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Video + before/after */}
          <Reveal className="flex flex-col gap-6 lg:col-span-5 xl:col-span-4">
            <VideoPlaceholder />
            <BeforeAfterPanel key={current.id} data={current.beforeAfter} />
          </Reveal>
        </div>

        <Reveal>
          <TrustMetrics />
        </Reveal>

        <SectionCTA
          title="Join them"
          description="Free consultation—no pitch deck, just a plan."
          primaryLabel="Start your project"
          primaryTarget="contact"
          secondaryLabel="Book a call"
          secondaryTarget="contact"
          className="mt-16"
        />
      </PageContainer>
    </Section>
  );
};

export default Testimonials;
