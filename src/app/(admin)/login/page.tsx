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
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      {/* Background decoration */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <Shield className="w-[40rem] h-[40rem] text-[var(--color-skyrim-gold)]" />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="parchment-card p-8 rounded-xl shadow-[var(--shadow-skyrim-lg)]">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-4 bg-gradient-to-br from-[var(--color-skyrim-gold-light)] to-[var(--color-skyrim-gold-dark)] rounded-full shadow-[var(--shadow-glow)]">
              <Shield className="w-10 h-10 text-[var(--color-skyrim-dark)]" />
            </div>
            <h1 className="text-3xl font-['Cinzel'] font-bold text-[var(--color-skyrim-gold)] mb-2">
              Admin Portal
            </h1>
            <p className="text-[var(--color-skyrim-parchment)]/70 text-sm">
              Enter your credentials to manage achievements
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
                className="block text-sm font-['Cinzel'] font-semibold text-[var(--color-skyrim-gold)] mb-2"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-[var(--color-skyrim-gold-dark)]" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 bg-[var(--color-skyrim-dark)] border-2 border-[var(--color-skyrim-stone)] rounded-lg text-[var(--color-skyrim-parchment)] placeholder-[var(--color-skyrim-parchment)]/40 focus:border-[var(--color-skyrim-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-skyrim-gold)]/30 transition-all disabled:opacity-50"
                  placeholder="Enter username"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-['Cinzel'] font-semibold text-[var(--color-skyrim-gold)] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-[var(--color-skyrim-gold-dark)]" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 bg-[var(--color-skyrim-dark)] border-2 border-[var(--color-skyrim-stone)] rounded-lg text-[var(--color-skyrim-parchment)] placeholder-[var(--color-skyrim-parchment)]/40 focus:border-[var(--color-skyrim-gold)] focus:outline-none focus:ring-2 focus:ring-[var(--color-skyrim-gold)]/30 transition-all disabled:opacity-50"
                  placeholder="Enter password"
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
              {isLoading ? 'Authenticating...' : 'Enter'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-[var(--color-skyrim-stone)]">
            <p className="text-center text-xs text-[var(--color-skyrim-parchment)]/60">
              For authorized administrators only
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
