'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Utensils, 
  Layers, 
  Users, 
  CheckCircle2, 
  PlusCircle, 
  Star, 
  Database,
  Sparkles
} from 'lucide-react';
import { initialRecipes, initialCategories } from '@/data/seedData';

export default function AdminOverviewPage() {

  const totalRecipes = initialRecipes.length;
  const publishedRecipes = initialRecipes.filter((r) => r.published).length;
  const totalCategories = initialCategories.length;
  const popularRecipes = initialRecipes.filter((r) => (r.rating || 0) >= 4.9);

  return (
    <div className="space-y-8">
      
      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#EAE7DF] shadow-subtle space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">
              Total Recipes
            </span>
            <div className="w-8 h-8 rounded-xl bg-sage-100 text-deep-green flex items-center justify-center">
              <Utensils className="w-4 h-4 text-primary" />
            </div>
          </div>
          <p className="font-mono text-3xl font-bold text-charcoal">{totalRecipes}</p>
          <p className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> {publishedRecipes} Live Published
          </p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#EAE7DF] shadow-subtle space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">
              Food Categories
            </span>
            <div className="w-8 h-8 rounded-xl bg-peach text-deep-green flex items-center justify-center">
              <Layers className="w-4 h-4 text-terracotta" />
            </div>
          </div>
          <p className="font-mono text-3xl font-bold text-charcoal">{totalCategories}</p>
          <p className="text-[11px] text-charcoal-muted">
            Breakfast to Desserts & Drinks
          </p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#EAE7DF] shadow-subtle space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">
              Registered Users
            </span>
            <div className="w-8 h-8 rounded-xl bg-sage-200 text-deep-green flex items-center justify-center">
              <Users className="w-4 h-4 text-deep-green" />
            </div>
          </div>
          <p className="font-mono text-3xl font-bold text-charcoal">1,480+</p>
          <p className="text-[11px] text-emerald-700 font-medium">
            Active Home Cooks
          </p>
        </div>

        <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#EAE7DF] shadow-subtle space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">
              Cooking Completions
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="font-mono text-3xl font-bold text-charcoal">5,820</p>
          <p className="text-[11px] text-emerald-700 font-medium">
            Step-by-step finishes
          </p>
        </div>
      </div>

      {/* Quick Action Hub */}
      <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 shadow-subtle flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="font-serif font-bold text-lg text-charcoal">
            Administrative Shortcuts
          </h3>
          <p className="text-xs text-charcoal-muted">
            Frequently performed editorial and content actions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/recipes/new"
            className="px-4 py-2 bg-deep-green text-white rounded-full text-xs font-bold hover:bg-deep-hover shadow-xs flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Recipe</span>
          </Link>

          <Link
            href="/admin/categories"
            className="px-4 py-2 bg-sage-50 text-deep-green border border-sage-200 rounded-full text-xs font-bold hover:bg-sage-100"
          >
            <span>Manage Categories</span>
          </Link>

          <Link
            href="/admin/settings"
            className="px-4 py-2 bg-white text-charcoal border border-[#E0DCCE] rounded-full text-xs font-bold hover:bg-sage-50 flex items-center gap-1.5"
          >
            <Database className="w-3.5 h-3.5 text-primary" />
            <span>Seed Database</span>
          </Link>
        </div>
      </div>

      {/* Two-Column Grid: Popular Recipes + Recently Added */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Popular Dishes */}
        <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F1EFEA]">
            <h3 className="font-serif font-bold text-lg text-charcoal">
              Top Rated Dishes
            </h3>
            <Link
              href="/admin/recipes"
              className="text-xs text-deep-green hover:underline font-bold"
            >
              View All Recipes →
            </Link>
          </div>

          <div className="divide-y divide-[#F1EFEA]">
            {popularRecipes.slice(0, 4).map((recipe) => (
              <div key={recipe.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-sage-50">
                    <Image
                      src={recipe.coverImage}
                      alt={recipe.title.en}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-charcoal truncate">
                      {recipe.title.en}
                    </p>
                    <p className="text-[11px] text-charcoal-muted">
                      {recipe.cuisine} • {recipe.totalTime} mins
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{recipe.rating?.toFixed(1)}</span>
                  </div>

                  <Link
                    href={`/admin/recipes/${recipe.id}/edit`}
                    className="text-xs text-primary font-bold hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Added Recipes */}
        <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F1EFEA]">
            <h3 className="font-serif font-bold text-lg text-charcoal">
              Recent Recipe Entries
            </h3>
            <span className="text-xs text-charcoal-muted font-medium">
              Firestore Status: Ready
            </span>
          </div>

          <div className="divide-y divide-[#F1EFEA]">
            {initialRecipes.slice(0, 4).map((recipe) => (
              <div key={recipe.id} className="py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-charcoal truncate">
                      {recipe.title.en}
                    </p>
                    <p className="text-[11px] text-charcoal-muted">
                      Telugu: {recipe.title.te}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/recipe/${recipe.slug}`}
                    target="_blank"
                    className="px-2.5 py-1 rounded-lg text-xs font-semibold text-charcoal-muted hover:bg-sage-50"
                  >
                    Preview
                  </Link>
                  <Link
                    href={`/admin/recipes/${recipe.id}/edit`}
                    className="px-2.5 py-1 bg-sage-100 hover:bg-sage-200 text-deep-green rounded-lg text-xs font-bold"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
