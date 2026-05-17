import { Search, PenTool, Code2, Rocket } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/SectionHeader';

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Discover',
    description:
      'We map goals, users, and constraints in a focused workshop. You leave with scope, timeline, and success metrics.',
    deliverables: ['Product brief', 'Roadmap', 'Fixed quote'],
  },
  {
    step: '02',
    icon: PenTool,
    title: 'Design',
    description:
      'Wireframes → UI → prototype. You approve every screen before production code starts.',
    deliverables: ['Figma system', 'Prototype', 'Dev handoff'],
  },
  {
    step: '03',
    icon: Code2,
    title: 'Build',
    description:
      'Agile sprints with weekly demos. Engineering, QA, and performance baked in from sprint one.',
    deliverables: ['Weekly demos', 'Test coverage', 'Staging env'],
  },
  {
    step: '04',
    icon: Rocket,
    title: 'Launch',
    description:
      'Deploy, monitor, optimize. Hypercare and growth iterations so launch day isn’t “good luck.”',
    deliverables: ['Production deploy', 'Analytics', '30-day support'],
  },
];

const Process = () => {
  return (
    <Section id="process" variant="muted">
      <PageContainer>
        <SectionHeader
          badge="How we work"
          title="A proven process,"
          highlight="zero guesswork"
          description="Four phases. Clear deliverables. You always know what's shipping next."
        />

        <div className="relative">
          <div
            className="absolute left-8 top-0 hidden h-full w-px bg-gradient-to-b from-[#16a34a] to-[#10b981] md:block lg:left-[calc(12.5%-1px)]"
            aria-hidden
          />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="relative flex flex-col">
                  {index < steps.length - 1 && (
                    <div
                      className="absolute right-0 top-8 hidden h-px w-full translate-x-1/2 bg-gradient-to-r from-primary/40 to-transparent lg:block"
                      aria-hidden
                    />
                  )}

                  <div className="relative z-10 mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-background bg-gradient-primary text-xs font-bold text-white shadow-glow ring-4 ring-primary/20">
                      {item.step}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-card border border-border shadow-soft md:hidden">
                      <Icon className="h-5 w-5 text-primary" aria-hidden />
                    </span>
                  </div>

                  <div className="flex-1 rounded-2xl border border-border bg-card p-6 shadow-soft transition-smooth hover-lift">
                    <div className="mb-3 hidden md:flex">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary">
                        <Icon className="h-5 w-5 text-white" aria-hidden />
                      </span>
                    </div>
                    <h3 className="text-h3 mb-2">{item.title}</h3>
                    <p className="text-body mb-4 text-muted-foreground">{item.description}</p>
                    <ul className="space-y-2">
                      {item.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-2 text-caption text-muted-foreground">
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </PageContainer>
    </Section>
  );
};

export default Process;
