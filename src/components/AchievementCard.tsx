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
        isCompleted && 'ring-2 ring-skyrim-gold/50',
        !isCompleted && 'opacity-80 hover:opacity-100'
      )}
    >
      <div className="flex items-start gap-4">
        {/* Checkbox (visible only in admin mode) */}
        {isAdmin && (
          <div className="shrink-0 pt-1">
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
            'shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300',
            isCompleted
              ? 'bg-linear-to-br from-skyrim-gold-light to-skyrim-gold-dark shadow-[0_0_20px_rgba(201,166,107,0.4)]'
              : 'bg-skyrim-stone'
          )}
        >
          <IconComponent
            className={cn(
              'w-6 h-6',
              isCompleted
                ? 'text-skyrim-dark'
                : 'text-skyrim-parchment/60'
            )}
            strokeWidth={2}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Category badge */}
          <div className="mb-2">
            <span className="inline-block px-3 py-1 text-xs font-['Cinzel'] font-semibold bg-skyrim-dark/50 text-skyrim-gold rounded border border-skyrim-gold-dark">
              {achievement.category}
            </span>
          </div>

          {/* Title */}
          <h3
            className={cn(
              'text-xl font-["Cinzel"] font-semibold mb-2 transition-colors',
              isCompleted
                ? 'text-skyrim-gold'
                : 'text-skyrim-parchment'
            )}
          >
            {achievement.title}
          </h3>

          {/* Description */}
          <p className="text-skyrim-parchment/80 text-sm leading-relaxed">
            {achievement.description}
          </p>
        </div>

        {/* Completed indicator (visible only in public mode) */}
        {!isAdmin && isCompleted && (
          <div className="shrink-0">
            <div className="w-6 h-6 rotate-45 bg-linear-to-br from-skyrim-gold-light to-skyrim-gold-dark border-2 border-skyrim-gold flex items-center justify-center shadow-[0_0_10px_rgba(201,166,107,0.3)]">
              <LucideIcons.Check
                className="w-4 h-4 text-skyrim-dark -rotate-45"
                strokeWidth={3}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
