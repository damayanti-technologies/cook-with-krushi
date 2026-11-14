'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Trash2 } from 'lucide-react';
import { initialCategories } from '@/data/seedData';
import { Category } from '@/types';
import { useNotification } from '@/context/NotificationContext';

export default function AdminCategoriesPage() {
  const { showToast } = useNotification();
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  // New category modal/form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [nameEn, setNameEn] = useState('');
  const [nameTe, setNameTe] = useState('');
  const [descEn, setDescEn] = useState('');
  const [imageUrl, setImageUrl] = useState(
    'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80'
  );
  const [subcategories, setSubcategories] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn) return;

    const newCat: Category = {
      id: 'cat_' + Date.now(),
      slug: nameEn.toLowerCase().replace(/\s+/g, '-'),
      name: { en: nameEn, te: nameTe || nameEn },
      description: { en: descEn, te: descEn },
      imageUrl,
      recipeCount: 0,
      order: categories.length + 1,
      subcategories: subcategories.split(',').map((s) => s.trim()).filter(Boolean),
    };

    setCategories([...categories, newCat]);
    setShowAddForm(false);
    setNameEn('');
    setNameTe('');
    setDescEn('');
    setSubcategories('');
    showToast(`Category "${nameEn}" added!`, 'success');
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete category "${name}"?`)) {
      setCategories(categories.filter((c) => c.id !== id));
      showToast(`Category "${name}" removed.`, 'info');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-charcoal">
            Category Taxonomy Management
          </h2>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Organize meal categories, subcategories, and cover photography.
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-5 py-2.5 bg-deep-green hover:bg-deep-hover text-white text-xs font-bold rounded-full shadow-xs flex items-center gap-2 self-start sm:self-auto transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Add Category Form Modal */}
      {showAddForm && (
        <form onSubmit={handleAddCategory} className="bg-white p-6 rounded-3xl border border-[#EAE7DF] shadow-lifted space-y-4">
          <h3 className="font-serif font-bold text-base text-charcoal">Create Food Category</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Category Name (EN)"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              className="p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs"
            />
            <input
              type="text"
              placeholder="Category Name (TE)"
              value={nameTe}
              onChange={(e) => setNameTe(e.target.value)}
              className="p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs font-telugu"
            />
          </div>
          <input
            type="text"
            placeholder="Short Description"
            value={descEn}
            onChange={(e) => setDescEn(e.target.value)}
            className="w-full p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs"
          />
          <input
            type="text"
            placeholder="Subcategories (comma separated, e.g. Dosa, Idli, Upma)"
            value={subcategories}
            onChange={(e) => setSubcategories(e.target.value)}
            className="w-full p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs"
          />
          <input
            type="url"
            placeholder="Cover Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border rounded-full text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-deep-green text-white text-xs font-bold rounded-full"
            >
              Save Category
            </button>
          </div>
        </form>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-3xl border border-[#EAE7DF] overflow-hidden shadow-subtle p-5 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-sage-50">
                <Image
                  src={cat.imageUrl}
                  alt={cat.name.en}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-serif font-bold text-base text-charcoal">{cat.name.en}</h4>
                  <span className="text-[11px] font-mono font-bold text-deep-green bg-sage-100 px-2 py-0.5 rounded-full">
                    Order #{cat.order}
                  </span>
                </div>
                <p className="text-xs text-charcoal-muted mt-0.5">{cat.name.te}</p>
                <p className="text-xs text-charcoal-muted mt-1 line-clamp-2">{cat.description.en}</p>
              </div>

              {cat.subcategories && cat.subcategories.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {cat.subcategories.map((sub) => (
                    <span
                      key={sub}
                      className="text-[10px] font-medium px-2 py-0.5 bg-sage-50 text-deep-green rounded-full border border-sage-200"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#F1EFEA] flex items-center justify-between">
              <span className="text-xs text-charcoal-muted font-medium">
                {cat.recipeCount} recipes
              </span>
              <button
                onClick={() => handleDelete(cat.id, cat.name.en)}
                className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-semibold"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
