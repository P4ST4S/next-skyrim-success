// Achievement Types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

export interface AchievementWithStatus extends Achievement {
  isCompleted: boolean;
  completedAt?: Date;
}

// Auth Types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SessionData {
  userId: string;
  expiresAt: Date;
}

// Action Result Types
export interface ActionResult {
  success: boolean;
  error?: string;
  data?: unknown;
}

export interface LoginResult extends ActionResult {
  redirectUrl?: string;
}

// UI Component Props Types
export interface AchievementCardProps {
  achievement: Achievement;
  isCompleted: boolean;
  isAdmin: boolean;
}

export interface CheckboxProps {
  achievementId: string;
  isChecked: boolean;
  disabled?: boolean;
}

export interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
}

// Achievement Categories
export type AchievementCategory =
  | 'Main Quest'
  | 'Guilds'
  | 'Holds'
  | 'Combat'
  | 'Infamy'
  | 'Daedric'
  | 'Skills'
  | 'Wealth'
  | 'Exploration'
  | 'Dawnguard'
  | 'Dragonborn'
  | 'Companions';

// Stats Types
export interface ProgressStats {
  total: number;
  completed: number;
  percentage: number;
}

export interface CategoryStats {
  category: string;
  total: number;
  completed: number;
  percentage: number;
}
