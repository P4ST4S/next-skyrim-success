import { Header } from "@/components/Header";
import { ProgressBar } from "@/components/ProgressBar";
import { AchievementItem } from "@/components/AchievementItem";
import { db } from "@/db";
import { achievementStatus } from "@/db/schema";
import { getSession } from "@/lib/auth";
import achievementsData from "@/data/achievements.json";

export default async function Home() {
  const session = await getSession();
  const isAdmin = !!session;

  // Fetch completed achievements
  // In a real app, we might want to handle errors if DB is not reachable
  let completedIds = new Set<string>();
  try {
    const completed = await db.select().from(achievementStatus);
    completedIds = new Set(completed.map((c) => c.achievementId));
  } catch (e) {
    console.error("Failed to fetch achievements", e);
  }

  // Group by category
  const categories = achievementsData.reduce((acc, achievement) => {
    if (!acc[achievement.category]) {
      acc[achievement.category] = [];
    }
    acc[achievement.category].push(achievement);
    return acc;
  }, {} as Record<string, typeof achievementsData>);

  const totalAchievements = achievementsData.length;
  const completedCount = completedIds.size;

  return (
    <main className="min-h-screen bg-skyrim-dark text-skyrim-light pb-20">
      <Header />

      <div className="container mx-auto px-4 pt-12">
        <ProgressBar total={totalAchievements} completed={completedCount} />

        <div className="max-w-4xl mx-auto space-y-12">
          {Object.entries(categories).map(([category, items]) => (
            <div key={category} className="relative">
              {/* Category Header */}
              <div className="flex items-center mb-6">
                <div className="h-px flex-1 bg-linear-to-r from-transparent via-skyrim-steel/50 to-transparent"></div>
                <h2 className="mx-4 font-serif text-2xl text-skyrim-gold uppercase tracking-widest">
                  {category}
                </h2>
                <div className="h-px flex-1 bg-linear-to-r from-transparent via-skyrim-steel/50 to-transparent"></div>
              </div>

              {/* List */}
              <div className="bg-black/20 border-y border-skyrim-steel/20 backdrop-blur-sm">
                {items.map((achievement) => (
                  <AchievementItem
                    key={achievement.id}
                    achievement={achievement}
                    isCompleted={completedIds.has(achievement.id)}
                    isAdmin={isAdmin}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
