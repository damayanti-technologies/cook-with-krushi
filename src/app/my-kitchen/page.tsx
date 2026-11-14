'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { 
  Heart, 
  Clock, 
  RotateCcw, 
  Trash2, 
  ChefHat, 
  CheckCircle2, 
  Play, 
  User, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/context/AuthContext';
import { useKitchen } from '@/context/KitchenContext';
import { initialRecipes } from '@/data/seedData';
import { RecipeCard } from '@/components/recipe/RecipeCard';

function MyKitchenContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams?.get('tab') || 'favorites';

  const { t, language, setLanguage } = useLanguage();
  const { user, isAdmin } = useAuth();
  const { favorites, inProgress, history, clearHistory, clearProgress } = useKitchen();

  const [activeTab, setActiveTab] = useState<'favorites' | 'inprogress' | 'history' | 'preferences'>(
    initialTab as 'favorites' | 'inprogress' | 'history' | 'preferences'
  );

  // Favorite recipes list
  const favoritedRecipes = initialRecipes.filter((r) => favorites.includes(r.id));

  // In-progress recipes list
  const activeSessionKeys = Object.keys(inProgress).filter((id) => !inProgress[id]?.completed);
  const inProgressRecipes = initialRecipes.filter((r) => activeSessionKeys.includes(r.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* User Header Profile Banner */}
      <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 sm:p-8 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-3xl bg-sage-100 text-deep-green flex items-center justify-center font-bold text-2xl shadow-xs">
            {user?.displayName ? user.displayName.charAt(0).toUpperCase() : <ChefHat className="w-8 h-8 text-primary" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                {user ? user.displayName : t('myKitchenTitle')}
              </h1>
              {isAdmin && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-deep-green bg-sage-100 px-2.5 py-0.5 rounded-full border border-sage-200">
                  <ShieldCheck className="w-3 h-3" /> Admin
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
              {user ? user.email : 'Personal culinary hub & cooking record'}
            </p>
          </div>
        </div>

        {/* Sync or Sign In status */}
        <div className="text-left sm:text-right">
          {user ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Synced with Firebase Account</span>
            </div>
          ) : (
            <div className="space-y-1">
              <span className="text-xs text-charcoal-muted block">Browsing as Guest</span>
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-deep-green hover:underline"
              >
                Sign in to sync across devices →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#EAE7DF]">
        {[
          { id: 'favorites', label: `${t('tabFavorites')} (${favorites.length})`, icon: Heart },
          { id: 'inprogress', label: `${t('tabInProgress')} (${inProgressRecipes.length})`, icon: Clock },
          { id: 'history', label: `${t('tabHistory')} (${history.length})`, icon: RotateCcw },
          { id: 'preferences', label: t('tabPreferences'), icon: User },
        ].map((tab) => {
          const IconComp = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                active
                  ? 'bg-deep-green text-white shadow-sm'
                  : 'bg-white hover:bg-sage-100 text-charcoal border border-[#E0DCCE]'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: FAVORITES */}
      {activeTab === 'favorites' && (
        <div className="space-y-6">
          {favoritedRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoritedRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-[#EAE7DF] p-12 text-center space-y-4 max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-terracotta mx-auto flex items-center justify-center">
                <Heart className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal">No Saved Recipes Yet</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {t('noFavorites')}
              </p>
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-deep-green text-white text-xs font-bold rounded-full"
              >
                <span>Discover Recipes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: IN PROGRESS */}
      {activeTab === 'inprogress' && (
        <div className="space-y-6">
          {inProgressRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {inProgressRecipes.map((recipe) => {
                const prog = inProgress[recipe.id];
                const currentStep = prog ? prog.currentStep : 1;
                const totalSteps = recipe.steps.length;
                const percent = Math.round((currentStep / totalSteps) * 100);

                return (
                  <div
                    key={recipe.id}
                    className="bg-white rounded-3xl border border-[#EAE7DF] p-6 shadow-subtle flex flex-col justify-between space-y-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-sage-50">
                        <Image
                          src={recipe.coverImage}
                          alt={recipe.title.en}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-base text-charcoal truncate">
                          {recipe.title.en}
                        </h4>
                        <p className="text-xs text-charcoal-muted">
                          {t('lastStepCooked')} {currentStep} of {totalSteps}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-semibold text-charcoal-muted">
                        <span>Cooking Progress</span>
                        <span>{percent}%</span>
                      </div>
                      <div className="w-full bg-[#EAE7DF] h-2 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-deep-green transition-all"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#F1EFEA]">
                      <button
                        onClick={() => clearProgress(recipe.id)}
                        className="text-xs text-charcoal-muted hover:text-red-500 font-semibold"
                      >
                        Discard Session
                      </button>

                      <Link
                        href={`/recipe/${recipe.slug}/cook`}
                        className="px-5 py-2 bg-deep-green hover:bg-deep-hover text-white rounded-full text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>{t('resumeCooking')}</span>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-[#EAE7DF] p-12 text-center space-y-4 max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-sage-100 text-deep-green mx-auto flex items-center justify-center">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal">No Active Cooking Sessions</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {t('noInProgress')}
              </p>
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-deep-green text-white text-xs font-bold rounded-full"
              >
                <span>Find Something to Cook</span>
              </Link>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: COOKING HISTORY */}
      {activeTab === 'history' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-sm text-charcoal-muted">
              Dishes you have successfully cooked with Cook With Krushi.
            </p>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-xs text-charcoal-muted hover:text-red-500 flex items-center gap-1 font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear History</span>
              </button>
            )}
          </div>

          {history.length > 0 ? (
            <div className="bg-white rounded-3xl border border-[#EAE7DF] divide-y divide-[#F1EFEA] overflow-hidden shadow-subtle">
              {history.map((item) => (
                <div key={item.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {item.coverImage && (
                      <div className="relative w-14 h-14 rounded-2xl overflow-hidden shrink-0 bg-sage-50">
                        <Image
                          src={item.coverImage}
                          alt={item.recipeTitle}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-serif font-bold text-base text-charcoal">
                        {item.recipeTitle}
                      </h4>
                      <p className="text-xs text-charcoal-muted">
                        {t('completedOn')}{' '}
                        {new Date(item.completedAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    Completed 🍲
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-[#EAE7DF] p-12 text-center space-y-4 max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-sage-100 text-deep-green mx-auto flex items-center justify-center">
                <RotateCcw className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal">No Dishes Completed Yet</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {t('noHistory')}
              </p>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PREFERENCES */}
      {activeTab === 'preferences' && (
        <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 sm:p-8 shadow-subtle max-w-2xl space-y-6">
          <h3 className="font-serif text-xl font-bold text-charcoal">
            Personal Kitchen Preferences
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal-muted block">
                Primary Language
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setLanguage('en')}
                  className={`flex-1 py-2.5 rounded-2xl border text-xs font-bold transition-all ${
                    language === 'en'
                      ? 'bg-deep-green text-white border-deep-green'
                      : 'bg-[#FAF8F2] text-charcoal border-[#E0DCCE]'
                  }`}
                >
                  English (EN)
                </button>
                <button
                  onClick={() => setLanguage('te')}
                  className={`flex-1 py-2.5 rounded-2xl border text-xs font-bold transition-all ${
                    language === 'te'
                      ? 'bg-deep-green text-white border-deep-green'
                      : 'bg-[#FAF8F2] text-charcoal border-[#E0DCCE]'
                  }`}
                >
                  తెలుగు (Telugu)
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#F1EFEA]">
              <label className="text-xs font-bold uppercase tracking-wider text-charcoal-muted block">
                Platform Attribution
              </label>
              <div className="p-4 rounded-2xl bg-sage-50 border border-sage-200">
                <p className="text-xs font-bold text-deep-green">Cook With Krushi</p>
                <p className="text-[11px] text-charcoal-muted mt-0.5">
                  Proudly designed, engineered, and powered by <strong className="text-deep-green">Damayanti Technologies</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function MyKitchenPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12 text-center text-charcoal-muted">Loading your kitchen...</div>}>
      <MyKitchenContent />
    </Suspense>
  );
}
