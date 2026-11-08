import { OG_IMAGE_PATH, SITE, SITE_DESCRIPTION, SITE_TITLE, absoluteUrl } from '@/lib/site';
import { getSchemaPriceRange, type PricingRegion } from '@/lib/pricing';

const organizationId = `${SITE.url}/#organization`;
const websiteId = `${SITE.url}/#website`;
const businessId = `${SITE.url}/#business`;
const webpageId = `${SITE.url}/#webpage`;

export const buildStructuredDataGraph = (region: PricingRegion = 'IN') => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: SITE.name,
      legalName: SITE.legalName,
      url: `${SITE.url}/`,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/Logo_1.png'),
        width: 1254,
        height: 1254,
      },
      image: absoluteUrl(OG_IMAGE_PATH),
      email: SITE.email,
      telephone: SITE.phoneTel,
      foundingDate: String(SITE.foundingYear),
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address.streetAddress,
        addressLocality: SITE.address.addressLocality,
        addressRegion: SITE.address.addressRegion,
        postalCode: SITE.address.postalCode,
        addressCountry: SITE.address.addressCountry,
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: SITE.email,
          telephone: SITE.phoneTel,
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi'],
        },
      ],
      ...(SITE.sameAs.length > 0 ? { sameAs: [...SITE.sameAs] } : {}),
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: `${SITE.url}/`,
      name: SITE.name,
      description: SITE_DESCRIPTION,
      publisher: { '@id': organizationId },
      inLanguage: SITE.locale.replace('_', '-'),
    },
    {
      '@type': 'WebPage',
      '@id': webpageId,
      url: `${SITE.url}/`,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      isPartOf: { '@id': websiteId },
      about: { '@id': organizationId },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: absoluteUrl(OG_IMAGE_PATH),
        width: 1200,
        height: 630,
      },
      inLanguage: SITE.locale.replace('_', '-'),
    },
    {
      '@type': 'ProfessionalService',
      '@id': businessId,
      name: SITE.name,
      url: `${SITE.url}/`,
      image: absoluteUrl(OG_IMAGE_PATH),
      description: SITE_DESCRIPTION,
      email: SITE.email,
      telephone: SITE.phoneTel,
      priceRange: getSchemaPriceRange(region),
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address.streetAddress,
        addressLocality: SITE.address.addressLocality,
        addressRegion: SITE.address.addressRegion,
        postalCode: SITE.address.postalCode,
        addressCountry: SITE.address.addressCountry,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '10:00',
          closes: '19:00',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Digital product services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Web application development',
              description:
                'Custom web applications built with React and Next.js, backed by scalable APIs and production-ready infrastructure.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Mobile app development',
              description:
                'Cross-platform mobile applications for iOS and Android using React Native, with authentication, payments, notifications, and analytics.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'SaaS product development',
              description:
                'SaaS platforms, CRMs, and business management software designed for real operational workflows.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'SEO & growth',
              description:
                'Technical SEO, on-page optimization, and content strategy focused on qualified pipeline.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'UI/UX design',
              description:
                'Product interfaces and design systems built around conversion and usability.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Brand identity',
              description: 'Logo systems, brand guidelines, and marketing asset kits.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Cloud & DevOps',
              description:
                'CI/CD, staging environments, and cloud deployment on platforms such as Vercel, AWS, and Firebase.',
            },
          },
        ],
      },
    },
  ],
});
