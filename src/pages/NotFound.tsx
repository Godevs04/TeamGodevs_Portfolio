import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import PageMeta from '@/components/seo/PageMeta';
import { SITE, absoluteUrl } from '@/lib/site';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <>
      <PageMeta
        title={`Page not found | ${SITE.name}`}
        description={`The page you requested on ${SITE.name} could not be found. Return to our homepage for web, mobile, and SEO services.`}
        canonicalPath={location.pathname}
        noIndex
      />
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
        <p className="mb-6 max-w-md text-lg text-muted-foreground">
          This page doesn&apos;t exist. Head back to{' '}
          <a href={absoluteUrl('/')} className="font-medium text-primary hover:underline">
            {SITE.url.replace('https://', '')}
          </a>
          .
        </p>
        <Link
          to="/"
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-400 px-6 font-semibold text-primary-foreground shadow-glow transition-all hover:scale-105"
        >
          Return to home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
