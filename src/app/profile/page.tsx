'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShieldCheck, 
  Heart, 
  Clock, 
  Globe, 
  LogOut, 
  ChefHat, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useKitchen } from '@/context/KitchenContext';

export default function ProfilePage() {
  const router = useRouter();
  const { t, language, setLanguage } = useLanguage();
  const { user, isAdmin, logout, demoLoginAsAdmin, demoLoginAsUser } = useAuth();
  const { favorites, history } = useKitchen();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Profile Header */}
      <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 sm:p-8 shadow-subtle flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-20 h-20 rounded-3xl bg-sage-100 text-deep-green flex items-center justify-center font-bold text-3xl shadow-xs">
            {user?.displayName ? user.displayName.charAt(0).toUpperCase() : <ChefHat className="w-10 h-10 text-primary" />}
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                {user ? user.displayName : 'Guest Cook'}
              </h1>
              {isAdmin && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-deep-green bg-sage-100 px-2.5 py-0.5 rounded-full border border-sage-200">
                  <ShieldCheck className="w-3 h-3" /> Admin
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
              {user ? user.email : 'Local Session (Not signed in)'}
            </p>
          </div>
        </div>

        {user ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-xs font-bold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t('navLogout')}</span>
          </button>
        ) : (
          <Link
            href="/login"
            className="px-5 py-2.5 bg-deep-green hover:bg-deep-hover text-white text-xs font-bold rounded-full shadow-xs transition-all"
          >
            Sign In / Register
          </Link>
        )}
      </div>

      {/* Culinary Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Link
          href="/my-kitchen?tab=favorites"
          className="bg-white p-5 rounded-3xl border border-[#EAE7DF] shadow-subtle hover:border-primary transition-all text-center space-y-1"
        >
          <Heart className="w-6 h-6 text-terracotta mx-auto" />
          <p className="font-mono text-2xl font-bold text-charcoal">{favorites.length}</p>
          <p className="text-xs text-charcoal-muted font-medium">Saved Favorites</p>
        </Link>

        <Link
          href="/my-kitchen?tab=history"
          className="bg-white p-5 rounded-3xl border border-[#EAE7DF] shadow-subtle hover:border-primary transition-all text-center space-y-1"
        >
          <Clock className="w-6 h-6 text-primary mx-auto" />
          <p className="font-mono text-2xl font-bold text-charcoal">{history.length}</p>
          <p className="text-xs text-charcoal-muted font-medium">Dishes Cooked</p>
        </Link>

        <div className="col-span-2 sm:col-span-1 bg-white p-5 rounded-3xl border border-[#EAE7DF] shadow-subtle text-center space-y-1">
          <Sparkles className="w-6 h-6 text-amber-500 mx-auto" />
          <p className="font-mono text-2xl font-bold text-charcoal">Culinary Explorer</p>
          <p className="text-xs text-charcoal-muted font-medium">Status Level</p>
        </div>
      </div>

      {/* Settings & Admin Shortcuts */}
      <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 sm:p-8 shadow-subtle space-y-6">
        <h3 className="font-serif text-lg font-bold text-charcoal">
          Account Preferences
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-2 border-b border-[#F1EFEA]">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              <div>
                <p className="text-xs font-bold text-charcoal">Language Preference</p>
                <p className="text-[11px] text-charcoal-muted">Switch interface between English and Telugu</p>
              </div>
            </div>

            <div className="flex gap-1.5">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  language === 'en' ? 'bg-deep-green text-white' : 'bg-sage-50 text-charcoal'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage('te')}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  language === 'te' ? 'bg-deep-green text-white' : 'bg-sage-50 text-charcoal'
                }`}
              >
                తెలుగు
              </button>
            </div>
          </div>

          {isAdmin && (
            <div className="flex items-center justify-between py-2 border-b border-[#F1EFEA]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-deep-green" />
                <div>
                  <p className="text-xs font-bold text-deep-green">Administrative Dashboard</p>
                  <p className="text-[11px] text-charcoal-muted">Manage recipes, categories, ingredients, and content</p>
                </div>
              </div>

              <Link
                href="/admin"
                className="px-4 py-1.5 bg-deep-green text-white rounded-full text-xs font-bold hover:bg-deep-hover shadow-xs flex items-center gap-1"
              >
                <span>Open Admin</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Quick Demo Switcher if user is on guest/local mode */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-charcoal-muted">
            <span>Switch Role for Testing:</span>
            <div className="flex gap-2">
              <button
                onClick={demoLoginAsAdmin}
                className="px-3 py-1 bg-sage-100 text-deep-green font-bold rounded-lg border border-sage-200"
              >
                Test as Admin
              </button>
              <button
                onClick={demoLoginAsUser}
                className="px-3 py-1 bg-peach/40 text-charcoal font-bold rounded-lg border border-peach"
              >
                Test as Food Lover
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Damayanti Technologies Brand Info */}
      <div className="p-5 rounded-3xl bg-sage-50 border border-sage-200 text-center space-y-1">
        <p className="text-xs font-bold text-deep-green">Cook With Krushi</p>
        <p className="text-[11px] text-charcoal-muted">
          A flagship culinary product designed and developed by <strong className="text-deep-green">Damayanti Technologies</strong>.
        </p>
      </div>

    </div>
  );
}
