'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Sparkles, 
  ChefHat, 
  ArrowRight, 
  CheckCircle2, 
  Timer, 
  Compass, 
  Flame, 
  Lightbulb
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { initialCategories, initialRecipes, initialHomepageContent } from '@/data/seedData';
import { RecipeCard } from '@/components/recipe/RecipeCard';

export default function HomePage() {
  const router = useRouter();
  const { t, getLocalized } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/explore');
    }
  };

  // Split categories into Browse by Meal (first 6) and More to Explore (remaining 4)
  const mealCategories = initialCategories.slice(0, 6);
  const moreCategories = initialCategories.slice(6);

  // Popular recipes
  const popularRecipes = initialRecipes.filter((r) =>
    initialHomepageContent.popularRecipeIds.includes(r.id)
  );

  // Beginner friendly recipes
  const beginnerRecipes = initialRecipes.filter((r) => r.beginnerFriendly);

  // Featured festival specials
  const featuredRecipes = initialRecipes.filter((r) => r.featured);

  return (
    <div className="space-y-16 sm:space-y-24 pb-12">
      
      {/* SECTION 1: HERO */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-[#EAE7DF] bg-gradient-to-b from-[#FAF8F2] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headings & Search */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100 border border-sage-200 text-deep-green text-xs font-semibold shadow-xs">
                <ChefHat className="w-4 h-4 text-primary" />
                <span>{t('tagline')}</span>
                <span className="text-charcoal-muted">•</span>
                <span className="text-terracotta font-bold">Damayanti Technologies</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal tracking-tight leading-[1.15]">
                {t('heroHeading')}
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-charcoal-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">
                {t('heroSubheading')}
              </p>

              {/* Prominent Search Bar */}
              <form onSubmit={handleHeroSearch} className="relative max-w-xl mx-auto lg:mx-0">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchPlaceholder')}
                    className="w-full pl-12 pr-32 py-3.5 sm:py-4 bg-white border-2 border-[#E0DCCE] focus:border-primary rounded-full text-sm sm:text-base text-charcoal shadow-lifted focus:outline-none transition-all placeholder:text-charcoal-light"
                  />
                  <Search className="w-5 h-5 text-charcoal-muted absolute left-4" />
                  <button
                    type="submit"
                    className="absolute right-2 px-5 py-2.5 bg-deep-green hover:bg-deep-hover text-white text-xs sm:text-sm font-semibold rounded-full shadow-sm transition-all"
                  >
                    Search
                  </button>
                </div>

                {/* Popular Search Chips */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-3 text-xs text-charcoal-muted">
                  <span className="font-medium">Trending:</span>
                  {['Paneer Butter Masala', 'Masala Dosa', 'Biryani', 'Tomato Pappu'].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => router.push(`/explore?q=${encodeURIComponent(tag)}`)}
                      className="px-2.5 py-1 rounded-full bg-white hover:bg-sage-100 border border-[#E0DCCE] text-charcoal transition-colors text-[11px]"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </form>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  href="/explore"
                  className="px-6 py-3.5 rounded-full bg-deep-green hover:bg-deep-hover text-white text-sm font-bold shadow-lifted transition-all flex items-center gap-2 group"
                >
                  <Compass className="w-4 h-4 text-peach" />
                  <span>{t('btnExplore')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="/what-can-i-cook"
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-sage-50 text-deep-green border-2 border-sage-200 text-sm font-bold shadow-subtle transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-terracotta" />
                  <span>{t('btnWhatCanICook')}</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background decorative blob */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-peach/60 via-sage-100 to-sage-200 rounded-3xl filter blur-xl opacity-70 -z-10" />

                {/* Main Featured Recipe Visual */}
                <div className="relative bg-white p-3 rounded-3xl shadow-lifted border border-[#EAE7DF]">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-sage-100">
                    <Image
                      src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=1000&auto=format&fit=crop&q=80"
                      alt="Paneer Butter Masala"
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-peach" />
                      <span>Today&apos;s Highlight</span>
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-terracotta uppercase tracking-wider">
                        North Indian • Vegetarian
                      </span>
                      <span className="text-xs text-charcoal-muted font-medium">35 mins</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-charcoal">
                      Paneer Butter Masala
                    </h3>
                    <p className="text-xs text-charcoal-muted">
                      Silky rich cashew tomato gravy with soft cottage cheese cubes.
                    </p>

                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-deep-green font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        <span>Interactive Checklist Ready</span>
                      </div>
                      <Link
                        href="/recipe/paneer-butter-masala"
                        className="text-xs font-bold text-deep-green hover:underline flex items-center gap-1"
                      >
                        Cook Now →
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Floating Interactive Badge: Live Timers */}
                <div className="absolute -bottom-6 -left-6 bg-white p-3.5 rounded-2xl shadow-lifted border border-[#EAE7DF] flex items-center gap-3 hidden sm:flex">
                  <div className="w-10 h-10 rounded-xl bg-sage-100 text-deep-green flex items-center justify-center">
                    <Timer className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-charcoal">Step-by-Step Timers</p>
                    <p className="text-[11px] text-charcoal-muted">Drift-free audio alerts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: BROWSE BY MEAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Culinary Categories</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
              {t('browseByMeal')}
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1 max-w-xl">
              {t('browseByMealDesc')}
            </p>
          </div>

          <Link
            href="/categories"
            className="text-xs sm:text-sm font-bold text-deep-green hover:text-deep-hover flex items-center gap-1.5"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {mealCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group bg-white rounded-3xl border border-[#EAE7DF] overflow-hidden shadow-subtle hover:shadow-lifted recipe-card-hover flex flex-col"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-sage-50">
                <Image
                  src={cat.imageUrl}
                  alt={getLocalized(cat.name)}
                  fill
                  sizes="(max-width: 640px) 50vw, 20vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                <span className="absolute bottom-2.5 left-2.5 right-2.5 text-white font-serif font-bold text-sm sm:text-base leading-tight">
                  {getLocalized(cat.name)}
                </span>
              </div>
              <div className="p-3 bg-white">
                <p className="text-[11px] text-charcoal-muted line-clamp-1">
                  {cat.recipeCount}+ Recipes
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 3: MORE TO EXPLORE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">
            {t('moreToExplore')}
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
            {t('moreToExploreDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {moreCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group p-4 bg-white rounded-2xl border border-[#EAE7DF] shadow-subtle hover:shadow-card flex items-center gap-4 transition-all"
            >
              <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-sage-50">
                <Image
                  src={cat.imageUrl}
                  alt={getLocalized(cat.name)}
                  fill
                  sizes="64px"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm sm:text-base text-charcoal group-hover:text-deep-green transition-colors">
                  {getLocalized(cat.name)}
                </h4>
                <p className="text-xs text-charcoal-muted mt-0.5 line-clamp-1">
                  {getLocalized(cat.description)}
                </p>
                <span className="text-[11px] font-semibold text-primary mt-1 inline-block">
                  {cat.recipeCount} recipes →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 4: POPULAR RECIPES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-terracotta uppercase tracking-wider mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Community Favorites</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
              {t('popularRecipes')}
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1 max-w-xl">
              {t('popularRecipesDesc')}
            </p>
          </div>

          <Link
            href="/explore?sort=popular"
            className="text-xs sm:text-sm font-bold text-deep-green hover:text-deep-hover flex items-center gap-1.5"
          >
            <span>See All Popular Dishes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularRecipes.map((recipe, idx) => (
            <RecipeCard key={recipe.id} recipe={recipe} priority={idx < 2} />
          ))}
        </div>
      </section>

      {/* SECTION 5: BEGINNER FRIENDLY */}
      <section className="bg-sage-100/60 py-12 lg:py-16 border-y border-[#EAE7DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-deep-green border border-sage-200 text-xs font-bold mb-2">
                <ChefHat className="w-3.5 h-3.5 text-primary" />
                <span>Beginner Paved Path</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
                {t('beginnerFriendly')}
              </h2>
              <p className="text-xs sm:text-sm text-charcoal-muted mt-1 max-w-xl">
                {t('beginnerFriendlyDesc')}
              </p>
            </div>

            <Link
              href="/explore?difficulty=easy"
              className="text-xs sm:text-sm font-bold text-deep-green hover:underline flex items-center gap-1.5"
            >
              <span>View All Beginner Dishes</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {beginnerRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: WHAT CAN I COOK? TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gradient-to-r from-deep-green to-[#1b3424] rounded-3xl p-8 sm:p-12 text-white shadow-lifted">
          <div className="relative z-10 max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-peach text-xs font-bold border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-peach" />
              <span>Smart Ingredient Matcher</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight">
              {t('pantryTitle')}
            </h2>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              {t('pantrySubtitle')}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs text-white/60">Try entering:</span>
              {['Tomatoes', 'Onions', 'Potatoes', 'Paneer', 'Rice'].map((ing) => (
                <span
                  key={ing}
                  className="px-2.5 py-1 bg-white/15 backdrop-blur-sm rounded-full text-xs font-medium border border-white/10"
                >
                  {ing}
                </span>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/what-can-i-cook"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-peach hover:bg-peach-dark text-deep-green text-sm font-bold rounded-full shadow-md transition-all"
              >
                <span>Launch &quot;What Can I Cook?&quot;</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Decorative culinary background illustration */}
          <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-15 pointer-events-none hidden md:block">
            <ChefHat className="w-full h-full text-white" />
          </div>
        </div>
      </section>

      {/* SECTION 7: HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
            {t('howItWorks')}
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-2">
            {t('howItWorksDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-3xl border border-[#EAE7DF] shadow-subtle text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-sage-100 text-deep-green mx-auto flex items-center justify-center font-serif text-xl font-bold">
              1
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal">
              {t('step1Title')}
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              {t('step1Desc')}
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-[#EAE7DF] shadow-subtle text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-peach text-deep-green mx-auto flex items-center justify-center font-serif text-xl font-bold">
              2
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal">
              {t('step2Title')}
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              {t('step2Desc')}
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-[#EAE7DF] shadow-subtle text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-sage-200 text-deep-green mx-auto flex items-center justify-center font-serif text-xl font-bold">
              3
            </div>
            <h3 className="font-serif text-lg font-bold text-charcoal">
              {t('step3Title')}
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              {t('step3Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8: FEATURED & FESTIVAL SPECIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-terracotta uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Seasonal & Festive Special</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal">
              {t('featuredRecipes')}
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1">
              Celebration recipes, authentic regional delicacies, and chef-curated banquet picks.
            </p>
          </div>

          <Link
            href="/category/special-occasions"
            className="text-xs sm:text-sm font-bold text-deep-green hover:underline flex items-center gap-1"
          >
            <span>Explore Festival Dishes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRecipes.slice(0, 3).map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* SECTION 9: COOKING TIPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 bg-white rounded-3xl border border-[#EAE7DF] shadow-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-[#F1EFEA] pb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider mb-1">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Culinary Knowledge</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-charcoal">
                {t('cookingTipsTitle')}
              </h2>
            </div>

            <Link
              href="/cooking-guide"
              className="text-xs sm:text-sm font-bold text-deep-green hover:text-deep-hover flex items-center gap-1"
            >
              <span>{t('viewAllTips')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {initialHomepageContent.cookingTips.map((tip) => (
              <div key={tip.id} className="p-5 rounded-2xl bg-sage-50 border border-sage-200/60 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-deep-green bg-white px-2 py-0.5 rounded-full border border-sage-200">
                  {tip.category}
                </span>
                <h4 className="font-serif font-bold text-sm text-charcoal pt-1">
                  {getLocalized(tip.title)}
                </h4>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {getLocalized(tip.content)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
