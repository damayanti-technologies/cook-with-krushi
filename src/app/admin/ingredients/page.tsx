'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Search } from 'lucide-react';
import { useNotification } from '@/context/NotificationContext';

interface MasterIngredient {
  id: string;
  name: string;
  nameTe: string;
  category: string;
  defaultUnit: string;
  substitutions: string;
}

export default function AdminIngredientsPage() {
  const { showToast } = useNotification();
  const [search, setSearch] = useState('');
  const [ingredients, setIngredients] = useState<MasterIngredient[]>([
    { id: '1', name: 'Paneer (Cottage Cheese)', nameTe: 'పనీర్', category: 'Dairy', defaultUnit: 'g', substitutions: 'Firm Tofu' },
    { id: '2', name: 'Tomatoes', nameTe: 'టమాటాలు', category: 'Vegetables', defaultUnit: 'medium', substitutions: 'Tomato Puree' },
    { id: '3', name: 'Onions', nameTe: 'ఉల్లిపాయలు', category: 'Vegetables', defaultUnit: 'medium', substitutions: 'Shallots' },
    { id: '4', name: 'Aged Basmati Rice', nameTe: 'బాస్మతి బియ్యం', category: 'Grains', defaultUnit: 'cup', substitutions: 'Sona Masoori' },
    { id: '5', name: 'Toor Dal (Pigeon Pea)', nameTe: 'కందిపప్పు', category: 'Lentils', defaultUnit: 'cup', substitutions: 'Moong Dal' },
    { id: '6', name: 'Desi Ghee', nameTe: 'నెయ్యి', category: 'Fats & Oils', defaultUnit: 'tbsp', substitutions: 'Sesame Oil / Butter' },
    { id: '7', name: 'Cashews', nameTe: 'జీడిపప్పు', category: 'Nuts', defaultUnit: 'whole', substitutions: 'Magaz / Almonds' },
    { id: '8', name: 'Fermented Dosa Batter', nameTe: 'దోశ పిండి', category: 'Batters', defaultUnit: 'cup', substitutions: 'Rava Dosa mix' },
  ]);

  const [newName, setNewName] = useState('');
  const [newNameTe, setNewNameTe] = useState('');
  const [newCat, setNewCat] = useState('Vegetables');
  const [newUnit, setNewUnit] = useState('g');
  const [newSub, setNewSub] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;

    const newItem: MasterIngredient = {
      id: String(Date.now()),
      name: newName,
      nameTe: newNameTe || newName,
      category: newCat,
      defaultUnit: newUnit,
      substitutions: newSub,
    };

    setIngredients([...ingredients, newItem]);
    setShowForm(false);
    setNewName('');
    setNewNameTe('');
    setNewSub('');
    showToast(`Master ingredient "${newName}" added!`, 'success');
  };

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Delete ${name}?`)) {
      setIngredients(ingredients.filter((i) => i.id !== id));
      showToast(`Ingredient "${name}" deleted.`, 'info');
    }
  };

  const filtered = ingredients.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.nameTe.toLowerCase().includes(search.toLowerCase()) ||
    i.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-charcoal">
            Master Ingredients Library
          </h2>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Pantry dictionary, default measurement units, and culinary substitutions.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2.5 bg-deep-green hover:bg-deep-hover text-white text-xs font-bold rounded-full shadow-xs flex items-center gap-2 self-start sm:self-auto transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Ingredient</span>
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="bg-white p-6 rounded-3xl border border-[#EAE7DF] shadow-lifted space-y-4">
          <h3 className="font-serif font-bold text-base text-charcoal">Add Master Ingredient</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Ingredient Name (EN)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs"
            />
            <input
              type="text"
              placeholder="Ingredient Name (TE)"
              value={newNameTe}
              onChange={(e) => setNewNameTe(e.target.value)}
              className="p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs font-telugu"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Category (e.g. Dairy, Spices)"
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              className="p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs"
            />
            <input
              type="text"
              placeholder="Default Unit (e.g. g, tbsp, cup)"
              value={newUnit}
              onChange={(e) => setNewUnit(e.target.value)}
              className="p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs"
            />
            <input
              type="text"
              placeholder="Substitutions"
              value={newSub}
              onChange={(e) => setNewSub(e.target.value)}
              className="p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 border rounded-full text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-deep-green text-white text-xs font-bold rounded-full"
            >
              Save Ingredient
            </button>
          </div>
        </form>
      )}

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-[#EAE7DF] shadow-subtle flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ingredients..."
            className="w-full pl-9 pr-4 py-2 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Search className="w-3.5 h-3.5 text-charcoal-muted absolute left-3 top-2.5" />
        </div>
        <span className="text-xs text-charcoal-muted font-medium">
          {filtered.length} items
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-[#EAE7DF] overflow-hidden shadow-subtle">
        <table className="w-full text-left text-xs text-charcoal">
          <thead className="bg-[#FAF8F2] border-b border-[#EAE7DF] uppercase text-[10px] tracking-wider text-charcoal-muted font-bold">
            <tr>
              <th className="py-3 px-4">Ingredient (EN / TE)</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Default Unit</th>
              <th className="py-3 px-4">Substitutions</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1EFEA]">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-sage-50/50">
                <td className="py-3 px-4">
                  <p className="font-bold text-charcoal">{item.name}</p>
                  <p className="text-[11px] text-charcoal-muted">{item.nameTe}</p>
                </td>
                <td className="py-3 px-4">
                  <span className="bg-sage-50 text-deep-green border border-sage-200 px-2.5 py-0.5 rounded-full font-semibold text-[11px]">
                    {item.category}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono font-bold text-deep-green">
                  {item.defaultUnit}
                </td>
                <td className="py-3 px-4 text-charcoal-muted">
                  {item.substitutions || '—'}
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-1.5 text-charcoal-muted hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
