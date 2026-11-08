import { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeader from '@/components/SectionHeader';
import SectionCTA from '@/components/layout/SectionCTA';
import Reveal from '@/components/layout/Reveal';
import BeforeAfterPanel from '@/components/testimonials/BeforeAfterPanel';
import ImpactStatsRow from '@/components/testimonials/ImpactStatsRow';
import TestimonialCarousel from '@/components/testimonials/TestimonialCarousel';
import TrustMetrics from '@/components/testimonials/TrustMetrics';
import VideoPlaceholder from '@/components/testimonials/VideoPlaceholder';
import { testimonials } from '@/components/testimonials/data';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = testimonials[activeIndex];

  return (
    <section
      id="testimonials"
      className="testimonials-showcase section-padding relative overflow-hidden border-y border-gray-200/50 dark:border-white/[0.04]"
    >
      <div className="testimonials-showcase-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="testimonials-showcase-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="testimonials-showcase-noise pointer-events-none absolute inset-0" aria-hidden />
      <div className="testimonials-showcase-vignette pointer-events-none absolute inset-0" aria-hidden />

      <PageContainer className="relative z-10">
        <SectionHeader
          badge="Reviews"
          title="Founders who"
          highlight="shipped faster"
          description="Founders and operators on shipping real products—not generic agency praise."
        />

        <div className="mt-10 grid w-full min-w-0 grid-cols-1 items-stretch gap-6 lg:mt-12 lg:grid-cols-[1.6fr_0.9fr] lg:gap-6">
          {/* Left — quote + impact strip */}
          <div className="flex min-w-0 w-full flex-col gap-6">
            <TestimonialCarousel
              items={testimonials}
              activeIndex={activeIndex}
              onIndexChange={setActiveIndex}
            />
            <ImpactStatsRow key={current.id} metrics={current.impact} />
          </div>

          {/* Right — video + transformation */}
          <Reveal className="flex min-w-0 w-full flex-col gap-6">
            <VideoPlaceholder />
            <BeforeAfterPanel key={current.id} data={current.beforeAfter} />
          </Reveal>
        </div>

        <Reveal className="mt-12 w-full min-w-0 sm:mt-14 md:mt-16">
          <TrustMetrics />
        </Reveal>

        <SectionCTA
          title="Join them"
          description="Free consultation—no pitch deck, just a plan."
          primaryLabel="Start your project"
          primaryTarget="contact"
          secondaryLabel="Book a call"
          secondaryTarget="contact"
          className="mt-12 sm:mt-14"
        />
      </PageContainer>
    </section>
  );
};

export default Testimonials;
