import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Code2, FileText, GraduationCap, MessageCircle } from 'lucide-react';
import { studentWhatsAppUrl } from '@/components/student-projects/helpers';
import Section from '@/components/layout/Section';
import PageContainer from '@/components/layout/PageContainer';
import SectionHeader from '@/components/SectionHeader';
import { Button } from '@/components/ui/button';
import StudentProjectCard from '@/components/student-projects/StudentProjectCard';
import {
  FEATURED_STUDENT_PROJECTS,
  STARTING_PRICE,
  STUDENT_PROJECTS,
  STUDENT_PROJECT_COUNT_LABEL,
  formatINR,
  type StudentProject,
} from '@/components/student-projects/data';
import { STUDENT_PROJECTS_PATH } from '@/lib/features';
import { captureEvent } from '@/lib/captureEvent';

const TEASER_COUNT = 6;

const StudentProjectsTeaser = () => {
  const navigate = useNavigate();
  const featured = FEATURED_STUDENT_PROJECTS.slice(0, TEASER_COUNT);

  const browseAll = () => {
    captureEvent('student_projects_browse_clicked', { section: 'home_teaser' });
    navigate(STUDENT_PROJECTS_PATH);
  };

  const openProject = (project: StudentProject) =>
    navigate(`${STUDENT_PROJECTS_PATH}?project=${project.id}`);

  return (
    <Section id="student-projects" variant="muted">
      <PageContainer>
        <SectionHeader
          badge="For college students"
          title={`${STUDENT_PROJECT_COUNT_LABEL} final year & mini projects`}
          highlight={`from ${formatINR(STARTING_PRICE)}`}
          description="AI/ML, web, Android, IoT, cyber security, blockchain and cloud projects — each with abstract, full documentation and source code."
        />

        <ul className="-mt-4 mb-10 flex flex-wrap justify-center gap-2 md:-mt-8">
          {[
            { icon: FileText, label: 'Abstract' },
            { icon: BookOpen, label: 'Documentation' },
            { icon: Code2, label: 'Source code' },
            { icon: GraduationCap, label: 'B.E · B.Tech · MCA · BCA · M.Tech' },
          ].map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-background px-3 py-1.5 text-sm font-medium"
            >
              <Icon className="h-4 w-4 text-primary" aria-hidden />
              {label}
            </li>
          ))}
        </ul>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <StudentProjectCard key={project.id} project={project} onOpen={openProject} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button variant="cta" size="lg" onClick={browseAll}>
            Browse all {STUDENT_PROJECTS.length} projects
            <ArrowRight aria-hidden />
          </Button>
          <Button asChild variant="ctaOutline" size="lg">
            <a
              href={studentWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => captureEvent('student_teaser_whatsapp_clicked', {})}
            >
              <MessageCircle aria-hidden />
              Need something else? DM us
            </a>
          </Button>
        </div>
      </PageContainer>
    </Section>
  );
};

export default StudentProjectsTeaser;
