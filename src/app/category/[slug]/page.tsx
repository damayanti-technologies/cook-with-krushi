'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { ArrowLeft, Compass, ChefHat } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { initialCategories, initialRecipes } from '@/data/seedData';
import { RecipeCard } from '@/components/recipe/RecipeCard';

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { t, getLocalized } = useLanguage();

  const category = initialCategories.find((c) => c.slug === slug);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');

  if (!category) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-3xl font-bold text-charcoal">Category Not Found</h1>
        <p className="text-sm text-charcoal-muted">The requested category could not be found.</p>
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-deep-green text-white text-sm font-semibold rounded-full"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Categories
        </Link>
      </div>
    );
  }

  const categoryName = getLocalized(category.name);
  const categoryDesc = getLocalized(category.description);

  // Filter recipes for this category
  const matchingRecipes = initialRecipes.filter((r) => {
    const matchesCat = r.categoryId === category.id;
    if (!matchesCat) return false;
    if (selectedSubcategory !== 'all') {
      return r.subcategoryId === selectedSubcategory;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Navigation Breadcrumb */}
      <div>
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal-muted hover:text-deep-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Categories</span>
        </Link>
      </div>

      {/* Category Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden aspect-[21/9] sm:aspect-[24/8] min-h-[180px] bg-sage-900 flex items-end p-6 sm:p-10 shadow-lifted">
        <Image
          src={category.imageUrl}
          alt={categoryName}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />

        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-peach text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>Category Collection</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-white">
            {categoryName}
          </h1>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
            {categoryDesc}
          </p>
        </div>
      </div>

      {/* Subcategory Filter Pills */}
      {category.subcategories && category.subcategories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedSubcategory('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedSubcategory === 'all'
                ? 'bg-deep-green text-white shadow-sm'
                : 'bg-white text-charcoal border border-[#E0DCCE] hover:bg-sage-50'
            }`}
          >
            All {categoryName}
          </button>
          {category.subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubcategory(sub)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedSubcategory === sub
                  ? 'bg-deep-green text-white shadow-sm'
                  : 'bg-white text-charcoal border border-[#E0DCCE] hover:bg-sage-50'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Recipes Listing */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
            Recipes in {categoryName}
          </h2>
          <span className="text-xs text-charcoal-muted font-medium">
            {matchingRecipes.length} {t('resultsCount')}
          </span>
        </div>

        {matchingRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {matchingRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-[#EAE7DF] p-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-sage-100 text-deep-green mx-auto flex items-center justify-center">
              <ChefHat className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal">No Recipes Listed Yet</h3>
            <p className="text-xs text-charcoal-muted max-w-md mx-auto">
              Our culinary team at Damayanti Technologies is currently perfecting recipes for this category. Check out our other categories in the meantime!
            </p>
            <Link
              href="/explore"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-deep-green text-white text-xs font-bold rounded-full"
            >
              Explore All Dishes
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}
