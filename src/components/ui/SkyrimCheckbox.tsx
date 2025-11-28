'use client';

import { useState, useOptimistic, useTransition } from 'react';
import { Check } from 'lucide-react';
import { toggleAchievement } from '@/actions/achievements';
import { cn } from '@/lib/utils';

interface SkyrimCheckboxProps {
  achievementId: string;
  isChecked: boolean;
  disabled?: boolean;
}

export const SkyrimCheckbox = ({
  achievementId,
  isChecked,
  disabled = false,
}: SkyrimCheckboxProps) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticChecked, setOptimisticChecked] = useOptimistic(
    isChecked,
    (_, newState: boolean) => newState
  );

  const handleToggle = () => {
    if (disabled) return;

    // Optimistic update for instant feedback
    setOptimisticChecked(!optimisticChecked);

    // Server action
    startTransition(async () => {
      const result = await toggleAchievement(achievementId);
      if (!result.success) {
        // Revert on error
        setOptimisticChecked(optimisticChecked);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={disabled || isPending}
      className={cn(
        'relative w-6 h-6 rotate-45 border-2 transition-all duration-200 flex items-center justify-center',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        optimisticChecked
          ? 'bg-gradient-to-br from-[var(--color-skyrim-gold-light)] to-[var(--color-skyrim-gold-dark)] border-[var(--color-skyrim-gold)]'
          : 'bg-[var(--color-skyrim-brown)] border-[var(--color-skyrim-stone)]',
        !disabled && 'hover:border-[var(--color-skyrim-gold)] hover:shadow-[0_0_10px_rgba(201,166,107,0.3)] cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed',
        isPending && 'animate-pulse'
      )}
      aria-label={optimisticChecked ? 'Mark as incomplete' : 'Mark as complete'}
      aria-checked={optimisticChecked}
      role="checkbox"
    >
      {optimisticChecked && (
        <Check
          className="w-4 h-4 text-[var(--color-skyrim-dark)] -rotate-45"
          strokeWidth={3}
        />
      )}
    </button>
  );
};
