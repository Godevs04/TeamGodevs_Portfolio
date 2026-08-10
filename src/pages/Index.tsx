import { lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SocialProof from '@/components/SocialProof';
import MobileCTABar from '@/components/MobileCTABar';
import Footer from '@/components/Footer';
import SectionFallback from '@/components/layout/SectionFallback';
import LazySection from '@/components/layout/LazySection';
import PageMeta from '@/components/seo/PageMeta';
import StructuredData from '@/components/seo/StructuredData';

const Services = lazy(() => import('@/components/Services'));
const Process = lazy(() => import('@/components/Process'));
const Projects = lazy(() => import('@/components/Projects'));
const Results = lazy(() => import('@/components/Results'));
const Testimonials = lazy(() => import('@/components/Testimonials'));
const FinalCTA = lazy(() => import('@/components/FinalCTA'));
const Contact = lazy(() => import('@/components/Contact'));

const Index = () => {
  return (
    <>
      <PageMeta />
      <StructuredData />
      <div className="min-h-screen bg-background pb-[calc(5.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">
          <Hero />
          <SocialProof />
          <LazySection>
            <Suspense fallback={<SectionFallback />}>
              <Services />
            </Suspense>
          </LazySection>
          <LazySection>
            <Suspense fallback={<SectionFallback />}>
              <Process />
            </Suspense>
          </LazySection>
          <LazySection minHeightClassName="min-h-[24rem]">
            <Suspense fallback={<SectionFallback />}>
              <Projects />
            </Suspense>
          </LazySection>
          <LazySection>
            <Suspense fallback={<SectionFallback />}>
              <Results />
            </Suspense>
          </LazySection>
          <LazySection>
            <Suspense fallback={<SectionFallback />}>
              <Testimonials />
            </Suspense>
          </LazySection>
          <LazySection>
            <Suspense fallback={<SectionFallback />}>
              <FinalCTA />
            </Suspense>
          </LazySection>
          <LazySection>
            <Suspense fallback={<SectionFallback />}>
              <Contact />
            </Suspense>
          </LazySection>
        </main>
        <Footer />
        <MobileCTABar />
      </div>
    </>
  );
};

export default Index;
