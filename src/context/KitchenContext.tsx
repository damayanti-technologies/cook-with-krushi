'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CookingProgress } from '@/types';
import { useAuth } from './AuthContext';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export interface CookingHistoryItem {
  id: string;
  recipeId: string;
  recipeTitle: string;
  completedAt: string;
  coverImage?: string;
}

interface KitchenContextType {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  inProgress: Record<string, CookingProgress>;
  getProgress: (recipeId: string) => CookingProgress | null;
  updateProgress: (recipeId: string, progress: Partial<CookingProgress>) => void;
  clearProgress: (recipeId: string) => void;
  completeCooking: (recipeId: string, recipeTitle: string, coverImage?: string) => void;
  history: CookingHistoryItem[];
  clearHistory: () => void;
}

const KitchenContext = createContext<KitchenContextType | undefined>(undefined);

export const KitchenProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isFirebaseActive } = useAuth();
  const [favorites, setFavorites] = useState<string[]>(['paneer-butter-masala', 'hyderabadi-biryani']);
  const [inProgress, setInProgress] = useState<Record<string, CookingProgress>>({});
  const [history, setHistory] = useState<CookingHistoryItem[]>([
    {
      id: 'hist_01',
      recipeId: 'masala-dosa',
      recipeTitle: 'Crispy Masala Dosa',
      completedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      coverImage: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&auto=format&fit=crop&q=80',
    }
  ]);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem('cwk_favorites');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedProgress = localStorage.getItem('cwk_progress');
      if (savedProgress) setInProgress(JSON.parse(savedProgress));

      const savedHistory = localStorage.getItem('cwk_history');
      if (savedHistory) setHistory(JSON.parse(savedHistory));
    } catch (e) {
      console.warn('Error reading from localStorage', e);
    }
  }, []);

  const saveToStorage = (key: string, data: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      saveToStorage('cwk_favorites', updated);

      if (user && isFirebaseActive && db) {
        setDoc(doc(db, 'users', user.uid), { favorites: updated }, { merge: true }).catch(console.error);
      }
      return updated;
    });
  };

  const getProgress = (recipeId: string): CookingProgress | null => {
    return inProgress[recipeId] || null;
  };

  const updateProgress = (recipeId: string, progressUpdate: Partial<CookingProgress>) => {
    setInProgress((prev) => {
      const existing = prev[recipeId] || {
        recipeId,
        currentStep: 1,
        completedSteps: [],
        checklist: {},
        startedAt: new Date().toISOString(),
        lastActiveAt: new Date().toISOString(),
        completed: false,
        servings: 2,
      };

      const updatedRecipeProgress: CookingProgress = {
        ...existing,
        ...progressUpdate,
        lastActiveAt: new Date().toISOString(),
      };

      const updated = {
        ...prev,
        [recipeId]: updatedRecipeProgress,
      };
      saveToStorage('cwk_progress', updated);

      if (user && isFirebaseActive && db) {
        setDoc(doc(db, 'cookingProgress', `${user.uid}_${recipeId}`), updatedRecipeProgress, { merge: true }).catch(console.error);
      }
      return updated;
    });
  };

  const clearProgress = (recipeId: string) => {
    setInProgress((prev) => {
      const updated = { ...prev };
      delete updated[recipeId];
      saveToStorage('cwk_progress', updated);
      return updated;
    });
  };

  const completeCooking = (recipeId: string, recipeTitle: string, coverImage?: string) => {
    // 1. Mark inProgress as completed
    updateProgress(recipeId, { completed: true });

    // 2. Add to history
    const newItem: CookingHistoryItem = {
      id: 'hist_' + Date.now(),
      recipeId,
      recipeTitle,
      completedAt: new Date().toISOString(),
      coverImage,
    };

    setHistory((prev) => {
      const updated = [newItem, ...prev.filter((h) => h.recipeId !== recipeId)];
      saveToStorage('cwk_history', updated);
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    saveToStorage('cwk_history', []);
  };

  return (
    <KitchenContext.Provider
      value={{
        favorites,
        isFavorite,
        toggleFavorite,
        inProgress,
        getProgress,
        updateProgress,
        clearProgress,
        completeCooking,
        history,
        clearHistory,
      }}
    >
      {children}
    </KitchenContext.Provider>
  );
};

export const useKitchen = () => {
  const context = useContext(KitchenContext);
  if (!context) {
    throw new Error('useKitchen must be used within a KitchenProvider');
  }
  return context;
};
