import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth";
import { getCompletedAchievements } from "@/actions/achievements";
import { logout } from "@/actions/auth";
import { AchievementCard } from "@/components/AchievementCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { calculateProgress } from "@/lib/utils";
import { Trophy, Shield, LogOut } from "lucide-react";
import achievementsData from "@/data/achievements.json";

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

const DashboardPage = async () => {
  const session = await verifySession();

  if (!session) {
    redirect("/login");
  }

  const achievements = achievementsData as Achievement[];
  const completedIds = await getCompletedAchievements();
  const completedSet = new Set(completedIds);

  const totalAchievements = achievements.length;
  const completedCount = completedIds.length;
  const progressPercentage = calculateProgress(
    completedCount,
    totalAchievements
  );

  // Group achievements by category
  const categories = Array.from(
    new Set(achievements.map((a) => a.category))
  ).sort();

  return (
    <div className="min-h-screen relative z-10">
      {/* Header */}
      <header className="border-b-2 border-skyrim-gold-dark bg-skyrim-darker/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield className="w-10 h-10 text-skyrim-gold" />
              <div>
                <h1 className="text-3xl sm:text-4xl font-['Cinzel'] font-bold text-skyrim-gold">
                  Tableau de bord Admin
                </h1>
                <p className="text-skyrim-parchment/70 text-sm mt-1">
                  Gérer les succès • Connecté en tant que {session.userId}
                </p>
              </div>
            </div>

            {/* Logout Button */}
            <form action={logout}>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-skyrim-stone hover:bg-skyrim-stone-light text-skyrim-parchment rounded-lg transition-colors border border-skyrim-gold-dark"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-['Cinzel'] text-sm">Déconnexion</span>
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Info Banner */}
        <div className="mb-8 p-4 bg-skyrim-gold/10 border-2 border-skyrim-gold-dark rounded-lg">
          <p className="text-skyrim-parchment text-sm">
            <strong className="font-['Cinzel'] text-skyrim-gold">
              Mode Admin :
            </strong>{" "}
            Cliquez sur les cases en losange pour activer/désactiver la complétion des succès.
            Les changements sont sauvegardés instantanément avec mise à jour optimiste de l'interface.
          </p>
        </div>

        {/* Progress Section */}
        <section className="mb-12 parchment-card p-8 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-8 h-8 text-skyrim-gold" />
            <h2 className="text-2xl font-['Cinzel'] font-semibold text-skyrim-gold">
              Progression Générale
            </h2>
          </div>

          <ProgressBar
            value={completedCount}
            max={totalAchievements}
            className="mb-4"
          />

          <div className="flex justify-between text-sm text-skyrim-parchment/80">
            <span>
              {completedCount} sur {totalAchievements} succès complétés
            </span>
            <span className="font-['Cinzel'] font-semibold text-skyrim-gold">
              {progressPercentage}% Complété
            </span>
          </div>
        </section>

        {/* Achievements by Category */}
        {categories.map((category) => {
          const categoryAchievements = achievements.filter(
            (a) => a.category === category
          );
          const categoryCompleted = categoryAchievements.filter((a) =>
            completedSet.has(a.id)
          ).length;

          return (
            <section
              key={category}
              className="mb-12"
              style={{ marginBottom: "1rem" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-['Cinzel'] font-semibold text-skyrim-gold">
                  {category}
                </h2>
                <span className="text-sm text-skyrim-parchment/70 font-['Cinzel']">
                  {categoryCompleted} / {categoryAchievements.length}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categoryAchievements.map((achievement) => (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    isCompleted={completedSet.has(achievement.id)}
                    isAdmin={true}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
};

export default DashboardPage;
