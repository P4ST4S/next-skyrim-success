import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
}

export const ProgressBar = ({ value, max = 100, className }: ProgressBarProps) => {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div
      className={cn(
        'relative w-full h-8 bg-[var(--color-skyrim-brown)] border-2 border-[var(--color-skyrim-gold-dark)] overflow-hidden',
        className
      )}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      {/* Progress fill */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[var(--color-skyrim-gold-dark)] via-[var(--color-skyrim-gold)] to-[var(--color-skyrim-gold-light)] transition-all duration-500 ease-out"
        style={{ width: `${percentage}%` }}
      >
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>

      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="text-sm font-bold font-['Cinzel'] text-[var(--color-skyrim-dark)] mix-blend-difference z-10"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
        >
          {Math.round(percentage)}%
        </span>
      </div>

      {/* Border decoration */}
      <div className="absolute inset-0 border border-[var(--color-skyrim-gold)]/30 pointer-events-none" />
    </div>
  );
};
