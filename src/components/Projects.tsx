import { useMemo, useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/SectionHeader';
import SectionCTA from '@/components/layout/SectionCTA';
import Reveal from '@/components/layout/Reveal';
import CaseStudyCard from '@/components/projects/CaseStudyCard';
import FeaturedProject from '@/components/projects/FeaturedProject';
import ProjectFilters from '@/components/projects/ProjectFilters';
import {
  caseStudies,
  featuredCaseStudy,
  filterCaseStudies,
  type ProjectFilter,
} from '@/components/projects/caseStudies';
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
          badge="Work"
          title="Real impact,"
          highlight="real metrics"
          description="Problem → solution → measurable results. Filter by type."
        />

        {showFeatured && (
          <Reveal>
            <FeaturedProject study={featuredCaseStudy} />
          </Reveal>
        )}

        <ProjectFilters active={activeFilter} onChange={setActiveFilter} counts={counts} />

        <div
          className={cn(
            'grid grid-cols-1 gap-8 lg:grid-cols-2',
            gridStudies.length === 0 && 'opacity-50'
          )}
        >
          {gridStudies.length > 0 ? (
            gridStudies.map((study, i) => (
              <Reveal key={study.id} delay={(i % 2) * 80}>
                <CaseStudyCard study={study} />
              </Reveal>
            ))
          ) : (
            <p className="col-span-full py-12 text-center text-muted-foreground">
              No case studies here.{' '}
              <button
                type="button"
                className="font-medium text-primary hover:underline"
                onClick={() => setActiveFilter('all')}
              >
                View all
              </button>
            </p>
          )}
        </div>

        <SectionCTA
          title="Ready for similar results?"
          description="Get a scoped plan in 48 hours."
          primaryLabel="Start your project"
          primaryTarget="contact"
        />
      </PageContainer>
    </Section>
  );
};

export default Projects;
