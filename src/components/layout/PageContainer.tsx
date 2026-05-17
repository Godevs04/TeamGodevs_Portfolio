import { cn } from '@/lib/utils';

type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const PageContainer = ({ children, className }: PageContainerProps) => (
  <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>
);

export default PageContainer;
