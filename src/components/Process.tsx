import { Search, PenTool, Code2, Rocket } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/SectionHeader';
import SectionCTA from '@/components/layout/SectionCTA';
import Reveal from '@/components/layout/Reveal';

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Discover',
    description: 'Workshop → scope, timeline, fixed quote.',
    deliverables: ['Product brief', 'Roadmap', 'Fixed quote'],
  },
  {
    step: '02',
    icon: PenTool,
    title: 'Design',
    description: 'Wireframes → UI → approved prototype.',
    deliverables: ['Figma system', 'Prototype', 'Dev handoff'],
  },
  {
    step: '03',
    icon: Code2,
    title: 'Build',
    description: 'Weekly demos, QA, and performance built in.',
    deliverables: ['Weekly demos', 'Test coverage', 'Staging'],
  },
  {
    step: '04',
    icon: Rocket,
    title: 'Launch',
    description: 'Deploy, monitor, 30-day hypercare.',
    deliverables: ['Production', 'Analytics', 'Support'],
  },
];

const Process = () => {
  return (
    <Section id="process" variant="muted">
      <PageContainer>
        <SectionHeader
          badge="Process"
          title="Four steps."
          highlight="Zero guesswork."
          description="You always know what's shipping next and when."
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={index * 80}>
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-smooth hover-lift">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-xs font-bold text-white shadow-glow">
                      {item.step}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" aria-hidden />
                    </span>
                  </div>
                  <h3 className="text-h3 mb-2">{item.title}</h3>
                  <p className="text-body mb-4 text-muted-foreground">{item.description}</p>
                  <ul className="mt-auto space-y-2">
                    {item.deliverables.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-caption text-muted-foreground">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>

        <SectionCTA
          title="See the results"
          description="Explore case studies with real before/after metrics."
          primaryLabel="View case studies"
          primaryTarget="projects"
          secondaryLabel="Start a project"
          secondaryTarget="contact"
        />
      </PageContainer>
    </Section>
  );
};

export default Process;
