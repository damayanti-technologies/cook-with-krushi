'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  CheckSquare, 
  CheckCircle2, 
  AlertCircle, 
  Play, 
  ChefHat, 
  Utensils
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useKitchen } from '@/context/KitchenContext';
import { initialRecipes } from '@/data/seedData';
import { ServingCalculator } from '@/components/recipe/ServingCalculator';
import { scaleQuantity, formatFraction } from '@/lib/utils';

export default function RecipePreparePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { t, getLocalized } = useLanguage();
  const { getProgress, updateProgress } = useKitchen();

  const recipe = initialRecipes.find((r) => r.slug === slug);

  // Load active progress if available
  const existingProgress = recipe ? getProgress(recipe.id) : null;

  const [servings, setServings] = useState<number>(
    existingProgress?.servings || recipe?.defaultServings || 2
  );
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(
    existingProgress?.checklist || {}
  );
  const [checkedEquipment, setCheckedEquipment] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (recipe && existingProgress?.checklist) {
      setCheckedItems(existingProgress.checklist);
    }
  }, [recipe, existingProgress]);

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-3xl font-bold text-charcoal">Recipe Not Found</h1>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-deep-green text-white text-xs font-bold rounded-full"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Explore
        </Link>
      </div>
    );
  }

  const title = getLocalized(recipe.title);

  // Toggle ingredient checkbox
  const handleToggleItem = (id: string) => {
    const updated = {
      ...checkedItems,
      [id]: !checkedItems[id],
    };
    setCheckedItems(updated);
    updateProgress(recipe.id, { checklist: updated, servings });
  };

  const handleToggleEquipment = (item: string) => {
    setCheckedEquipment((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleMarkAll = () => {
    const allChecked: Record<string, boolean> = {};
    recipe.ingredients.forEach((ing) => {
      allChecked[ing.id] = true;
    });
    setCheckedItems(allChecked);
    updateProgress(recipe.id, { checklist: allChecked, servings });
  };

  const handleUncheckAll = () => {
    setCheckedItems({});
    updateProgress(recipe.id, { checklist: {}, servings });
  };

  const totalIngredients = recipe.ingredients.length;
  const collectedCount = recipe.ingredients.filter((ing) => checkedItems[ing.id]).length;
  const percentCollected = Math.round((collectedCount / totalIngredients) * 100);
  const allCollected = collectedCount === totalIngredients;
  const missingCount = totalIngredients - collectedCount;

  const handleStartCooking = () => {
    router.push(`/recipe/${recipe.slug}/cook`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-16">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between">
        <Link
          href={`/recipe/${recipe.slug}`}
          className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal-muted hover:text-deep-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('backToRecipe')}</span>
        </Link>

        <span className="text-xs font-bold text-deep-green bg-sage-100 px-3 py-1 rounded-full border border-sage-200">
          Preparation Phase
        </span>
      </div>

      {/* Screen Title & Subtitle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white p-6 rounded-3xl border border-[#EAE7DF] shadow-subtle">
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0 bg-sage-50">
          <Image
            src={recipe.coverImage}
            alt={title}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Mise en Place</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-charcoal">
            {t('prepScreenTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-1 leading-relaxed">
            {t('prepScreenSubtitle')}
          </p>
        </div>
      </div>

      {/* Servings Adjuster */}
      <ServingCalculator
        currentServings={servings}
        defaultServings={recipe.defaultServings}
        onServingsChange={(newServings) => {
          setServings(newServings);
          updateProgress(recipe.id, { servings: newServings });
        }}
      />

      {/* Progress Indicator Card */}
      <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 shadow-subtle space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-charcoal flex items-center gap-2">
              <CheckCircle2 className={`w-5 h-5 ${allCollected ? 'text-emerald-600' : 'text-primary'}`} />
              <span>
                {collectedCount} {t('of')} {totalIngredients} {t('collectedStatus')}
              </span>
            </h3>
            <p className="text-xs text-charcoal-muted mt-0.5">
              {allCollected
                ? 'All pantry items ready! You can light the stove now.'
                : `${missingCount} item(s) remaining on your kitchen counter.`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAll}
              className="text-xs font-semibold text-deep-green hover:underline px-2.5 py-1 rounded-lg hover:bg-sage-50 transition-colors"
            >
              {t('markAllCollected')}
            </button>
            <span className="text-charcoal-muted">•</span>
            <button
              onClick={handleUncheckAll}
              className="text-xs font-semibold text-charcoal-muted hover:text-charcoal px-2.5 py-1 rounded-lg hover:bg-sage-50 transition-colors"
            >
              {t('uncheckAll')}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-[#EAE7DF] h-3 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              allCollected ? 'bg-emerald-600' : 'bg-primary'
            }`}
            style={{ width: `${percentCollected}%` }}
          />
        </div>
      </div>

      {/* Missing Warning Banner if not all collected */}
      {!allCollected && collectedCount > 0 && (
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">{t('missingWarningTitle')}</p>
            <p className="mt-0.5 text-amber-800 leading-relaxed">
              {t('missingWarningDesc')}
            </p>
          </div>
        </div>
      )}

      {/* Main Ingredient Checklist */}
      <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 sm:p-8 shadow-subtle space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#F1EFEA]">
          <Utensils className="w-4 h-4 text-primary" />
          <h3 className="font-serif text-lg font-bold text-charcoal">
            Ingredient Checklist
          </h3>
        </div>

        <div className="space-y-2">
          {recipe.ingredients.map((ing) => {
            const isChecked = Boolean(checkedItems[ing.id]);
            const scaledQty = scaleQuantity(ing.quantity, recipe.defaultServings, servings);
            const ingName = typeof ing.name === 'string' ? ing.name : getLocalized(ing.name);

            return (
              <div
                key={ing.id}
                onClick={() => handleToggleItem(ing.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 select-none ${
                  isChecked
                    ? 'bg-sage-50/70 border-sage-200 text-charcoal-muted'
                    : 'bg-white hover:bg-[#FAF8F2] border-[#E0DCCE] text-charcoal shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                      isChecked
                        ? 'bg-deep-green text-white'
                        : 'border-2 border-[#D0DFC9] text-transparent hover:border-primary'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>

                  <div>
                    <span className={`text-sm font-semibold ${isChecked ? 'line-through text-charcoal-muted' : 'text-charcoal'}`}>
                      {ingName}
                    </span>
                    {ing.notes && (
                      <p className="text-[11px] text-charcoal-muted">{ing.notes}</p>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className={`font-mono text-xs sm:text-sm font-bold ${isChecked ? 'text-charcoal-muted' : 'text-deep-green'}`}>
                    {formatFraction(scaledQty)} {ing.unit}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Equipment Checklist */}
      {recipe.equipment && recipe.equipment.length > 0 && (
        <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 shadow-subtle space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#F1EFEA]">
            <ChefHat className="w-4 h-4 text-primary" />
            <h3 className="font-serif text-base font-bold text-charcoal">
              Equipment Ready on Counter
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {recipe.equipment.map((item) => {
              const eqChecked = Boolean(checkedEquipment[item]);
              return (
                <div
                  key={item}
                  onClick={() => handleToggleEquipment(item)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 text-xs select-none ${
                    eqChecked
                      ? 'bg-sage-50 border-sage-200 text-charcoal-muted line-through'
                      : 'bg-[#FAF8F2] hover:bg-white border-[#E0DCCE] text-charcoal'
                  }`}
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center ${
                    eqChecked ? 'bg-primary text-white' : 'border border-[#C5CFBF]'
                  }`}>
                    {eqChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span className="font-medium">{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Footer: Proceed to Cooking Mode */}
      <div className="sticky bottom-16 lg:bottom-4 z-30 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-[#EAE7DF] shadow-lifted flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold text-charcoal">
            {allCollected ? 'Ready to begin!' : `${collectedCount}/${totalIngredients} ingredients gathered`}
          </p>
          <p className="text-[11px] text-charcoal-muted">
            Progress is automatically saved to your kitchen.
          </p>
        </div>

        <button
          onClick={handleStartCooking}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm shadow-lifted flex items-center justify-center gap-2 transition-all ${
            allCollected
              ? 'bg-deep-green hover:bg-deep-hover text-white'
              : 'bg-primary hover:bg-primary-hover text-white'
          }`}
        >
          <Play className="w-4 h-4 fill-white" />
          <span>{allCollected ? t('readyToCook') : t('proceedAnyway')}</span>
        </button>
      </div>

    </div>
  );
}
