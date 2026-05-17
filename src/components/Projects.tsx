import { ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import PageContainer from '@/components/layout/PageContainer';
import Section from '@/components/layout/Section';
import SectionHeader from '@/components/SectionHeader';
import { scrollToSection } from '@/lib/scroll';
import projectMobile from '@/assets/project-mobile.jpg';
import projectWeb from '@/assets/project-web.jpg';
import projectEcommerce from '@/assets/project-ecommerce.jpg';

const projects = [
  {
    id: 1,
    title: 'LP Feature',
    category: 'Educational Consultancy',
    description: 'Educational consultancy website for guiding students in college admissions.',
    image: projectWeb,
    tech: ['React', 'Node.js', 'TailwindCSS'],
    results: 'Streamlined admission guidance',
    website: 'https://lpfuture.in',
  },
  {
    id: 2,
    title: 'NaturalWaves',
    category: 'Learning Platform',
    description: 'Naturopathy learning platform designed for beginners and freshers.',
    image: projectWeb,
    tech: ['Next.js', 'MongoDB', 'Stripe'],
    results: 'Comprehensive naturopathy education',
    website: 'https://naturalwaves.com',
  },
  {
    id: 3,
    title: 'The Whiteberry',
    category: 'E-commerce Website',
    description: "E-commerce website for a boutique brand focused on girls' fashion.",
    image: projectEcommerce,
    tech: ['React', 'Node.js', 'PayPal'],
    results: 'Boutique fashion excellence',
    website: 'https://thewhiteberry.in',
  },
  {
    id: 4,
    title: 'Taatom',
    category: 'Travel App',
    description:
      'Travel Always And Take Only Memories — personal journey sharing with modern travel features.',
    image: projectMobile,
    tech: ['React Native', 'Firebase', 'Maps API'],
    results: 'Innovative travel experience',
    website: null,
  },
  {
    id: 5,
    title: 'Streamora',
    category: 'Streaming Platform',
    description:
      'Video streaming platform built with the latest technologies for a seamless experience.',
    image: projectWeb,
    tech: ['React', 'Node.js', 'AWS'],
    results: 'Seamless streaming experience',
    website: null,
  },
];

const Projects = () => {
  return (
    <Section id="projects">
      <PageContainer>
        <SectionHeader
          badge="Our portfolio"
          title="Projects we're"
          highlight="proud of"
          description="Some of the work we've proudly delivered for clients across industries."
        />

        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.id} variant="elevated" className="group overflow-hidden p-0">
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-primary opacity-0 transition-opacity duration-300 group-hover:opacity-90">
                  {project.website ? (
                    <a href={project.website} target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full border-white text-white hover:bg-white hover:text-primary"
                      >
                        <ExternalLink className="h-5 w-5" />
                        View project
                      </Button>
                    </a>
                  ) : (
                    <Button
                      variant="outline"
                      size="lg"
                      disabled
                      className="cursor-not-allowed rounded-full border-white/50 text-white/70"
                    >
                      Coming soon
                    </Button>
                  )}
                </div>
              </div>

              <CardContent className="p-6 md:p-8">
                <div className="mb-4 flex items-center justify-between">
                  <span className="badge-pill border-0 bg-primary/10 py-1.5 text-xs normal-case tracking-normal">
                    {project.category}
                  </span>
                  {project.website && (
                    <a
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-muted-foreground transition-smooth hover:bg-muted hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`Open ${project.title}`}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  )}
                </div>

                <h3 className="text-h3 mb-3 transition-smooth group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="text-body mb-6 text-muted-foreground">{project.description}</p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-muted px-3 py-1 text-caption text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-accent">
                  <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
                  {project.results}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card variant="gradient" className="p-8 text-center md:p-12">
          <div className="mx-auto max-w-3xl">
            <h3 className="text-h2 mb-4">SEO success stories</h3>
            <p className="text-body-lg mb-10 text-muted-foreground">
              We&apos;ve helped dozens of businesses achieve first-page Google rankings, increase
              organic traffic by 300%+, and boost conversions through strategic SEO.
            </p>
            <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {[
                { value: '300%+', label: 'Traffic increase' },
                { value: '#1', label: 'Google rankings' },
                { value: '150%', label: 'Lead generation' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-h2 text-gradient">{stat.value}</div>
                  <div className="text-caption text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
            <Button variant="gradient" size="lg" className="rounded-full" onClick={() => scrollToSection('contact')}>
              Discuss your SEO strategy
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </Card>
      </PageContainer>
    </Section>
  );
};

export default Projects;
