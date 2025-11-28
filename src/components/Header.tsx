import Link from "next/link";
import { getSession, logout } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function Header() {
  const session = await getSession();

  async function logoutAction() {
    "use server";
    await logout();
    redirect("/");
  }

  return (
    <header className="border-b-2 border-skyrim-steel/50 bg-black/80 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-serif text-xl text-skyrim-gold tracking-widest hover:text-white transition-colors">
          SKYRIM TRACKER
        </Link>

        <nav className="flex items-center space-x-6">
          <div className="h-2 w-2 bg-skyrim-gold rotate-45 opacity-50"></div>
          
          {session ? (
            <form action={logoutAction}>
              <button className="font-serif text-sm text-skyrim-light hover:text-skyrim-gold uppercase tracking-wider">
                Déconnexion
              </button>
            </form>
          ) : (
            <Link href="/login" className="font-serif text-sm text-skyrim-light hover:text-skyrim-gold uppercase tracking-wider">
              Connexion Admin
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
