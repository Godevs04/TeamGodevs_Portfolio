import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className, 
  variant = 'ghost',
  size = 'icon'
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={toggleTheme}
      className={cn(
        'relative overflow-hidden transition-all duration-300 hover:scale-105',
        'hover:shadow-lg dark:hover:shadow-primary/25',
        className
      )}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5">
        {/* Sun Icon */}
        <Sun 
          className={cn(
            'absolute inset-0 w-5 h-5 transition-all duration-500 transform',
            theme === 'light' 
              ? 'rotate-0 scale-100 opacity-100' 
              : 'rotate-90 scale-0 opacity-0'
          )}
        />
        
        {/* Moon Icon */}
        <Moon 
          className={cn(
            'absolute inset-0 w-5 h-5 transition-all duration-500 transform',
            theme === 'dark' 
              ? 'rotate-0 scale-100 opacity-100' 
              : '-rotate-90 scale-0 opacity-0'
          )}
        />
      </div>
    </Button>
  );
};

export default ThemeToggle;