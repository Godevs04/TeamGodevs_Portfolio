import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PageContainer from '@/components/layout/PageContainer';
import SectionCTA from '@/components/layout/SectionCTA';
import CaseStudyCard from '@/components/projects/CaseStudyCard';
import CaseStudyModal from '@/components/projects/CaseStudyModal';
import ProjectFilters from '@/components/projects/ProjectFilters';
import {
  caseStudies,
  filterCaseStudies,
  type CaseStudy,
  type ProjectFilter,
} from '@/components/projects/caseStudies';
import { cn } from '@/lib/utils';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('all');
  const [modalStudy, setModalStudy] = useState<CaseStudy | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openCaseStudy = (study: CaseStudy) => {
    setModalStudy(study);
    setModalOpen(true);
  };

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
      className="projects-showcase relative overflow-hidden border-y border-gray-200/50 py-20 sm:py-24 md:py-28 dark:border-white/[0.04]"
    >
      <div className="projects-showcase-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="projects-showcase-mesh pointer-events-none absolute inset-0" aria-hidden />
      <div className="projects-showcase-glow pointer-events-none absolute inset-0" aria-hidden />
      <div className="projects-showcase-blob projects-showcase-blob--a pointer-events-none absolute" aria-hidden />
      <div className="projects-showcase-blob projects-showcase-blob--b pointer-events-none absolute" aria-hidden />
      <div className="projects-showcase-noise pointer-events-none absolute inset-0" aria-hidden />
      <div className="projects-showcase-vignette pointer-events-none absolute inset-0" aria-hidden />

      <PageContainer className="relative z-10 !px-6">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
        >
          <span className="project-section-badge mb-4 inline-flex rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em]">
            Selected work
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl md:text-5xl md:tracking-[-0.02em]">
            Products we{' '}
            <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent dark:from-green-400 dark:to-emerald-400">
              ship
            </span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400/90 sm:text-base">
            Interactive previews from real client builds — hover to explore, open for the full story.
          </p>
        </motion.header>

        <ProjectFilters active={activeFilter} onChange={setActiveFilter} counts={counts} />

        <div
          className={cn(
            'mx-auto grid max-w-[1240px] grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8',
            filteredStudies.length === 0 && 'opacity-50'
          )}
        >
          <AnimatePresence mode="popLayout">
            {filteredStudies.length > 0 ? (
              filteredStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex w-full max-w-[380px] justify-center"
                >
                  <CaseStudyCard
                    study={study}
                    index={index}
                    onOpenCaseStudy={openCaseStudy}
                  />
                </motion.div>
              ))
            ) : (
              <p className="col-span-full py-16 text-center text-gray-600 dark:text-gray-400">
                No projects in this category.{' '}
                <button
                  type="button"
                  className="font-semibold text-green-600 hover:text-green-700 dark:text-emerald-400/90"
                  onClick={() => setActiveFilter('all')}
                >
                  View all work
                </button>
              </p>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06, duration: 0.5 }}
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

      <CaseStudyModal study={modalStudy} open={modalOpen} onOpenChange={setModalOpen} />
    </section>
  );
};

export default Projects;
