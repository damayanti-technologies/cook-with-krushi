import { Recipe, Category, GlossaryTerm, HomepageContent } from '@/types';
import { initialCategories, initialRecipes, initialGlossaryTerms, initialHomepageContent } from '@/data/seedData';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { collection, doc, getDocs, setDoc, deleteDoc, writeBatch } from 'firebase/firestore';

// Local storage keys for mutations during fallback mode
const STORAGE_KEY_RECIPES = 'cwk_local_recipes';
const STORAGE_KEY_CATEGORIES = 'cwk_local_categories';

function getLocalRecipes(): Recipe[] {
  if (typeof window === 'undefined') return initialRecipes;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RECIPES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading local recipes', e);
  }
  return initialRecipes;
}

function saveLocalRecipes(recipes: Recipe[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_RECIPES, JSON.stringify(recipes));
  } catch (e) {
    console.warn('Error saving local recipes', e);
  }
}

function getLocalCategories(): Category[] {
  if (typeof window === 'undefined') return initialCategories;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CATEGORIES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error reading local categories', e);
  }
  return initialCategories;
}

function saveLocalCategories(cats: Category[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(cats));
  } catch (e) {
    console.warn('Error saving local categories', e);
  }
}

export const recipeService = {
  async getCategories(): Promise<Category[]> {
    if (isFirebaseConfigured() && db) {
      try {
        const snap = await getDocs(collection(db, 'categories'));
        if (!snap.empty) {
          const list: Category[] = [];
          snap.forEach((d) => list.push(d.data() as Category));
          return list.sort((a, b) => a.order - b.order);
        }
      } catch (err) {
        console.warn('Firestore categories query failed, using fallback:', err);
      }
    }
    return getLocalCategories();
  },

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const categories = await this.getCategories();
    return categories.find((c) => c.slug === slug) || null;
  },

  async getRecipes(): Promise<Recipe[]> {
    if (isFirebaseConfigured() && db) {
      try {
        const snap = await getDocs(collection(db, 'recipes'));
        if (!snap.empty) {
          const list: Recipe[] = [];
          snap.forEach((d) => list.push(d.data() as Recipe));
          return list;
        }
      } catch (err) {
        console.warn('Firestore recipes query failed, using fallback:', err);
      }
    }
    return getLocalRecipes();
  },

  async getRecipeBySlug(slug: string): Promise<Recipe | null> {
    const recipes = await this.getRecipes();
    return recipes.find((r) => r.slug === slug) || null;
  },

  async getRecipeById(id: string): Promise<Recipe | null> {
    const recipes = await this.getRecipes();
    return recipes.find((r) => r.id === id) || null;
  },

  async saveRecipe(recipe: Recipe): Promise<void> {
    if (isFirebaseConfigured() && db) {
      try {
        await setDoc(doc(db, 'recipes', recipe.id), recipe, { merge: true });
        return;
      } catch (err) {
        console.error('Firestore saveRecipe failed:', err);
      }
    }
    // Fallback store
    const recipes = getLocalRecipes();
    const index = recipes.findIndex((r) => r.id === recipe.id);
    if (index >= 0) {
      recipes[index] = recipe;
    } else {
      recipes.unshift(recipe);
    }
    saveLocalRecipes(recipes);
  },

  async deleteRecipe(id: string): Promise<void> {
    if (isFirebaseConfigured() && db) {
      try {
        await deleteDoc(doc(db, 'recipes', id));
        return;
      } catch (err) {
        console.error('Firestore deleteRecipe failed:', err);
      }
    }
    const recipes = getLocalRecipes().filter((r) => r.id !== id);
    saveLocalRecipes(recipes);
  },

  async saveCategory(cat: Category): Promise<void> {
    if (isFirebaseConfigured() && db) {
      try {
        await setDoc(doc(db, 'categories', cat.id), cat, { merge: true });
        return;
      } catch (err) {
        console.error('Firestore saveCategory failed:', err);
      }
    }
    const cats = getLocalCategories();
    const index = cats.findIndex((c) => c.id === cat.id);
    if (index >= 0) {
      cats[index] = cat;
    } else {
      cats.push(cat);
    }
    saveLocalCategories(cats);
  },

  async getGlossaryTerms(): Promise<GlossaryTerm[]> {
    return initialGlossaryTerms;
  },

  async getGlossaryTermBySlug(slug: string): Promise<GlossaryTerm | null> {
    return initialGlossaryTerms.find((t) => t.slug === slug) || null;
  },

  async getHomepageContent(): Promise<HomepageContent> {
    return initialHomepageContent;
  },

  /**
   * Seeds all initial categories and recipes into Firestore
   */
  async seedFirestoreDatabase(): Promise<{ success: boolean; count: number; error?: string }> {
    if (!isFirebaseConfigured() || !db) {
      return {
        success: false,
        count: 0,
        error: 'Firebase is not yet configured with valid environment variables.',
      };
    }

    try {
      const batch = writeBatch(db);

      // 1. Seed Categories
      for (const cat of initialCategories) {
        batch.set(doc(db, 'categories', cat.id), cat);
      }

      // 2. Seed Recipes
      for (const rec of initialRecipes) {
        batch.set(doc(db, 'recipes', rec.id), rec);
      }

      // 3. Seed Homepage content
      batch.set(doc(db, 'homepageContent', 'main'), initialHomepageContent);

      await batch.commit();

      return {
        success: true,
        count: initialCategories.length + initialRecipes.length,
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { success: false, count: 0, error: msg };
    }
  },
};
