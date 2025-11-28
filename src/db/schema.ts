import { pgTable, varchar, timestamp } from 'drizzle-orm/pg-core';

export const achievementStatus = pgTable('achievement_status', {
  id: varchar('id', { length: 50 }).primaryKey(),
  achievementId: varchar('achievement_id', { length: 50 }).notNull().unique(),
  completedAt: timestamp('completed_at', { withTimezone: true }).notNull().defaultNow(),
});

export type AchievementStatus = typeof achievementStatus.$inferSelect;
export type NewAchievementStatus = typeof achievementStatus.$inferInsert;
