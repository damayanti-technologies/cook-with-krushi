'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, LocalizedString } from '@/types';
import { translations } from '@/data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en'], fallback?: string) => string;
  getLocalized: (val: LocalizedString | string | undefined | null) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('cwk_language') as Language;
    if (saved && (saved === 'en' || saved === 'te')) {
      setLanguageState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('cwk_language', lang);
    document.documentElement.lang = lang;
  };

  const t = (key: keyof typeof translations['en'], fallback?: string): string => {
    const currentDict = translations[language] || translations.en;
    if (currentDict && key in currentDict) {
      return (currentDict as Record<string, string>)[key];
    }
    return (translations.en as Record<string, string>)[key] || fallback || String(key);
  };

  const getLocalized = (val: LocalizedString | string | undefined | null): string => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    if (typeof val === 'object') {
      return val[language] || val.en || '';
    }
    return '';
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getLocalized }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
