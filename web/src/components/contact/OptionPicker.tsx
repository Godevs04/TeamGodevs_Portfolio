import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

type Option = { value: string; label: string };

type OptionPickerProps = {
  label: string;
  required?: boolean;
  value: string;
  options: readonly Option[];
  onChange: (value: string) => void;
  columns?: 1 | 2;
};

const OptionPicker = ({
  label,
  required,
  value,
  options,
  onChange,
  columns = 1,
}: OptionPickerProps) => {
  return (
    <fieldset>
      <legend className="mb-3 block text-sm font-medium text-foreground">
        {label}
        {required ? <span className="text-destructive"> *</span> : null}
      </legend>
      <div
        role="radiogroup"
        aria-label={label}
        className={cn('grid grid-cols-1 gap-2', columns === 2 && 'min-[480px]:grid-cols-2')}
      >
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(opt.value)}
              className={cn(
                'flex min-h-12 items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-smooth',
                selected
                  ? 'border-primary bg-primary/10 text-primary shadow-soft ring-1 ring-primary/25'
                  : 'border-border bg-background text-foreground hover:border-primary/35 hover:bg-muted/40'
              )}
            >
              <span>{opt.label}</span>
              {selected ? (
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                </span>
              ) : (
                <span
                  className="h-5 w-5 shrink-0 rounded-full border-2 border-border"
                  aria-hidden
                />
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
};

export default OptionPicker;
