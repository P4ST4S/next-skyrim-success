'use server';

import { db } from '@/db';
import { achievementStatus } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { verifySession } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export const toggleAchievement = async (
  achievementId: string
): Promise<{ success: boolean; error?: string }> => {
  // Verify admin session
  const session = await verifySession();

  if (!session) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    // Check if achievement is already completed
    const existing = await db
      .select()
      .from(achievementStatus)
      .where(eq(achievementStatus.achievementId, achievementId))
      .limit(1);

    if (existing.length > 0) {
      // Remove completion
      await db
        .delete(achievementStatus)
        .where(eq(achievementStatus.achievementId, achievementId));
    } else {
      // Mark as completed
      await db.insert(achievementStatus).values({
        id: `status-${achievementId}-${Date.now()}`,
        achievementId,
      });
    }

    // Revalidate all pages that show achievements
    revalidatePath('/');
    revalidatePath('/admin/dashboard');

    return { success: true };
  } catch (error) {
    console.error('Error toggling achievement:', error);
    return { success: false, error: 'Database error' };
  }
};

export const getCompletedAchievements = async (): Promise<string[]> => {
  // Return empty array if DATABASE_URL is not configured (development mode)
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('your-neon-instance')) {
    return [];
  }

  try {
    const completed = await db.select().from(achievementStatus);
    return completed.map((status) => status.achievementId);
  } catch (error) {
    console.error('Error fetching completed achievements:', error);
    return [];
  }
};
