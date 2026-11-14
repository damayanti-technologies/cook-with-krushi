'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { 
  ArrowLeft, 
  Clock, 
  Star, 
  Heart, 
  Share2, 
  Sparkles, 
  CheckSquare, 
  ChefHat, 
  Utensils, 
  Lightbulb, 
  AlertTriangle,
  Play,
  RotateCcw
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useKitchen } from '@/context/KitchenContext';
import { useNotification } from '@/context/NotificationContext';
import { initialRecipes, initialCategories } from '@/data/seedData';
import { ServingCalculator } from '@/components/recipe/ServingCalculator';
import { scaleQuantity, formatFraction } from '@/lib/utils';
import { RecipeSchema } from '@/components/recipe/RecipeSchema';

export default function RecipeDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { t, getLocalized } = useLanguage();
  const { isFavorite, toggleFavorite, getProgress } = useKitchen();
  const { showToast } = useNotification();

  const recipe = initialRecipes.find((r) => r.slug === slug);

  // Servings state, defaults to recipe.defaultServings
  const [servings, setServings] = useState<number>(recipe?.defaultServings || 2);

  if (!recipe) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-3xl font-bold text-charcoal">Recipe Not Found</h1>
        <p className="text-sm text-charcoal-muted">We could not locate this culinary recipe.</p>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-deep-green text-white text-xs font-bold rounded-full"
        >
          <ArrowLeft className="w-4 h-4" /> Explore Recipes
        </Link>
      </div>
    );
  }

  const title = getLocalized(recipe.title);
  const description = getLocalized(recipe.description);
  const favorited = isFavorite(recipe.id);
  const activeProgress = getProgress(recipe.id);

  const category = initialCategories.find((c) => c.id === recipe.categoryId);
  const categoryName = category ? getLocalized(category.name) : 'Recipes';

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      showToast('Recipe link copied to clipboard!', 'info');
    }
  };

  const handleFavoriteToggle = () => {
    toggleFavorite(recipe.id);
    if (!favorited) {
      showToast(`Saved "${title}" to My Kitchen!`, 'success');
    } else {
      showToast(`Removed from My Kitchen favorites.`, 'info');
    }
  };

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Schema.org Recipe Structured Data */}
      <RecipeSchema recipe={recipe} />

      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal-muted hover:text-deep-green transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore Recipes</span>
        </Link>

        {category && (
          <Link
            href={`/category/${category.slug}`}
            className="text-xs font-bold text-primary hover:underline"
          >
            {categoryName}
          </Link>
        )}
      </div>

      {/* TOP SECTION: HERO & HEADER */}
      <div className="space-y-6">
        
        {/* Title, Dietary Tags, and Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-deep-green bg-sage-100 px-3 py-1 rounded-full border border-sage-200">
                {recipe.cuisine} Cuisine
              </span>

              <span className="text-xs font-semibold capitalize px-2.5 py-1 rounded-full bg-white border border-[#E0DCCE] text-charcoal">
                {recipe.dietaryType}
              </span>

              {recipe.beginnerFriendly && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-peach text-deep-green flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Beginner Friendly
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-charcoal leading-tight">
              {title}
            </h1>

            <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
              {description}
            </p>
          </div>

          {/* Social / Utility Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleFavoriteToggle}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all text-xs font-bold shadow-xs ${
                favorited
                  ? 'bg-red-50 border-red-200 text-terracotta'
                  : 'bg-white border-[#E0DCCE] text-charcoal hover:border-terracotta'
              }`}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-terracotta text-terracotta' : ''}`} />
              <span>{favorited ? t('saved') : t('saveRecipe')}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-2.5 rounded-full bg-white border border-[#E0DCCE] text-charcoal-muted hover:text-charcoal shadow-xs transition-colors"
              title={t('shareRecipe')}
              aria-label="Share recipe"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Recipe Main Photography */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden bg-sage-50 shadow-lifted">
          <Image
            src={recipe.coverImage}
            alt={title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
          {recipe.rating && (
            <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{recipe.rating.toFixed(1)}</span>
              {recipe.reviewsCount && (
                <span className="text-[11px] font-normal text-white/80">
                  ({recipe.reviewsCount} reviews)
                </span>
              )}
            </div>
          )}
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-4 rounded-2xl border border-[#EAE7DF] shadow-subtle text-center">
          <div className="p-2 border-r border-[#F1EFEA]">
            <p className="text-[11px] uppercase tracking-wider font-bold text-charcoal-muted">
              {t('prepTime')}
            </p>
            <p className="text-base font-bold text-charcoal mt-0.5">{recipe.preparationTime} mins</p>
          </div>

          <div className="p-2 sm:border-r border-[#F1EFEA]">
            <p className="text-[11px] uppercase tracking-wider font-bold text-charcoal-muted">
              {t('cookTime')}
            </p>
            <p className="text-base font-bold text-charcoal mt-0.5">{recipe.cookingTime} mins</p>
          </div>

          <div className="p-2 border-r border-[#F1EFEA]">
            <p className="text-[11px] uppercase tracking-wider font-bold text-charcoal-muted">
              {t('totalTime')}
            </p>
            <p className="text-base font-bold text-deep-green mt-0.5">{recipe.totalTime} mins</p>
          </div>

          <div className="p-2">
            <p className="text-[11px] uppercase tracking-wider font-bold text-charcoal-muted">
              Difficulty
            </p>
            <p className="text-base font-bold text-terracotta capitalize mt-0.5">{recipe.difficulty}</p>
          </div>
        </div>

        {/* PRIMARY CALL TO ACTION BUTTONS */}
        <div className="p-6 bg-gradient-to-r from-sage-100 to-[#eef4ec] rounded-3xl border border-sage-200 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-serif text-lg font-bold text-deep-green">
              Ready to Cook {title}?
            </h3>
            <p className="text-xs text-charcoal-muted">
              Check off your ingredients first or dive straight into step-by-step guidance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Link
              href={`/recipe/${recipe.slug}/prepare`}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-full bg-white hover:bg-sage-50 text-deep-green border border-sage-300 font-bold text-xs sm:text-sm text-center shadow-xs flex items-center justify-center gap-2 transition-all"
            >
              <CheckSquare className="w-4 h-4 text-primary" />
              <span>{t('prepareIngredients')}</span>
            </Link>

            <Link
              href={`/recipe/${recipe.slug}/cook`}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-full bg-deep-green hover:bg-deep-hover text-white font-bold text-xs sm:text-sm text-center shadow-lifted flex items-center justify-center gap-2 transition-all group"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{t('startCooking')}</span>
            </Link>
          </div>
        </div>

        {/* In-progress Banner if user has already started */}
        {activeProgress && !activeProgress.completed && (
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-amber-900 font-semibold">
              <RotateCcw className="w-4 h-4 text-amber-700" />
              <span>
                You have an active cooking session at Step {activeProgress.currentStep} of {recipe.steps.length}
              </span>
            </div>
            <Link
              href={`/recipe/${recipe.slug}/cook`}
              className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-full text-xs shadow-xs"
            >
              Resume Cooking →
            </Link>
          </div>
        )}
      </div>

      {/* MAIN TWO-COLUMN CONTENT: INGREDIENTS + INSTRUCTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Servings Calculator, Ingredients, Equipment (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Serving Calculator */}
          <ServingCalculator
            currentServings={servings}
            defaultServings={recipe.defaultServings}
            onServingsChange={setServings}
          />

          {/* Section B: Ingredients List */}
          <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1EFEA]">
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-primary" />
                <h3 className="font-serif text-lg font-bold text-charcoal">
                  {t('ingredientsRequired')}
                </h3>
              </div>
              <span className="text-xs text-charcoal-muted">
                Scaled for {servings} {servings === 1 ? t('person') : t('people')}
              </span>
            </div>

            <ul className="divide-y divide-[#F1EFEA]">
              {recipe.ingredients.map((ing) => {
                const scaledQty = scaleQuantity(ing.quantity, recipe.defaultServings, servings);
                const ingName = typeof ing.name === 'string' ? ing.name : getLocalized(ing.name);
                return (
                  <li key={ing.id} className="py-2.5 flex items-start justify-between text-xs sm:text-sm">
                    <div>
                      <span className="font-semibold text-charcoal">{ingName}</span>
                      {ing.notes && (
                        <p className="text-[11px] text-charcoal-muted mt-0.5">{ing.notes}</p>
                      )}
                    </div>
                    <div className="text-right shrink-0 pl-3">
                      <span className="font-bold text-deep-green font-mono">
                        {formatFraction(scaledQty)} {ing.unit}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="pt-2">
              <Link
                href={`/recipe/${recipe.slug}/prepare`}
                className="w-full py-2.5 rounded-xl bg-sage-50 hover:bg-sage-100 text-deep-green font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-sage-200"
              >
                <CheckSquare className="w-4 h-4" />
                <span>Launch Interactive Prep Checklist</span>
              </Link>
            </div>
          </div>

          {/* Section D: Equipment Needed */}
          {recipe.equipment && recipe.equipment.length > 0 && (
            <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 shadow-subtle space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-[#F1EFEA]">
                <ChefHat className="w-4 h-4 text-primary" />
                <h3 className="font-serif text-base font-bold text-charcoal">
                  {t('equipmentNeeded')}
                </h3>
              </div>
              <ul className="grid grid-cols-1 gap-2 text-xs text-charcoal">
                {recipe.equipment.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Section E: Possible Substitutions */}
          {recipe.alternatives && recipe.alternatives.length > 0 && (
            <div className="bg-peach-light rounded-3xl border border-peach p-6 shadow-subtle space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-peach-dark/30">
                <Lightbulb className="w-4 h-4 text-terracotta" />
                <h3 className="font-serif text-base font-bold text-charcoal">
                  {t('possibleSubstitutions')}
                </h3>
              </div>
              <div className="space-y-3 text-xs">
                {recipe.alternatives.map((alt, idx) => (
                  <div key={idx} className="space-y-1">
                    <p className="font-bold text-charcoal">
                      Instead of <span className="text-terracotta underline">{alt.original}</span>: use{' '}
                      <span className="text-deep-green font-bold">{alt.substitute}</span>
                    </p>
                    <p className="text-[11px] text-charcoal-muted leading-relaxed">
                      {alt.note}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-charcoal-muted italic pt-1">
                {t('substitutionsNote')}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Cooking Steps Preview & Tips (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Steps Preview */}
          <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 sm:p-8 shadow-subtle space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#F1EFEA]">
              <div>
                <h3 className="font-serif text-xl font-bold text-charcoal">
                  {t('instructions')}
                </h3>
                <p className="text-xs text-charcoal-muted mt-0.5">
                  {recipe.steps.length} sequential steps designed for stress-free cooking
                </p>
              </div>

              <Link
                href={`/recipe/${recipe.slug}/cook`}
                className="px-4 py-2 bg-deep-green hover:bg-deep-hover text-white rounded-full text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Cooking Mode</span>
              </Link>
            </div>

            <div className="space-y-6">
              {recipe.steps.map((step) => {
                const stepTitle = typeof step.title === 'string' ? step.title : getLocalized(step.title);
                return (
                  <div key={step.order} className="relative pl-8 sm:pl-10 space-y-3 pb-6 border-b border-[#F1EFEA] last:border-b-0 last:pb-0">
                    {/* Step number badge */}
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-sage-100 text-deep-green font-serif font-bold text-xs flex items-center justify-center border border-sage-200">
                      {step.order}
                    </div>

                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-base text-charcoal">
                        {stepTitle}
                      </h4>
                      {step.estimatedMinutes && (
                        <span className="text-xs text-charcoal-muted flex items-center gap-1">
                          <Clock className="w-3 h-3 text-primary" />
                          {step.estimatedMinutes} mins
                        </span>
                      )}
                    </div>

                    <ol className="space-y-2 text-xs sm:text-sm text-charcoal/90 leading-relaxed list-disc list-inside">
                      {step.instructions.map((inst, i) => (
                        <li key={i}>{inst}</li>
                      ))}
                    </ol>

                    {/* Step safety warnings */}
                    {step.warnings && step.warnings.length > 0 && (
                      <div className="p-3 bg-red-50 rounded-xl border border-red-200 text-xs text-red-800 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <div>
                          {step.warnings.map((w, wi) => (
                            <p key={wi} className="font-medium">{w}</p>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chef's Tips & Notes */}
          {recipe.tips && recipe.tips.length > 0 && (
            <div className="bg-sage-50 rounded-3xl border border-sage-200 p-6 shadow-subtle space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-sage-200">
                <Lightbulb className="w-4 h-4 text-deep-green" />
                <h4 className="font-serif text-base font-bold text-deep-green">
                  {t('tipsAndNotes')}
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-charcoal leading-relaxed">
                {recipe.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>
      </div>

    </article>
  );
}
