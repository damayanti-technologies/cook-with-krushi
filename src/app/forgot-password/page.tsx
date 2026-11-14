'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChefHat, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';

export default function ForgotPasswordPage() {
  const { t } = useLanguage();
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      await resetPassword(email);
      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error sending reset email';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 space-y-8">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-3xl bg-deep-green text-peach mx-auto flex items-center justify-center shadow-lifted">
          <ChefHat className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-extrabold text-charcoal">
          {t('forgotPasswordTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-xs mx-auto">
          {t('forgotPasswordDesc')}
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 sm:p-8 shadow-lifted space-y-6">
        {submitted ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-lg text-charcoal">Reset Link Sent</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              We have dispatched a password recovery instruction to <strong>{email}</strong>.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-xs font-bold text-deep-green hover:underline pt-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> {t('backToLogin')}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                {errorMsg}
              </div>
            )}

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

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-deep-green hover:bg-deep-hover text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lifted transition-all"
            >
              {loading ? 'Sending...' : t('sendResetLink')}
            </button>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-muted hover:text-deep-green"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t('backToLogin')}</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
