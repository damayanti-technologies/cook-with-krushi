'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChefHat, Mail, Lock, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { loginWithEmail, loginWithGoogle, demoLoginAsAdmin, demoLoginAsUser } = useAuth();
  const { showToast } = useNotification();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      await loginWithEmail(email, password);
      showToast('Signed in successfully!', 'success');
      router.push('/my-kitchen');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid email or password';
      setErrorMsg(msg);
      showToast('Sign in failed. Check your credentials.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      showToast('Signed in with Google!', 'success');
      router.push('/my-kitchen');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Google sign-in error';
      setErrorMsg(msg);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-8">
      {/* Brand Icon Header */}
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-3xl bg-deep-green text-peach mx-auto flex items-center justify-center shadow-lifted">
          <ChefHat className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-extrabold text-charcoal">
          {t('signInTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-xs mx-auto">
          {t('signInSubtitle')}
        </p>
      </div>

      {/* Main Login Card */}
      <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 sm:p-8 shadow-lifted space-y-6">
        {errorMsg && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">
              {t('emailLabel')}
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="chef@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F2] border border-[#E0DCCE] focus:border-primary rounded-xl text-xs sm:text-sm text-charcoal focus:outline-none"
              />
              <Mail className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-charcoal-muted">
                {t('passwordLabel')}
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-primary hover:underline font-semibold"
              >
                {t('forgotPassword')}
              </Link>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F2] border border-[#E0DCCE] focus:border-primary rounded-xl text-xs sm:text-sm text-charcoal focus:outline-none"
              />
              <Lock className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-deep-green hover:bg-deep-hover text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lifted transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Signing in...' : t('navLogin')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Google Sign In Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-[#EAE7DF] w-full" />
          <span className="bg-white px-3 text-[11px] text-charcoal-muted uppercase font-bold shrink-0">
            {t('orContinueWith')}
          </span>
          <div className="border-t border-[#EAE7DF] w-full" />
        </div>

        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full py-2.5 bg-white hover:bg-sage-50 border border-[#E0DCCE] text-charcoal text-xs sm:text-sm font-bold rounded-2xl transition-all shadow-xs flex items-center justify-center gap-2.5"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{t('googleSignIn')}</span>
        </button>

        {/* Quick Demo Access Switcher */}
        <div className="p-3.5 rounded-2xl bg-sage-50 border border-sage-200 text-center space-y-2">
          <p className="text-[11px] font-bold text-deep-green uppercase tracking-wider">
            Quick 1-Click Evaluation
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => {
                demoLoginAsAdmin();
                showToast('Signed in as Administrator!', 'success');
                router.push('/admin');
              }}
              className="flex-1 py-1.5 bg-deep-green text-white rounded-xl text-xs font-bold hover:bg-deep-hover shadow-xs flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Mode</span>
            </button>
            <button
              onClick={() => {
                demoLoginAsUser();
                showToast('Signed in as Priya (User)!', 'success');
                router.push('/my-kitchen');
              }}
              className="flex-1 py-1.5 bg-white text-charcoal border border-[#E0DCCE] rounded-xl text-xs font-bold hover:bg-sage-100 shadow-xs flex items-center justify-center gap-1"
            >
              <User className="w-3.5 h-3.5" />
              <span>Food Lover</span>
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-charcoal-muted">
          {t('dontHaveAccount')}{' '}
          <Link href="/register" className="font-bold text-deep-green hover:underline">
            {t('navRegister')}
          </Link>
        </p>
      </div>
    </div>
  );
}
