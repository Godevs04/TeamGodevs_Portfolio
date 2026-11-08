import { useMemo } from 'react';
import { useLocalePricing } from '@/hooks/use-locale-pricing';
import { buildStructuredDataGraph } from '@/lib/seo-schema';

const StructuredData = () => {
  const { region } = useLocalePricing();
  const graph = useMemo(() => buildStructuredDataGraph(region), [region]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
};

export default StructuredData;
