'use client';

import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  Plus, 
  X, 
  CheckCircle2, 
  RotateCcw, 
  ChefHat
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { initialRecipes } from '@/data/seedData';
import { RecipeCard } from '@/components/recipe/RecipeCard';

export default function WhatCanICookPage() {
  const { t } = useLanguage();

  const [inputVal, setInputVal] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    'Tomatoes',
    'Onion',
    'Paneer (Cottage Cheese)',
  ]);

  const stapleSuggestions = [
    'Tomatoes',
    'Onion',
    'Potatoes',
    'Paneer (Cottage Cheese)',
    'Toor Dal (Pigeon Pea)',
    'Green Chillies',
    'Garlic Cloves',
    'Aged Basmati Rice',
    'Besan (Gram Flour)',
    'Curd / Plain Yogurt',
    'Fermented Dosa Batter',
    'Whole Milk',
  ];

  const handleAddIngredient = (item: string) => {
    const trimmed = item.trim();
    if (!trimmed) return;
    if (!selectedIngredients.some((i) => i.toLowerCase() === trimmed.toLowerCase())) {
      setSelectedIngredients([...selectedIngredients, trimmed]);
    }
    setInputVal('');
  };

  const handleRemoveIngredient = (item: string) => {
    setSelectedIngredients(selectedIngredients.filter((i) => i !== item));
  };

  const handleClearAll = () => {
    setSelectedIngredients([]);
  };

  // Matching algorithm: checks recipe ingredients against selectedIngredients
  const matchResults = useMemo(() => {
    if (selectedIngredients.length === 0) {
      return { perfect: [], partial: [] };
    }

    const lowerSelected = selectedIngredients.map((i) => i.toLowerCase());

    const scored = initialRecipes.map((recipe) => {
      const totalCount = recipe.ingredients.length;
      let matchedCount = 0;
      const missingIngredients: string[] = [];

      recipe.ingredients.forEach((ing) => {
        const nameEn = (typeof ing.name === 'string' ? ing.name : ing.name.en).toLowerCase();
        const isMatched = lowerSelected.some(
          (sel) => nameEn.includes(sel) || sel.includes(nameEn)
        );

        if (isMatched) {
          matchedCount++;
        } else {
          missingIngredients.push(typeof ing.name === 'string' ? ing.name : ing.name.en);
        }
      });

      const matchRatio = matchedCount / totalCount;

      return {
        recipe,
        matchedCount,
        totalCount,
        missingIngredients,
        matchRatio,
      };
    });

    // 100% matches (all ingredients available, or missing at most 1 common staple like salt/water)
    const perfect = scored
      .filter((item) => item.missingIngredients.length <= 1)
      .map((item) => item.recipe);

    // Partial matches (matches at least 2 ingredients and missing <= 4)
    const partial = scored
      .filter(
        (item) =>
          item.matchedCount >= 2 &&
          item.missingIngredients.length > 1 &&
          item.missingIngredients.length <= 5
      )
      .sort((a, b) => b.matchRatio - a.matchRatio);

    return { perfect, partial };
  }, [selectedIngredients]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Hero Header */}
      <div className="max-w-2xl space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Pantry Ingredient Matcher</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-charcoal">
          {t('pantryTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
          {t('pantrySubtitle')}
        </p>
      </div>

      {/* Ingredient Input & Chip Management Box */}
      <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 sm:p-8 shadow-subtle space-y-6">
        
        {/* Input Row */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-charcoal-muted block mb-2">
            Enter What You Have at Home
          </label>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddIngredient(inputVal);
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={t('pantryInputPlaceholder')}
                className="w-full pl-10 pr-4 py-3 bg-[#FAF8F2] border border-[#E0DCCE] focus:border-primary rounded-2xl text-xs sm:text-sm text-charcoal focus:outline-none"
              />
              <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3.5" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-deep-green hover:bg-deep-hover text-white text-xs sm:text-sm font-bold rounded-2xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>{t('addIngredient')}</span>
            </button>
          </form>
        </div>

        {/* Selected Chips */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-charcoal">
              {t('selectedIngredients')} ({selectedIngredients.length}):
            </span>
            {selectedIngredients.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs text-terracotta hover:underline font-semibold flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{t('clearAll')}</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2 min-h-[44px] p-3 rounded-2xl bg-[#FAF8F2] border border-[#EAE7DF]">
            {selectedIngredients.length > 0 ? (
              selectedIngredients.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-deep-green border border-sage-200 text-xs font-semibold shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                  <span>{item}</span>
                  <button
                    onClick={() => handleRemoveIngredient(item)}
                    className="text-charcoal-light hover:text-red-500 transition-colors ml-0.5"
                    aria-label={`Remove ${item}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))
            ) : (
              <span className="text-xs text-charcoal-muted self-center italic">
                No ingredients added yet. Tap quick essentials below or type your ingredients above!
              </span>
            )}
          </div>
        </div>

        {/* Quick Add Essentials Pills */}
        <div className="pt-2 border-t border-[#F1EFEA] space-y-2">
          <span className="text-xs font-bold text-charcoal-muted">
            {t('popularPantryItems')}:
          </span>
          <div className="flex flex-wrap gap-2">
            {stapleSuggestions.map((staple) => {
              const alreadyAdded = selectedIngredients.some(
                (i) => i.toLowerCase() === staple.toLowerCase()
              );
              return (
                <button
                  key={staple}
                  onClick={() =>
                    alreadyAdded ? handleRemoveIngredient(staple) : handleAddIngredient(staple)
                  }
                  className={`text-xs px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
                    alreadyAdded
                      ? 'bg-sage-200 text-deep-green font-bold'
                      : 'bg-white hover:bg-sage-100 text-charcoal border border-[#E0DCCE]'
                  }`}
                >
                  {alreadyAdded ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-deep-green" />
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-charcoal-muted" />
                  )}
                  <span>{staple}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* RESULTS DISPLAY */}
      <div className="space-y-10">
        
        {/* Group 1: 100% Ready to Cook */}
        {matchResults.perfect.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                ✓
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                  {t('perfectMatches')}
                </h3>
                <p className="text-xs text-charcoal-muted">
                  You have all primary ingredients to prepare these dishes right away!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchResults.perfect.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        )}

        {/* Group 2: Partial Matches */}
        {matchResults.partial.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                !
              </div>
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
                  {t('partialMatches')}
                </h3>
                <p className="text-xs text-charcoal-muted">
                  You have most ingredients; you only need 1 or 2 extra pantry items.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchResults.partial.map(({ recipe, missingIngredients, matchedCount, totalCount }) => {
                return (
                  <div key={recipe.id} className="flex flex-col h-full">
                    <RecipeCard recipe={recipe} />
                    
                    {/* Transparent Missing Items Callout */}
                    <div className="mt-2 p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
                      <div className="flex justify-between items-center font-bold">
                        <span>Pantry Match: {matchedCount}/{totalCount} items</span>
                        <span className="text-[11px] text-amber-700">Missing {missingIngredients.length}</span>
                      </div>
                      <p className="text-[11px] text-amber-800">
                        {t('missingItemsLabel')}{' '}
                        <span className="font-semibold text-charcoal">
                          {missingIngredients.slice(0, 3).join(', ')}
                          {missingIngredients.length > 3 && ` +${missingIngredients.length - 3} more`}
                        </span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty matching state */}
        {selectedIngredients.length > 0 &&
          matchResults.perfect.length === 0 &&
          matchResults.partial.length === 0 && (
            <div className="bg-white rounded-3xl border border-[#EAE7DF] p-12 text-center space-y-4 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-peach text-terracotta mx-auto flex items-center justify-center">
                <ChefHat className="w-8 h-8 text-deep-green" />
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal">
                No matching recipes found
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                {t('noPantryMatches')}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSelectedIngredients(['Tomatoes', 'Onion', 'Potatoes', 'Aged Basmati Rice'])}
                  className="px-5 py-2.5 bg-deep-green text-white text-xs font-bold rounded-full"
                >
                  Load Popular Staples Preset
                </button>
              </div>
            </div>
          )}

      </div>

    </div>
  );
}
