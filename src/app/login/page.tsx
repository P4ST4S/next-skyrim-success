"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/auth";

export default function LoginPage() {
  const [state, action, isPending] = useActionState(loginAction, { error: "" });

  return (
    <div className="min-h-screen flex items-center justify-center bg-skyrim-dark text-skyrim-light font-serif">
      <div className="w-full max-w-md p-8 border-2 border-skyrim-steel bg-black/50 relative">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-skyrim-gold -mt-1 -ml-1"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-skyrim-gold -mt-1 -mr-1"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-skyrim-gold -mb-1 -ml-1"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-skyrim-gold -mb-1 -mr-1"></div>

        <h1 className="text-3xl text-center mb-8 text-skyrim-gold uppercase tracking-widest">
          Accès Admin
        </h1>

        <form action={action} className="space-y-6">
          <div>
            <label className="block text-sm uppercase tracking-wider mb-2 text-skyrim-light">
              Nom d'utilisateur
            </label>
            <input
              name="username"
              type="text"
              className="w-full bg-black/30 border border-skyrim-steel p-3 text-skyrim-light focus:border-skyrim-gold focus:outline-none transition-colors font-sans"
            />
          </div>

          <div>
            <label className="block text-sm uppercase tracking-wider mb-2 text-skyrim-light">
              Mot de passe
            </label>
            <input
              name="password"
              type="password"
              className="w-full bg-black/30 border border-skyrim-steel p-3 text-skyrim-light focus:border-skyrim-gold focus:outline-none transition-colors font-sans"
            />
          </div>

          {state?.error && (
            <p className="text-skyrim-red text-center text-sm">{state.error}</p>
          )}

          <button
            disabled={isPending}
            className="w-full bg-skyrim-dark border border-skyrim-gold text-skyrim-gold py-3 px-6 hover:bg-skyrim-gold hover:text-skyrim-dark transition-all uppercase tracking-widest font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Connexion..." : "Entrer"}
          </button>
        </form>
      </div>
    </div>
  );
}
