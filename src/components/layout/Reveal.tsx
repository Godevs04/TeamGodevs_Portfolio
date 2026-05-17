import { cn } from '@/lib/utils';
import { useInView } from '@/hooks/use-in-view';

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
  const { ref, inView } = useInView(0.08);

  return (
    <div
      ref={ref}
      className={cn('reveal', inView && 'reveal-visible', className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default Reveal;
