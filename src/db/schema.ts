import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const achievementStatus = pgTable("achievement_status", {
  id: serial("id").primaryKey(),
  achievementId: text("achievement_id").notNull().unique(),
  completedAt: timestamp("completed_at").defaultNow().notNull(),
});
