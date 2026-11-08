import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageMeta from '@/components/seo/PageMeta';
import { SITE } from '@/lib/site';
import { scrollToSection } from '@/lib/scroll';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <>
      <PageMeta
        title={`Page not found | ${SITE.name}`}
        description={`This page could not be found on ${SITE.name}. Explore our web, mobile, and SaaS work or contact the team.`}
        canonicalPath={location.pathname}
        noIndex
      />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {SITE.name}
        </p>
        <h1 className="mb-4 text-4xl font-bold text-foreground">Page not found</h1>
        <p className="mb-8 max-w-md text-lg text-muted-foreground">
          The page you requested doesn&apos;t exist. Head back home, browse selected work, or start
          a project conversation.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-400 px-6 font-semibold text-primary-foreground shadow-glow transition-all hover:scale-105"
          >
            Return home
          </Link>
          <Link
            to="/#projects"
            onClick={() => {
              window.setTimeout(() => scrollToSection('projects'), 50);
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            View selected work
          </Link>
          <Link
            to="/#contact"
            onClick={() => {
              window.setTimeout(() => scrollToSection('contact'), 50);
            }}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-border px-6 font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            Contact TeamGoDevs
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
