'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChefHat, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useNotification } from '@/context/NotificationContext';

export default function RegisterPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { registerWithEmail } = useAuth();
  const { showToast } = useNotification();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await registerWithEmail(name, email, password);
      showToast('Account created successfully!', 'success');
      router.push('/my-kitchen');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-3xl bg-deep-green text-peach mx-auto flex items-center justify-center shadow-lifted">
          <ChefHat className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-extrabold text-charcoal">
          {t('registerTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-xs mx-auto">
          {t('registerSubtitle')}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 sm:p-8 shadow-lifted space-y-6">
        {errorMsg && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">
              {t('fullNameLabel')}
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ramesh Rao"
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F2] border border-[#E0DCCE] focus:border-primary rounded-xl text-xs sm:text-sm text-charcoal focus:outline-none"
              />
              <User className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3" />
            </div>
          </div>

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
            <label className="text-xs font-bold text-charcoal-muted">
              {t('passwordLabel')}
            </label>
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

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">
              {t('confirmPasswordLabel')}
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            <span>{loading ? 'Creating...' : t('navRegister')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-charcoal-muted">
          {t('alreadyHaveAccount')}{' '}
          <Link href="/login" className="font-bold text-deep-green hover:underline">
            {t('navLogin')}
          </Link>
        </p>
      </div>
    </div>
  );
}
