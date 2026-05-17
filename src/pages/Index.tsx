import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SocialProof from '@/components/SocialProof';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Projects from '@/components/Projects';
import Results from '@/components/Results';
import Testimonials from '@/components/Testimonials';
import FinalCTA from '@/components/FinalCTA';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
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
        <Services />
        <Process />
        <Projects />
        <Results />
        <Testimonials />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
