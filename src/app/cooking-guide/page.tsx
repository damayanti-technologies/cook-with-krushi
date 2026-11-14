'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  BookOpen, 
  Utensils, 
  ShieldCheck, 
  Scale, 
  AlertTriangle, 
  Search
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { initialGlossaryTerms } from '@/data/seedData';

export default function CookingGuidePage() {
  const { t, getLocalized } = useLanguage();
  const [activeTab, setActiveTab] = useState<'glossary' | 'equipment' | 'safety' | 'conversions' | 'mistakes'>('glossary');
  const [glossarySearch, setGlossarySearch] = useState('');

  const filteredGlossary = initialGlossaryTerms.filter((term) => {
    const q = glossarySearch.toLowerCase().trim();
    if (!q) return true;
    const enMatch = term.term.en.toLowerCase().includes(q) || term.definition.en.toLowerCase().includes(q);
    const teMatch = term.term.te.toLowerCase().includes(q) || term.definition.te.toLowerCase().includes(q);
    return enMatch || teMatch;
  });

  const equipmentList = [
    {
      name: 'Cast Iron Tawa / Griddle',
      desc: 'Maintains uniform high heat retention for paper-crisp dosas and authentic scorched rotis.',
      bestFor: 'Dosas, Rotis, Parathas',
    },
    {
      name: 'Heavy-Bottom Kadai / Wok',
      desc: 'Prevents gravies, milk, and spices from scorching during prolonged sautéing and deep frying.',
      bestFor: 'Paneer Gravies, Tadkas, Pakodas',
    },
    {
      name: 'Pressure Cooker / Instant Pot',
      desc: 'Tenderizes tough lentils like toor dal and chickpeas in a fraction of standard boiling time.',
      bestFor: 'Dals, Biryani, Rice, Sambar',
    },
    {
      name: 'High-Torque Wet & Dry Blender',
      desc: 'Essential for reducing tomatoes, soaked cashews, and coconuts into silky smooth restaurant purees.',
      bestFor: 'Chutneys, Masala pastes, Purees',
    },
    {
      name: 'Pappu Gutti (Traditional Wooden Dal Masher)',
      desc: 'Mashes boiled lentils and stewed greens softly without destroying natural texture like electric blades do.',
      bestFor: 'Andhra Tomato Pappu, Sambar, Rasam',
    },
  ];

  const conversions = [
    { measure: '1 Tablespoon (tbsp)', metric: '15 ml / 3 teaspoons (tsp)' },
    { measure: '1 Teaspoon (tsp)', metric: '5 ml' },
    { measure: '1 Standard Cup', metric: '240 ml (water / milk)' },
    { measure: '1 Cup Basmati Rice', metric: 'Approx. 185 – 200 grams' },
    { measure: '1 Cup All-Purpose Flour (Maida)', metric: 'Approx. 125 grams' },
    { measure: '1 Cup Granulated Sugar', metric: 'Approx. 200 grams' },
    { measure: 'Pinch of Spices', metric: 'Approx. 1/16 teaspoon / ~0.3g' },
  ];

  const safetyGuidelines = [
    {
      title: 'Tadka (Tempering) Splatter Prevention',
      desc: 'Ensure curry leaves and green chillies are wiped dry with a clean kitchen towel before adding them to hot oil or ghee.',
      severity: 'High',
    },
    {
      title: 'Blending Hot Liquids Safely',
      desc: 'Never fill a blender jar to the top with steaming gravies. Steam expansion can pop the lid violently. Let the mixture cool 5 minutes, fill half, and hold the lid with a folded cloth.',
      severity: 'Critical',
    },
    {
      title: 'Deep Frying Temperature Control',
      desc: 'Use a deep, stable pan with flat bottom. Gently slide fritters or gulab jamuns from the side of the pan rather than dropping from height.',
      severity: 'High',
    },
    {
      title: 'Raw Dairy & Protein Hygiene',
      desc: 'Store paneer immersed in salted water in the refrigerator, and consume within 3-4 days. Always sanitize cutting boards after prepping perishables.',
      severity: 'Medium',
    },
  ];

  const commonMistakes = [
    {
      mistake: 'Burning Ginger-Garlic Paste',
      cause: 'Adding paste directly into super-hot empty oil.',
      fix: 'Always sauté onions first. Once onions release moisture and turn translucent, add ginger-garlic paste and sauté on medium heat for 60 seconds.',
    },
    {
      mistake: 'Rubbery, Hard Paneer',
      cause: 'Frying paneer cubes on high heat for too long.',
      fix: 'Add fresh paneer cubes directly into hot simmering gravy during the last 3-4 minutes of cooking, or soak in warm salted water for 5 minutes.',
    },
    {
      mistake: 'Mushy, Clumpy Biryani Rice',
      cause: 'Boiling rice 100% before dum layering.',
      fix: 'Cook basmati rice in rolling boiling water only up to 70% (grain breaks into 3 parts when pinched). It finishes cooking in trapped dum steam.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="max-w-2xl space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Kitchen Encyclopedia</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-charcoal">
          {t('guideTitle')}
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
          {t('guideSubtitle')}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-[#EAE7DF]">
        {[
          { id: 'glossary', label: t('glossaryTab'), icon: BookOpen },
          { id: 'equipment', label: t('equipmentTab'), icon: Utensils },
          { id: 'conversions', label: t('conversionsTab'), icon: Scale },
          { id: 'safety', label: t('safetyTab'), icon: ShieldCheck },
          { id: 'mistakes', label: t('mistakesTab'), icon: AlertTriangle },
        ].map((tab) => {
          const IconComp = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                active
                  ? 'bg-deep-green text-white shadow-sm'
                  : 'bg-white hover:bg-sage-100 text-charcoal border border-[#E0DCCE]'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: GLOSSARY & TECHNIQUES */}
      {activeTab === 'glossary' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-xs sm:text-sm text-charcoal-muted">
              Master essential culinary techniques used across our recipes.
            </p>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                placeholder="Search techniques (e.g. sauté, dum)..."
                className="w-full pl-9 pr-3 py-2 bg-white border border-[#E0DCCE] rounded-full text-xs text-charcoal focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Search className="w-3.5 h-3.5 text-charcoal-muted absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGlossary.map((term) => (
              <div
                key={term.id}
                className="bg-white rounded-3xl border border-[#EAE7DF] overflow-hidden shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  {term.imageUrl && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-sage-50">
                      <Image
                        src={term.imageUrl}
                        alt={term.term.en}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-deep-green bg-sage-100 px-2.5 py-0.5 rounded-full border border-sage-200">
                      {term.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-charcoal pt-1">
                      {getLocalized(term.term)}
                    </h3>
                    <p className="text-xs text-charcoal-muted leading-relaxed">
                      {getLocalized(term.definition)}
                    </p>

                    {term.examples && (
                      <div className="pt-2 text-xs text-charcoal-muted border-t border-[#F1EFEA]">
                        <span className="font-bold text-deep-green text-[11px]">Examples:</span>{' '}
                        {term.examples.join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: EQUIPMENT */}
      {activeTab === 'equipment' && (
        <div className="space-y-6">
          <p className="text-xs sm:text-sm text-charcoal-muted">
            The fundamental kitchen tools that elevate flavor and speed up cooking.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipmentList.map((eq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-[#EAE7DF] p-6 shadow-subtle space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-sage-100 text-deep-green flex items-center justify-center font-bold">
                  <Utensils className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif font-bold text-base text-charcoal">{eq.name}</h3>
                <p className="text-xs text-charcoal-muted leading-relaxed">{eq.desc}</p>
                <div className="pt-2 border-t border-[#F1EFEA] text-[11px] text-deep-green font-semibold">
                  <span>Best for: {eq.bestFor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CONVERSIONS */}
      {activeTab === 'conversions' && (
        <div className="space-y-6 max-w-3xl">
          <p className="text-xs sm:text-sm text-charcoal-muted">
            Practical measurement conversions for kitchen accuracy.
          </p>

          <div className="bg-white rounded-3xl border border-[#EAE7DF] overflow-hidden shadow-subtle">
            <div className="p-5 bg-sage-100/60 border-b border-[#EAE7DF] flex items-center gap-2">
              <Scale className="w-4 h-4 text-deep-green" />
              <h3 className="font-serif font-bold text-base text-deep-green">
                Standard Kitchen Units Reference
              </h3>
            </div>

            <ul className="divide-y divide-[#F1EFEA]">
              {conversions.map((conv, idx) => (
                <li key={idx} className="p-4 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold text-charcoal">{conv.measure}</span>
                  <span className="font-mono text-deep-green font-semibold">{conv.metric}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* TAB 4: SAFETY */}
      {activeTab === 'safety' && (
        <div className="space-y-6">
          <p className="text-xs sm:text-sm text-charcoal-muted">
            Important cooking safety practices to prevent burns, splatter, and cross-contamination.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {safetyGuidelines.map((safety, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-[#EAE7DF] p-6 shadow-subtle space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-deep-green" />
                    <h3 className="font-serif font-bold text-base text-charcoal">{safety.title}</h3>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                    safety.severity === 'Critical'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {safety.severity}
                  </span>
                </div>
                <p className="text-xs text-charcoal-muted leading-relaxed">{safety.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: COMMON MISTAKES & FIXES */}
      {activeTab === 'mistakes' && (
        <div className="space-y-6">
          <p className="text-xs sm:text-sm text-charcoal-muted">
            Frequent beginner slip-ups and the exact technique to fix them.
          </p>

          <div className="space-y-4">
            {commonMistakes.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-[#EAE7DF] p-6 shadow-subtle space-y-3"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-terracotta" />
                  <h3 className="font-serif font-bold text-base text-charcoal">
                    Mistake: {item.mistake}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                  <div className="p-3.5 rounded-2xl bg-red-50 border border-red-100">
                    <p className="font-bold text-red-900 mb-1">Why it happens:</p>
                    <p className="text-red-800">{item.cause}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <p className="font-bold text-emerald-900 mb-1">The Chef&apos;s Solution:</p>
                    <p className="text-emerald-800">{item.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
