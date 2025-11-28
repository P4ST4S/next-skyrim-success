"use client";

import React, { useOptimistic, useTransition } from "react";
import { IconMap } from "./IconMap";
import { toggleAchievement } from "@/app/actions/achievements";
import { clsx } from "clsx";
import { Check } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  icon?: string;
}

interface AchievementItemProps {
  achievement: Achievement;
  isCompleted: boolean;
  isAdmin: boolean;
}

export function AchievementItem({
  achievement,
  isCompleted,
  isAdmin,
}: AchievementItemProps) {
  const [optimisticCompleted, setOptimisticCompleted] = useOptimistic(
    isCompleted,
    (state, newValue: boolean) => newValue
  );
  const [isPending, startTransition] = useTransition();

  const Icon = achievement.icon ? IconMap[achievement.icon] || IconMap.default : IconMap.default;

  const handleToggle = () => {
    if (!isAdmin) return;
    
    const newState = !optimisticCompleted;
    startTransition(async () => {
      setOptimisticCompleted(newState);
      try {
        await toggleAchievement(achievement.id);
      } catch (error) {
        setOptimisticCompleted(!newState); // Revert on error
        console.error("Failed to toggle achievement");
      }
    });
  };

  return (
    <div
      onClick={isAdmin ? handleToggle : undefined}
      className={clsx(
        "group relative flex items-center p-4 border-b border-skyrim-steel/30 transition-all duration-300",
        isAdmin ? "cursor-pointer hover:bg-white/5" : "cursor-default",
        optimisticCompleted ? "opacity-100" : "opacity-50 grayscale hover:grayscale-0"
      )}
    >
      {/* Icon */}
      <div className="mr-6 relative">
        <div className={clsx(
          "w-12 h-12 flex items-center justify-center border-2 rotate-45 transition-colors duration-300",
          optimisticCompleted ? "border-skyrim-gold bg-black/50" : "border-skyrim-steel bg-transparent"
        )}>
          <div className="-rotate-45">
            <Icon className={clsx(
              "w-6 h-6",
              optimisticCompleted ? "text-skyrim-gold" : "text-skyrim-steel"
            )} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className={clsx(
          "font-serif text-lg tracking-wide transition-colors",
          optimisticCompleted ? "text-skyrim-gold" : "text-skyrim-light"
        )}>
          {achievement.title}
        </h3>
        <p className={clsx(
          "font-sans text-sm mt-1 transition-colors",
          optimisticCompleted ? "text-skyrim-light" : "text-skyrim-light/80"
        )}>
          {achievement.description}
        </p>
      </div>

      {/* Admin Checkbox */}
      {isAdmin && (
        <div className="ml-4">
          <div className={clsx(
            "w-6 h-6 border-2 rotate-45 flex items-center justify-center transition-all",
            optimisticCompleted ? "border-skyrim-gold bg-skyrim-gold/20" : "border-skyrim-steel hover:border-skyrim-light"
          )}>
            {optimisticCompleted && (
              <Check className="w-4 h-4 text-skyrim-gold -rotate-45" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
