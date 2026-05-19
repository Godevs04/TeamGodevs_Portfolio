import { OG_IMAGE_PATH, SITE, SITE_DESCRIPTION, SITE_TITLE, absoluteUrl } from '@/lib/site';

const organizationId = `${SITE.url}/#organization`;
const websiteId = `${SITE.url}/#website`;
const businessId = `${SITE.url}/#business`;

export const buildStructuredDataGraph = () => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': organizationId,
      name: SITE.name,
      legalName: SITE.legalName,
      url: SITE.url,
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/favicon-48.png'),
        width: 48,
        height: 48,
      },
      image: absoluteUrl(OG_IMAGE_PATH),
      email: SITE.email,
      telephone: SITE.phoneTel,
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
          contactType: 'customer support',
          email: SITE.email,
          telephone: SITE.phoneTel,
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi'],
        },
      ],
      ...(SITE.sameAs.length > 0 ? { sameAs: SITE.sameAs } : {}),
    },
    {
      '@type': 'WebSite',
      '@id': websiteId,
      url: SITE.url,
      name: SITE.name,
      description: SITE_DESCRIPTION,
      publisher: { '@id': organizationId },
      inLanguage: SITE.locale.replace('_', '-'),
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE.url}/#webpage`,
      url: SITE.url,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      isPartOf: { '@id': websiteId },
      about: { '@id': businessId },
      inLanguage: SITE.locale.replace('_', '-'),
    },
    {
      '@type': 'ProfessionalService',
      '@id': businessId,
      name: SITE.name,
      url: SITE.url,
      image: absoluteUrl(OG_IMAGE_PATH),
      description: SITE_DESCRIPTION,
      email: SITE.email,
      telephone: SITE.phoneTel,
      priceRange: '₹₹',
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
        name: 'Digital services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web application development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile app development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO & growth marketing' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UI/UX design' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand identity' } },
        ],
      },
    },
  ],
});
