import { cn } from '@/lib/utils';

type LazyImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  priority?: boolean;
};

const LazyImage = ({ priority = false, className, alt = '', ...props }: LazyImageProps) => (
  <img
    alt={alt}
    loading={priority ? 'eager' : 'lazy'}
    decoding="async"
    fetchPriority={priority ? 'high' : 'auto'}
    className={cn(className)}
    {...props}
  />
);

export default LazyImage;
