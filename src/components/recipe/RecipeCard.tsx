'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Flame, Star, Heart, Sparkles } from 'lucide-react';
import { Recipe } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { useKitchen } from '@/context/KitchenContext';
import { useNotification } from '@/context/NotificationContext';

interface RecipeCardProps {
  recipe: Recipe;
  priority?: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, priority = false }) => {
  const { getLocalized, t } = useLanguage();
  const { isFavorite, toggleFavorite } = useKitchen();
  const { showToast } = useNotification();

  const title = getLocalized(recipe.title);
  const description = getLocalized(recipe.description);
  const favorited = isFavorite(recipe.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(recipe.id);
    if (!favorited) {
      showToast(`Added "${title}" to your Kitchen!`, 'success');
    } else {
      showToast(`Removed from favorites.`, 'info');
    }
  };

  const getDietaryBadge = () => {
    switch (recipe.dietaryType) {
      case 'vegetarian':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
            {t('vegetarian')}
          </span>
        );
      case 'vegan':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-green-50 text-green-800 border border-green-200">
            <Sparkles className="w-3 h-3 text-green-600" />
            {t('vegan')}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-50 text-red-800 border border-red-200">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
            {t('nonVegetarian')}
          </span>
        );
    }
  };

  const getDifficultyLabel = () => {
    switch (recipe.difficulty) {
      case 'easy':
        return t('easy');
      case 'medium':
        return t('medium');
      case 'hard':
        return t('hard');
      default:
        return recipe.difficulty;
    }
  };

  return (
    <div className="group relative bg-white rounded-3xl border border-[#EAE7DF] overflow-hidden shadow-subtle hover:shadow-lifted recipe-card-hover flex flex-col h-full">
      
      {/* Image Container */}
      <Link href={`/recipe/${recipe.slug}`} className="relative block aspect-[4/3] w-full overflow-hidden bg-sage-50">
        <Image
          src={recipe.coverImage}
          alt={title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Dietary Tag Badge */}
        <div className="absolute top-3 left-3 z-10">
          {getDietaryBadge()}
        </div>

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          aria-label={favorited ? 'Remove from favorites' : 'Save to favorites'}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-sm ${
            favorited
              ? 'bg-white text-terracotta scale-110'
              : 'bg-white/80 text-charcoal hover:bg-white hover:text-terracotta'
          }`}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-terracotta text-terracotta' : ''}`} />
        </button>

        {/* Cuisine Tag & Rating at bottom of image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <span className="font-semibold tracking-wide bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
            {recipe.cuisine}
          </span>
          {recipe.rating && (
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{recipe.rating.toFixed(1)}</span>
              {recipe.reviewsCount && (
                <span className="text-[10px] text-white/80 font-normal">({recipe.reviewsCount})</span>
              )}
            </div>
          )}
        </div>
      </Link>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <Link href={`/recipe/${recipe.slug}`} className="block">
            <h3 className="font-serif text-lg font-bold text-charcoal group-hover:text-deep-green transition-colors line-clamp-1">
              {title}
            </h3>
          </Link>
          <p className="text-xs text-charcoal-muted mt-1.5 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Metadata Footer */}
        <div className="mt-4 pt-3 border-t border-[#F1EFEA] flex items-center justify-between text-xs text-charcoal-muted">
          <div className="flex items-center gap-1.5" title="Total cooking and prep time">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>{recipe.totalTime} mins</span>
          </div>

          <div className="flex items-center gap-1.5" title="Difficulty level">
            <Flame className="w-3.5 h-3.5 text-terracotta" />
            <span className="capitalize">{getDifficultyLabel()}</span>
          </div>

          <span className="font-semibold text-deep-green group-hover:translate-x-0.5 transition-transform">
            View →
          </span>
        </div>
      </div>
    </div>
  );
};
