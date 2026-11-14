'use client';

import React, { useState } from 'react';
import { 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Server
} from 'lucide-react';
import { isFirebaseConfigured } from '@/lib/firebase';
import { recipeService } from '@/lib/recipeService';
import { initialRecipes, initialCategories } from '@/data/seedData';
import { useNotification } from '@/context/NotificationContext';

export default function AdminSettingsPage() {
  const { showToast } = useNotification();
  const firebaseConfigured = isFirebaseConfigured();

  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<{
    success: boolean;
    count: number;
    error?: string;
  } | null>(null);

  const handleSeedDatabase = async () => {
    setSeeding(true);
    setSeedResult(null);

    try {
      const res = await recipeService.seedFirestoreDatabase();
      setSeedResult(res);
      if (res.success) {
        showToast(`Successfully uploaded ${res.count} records to Firestore!`, 'success');
      } else {
        showToast(res.error || 'Seeding failed', 'error');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Database error';
      setSeedResult({ success: false, count: 0, error: msg });
      showToast(msg, 'error');
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl pb-16">
      <div>
        <h2 className="font-serif text-2xl font-bold text-charcoal">
          System & Database Settings
        </h2>
        <p className="text-xs text-charcoal-muted mt-0.5">
          Configure Firebase Cloud Firestore, Storage, and initial database population.
        </p>
      </div>

      {/* Backend Status Banner */}
      <div className={`p-6 rounded-3xl border ${
        firebaseConfigured
          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
          : 'bg-amber-50/70 border-amber-200 text-amber-900'
      } shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4`}>
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
            firebaseConfigured ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'
          }`}>
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-base">
              {firebaseConfigured ? 'Connected to Cloud Firestore' : 'Running in Offline / Demo Mode'}
            </h3>
            <p className="text-xs opacity-80 mt-0.5">
              {firebaseConfigured
                ? `Active Firebase Project: ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}`
                : 'All recipes and categories are served seamlessly via built-in seed storage with zero configuration needed.'}
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            firebaseConfigured
              ? 'bg-emerald-200 text-emerald-900'
              : 'bg-amber-200 text-amber-900'
          }`}>
            {firebaseConfigured ? 'Live Backend' : 'Demo Mode'}
          </span>
        </div>
      </div>

      {/* 1-Click Firestore Seed Tool */}
      <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 sm:p-8 shadow-subtle space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-[#F1EFEA]">
          <Database className="w-5 h-5 text-primary" />
          <h3 className="font-serif font-bold text-lg text-charcoal">
            Firestore Database Population Tool
          </h3>
        </div>

        <p className="text-xs text-charcoal-muted leading-relaxed">
          Click below to automatically upload our complete curriculum of authentic recipes, all {initialCategories.length} categories, bilingual fields, and cooking tips directly into your connected Cloud Firestore database.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 bg-[#FAF8F2] rounded-xl border border-[#EAE7DF] text-center">
            <span className="font-mono text-base font-bold text-deep-green block">
              {initialRecipes.length}
            </span>
            <span className="text-charcoal-muted">Ready Recipes</span>
          </div>

          <div className="p-3 bg-[#FAF8F2] rounded-xl border border-[#EAE7DF] text-center">
            <span className="font-mono text-base font-bold text-deep-green block">
              {initialCategories.length}
            </span>
            <span className="text-charcoal-muted">Categories</span>
          </div>

          <div className="p-3 bg-[#FAF8F2] rounded-xl border border-[#EAE7DF] text-center col-span-2 sm:col-span-1">
            <span className="font-mono text-base font-bold text-deep-green block">
              Bilingual
            </span>
            <span className="text-charcoal-muted">English & Telugu</span>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={handleSeedDatabase}
            disabled={seeding}
            className="px-6 py-3 bg-deep-green hover:bg-deep-hover text-white text-xs sm:text-sm font-bold rounded-2xl shadow-lifted transition-all flex items-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${seeding ? 'animate-spin' : ''}`} />
            <span>{seeding ? 'Populating Firestore Collections...' : 'Seed Initial Firestore Data'}</span>
          </button>
        </div>

        {seedResult && (
          <div className={`p-4 rounded-2xl text-xs flex items-start gap-2.5 ${
            seedResult.success
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
              : 'bg-red-50 text-red-900 border border-red-200'
          }`}>
            {seedResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-bold">
                {seedResult.success
                  ? `Success! Populated ${seedResult.count} items into Cloud Firestore.`
                  : 'Database Seed Notice'}
              </p>
              {seedResult.error && (
                <p className="mt-0.5 opacity-90">{seedResult.error}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Engineering Attribution Card */}
      <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 shadow-subtle space-y-3">
        <h3 className="font-serif font-bold text-base text-charcoal">
          Platform Architecture & Attribution
        </h3>
        <p className="text-xs text-charcoal-muted leading-relaxed">
          Product: <strong>Cook With Krushi</strong><br />
          Engineering Owner: <strong>Damayanti Technologies</strong><br />
          Stack: <strong>Next.js 14 App Router • TypeScript • Tailwind CSS • Cloud Firestore • Web Audio Timers</strong><br />
          Tagline: <em>Cook. Learn. Enjoy.</em>
        </p>
      </div>

    </div>
  );
}
