import { SkyrimCheckbox } from '@/components/ui/SkyrimCheckbox';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

interface AchievementCardProps {
  achievement: Achievement;
  isCompleted: boolean;
  isAdmin: boolean;
}

export const AchievementCard = ({
  achievement,
  isCompleted,
  isAdmin,
}: AchievementCardProps) => {
  // Get icon component dynamically
  const IconComponent = (LucideIcons[
    achievement.icon as keyof typeof LucideIcons
  ] || LucideIcons.Star) as React.ComponentType<{ className?: string; strokeWidth?: number }>;

  return (
    <div
      className={cn(
        'parchment-card p-6 rounded-lg transition-all duration-300',
        isCompleted && 'ring-2 ring-[var(--color-skyrim-gold)]/50',
        !isCompleted && 'opacity-80 hover:opacity-100'
      )}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox (visible only in admin mode) */}
        {isAdmin && (
          <div className="flex-shrink-0 pt-1">
            <SkyrimCheckbox
              achievementId={achievement.id}
              isChecked={isCompleted}
              disabled={false}
            />
          </div>
        )}

        {/* Icon */}
        <div
          className={cn(
            'flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300',
            isCompleted
              ? 'bg-gradient-to-br from-[var(--color-skyrim-gold-light)] to-[var(--color-skyrim-gold-dark)] shadow-[0_0_20px_rgba(201,166,107,0.4)]'
              : 'bg-[var(--color-skyrim-stone)]'
          )}
        >
          <IconComponent
            className={cn(
              'w-6 h-6',
              isCompleted
                ? 'text-[var(--color-skyrim-dark)]'
                : 'text-[var(--color-skyrim-parchment)]/60'
            )}
            strokeWidth={2}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Category badge */}
          <div className="mb-2">
            <span className="inline-block px-3 py-1 text-xs font-['Cinzel'] font-semibold bg-[var(--color-skyrim-dark)]/50 text-[var(--color-skyrim-gold)] rounded border border-[var(--color-skyrim-gold-dark)]">
              {achievement.category}
            </span>
          </div>

          {/* Title */}
          <h3
            className={cn(
              'text-xl font-["Cinzel"] font-semibold mb-2 transition-colors',
              isCompleted
                ? 'text-[var(--color-skyrim-gold)]'
                : 'text-[var(--color-skyrim-parchment)]'
            )}
          >
            {achievement.title}
          </h3>

          {/* Description */}
          <p className="text-[var(--color-skyrim-parchment)]/80 text-sm leading-relaxed">
            {achievement.description}
          </p>
        </div>

        {/* Completed indicator (visible only in public mode) */}
        {!isAdmin && isCompleted && (
          <div className="flex-shrink-0">
            <div className="w-6 h-6 rotate-45 bg-gradient-to-br from-[var(--color-skyrim-gold-light)] to-[var(--color-skyrim-gold-dark)] border-2 border-[var(--color-skyrim-gold)] flex items-center justify-center shadow-[0_0_10px_rgba(201,166,107,0.3)]">
              <LucideIcons.Check
                className="w-4 h-4 text-[var(--color-skyrim-dark)] -rotate-45"
                strokeWidth={3}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
