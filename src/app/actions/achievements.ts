"use server";

import { db } from "@/db";
import { achievementStatus } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function toggleAchievement(achievementId: string) {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const existing = await db
    .select()
    .from(achievementStatus)
    .where(eq(achievementStatus.achievementId, achievementId));

  if (existing.length > 0) {
    await db
      .delete(achievementStatus)
      .where(eq(achievementStatus.achievementId, achievementId));
  } else {
    await db.insert(achievementStatus).values({
      achievementId,
    });
  }

  revalidatePath("/");
}
