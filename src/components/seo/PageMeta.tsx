import { useEffect } from 'react';
import { OG_IMAGE_PATH, SITE, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_TITLE, absoluteUrl } from '@/lib/site';

type PageMetaProps = {
  title?: string;
  description?: string;
  canonicalPath?: string;
  noIndex?: boolean;
};

const setMeta = (key: string, content: string, attribute: 'name' | 'property' = 'name') => {
  let el = document.querySelector(`meta[${attribute}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const setLink = (rel: string, href: string) => {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const PageMeta = ({
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
  canonicalPath = '/',
  noIndex = false,
}: PageMetaProps) => {
  useEffect(() => {
    const canonical = absoluteUrl(canonicalPath);
    const ogImage = absoluteUrl(OG_IMAGE_PATH);
    const robots = noIndex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large';

    document.title = title;
    setMeta('description', description);
    setMeta('keywords', SITE_KEYWORDS);
    setMeta('author', SITE.name);
    setMeta('robots', robots);
    setMeta('googlebot', robots);

    setMeta('og:title', title, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', 'website', 'property');
    setMeta('og:url', canonical, 'property');
    setMeta('og:site_name', SITE.name, 'property');
    setMeta('og:locale', SITE.locale, 'property');
    setMeta('og:image', ogImage, 'property');
    setMeta('og:image:alt', `${SITE.name} — ${SITE.tagline}`, 'property');

    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);

    setLink('canonical', canonical);

    const setHreflang = (hreflang: string, href: string) => {
      let alternate = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
      if (!alternate) {
        alternate = document.createElement('link');
        alternate.setAttribute('rel', 'alternate');
        alternate.setAttribute('hreflang', hreflang);
        document.head.appendChild(alternate);
      }
      alternate.setAttribute('href', href);
    };
    setHreflang('en', canonical);
    setHreflang('x-default', canonical);

    document.documentElement.lang = SITE.language;
  }, [title, description, canonicalPath, noIndex]);

  return null;
};

export default PageMeta;
