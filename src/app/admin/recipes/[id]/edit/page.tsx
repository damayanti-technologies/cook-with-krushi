'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  ChefHat 
} from 'lucide-react';
import { initialCategories, initialRecipes } from '@/data/seedData';
import { recipeService } from '@/lib/recipeService';
import { Recipe, IngredientItem, CookingStep, DietaryType, DifficultyLevel } from '@/types';
import { useNotification } from '@/context/NotificationContext';

export default function AdminEditRecipePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { showToast } = useNotification();

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Form states
  const [titleEn, setTitleEn] = useState('');
  const [titleTe, setTitleTe] = useState('');
  const [descEn, setDescEn] = useState('');
  const [descTe, setDescTe] = useState('');
  const [categoryId, setCategoryId] = useState('cat_lunch');
  const [cuisine, setCuisine] = useState('Indian');
  const [dietaryType, setDietaryType] = useState<DietaryType>('vegetarian');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [prepTime, setPrepTime] = useState(15);
  const [cookTime, setCookTime] = useState(25);
  const [defaultServings, setDefaultServings] = useState(2);
  const [coverImage, setCoverImage] = useState('');
  const [published, setPublished] = useState(true);
  const [ingredients, setIngredients] = useState<IngredientItem[]>([]);
  const [steps, setSteps] = useState<CookingStep[]>([]);

  useEffect(() => {
    async function load() {
      const found = initialRecipes.find((r) => r.id === id);
      if (found) {
        setRecipe(found);
        setTitleEn(found.title.en);
        setTitleTe(found.title.te);
        setDescEn(found.description.en);
        setDescTe(found.description.te);
        setCategoryId(found.categoryId);
        setCuisine(found.cuisine);
        setDietaryType(found.dietaryType);
        setDifficulty(found.difficulty);
        setPrepTime(found.preparationTime);
        setCookTime(found.cookingTime);
        setDefaultServings(found.defaultServings);
        setCoverImage(found.coverImage);
        setPublished(found.published);
        setIngredients(found.ingredients);
        setSteps(found.steps);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) {
    return <div className="p-12 text-center text-xs text-charcoal-muted">Loading recipe details...</div>;
  }

  if (!recipe) {
    return (
      <div className="p-12 text-center space-y-4">
        <h2 className="font-serif text-xl font-bold">Recipe not found</h2>
        <Link href="/admin/recipes" className="text-xs text-deep-green font-bold underline">
          Back to Recipes List
        </Link>
      </div>
    );
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const updated: Recipe = {
      ...recipe,
      title: { en: titleEn, te: titleTe || titleEn },
      description: { en: descEn, te: descTe || titleTe || titleEn },
      categoryId,
      cuisine,
      dietaryType,
      difficulty,
      preparationTime: Number(prepTime),
      cookingTime: Number(cookTime),
      totalTime: Number(prepTime) + Number(cookTime),
      defaultServings: Number(defaultServings),
      coverImage,
      published,
      ingredients,
      steps,
      updatedAt: new Date().toISOString(),
    };

    try {
      await recipeService.saveRecipe(updated);
      showToast('Recipe changes successfully saved!', 'success');
      router.push('/admin/recipes');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error updating recipe';
      showToast(msg, 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-8 max-w-4xl pb-16">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/recipes"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-muted hover:text-deep-green"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Recipes List
        </Link>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-deep-green hover:bg-deep-hover text-white text-xs font-bold rounded-full shadow-xs flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Updating...' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 sm:p-8 shadow-subtle space-y-6">
        <h3 className="font-serif font-bold text-lg text-charcoal flex items-center gap-2">
          <ChefHat className="w-5 h-5 text-primary" />
          <span>Edit Recipe: {recipe.title.en}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Title (EN)</label>
            <input
              type="text"
              required
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              className="w-full p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs sm:text-sm text-charcoal"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Title (TE)</label>
            <input
              type="text"
              value={titleTe}
              onChange={(e) => setTitleTe(e.target.value)}
              className="w-full p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs sm:text-sm text-charcoal font-telugu"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full p-2 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs font-semibold text-charcoal"
            >
              {initialCategories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name.en}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Dietary</label>
            <select
              value={dietaryType}
              onChange={(e) => setDietaryType(e.target.value as DietaryType)}
              className="w-full p-2 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs font-semibold text-charcoal"
            >
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Prep (m)</label>
            <input
              type="number"
              value={prepTime}
              onChange={(e) => setPrepTime(Number(e.target.value))}
              className="w-full p-2 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Cook (m)</label>
            <input
              type="number"
              value={cookTime}
              onChange={(e) => setCookTime(Number(e.target.value))}
              className="w-full p-2 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-charcoal-muted">Cover Image URL</label>
          <input
            type="url"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs"
          />
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="editPublishedCheck"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-4 h-4 accent-deep-green rounded"
          />
          <label htmlFor="editPublishedCheck" className="text-xs font-bold text-charcoal">
            Published in public recipe catalog
          </label>
        </div>
      </div>
    </form>
  );
}
