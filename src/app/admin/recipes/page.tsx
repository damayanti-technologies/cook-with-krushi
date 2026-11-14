'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  PlusCircle, 
  Search, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Eye
} from 'lucide-react';
import { initialRecipes } from '@/data/seedData';
import { recipeService } from '@/lib/recipeService';
import { Recipe } from '@/types';
import { useNotification } from '@/context/NotificationContext';

export default function AdminRecipesListPage() {
  const { showToast } = useNotification();
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const list = await recipeService.getRecipes();
      setRecipes(list);
    } catch (e) {
      console.warn('Load recipes failed', e);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      await recipeService.deleteRecipe(id);
      setRecipes((prev) => prev.filter((r) => r.id !== id));
      showToast(`Recipe "${name}" deleted.`, 'info');
    }
  };

  const handleTogglePublish = async (recipe: Recipe) => {
    const updated = { ...recipe, published: !recipe.published };
    await recipeService.saveRecipe(updated);
    setRecipes((prev) => prev.map((r) => (r.id === recipe.id ? updated : r)));
    showToast(`Recipe status changed to ${updated.published ? 'Published' : 'Draft'}.`, 'success');
  };

  const filtered = recipes.filter((r) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      r.title.en.toLowerCase().includes(q) ||
      r.title.te.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-charcoal">
            Recipe Catalog Management
          </h2>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Add, update, publish, and structure step-by-step instructions.
          </p>
        </div>

        <Link
          href="/admin/recipes/new"
          className="px-5 py-2.5 bg-deep-green hover:bg-deep-hover text-white text-xs font-bold rounded-full shadow-xs flex items-center gap-2 self-start sm:self-auto transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Recipe</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#EAE7DF] shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search recipes by English or Telugu name..."
            className="w-full pl-9 pr-4 py-2 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="w-3.5 h-3.5 text-charcoal-muted absolute left-3 top-2.5" />
        </div>

        <span className="text-xs text-charcoal-muted font-medium self-end sm:self-center">
          Showing {filtered.length} of {recipes.length} total entries
        </span>
      </div>

      {/* Recipes Table */}
      <div className="bg-white rounded-3xl border border-[#EAE7DF] overflow-hidden shadow-subtle">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-charcoal">
            <thead className="bg-[#FAF8F2] border-b border-[#EAE7DF] uppercase text-[10px] tracking-wider text-charcoal-muted font-bold">
              <tr>
                <th className="py-3 px-4">Recipe</th>
                <th className="py-3 px-4">Cuisine & Diet</th>
                <th className="py-3 px-4">Timing</th>
                <th className="py-3 px-4">Steps</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1EFEA]">
              {filtered.map((recipe) => (
                <tr key={recipe.id} className="hover:bg-sage-50/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-sage-50 border border-[#EAE7DF]">
                        <Image
                          src={recipe.coverImage}
                          alt={recipe.title.en}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-charcoal text-xs sm:text-sm">
                          {recipe.title.en}
                        </p>
                        <p className="text-[11px] text-charcoal-muted">
                          {recipe.title.te}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <p className="font-semibold">{recipe.cuisine}</p>
                    <span className="text-[10px] text-charcoal-muted capitalize">
                      {recipe.dietaryType}
                    </span>
                  </td>

                  <td className="py-3 px-4 font-mono text-xs">
                    <span>{recipe.totalTime} mins</span>
                    <span className="text-charcoal-muted block text-[10px]">
                      (Prep: {recipe.preparationTime}m, Cook: {recipe.cookingTime}m)
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-bold text-deep-green bg-sage-100 px-2 py-0.5 rounded-full text-[11px]">
                      {recipe.steps.length} steps
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleTogglePublish(recipe)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                        recipe.published
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {recipe.published ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      <span>{recipe.published ? 'Published' : 'Draft'}</span>
                    </button>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/recipe/${recipe.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-charcoal-muted hover:text-deep-green hover:bg-sage-100"
                        title="View Public Recipe Page"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>

                      <Link
                        href={`/admin/recipes/${recipe.id}/edit`}
                        className="p-1.5 rounded-lg text-charcoal-muted hover:text-primary hover:bg-sage-100"
                        title="Edit Recipe"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleDelete(recipe.id, recipe.title.en)}
                        className="p-1.5 rounded-lg text-charcoal-muted hover:text-red-600 hover:bg-red-50"
                        title="Delete Recipe"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
