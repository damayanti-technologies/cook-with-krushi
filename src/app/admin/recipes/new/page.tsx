'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Save, 
  Plus, 
  Trash2, 
  Clock, 
  ChefHat, 
  Utensils
} from 'lucide-react';
import { initialCategories } from '@/data/seedData';
import { recipeService } from '@/lib/recipeService';
import { Recipe, IngredientItem, CookingStep, DietaryType, DifficultyLevel } from '@/types';
import { generateSlug } from '@/lib/utils';
import { useNotification } from '@/context/NotificationContext';

export default function AdminNewRecipePage() {
  const router = useRouter();
  const { showToast } = useNotification();

  // Basic Information
  const [titleEn, setTitleEn] = useState('');
  const [titleTe, setTitleTe] = useState('');
  const [descEn, setDescEn] = useState('');
  const [descTe, setDescTe] = useState('');
  const [categoryId, setCategoryId] = useState('cat_lunch');
  const [subcategoryId, setSubcategoryId] = useState('');
  const [cuisine, setCuisine] = useState('Indian');
  const [dietaryType, setDietaryType] = useState<DietaryType>('vegetarian');
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('medium');
  const [prepTime, setPrepTime] = useState(15);
  const [cookTime, setCookTime] = useState(25);
  const [defaultServings, setDefaultServings] = useState(2);
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1000&auto=format&fit=crop&q=80'
  );
  const [published, setPublished] = useState(true);
  const [beginnerFriendly, setBeginnerFriendly] = useState(false);
  const [equipmentInput, setEquipmentInput] = useState('Pan, Spatula, Knife, Cutting board');
  const [tagsInput, setTagsInput] = useState('easy, homemade, authentic');

  // Structured Ingredients
  const [ingredients, setIngredients] = useState<IngredientItem[]>([
    { id: 'ing_' + Date.now() + '_1', name: { en: 'Onion', te: 'ఉల్లిపాయ' }, quantity: 1, unit: 'medium', notes: 'Chopped' },
    { id: 'ing_' + Date.now() + '_2', name: { en: 'Tomatoes', te: 'టమాటాలు' }, quantity: 2, unit: 'medium', notes: 'Chopped' },
    { id: 'ing_' + Date.now() + '_3', name: { en: 'Cooking Oil', te: 'వంట నూనె' }, quantity: 2, unit: 'tbsp', notes: '' },
    { id: 'ing_' + Date.now() + '_4', name: { en: 'Salt', te: 'ఉప్పు' }, quantity: 1, unit: 'tsp', notes: 'To taste' },
  ]);

  // Structured Steps
  const [steps, setSteps] = useState<CookingStep[]>([
    {
      order: 1,
      title: { en: 'Prep Aromatics', te: 'పదార్థాలు సిద్ధం చేయండి' },
      instructions: ['Chop onions and tomatoes into neat cubes.', 'Measure all spices and keep within arm reach.'],
      estimatedMinutes: 5,
      timerSeconds: null,
      tips: ['Keep your knife sharp for clean onion slices.'],
    },
    {
      order: 2,
      title: { en: 'Sauté and Simmer', te: 'దోరగా వేయించి ఉడికించండి' },
      instructions: ['Heat oil in your pan over medium flame.', 'Add chopped onions and sauté for 4 minutes until golden.', 'Add tomatoes and cook until softened.'],
      estimatedMinutes: 8,
      timerSeconds: 300,
      tips: ['Cover with lid for 2 minutes to soften tomatoes quickly.'],
      warnings: ['Keep heat on medium to prevent scorching.'],
    },
  ]);

  const [saving, setSaving] = useState(false);

  // Ingredient Helpers
  const addIngredientRow = () => {
    setIngredients([
      ...ingredients,
      {
        id: 'ing_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5),
        name: { en: '', te: '' },
        quantity: 1,
        unit: 'tbsp',
        notes: '',
      },
    ]);
  };

  const removeIngredientRow = (idx: number) => {
    setIngredients(ingredients.filter((_, i) => i !== idx));
  };

  const updateIngredient = (index: number, field: string, val: string | number) => {
    const list = [...ingredients];
    const item = list[index];
    if (field === 'en') {
      item.name = typeof item.name === 'string' ? { en: val as string, te: '' } : { ...item.name, en: val as string };
    } else if (field === 'te') {
      item.name = typeof item.name === 'string' ? { en: item.name, te: val as string } : { ...item.name, te: val as string };
    } else if (field === 'quantity') {
      item.quantity = Number(val) || 0;
    } else if (field === 'unit') {
      item.unit = val as string;
    } else if (field === 'notes') {
      item.notes = val as string;
    }
    setIngredients(list);
  };

  // Step Helpers
  const addStepRow = () => {
    setSteps([
      ...steps,
      {
        order: steps.length + 1,
        title: { en: `Step ${steps.length + 1}`, te: `దశ ${steps.length + 1}` },
        instructions: ['Follow careful stove temperature.'],
        estimatedMinutes: 5,
        timerSeconds: null,
        tips: [],
        warnings: [],
      },
    ]);
  };

  const removeStepRow = (idx: number) => {
    const updated = steps
      .filter((_, i) => i !== idx)
      .map((step, newIdx) => ({ ...step, order: newIdx + 1 }));
    setSteps(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleEn.trim()) {
      showToast('English Title is required', 'error');
      return;
    }

    setSaving(true);

    const generatedSlug = generateSlug(titleEn) || 'recipe-' + Date.now();
    const newRecipe: Recipe = {
      id: 'rec_' + Date.now(),
      slug: generatedSlug,
      title: {
        en: titleEn,
        te: titleTe || titleEn,
      },
      description: {
        en: descEn || `Delicious authentic ${titleEn} recipe prepared with step-by-step guidance.`,
        te: descTe || titleTe || titleEn,
      },
      categoryId,
      subcategoryId: subcategoryId || undefined,
      cuisine,
      dietaryType,
      difficulty,
      preparationTime: Number(prepTime),
      cookingTime: Number(cookTime),
      totalTime: Number(prepTime) + Number(cookTime),
      defaultServings: Number(defaultServings),
      coverImage: coverImage || 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1000&auto=format&fit=crop&q=80',
      ingredients,
      equipment: equipmentInput.split(',').map((s) => s.trim()).filter(Boolean),
      steps,
      tips: ['Serve piping hot with your favorite side.'],
      tags: tagsInput.split(',').map((s) => s.trim().toLowerCase()).filter(Boolean),
      published,
      beginnerFriendly,
      rating: 5.0,
      reviewsCount: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await recipeService.saveRecipe(newRecipe);
      showToast(`Recipe "${titleEn}" successfully saved!`, 'success');
      router.push('/admin/recipes');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error creating recipe';
      showToast(msg, 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-16">
      
      {/* Top Header */}
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
          className="px-6 py-2.5 bg-deep-green hover:bg-deep-hover text-white text-xs font-bold rounded-full shadow-xs flex items-center gap-2 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save & Publish Recipe'}</span>
        </button>
      </div>

      {/* 1. Basic Metadata Card */}
      <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 sm:p-8 shadow-subtle space-y-6">
        <h3 className="font-serif font-bold text-lg text-charcoal flex items-center gap-2">
          <ChefHat className="w-5 h-5 text-primary" />
          <span>Basic Recipe Information</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Recipe Name (English) *</label>
            <input
              type="text"
              required
              value={titleEn}
              onChange={(e) => setTitleEn(e.target.value)}
              placeholder="e.g. Crispy Medu Vada"
              className="w-full p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs sm:text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Recipe Name (Telugu)</label>
            <input
              type="text"
              value={titleTe}
              onChange={(e) => setTitleTe(e.target.value)}
              placeholder="ఉదా. కరకరలాడే మెదు వడ"
              className="w-full p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs sm:text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-primary font-telugu"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Description (English)</label>
            <textarea
              rows={2}
              value={descEn}
              onChange={(e) => setDescEn(e.target.value)}
              placeholder="Crisp exterior with fluffy interior lentils..."
              className="w-full p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Description (Telugu)</label>
            <textarea
              rows={2}
              value={descTe}
              onChange={(e) => setDescTe(e.target.value)}
              placeholder="రుచికరమైన సాంప్రదాయ అల్పాహార వంటకం..."
              className="w-full p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-primary resize-none font-telugu"
            />
          </div>
        </div>

        {/* Categories & Classifications */}
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
            <label className="text-xs font-bold text-charcoal-muted">Dietary Classification</label>
            <select
              value={dietaryType}
              onChange={(e) => setDietaryType(e.target.value as DietaryType)}
              className="w-full p-2 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs font-semibold text-charcoal capitalize"
            >
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
              className="w-full p-2 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs font-semibold text-charcoal capitalize"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Cuisine</label>
            <input
              type="text"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="w-full p-2 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs font-semibold text-charcoal"
            />
          </div>
        </div>

        {/* Timings, Servings & Cover Image */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Prep Time (mins)</label>
            <input
              type="number"
              min="0"
              value={prepTime}
              onChange={(e) => setPrepTime(Number(e.target.value))}
              className="w-full p-2 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs font-semibold text-charcoal"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Cook Time (mins)</label>
            <input
              type="number"
              min="0"
              value={cookTime}
              onChange={(e) => setCookTime(Number(e.target.value))}
              className="w-full p-2 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs font-semibold text-charcoal"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Default Servings</label>
            <input
              type="number"
              min="1"
              value={defaultServings}
              onChange={(e) => setDefaultServings(Number(e.target.value))}
              className="w-full p-2 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs font-semibold text-charcoal"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Beginner Friendly?</label>
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="begFriendly"
                checked={beginnerFriendly}
                onChange={(e) => setBeginnerFriendly(e.target.checked)}
                className="w-4 h-4 accent-deep-green rounded"
              />
              <label htmlFor="begFriendly" className="text-xs font-semibold text-charcoal">
                Yes, beginner dish
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-charcoal-muted">Cover Image URL (Unsplash or Firebase Storage)</label>
          <input
            type="url"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs text-charcoal"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Subcategory (Optional)</label>
            <input
              type="text"
              value={subcategoryId}
              onChange={(e) => setSubcategoryId(e.target.value)}
              placeholder="e.g. Paneer Special, Biryani"
              className="w-full p-2 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs text-charcoal"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Equipment (comma-separated)</label>
            <input
              type="text"
              value={equipmentInput}
              onChange={(e) => setEquipmentInput(e.target.value)}
              className="w-full p-2 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs text-charcoal"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Tags (comma-separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full p-2 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs text-charcoal"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="publishedCheck"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-4 h-4 accent-deep-green rounded"
          />
          <label htmlFor="publishedCheck" className="text-xs font-bold text-charcoal">
            Publish immediately to public catalog
          </label>
        </div>
      </div>

      {/* 2. Structured Ingredients Builder */}
      <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 sm:p-8 shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F1EFEA]">
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-primary" />
            <h3 className="font-serif font-bold text-lg text-charcoal">
              Ingredients List ({ingredients.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={addIngredientRow}
            className="px-3.5 py-1.5 bg-sage-100 hover:bg-sage-200 text-deep-green rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Ingredient</span>
          </button>
        </div>

        <div className="space-y-2">
          {ingredients.map((ing, idx) => {
            const nameEn = typeof ing.name === 'string' ? ing.name : ing.name.en;
            const nameTe = typeof ing.name === 'string' ? '' : ing.name.te;
            return (
              <div
                key={ing.id}
                className="grid grid-cols-12 gap-2 items-center p-2.5 rounded-xl bg-[#FAF8F2] border border-[#EAE7DF]"
              >
                <div className="col-span-4">
                  <input
                    type="text"
                    placeholder="Name (EN)"
                    value={nameEn}
                    onChange={(e) => updateIngredient(idx, 'en', e.target.value)}
                    className="w-full p-1.5 bg-white border border-[#E0DCCE] rounded-lg text-xs"
                  />
                </div>
                <div className="col-span-3">
                  <input
                    type="text"
                    placeholder="Name (TE)"
                    value={nameTe}
                    onChange={(e) => updateIngredient(idx, 'te', e.target.value)}
                    className="w-full p-1.5 bg-white border border-[#E0DCCE] rounded-lg text-xs font-telugu"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    placeholder="Qty"
                    value={ing.quantity}
                    onChange={(e) => updateIngredient(idx, 'quantity', e.target.value)}
                    className="w-full p-1.5 bg-white border border-[#E0DCCE] rounded-lg text-xs font-mono"
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="text"
                    placeholder="Unit (g, tsp, cup)"
                    value={ing.unit}
                    onChange={(e) => updateIngredient(idx, 'unit', e.target.value)}
                    className="w-full p-1.5 bg-white border border-[#E0DCCE] rounded-lg text-xs"
                  />
                </div>
                <div className="col-span-1 text-right">
                  <button
                    type="button"
                    onClick={() => removeIngredientRow(idx)}
                    className="p-1 text-charcoal-muted hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Structured Cooking Steps Builder */}
      <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 sm:p-8 shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F1EFEA]">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <h3 className="font-serif font-bold text-lg text-charcoal">
              Step-by-Step Cooking Guidance ({steps.length} Steps)
            </h3>
          </div>
          <button
            type="button"
            onClick={addStepRow}
            className="px-3.5 py-1.5 bg-sage-100 hover:bg-sage-200 text-deep-green rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Step</span>
          </button>
        </div>

        <div className="space-y-4">
          {steps.map((step, idx) => {
            const stepTitleEn = typeof step.title === 'string' ? step.title : step.title.en;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#EAE7DF] space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-deep-green bg-white px-2.5 py-0.5 rounded-full border border-[#E0DCCE]">
                    Step {step.order}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeStepRow(idx)}
                    className="text-xs text-red-500 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove Step
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Step Title (e.g. Sauté Onions)"
                    value={stepTitleEn}
                    onChange={(e) => {
                      const updated = [...steps];
                      updated[idx].title = { en: e.target.value, te: typeof updated[idx].title === 'string' ? '' : updated[idx].title.te };
                      setSteps(updated);
                    }}
                    className="w-full p-2 bg-white border border-[#E0DCCE] rounded-xl text-xs font-semibold"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Est. mins"
                      value={step.estimatedMinutes}
                      onChange={(e) => {
                        const updated = [...steps];
                        updated[idx].estimatedMinutes = Number(e.target.value);
                        setSteps(updated);
                      }}
                      className="w-1/2 p-2 bg-white border border-[#E0DCCE] rounded-xl text-xs"
                    />
                    <input
                      type="number"
                      placeholder="Timer (seconds)"
                      value={step.timerSeconds || ''}
                      onChange={(e) => {
                        const updated = [...steps];
                        updated[idx].timerSeconds = e.target.value ? Number(e.target.value) : null;
                        setSteps(updated);
                      }}
                      className="w-1/2 p-2 bg-white border border-[#E0DCCE] rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Step instructions (separate distinct actions by new lines)..."
                    value={step.instructions.join('\n')}
                    onChange={(e) => {
                      const updated = [...steps];
                      updated[idx].instructions = e.target.value.split('\n').filter(Boolean);
                      setSteps(updated);
                    }}
                    className="w-full p-2 bg-white border border-[#E0DCCE] rounded-xl text-xs resize-none"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Save Button Bar */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Link
          href="/admin/recipes"
          className="px-6 py-2.5 rounded-full border border-[#E0DCCE] text-xs font-semibold text-charcoal hover:bg-sage-50"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={saving}
          className="px-8 py-3 bg-deep-green hover:bg-deep-hover text-white text-xs sm:text-sm font-bold rounded-full shadow-lifted transition-all flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Publishing...' : 'Save & Publish Recipe'}</span>
        </button>
      </div>

    </form>
  );
}
