import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import PageContainer from '@/components/layout/PageContainer';
import SectionCTA from '@/components/layout/SectionCTA';
import CaseStudyCard from '@/components/projects/CaseStudyCard';
import ProjectFilters from '@/components/projects/ProjectFilters';
import {
  caseStudies,
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
      ecommerce: 0,
      saas: 0,
    };
    caseStudies.forEach((study) => {
      study.filters.forEach((f) => {
        base[f] += 1;
      });
    });
    return base;
  }, []);

  const filteredStudies = useMemo(
    () => filterCaseStudies(activeFilter),
    [activeFilter]
  );

  return (
    <section
      id="projects"
      className="projects-showcase relative overflow-hidden border-y border-gray-200/80 py-20 sm:py-24 md:py-28 dark:border-white/5"
    >
      <div className="projects-showcase-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="projects-showcase-glow-left pointer-events-none absolute inset-0" aria-hidden />
      <div className="projects-showcase-noise pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.06]" aria-hidden />

      <PageContainer className="relative z-10 !px-6">
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-14 max-w-3xl text-center md:mb-16"
        >
          <span className="mb-5 inline-flex rounded-full border border-green-500/25 bg-green-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-green-700 dark:text-emerald-400">
            Selected work
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            Products &amp; platforms{' '}
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-400">
              we&apos;ve built
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-600 dark:text-gray-400 md:text-lg">
            We partner with startups and businesses to build scalable digital products with
            measurable impact.
          </p>
        </motion.header>

        <ProjectFilters active={activeFilter} onChange={setActiveFilter} counts={counts} />

        <div
          className={cn(
            'grid grid-cols-1 items-stretch gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-10',
            filteredStudies.length === 0 && 'opacity-50'
          )}
        >
          {filteredStudies.length > 0 ? (
            filteredStudies.map((study, index) => (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-32px' }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className={cn(
                  'flex h-full min-h-0',
                  study.variant === 'flagship' && 'md:col-span-2'
                )}
              >
                <CaseStudyCard study={study} index={index} />
              </motion.div>
            ))
          ) : (
            <p className="col-span-full py-16 text-center text-gray-600 dark:text-gray-400">
              No projects in this category.{' '}
              <button
                type="button"
                className="font-semibold text-green-600 hover:underline dark:text-emerald-400"
                onClick={() => setActiveFilter('all')}
              >
                View all work
              </button>
            </p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08, duration: 0.45 }}
          className="mt-16 md:mt-20"
        >
          <SectionCTA
            title="Ready for similar results?"
            description="Get a scoped plan in 48 hours — hello@teamgodevs.in"
            primaryLabel="Start your project"
            primaryTarget="contact"
          />
        </motion.div>
      </PageContainer>
    </section>
  );
};

export default Projects;
