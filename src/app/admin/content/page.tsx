'use client';

import React, { useState } from 'react';
import { ChefHat, Sparkles, Lightbulb, Save } from 'lucide-react';
import { initialHomepageContent } from '@/data/seedData';
import { useNotification } from '@/context/NotificationContext';

export default function AdminContentPage() {
  const { showToast } = useNotification();
  const [content, setContent] = useState(initialHomepageContent);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showToast('Homepage banners & tips successfully saved!', 'success');
    }, 400);
  };

  return (
    <div className="space-y-8 max-w-4xl pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-charcoal">
            Homepage & Editorial Content
          </h2>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Curate hero banners, seasonal festival collections, and kitchen wisdom tips.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-deep-green hover:bg-deep-hover text-white text-xs font-bold rounded-full shadow-xs flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving...' : 'Save Content'}</span>
        </button>
      </div>

      {/* Hero Headings */}
      <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 shadow-subtle space-y-4">
        <h3 className="font-serif font-bold text-lg text-charcoal flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Hero Section Text</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Hero Heading (EN)</label>
            <input
              type="text"
              value={content.heroHeading.en}
              onChange={(e) =>
                setContent({
                  ...content,
                  heroHeading: { ...content.heroHeading, en: e.target.value },
                })
              }
              className="w-full p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs sm:text-sm font-semibold text-charcoal"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Hero Heading (TE)</label>
            <input
              type="text"
              value={content.heroHeading.te}
              onChange={(e) =>
                setContent({
                  ...content,
                  heroHeading: { ...content.heroHeading, te: e.target.value },
                })
              }
              className="w-full p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs sm:text-sm font-semibold text-charcoal font-telugu"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Subheading (EN)</label>
            <textarea
              rows={2}
              value={content.heroSubheading.en}
              onChange={(e) =>
                setContent({
                  ...content,
                  heroSubheading: { ...content.heroSubheading, en: e.target.value },
                })
              }
              className="w-full p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs text-charcoal resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Subheading (TE)</label>
            <textarea
              rows={2}
              value={content.heroSubheading.te}
              onChange={(e) =>
                setContent({
                  ...content,
                  heroSubheading: { ...content.heroSubheading, te: e.target.value },
                })
              }
              className="w-full p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs text-charcoal resize-none font-telugu"
            />
          </div>
        </div>
      </div>

      {/* Seasonal & Festival Banner */}
      <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 shadow-subtle space-y-4">
        <h3 className="font-serif font-bold text-lg text-charcoal flex items-center gap-2">
          <ChefHat className="w-4 h-4 text-terracotta" />
          <span>Seasonal Festival Banner</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Banner Title</label>
            <input
              type="text"
              value={content.seasonalBanner.title.en}
              onChange={(e) =>
                setContent({
                  ...content,
                  seasonalBanner: {
                    ...content.seasonalBanner,
                    title: { ...content.seasonalBanner.title, en: e.target.value },
                  },
                })
              }
              className="w-full p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-muted">Banner Image URL</label>
            <input
              type="url"
              value={content.seasonalBanner.imageUrl}
              onChange={(e) =>
                setContent({
                  ...content,
                  seasonalBanner: { ...content.seasonalBanner, imageUrl: e.target.value },
                })
              }
              className="w-full p-2.5 bg-[#FAF8F2] border border-[#E0DCCE] rounded-xl text-xs"
            />
          </div>
        </div>
      </div>

      {/* Cooking Tips */}
      <div className="bg-white rounded-3xl border border-[#EAE7DF] p-6 shadow-subtle space-y-4">
        <h3 className="font-serif font-bold text-lg text-charcoal flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>Homepage Quick Cooking Tips ({content.cookingTips.length})</span>
        </h3>

        <div className="space-y-3">
          {content.cookingTips.map((tip, idx) => (
            <div key={tip.id} className="p-4 rounded-2xl bg-[#FAF8F2] border border-[#EAE7DF] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-xs text-deep-green uppercase tracking-wider">
                  Tip #{idx + 1}: {tip.category}
                </span>
              </div>
              <p className="font-bold text-xs text-charcoal">{tip.title.en}</p>
              <p className="text-xs text-charcoal-muted">{tip.content.en}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
