import { useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import PageContainer from '@/components/layout/PageContainer';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/SectionHeader';
import CaseStudyCard from '@/components/projects/CaseStudyCard';
import FeaturedProject from '@/components/projects/FeaturedProject';
import ProjectFilters from '@/components/projects/ProjectFilters';
import {
  caseStudies,
  featuredCaseStudy,
  filterCaseStudies,
  type ProjectFilter,
} from '@/components/projects/caseStudies';
import { scrollToSection } from '@/lib/scroll';
import { cn } from '@/lib/utils';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');

  const counts = useMemo(() => {
    const base: Record<ProjectFilter, number> = {
      all: caseStudies.length,
      web: 0,
      mobile: 0,
      seo: 0,
      ecommerce: 0,
    };
    caseStudies.forEach((study) => {
      study.filters.forEach((f) => {
        base[f] += 1;
      });
    });
    return base;
  }, []);

  const showFeatured = useMemo(() => {
    if (activeFilter === 'all') return true;
    return featuredCaseStudy.filters.includes(activeFilter);
  }, [activeFilter]);

  const gridStudies = useMemo(() => {
    const list = filterCaseStudies(activeFilter);
    if (showFeatured) {
      return list.filter((s) => s.id !== featuredCaseStudy.id);
    }
    return list;
  }, [activeFilter, showFeatured]);

  return (
    <Section id="projects" variant="muted">
      <PageContainer>
        <SectionHeader
          badge="Case studies"
          title="Client impact,"
          highlight="not just screenshots"
          description="Real problems, engineered solutions, and metrics that matter. Filter by product type to see relevant work."
        />

        {showFeatured && <FeaturedProject study={featuredCaseStudy} />}

        <ProjectFilters active={activeFilter} onChange={setActiveFilter} counts={counts} />

        <div
          className={cn(
            'grid grid-cols-1 gap-8 transition-opacity duration-300 lg:grid-cols-2',
            gridStudies.length === 0 && 'opacity-50'
          )}
        >
          {gridStudies.length > 0 ? (
            gridStudies.map((study) => <CaseStudyCard key={study.id} study={study} />)
          ) : (
            <p className="col-span-full py-12 text-center text-muted-foreground">
              No other case studies in this category.{' '}
              <button
                type="button"
                className="font-medium text-primary hover:underline"
                onClick={() => setActiveFilter('all')}
              >
                View all projects
              </button>
            </p>
          )}
        </div>

        <Card variant="gradient" className="mt-20 p-8 text-center md:mt-24 md:p-12">
          <div className="mx-auto max-w-3xl">
            <h3 className="text-h2 mb-4">Want results like these?</h3>
            <p className="text-body-lg mb-8 text-muted-foreground">
              Tell us what you&apos;re building—we&apos;ll share a relevant case study and a scoped
              plan within 48 hours.
            </p>
            <Button
              variant="gradient"
              size="lg"
              className="rounded-full"
              onClick={() => scrollToSection('contact')}
            >
              Start your project
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </Card>
      </PageContainer>
    </Section>
  );
};

export default Projects;
