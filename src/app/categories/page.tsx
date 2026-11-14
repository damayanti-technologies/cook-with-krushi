'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Compass, ArrowRight, Utensils } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { initialCategories } from '@/data/seedData';

export default function CategoriesPage() {
  const { t, getLocalized } = useLanguage();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="max-w-2xl space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          <span>Food Taxonomy</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-charcoal">
          {t('navCategories')}
        </h1>
        <p className="text-sm text-charcoal-muted leading-relaxed">
          Explore recipes classified by meal type, traditional accompaniments, sweet desserts, and health goals.
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialCategories.map((cat) => {
          const name = getLocalized(cat.name);
          const desc = getLocalized(cat.description);
          return (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="group bg-white rounded-3xl border border-[#EAE7DF] overflow-hidden shadow-subtle hover:shadow-lifted recipe-card-hover flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-sage-50">
                  <Image
                    src={cat.imageUrl}
                    alt={name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <span className="absolute bottom-3 left-4 text-white font-serif font-bold text-xl drop-shadow-sm">
                    {name}
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    {desc}
                  </p>

                  {cat.subcategories && cat.subcategories.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cat.subcategories.map((sub) => (
                        <span
                          key={sub}
                          className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-sage-50 text-deep-green border border-sage-200/60"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-[#F1EFEA] mt-2 flex items-center justify-between text-xs text-charcoal-muted">
                <span className="font-semibold text-deep-green flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5" />
                  {cat.recipeCount} Dishes Available
                </span>
                <span className="font-bold text-deep-green group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
