'use client';

import React from 'react';
import { Users, Minus, Plus } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ServingCalculatorProps {
  currentServings: number;
  defaultServings: number;
  onServingsChange: (servings: number) => void;
}

export const ServingCalculator: React.FC<ServingCalculatorProps> = ({
  currentServings,
  defaultServings,
  onServingsChange,
}) => {
  const { t } = useLanguage();
  const presets = [1, 2, 3, 4, 6];

  const handleDecrement = () => {
    if (currentServings > 1) {
      onServingsChange(currentServings - 1);
    }
  };

  const handleIncrement = () => {
    if (currentServings < 24) {
      onServingsChange(currentServings + 1);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#EAE7DF] p-4 shadow-subtle space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-sage-100 text-deep-green flex items-center justify-center">
            <Users className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal">
              {t('servingsCalculator')}
            </h4>
            <p className="text-[11px] text-charcoal-muted">
              Default is {defaultServings} {defaultServings === 1 ? t('person') : t('people')}
            </p>
          </div>
        </div>

        {/* Counter stepper */}
        <div className="flex items-center gap-2 bg-[#FAF8F2] border border-[#E0DCCE] rounded-full p-1">
          <button
            onClick={handleDecrement}
            disabled={currentServings <= 1}
            aria-label="Decrease servings"
            className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-charcoal hover:bg-sage-100 disabled:opacity-40 disabled:hover:bg-white transition-colors shadow-xs"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          
          <span className="w-8 text-center text-sm font-bold text-deep-green">
            {currentServings}
          </span>

          <button
            onClick={handleIncrement}
            disabled={currentServings >= 24}
            aria-label="Increase servings"
            className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-charcoal hover:bg-sage-100 disabled:opacity-40 disabled:hover:bg-white transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preset pills */}
      <div className="flex items-center gap-2 pt-1 overflow-x-auto scrollbar-none">
        <span className="text-[11px] text-charcoal-muted font-medium whitespace-nowrap">
          Quick scale:
        </span>
        {presets.map((num) => (
          <button
            key={num}
            onClick={() => onServingsChange(num)}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
              currentServings === num
                ? 'bg-deep-green text-white shadow-xs'
                : 'bg-[#FAF8F2] hover:bg-sage-100 text-charcoal border border-[#EAE7DF]'
            }`}
          >
            {num} {num === 1 ? t('person') : t('people')}
          </button>
        ))}
      </div>
    </div>
  );
};
