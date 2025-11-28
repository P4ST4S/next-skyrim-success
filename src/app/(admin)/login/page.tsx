'use client';

import { useState, useActionState } from 'react';
import { login } from '@/actions/auth';
import { Shield, Lock, User } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await login(username, password);

      if (!result.success && result.error) {
        setError(result.error);
      }
    } catch (err) {
      setError('Une erreur inattendue s\'est produite');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      {/* Background decoration */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <Shield className="w-160 h-160 text-skyrim-gold" />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="parchment-card p-8 rounded-xl shadow-(--shadow-skyrim-lg)">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-linear-to-br from-skyrim-gold-light to-skyrim-gold-dark rounded-full shadow-(--shadow-glow)">
              <Shield className="w-10 h-10 text-skyrim-dark" />
            </div>
            <h1 className="text-3xl font-['Cinzel'] font-bold text-skyrim-gold mb-2">
              Portail Admin
            </h1>
            <p className="text-skyrim-parchment/70 text-sm">
              Entrez vos identifiants pour gérer les succès
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border-2 border-red-600/50 rounded-lg">
              <p className="text-red-300 text-sm text-center font-['Cinzel']">
                {error}
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-['Cinzel'] font-semibold text-skyrim-gold mb-2"
              >
                Nom d'utilisateur
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-skyrim-gold-dark" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 bg-skyrim-dark border-2 border-skyrim-stone rounded-lg text-skyrim-parchment placeholder-skyrim-parchment/40 focus:border-skyrim-gold focus:outline-none focus:ring-2 focus:ring-skyrim-gold/30 transition-all disabled:opacity-50"
                  placeholder="Entrez le nom d'utilisateur"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-['Cinzel'] font-semibold text-skyrim-gold mb-2"
              >
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-skyrim-gold-dark" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 bg-skyrim-dark border-2 border-skyrim-stone rounded-lg text-skyrim-parchment placeholder-skyrim-parchment/40 focus:border-skyrim-gold focus:outline-none focus:ring-2 focus:ring-skyrim-gold/30 transition-all disabled:opacity-50"
                  placeholder="Entrez le mot de passe"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-skyrim w-full py-3 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Authentification...' : 'Entrer'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-skyrim-stone">
            <p className="text-center text-xs text-skyrim-parchment/60">
              Réservé aux administrateurs autorisés uniquement
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
