import { buildStructuredDataGraph } from '@/lib/seo-schema';

const StructuredData = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(buildStructuredDataGraph()) }}
  />
);

export default StructuredData;
