'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  RotateCcw, 
  ChefHat, 
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { initialCategories, initialRecipes } from '@/data/seedData';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { DietaryType, DifficultyLevel } from '@/types';

function ExploreRecipesContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get('q') || '';
  const initialCat = searchParams?.get('category') || 'all';
  const initialDifficulty = searchParams?.get('difficulty') || 'all';
  const initialSort = searchParams?.get('sort') || 'popular';

  const { t, getLocalized } = useLanguage();

  const [search, setSearch] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [selectedDiet, setSelectedDiet] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(initialDifficulty);
  const [maxCookingTime, setMaxCookingTime] = useState<number>(120);
  const [sortBy, setSortBy] = useState<string>(initialSort);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredRecipes = useMemo(() => {
    return initialRecipes.filter((recipe) => {
      // 1. Text Search (title, description, tags, ingredient names)
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const titleMatch = 
          recipe.title.en.toLowerCase().includes(q) || 
          recipe.title.te.toLowerCase().includes(q);
        const descMatch = 
          recipe.description.en.toLowerCase().includes(q) || 
          recipe.description.te.toLowerCase().includes(q);
        const tagMatch = recipe.tags.some((tag) => tag.toLowerCase().includes(q));
        const ingMatch = recipe.ingredients.some((ing) => {
          const nameEn = typeof ing.name === 'string' ? ing.name : ing.name.en;
          const nameTe = typeof ing.name === 'string' ? ing.name : ing.name.te;
          return nameEn.toLowerCase().includes(q) || nameTe.toLowerCase().includes(q);
        });

        if (!titleMatch && !descMatch && !tagMatch && !ingMatch) return false;
      }

      // 2. Category
      if (selectedCategory !== 'all' && recipe.categoryId !== selectedCategory) {
        return false;
      }

      // 3. Dietary
      if (selectedDiet !== 'all' && recipe.dietaryType !== selectedDiet) {
        return false;
      }

      // 4. Difficulty
      if (selectedDifficulty !== 'all' && recipe.difficulty !== selectedDifficulty) {
        return false;
      }

      // 5. Cooking Time
      if (recipe.totalTime > maxCookingTime) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortBy === 'popular') {
        return (b.rating || 0) * (b.reviewsCount || 1) - (a.rating || 0) * (a.reviewsCount || 1);
      }
      if (sortBy === 'quickest') {
        return a.totalTime - b.totalTime;
      }
      if (sortBy === 'alphabetical') {
        return a.title.en.localeCompare(b.title.en);
      }
      return 0;
    });
  }, [search, selectedCategory, selectedDiet, selectedDifficulty, maxCookingTime, sortBy]);

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedDiet('all');
    setSelectedDifficulty('all');
    setMaxCookingTime(120);
    setSortBy('popular');
  };

  const hasActiveFilters = 
    search.trim() !== '' || 
    selectedCategory !== 'all' || 
    selectedDiet !== 'all' || 
    selectedDifficulty !== 'all' || 
    maxCookingTime < 120 ||
    sortBy !== 'popular';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recipe Discovery Engine</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-charcoal">
            {t('exploreTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-1 max-w-xl">
            {t('exploreSubtitle')}
          </p>
        </div>

        {/* Search input on explore page */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E0DCCE] rounded-full text-xs sm:text-sm text-charcoal shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 top-3" />
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Recipe Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block space-y-6 bg-white p-6 rounded-3xl border border-[#EAE7DF] shadow-subtle h-fit sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-[#F1EFEA]">
            <h3 className="font-serif text-lg font-bold text-charcoal flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary" />
              <span>Filters</span>
            </h3>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-terracotta hover:underline flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">
              {t('navCategories')}
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs font-semibold text-charcoal focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">{t('allCategories')}</option>
              {initialCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {getLocalized(c.name)}
                </option>
              ))}
            </select>
          </div>

          {/* Dietary Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">
              Dietary Preference
            </label>
            <div className="flex flex-col gap-1.5">
              {[
                { id: 'all', label: t('allDiets') },
                { id: 'vegetarian', label: t('vegetarian') },
                { id: 'vegan', label: t('vegan') },
                { id: 'non-vegetarian', label: t('nonVegetarian') },
              ].map((diet) => (
                <button
                  key={diet.id}
                  onClick={() => setSelectedDiet(diet.id as DietaryType | 'all')}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                    selectedDiet === diet.id
                      ? 'bg-sage-100 text-deep-green font-bold'
                      : 'text-charcoal hover:bg-sage-50'
                  }`}
                >
                  {diet.label}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">
              Difficulty
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'all', label: 'All' },
                { id: 'easy', label: t('easy') },
                { id: 'medium', label: t('medium') },
                { id: 'hard', label: t('hard') },
              ].map((diff) => (
                <button
                  key={diff.id}
                  onClick={() => setSelectedDifficulty(diff.id as DifficultyLevel | 'all')}
                  className={`py-1.5 text-xs font-semibold rounded-lg text-center transition-all ${
                    selectedDifficulty === diff.id
                      ? 'bg-deep-green text-white shadow-xs'
                      : 'bg-[#FAF8F2] text-charcoal hover:bg-sage-100 border border-[#EAE7DF]'
                  }`}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>

          {/* Max Cooking Time Slider */}
          <div className="space-y-2 pt-2 border-t border-[#F1EFEA]">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold uppercase tracking-wider text-charcoal-muted">
                Max Total Time
              </span>
              <span className="font-bold text-deep-green">{maxCookingTime} mins</span>
            </div>
            <input
              type="range"
              min="10"
              max="120"
              step="5"
              value={maxCookingTime}
              onChange={(e) => setMaxCookingTime(Number(e.target.value))}
              className="w-full accent-deep-green cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-charcoal-muted">
              <span>10m</span>
              <span>30m</span>
              <span>60m</span>
              <span>120m</span>
            </div>
          </div>
        </aside>

        {/* Recipes Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Top Controls: Active Count, Mobile Filter Trigger, Sort Selector */}
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#EAE7DF] shadow-subtle gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-sage-100 text-deep-green rounded-full text-xs font-bold"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Filters {hasActiveFilters && '•'}</span>
              </button>

              <p className="text-xs sm:text-sm font-semibold text-charcoal">
                <span className="text-deep-green font-bold text-base">{filteredRecipes.length}</span>{' '}
                {t('resultsCount')}
              </p>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-charcoal-muted font-medium hidden sm:inline">
                {t('sortBy')}:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-1.5 sm:p-2 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs font-semibold text-charcoal focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="popular">{t('sortPopular')}</option>
                <option value="newest">{t('sortNewest')}</option>
                <option value="quickest">{t('sortQuickest')}</option>
                <option value="alphabetical">{t('sortAlphabetical')}</option>
              </select>
            </div>
          </div>

          {/* Mobile Filters Dropdown */}
          {mobileFilterOpen && (
            <div className="lg:hidden p-5 bg-white rounded-3xl border border-[#EAE7DF] shadow-lifted space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-serif font-bold text-charcoal">Filter Recipes</h4>
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-terracotta underline font-semibold"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal-muted">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs"
                >
                  <option value="all">All Categories</option>
                  {initialCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {getLocalized(c.name)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-charcoal-muted">Dietary</label>
                <div className="flex flex-wrap gap-1.5">
                  {['all', 'vegetarian', 'vegan', 'non-vegetarian'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDiet(d)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        selectedDiet === d ? 'bg-deep-green text-white' : 'bg-[#FAF8F2] text-charcoal border border-[#EAE7DF]'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 bg-deep-green text-white text-xs font-bold rounded-xl"
              >
                Apply Filters
              </button>
            </div>
          )}

          {/* Recipes Card Grid */}
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-[#EAE7DF] p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-peach text-terracotta mx-auto flex items-center justify-center">
                <ChefHat className="w-8 h-8 text-deep-green" />
              </div>
              <h3 className="font-serif text-xl font-bold text-charcoal">
                No matching recipes found
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto leading-relaxed">
                {t('noRecipesFound')}
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 bg-deep-green text-white text-xs font-bold rounded-full shadow-sm hover:bg-deep-hover transition-colors"
              >
                {t('clearFilters')}
              </button>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-12 text-center text-charcoal-muted">Loading recipes...</div>}>
      <ExploreRecipesContent />
    </Suspense>
  );
}
