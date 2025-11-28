import { type ClassValue, clsx } from 'clsx';

export const cn = (...inputs: ClassValue[]): string => {
  return clsx(inputs);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const calculateProgress = (completed: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
};
