/**
 * Cook With Krushi - API Manager
 * Loads structured JSON data from data/ directory with in-memory caching.
 * Normalizes recipe schema for consistent bilingual and multi-unit usage.
 * Zero external servers, 100% static & offline capable.
 */

const APIManager = (() => {
  const cache = {
    categories: null,
    glossary: null,
    translations: null,
    cuisines: null,
    nutritionData: null,
    ingredientPrices: null,
    recipesByCategory: {},
    allRecipes: null
  };

  const CATEGORY_FILES = [
    'breakfast',
    'lunch',
    'snacks',
    'dinner',
    'starters',
    'desserts',
    'drinks',
    'chutneys',
    'healthy-food',
    'special-occasions'
  ];

  async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Failed to load ${url}: ${res.statusText}`);
    }
    return res.json();
  }

  function normalizeRecipe(r) {
    if (!r) return null;
    const titleEn = typeof r.title === 'object' ? (r.title.en || '') : (r.title || '');
    const titleTe = typeof r.title === 'object' ? (r.title.te || '') : (r.titleTe || '');
    const descEn = typeof r.description === 'object' ? (r.description.en || '') : (r.description || '');
    const descTe = typeof r.description === 'object' ? (r.description.te || '') : (r.descriptionTe || '');

    const ingredients = (r.ingredients || []).map((ig, idx) => ({
      id: ig.id || `ing_${idx}`,
      name: typeof ig.name === 'object' ? (ig.name.en || '') : (ig.name || ''),
      nameTe: typeof ig.name === 'object' ? (ig.name.te || '') : (ig.nameTe || ''),
      amount: ig.quantity !== undefined ? parseFloat(ig.quantity) : (ig.amount !== undefined ? parseFloat(ig.amount) : 1),
      unit: ig.unit || '',
      group: ig.group || 'Main Ingredients',
      notes: ig.notes || ''
    }));

    const steps = (r.steps || []).map((s, idx) => {
      const sTitleEn = typeof s.title === 'object' ? (s.title.en || '') : (s.title || `Step ${idx + 1}`);
      const sTitleTe = typeof s.title === 'object' ? (s.title.te || '') : (s.titleTe || '');
      const sInstEn = Array.isArray(s.instructions) ? s.instructions.join(' ') : (s.instruction || '');
      const sInstTe = Array.isArray(s.instructionsTe) ? s.instructionsTe.join(' ') : (s.instructionTe || '');

      return {
        order: s.order || idx + 1,
        title: sTitleEn,
        titleTe: sTitleTe,
        instruction: sInstEn,
        instructionTe: sInstTe,
        image: s.imageUrl || s.image || '',
        timerSeconds: s.timerSeconds || (s.timerMinutes ? s.timerMinutes * 60 : 0),
        timerMinutes: s.timerMinutes || (s.timerSeconds ? Math.ceil(s.timerSeconds / 60) : 0),
        tip: s.tips ? (Array.isArray(s.tips) ? s.tips.join(' ') : s.tips) : (s.tip || ''),
        safety: s.warnings ? (Array.isArray(s.warnings) ? s.warnings.join(' ') : s.warnings) : (s.safety || '')
      };
    });

    return {
      id: r.id,
      slug: r.slug,
      title: titleEn,
      titleTe: titleTe,
      description: descEn,
      descriptionTe: descTe,
      image: r.coverImage || r.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80',
      prepTime: r.preparationTime || r.prepTime || 15,
      cookTime: r.cookingTime || r.cookTime || 20,
      totalTime: r.totalTime || ((r.preparationTime || r.prepTime || 15) + (r.cookingTime || r.cookTime || 20)),
      servings: r.defaultServings || r.servings || 4,
      mealType: r.mealType || (r.categoryId ? r.categoryId.replace('cat_', '') : 'Lunch'),
      dietType: r.dietaryType || r.dietType || 'Vegetarian',
      difficulty: r.difficulty ? (r.difficulty.charAt(0).toUpperCase() + r.difficulty.slice(1)) : 'Easy',
      cuisineId: r.cuisineId || (r.cuisine ? r.cuisine.toLowerCase().replace(/\s+/g, '-') : 'south-indian'),
      cuisine: r.cuisine || 'South Indian',
      region: r.region || 'India',
      rating: r.rating || 4.9,
      reviewsCount: r.reviewsCount || 120,
      isFeatured: !!(r.featured || r.isFeatured),
      tags: r.tags || [],
      equipment: r.equipment || ['Standard Cookware'],
      substitutions: r.alternatives || r.substitutions || [],
      tips: r.tips || [],
      ingredients,
      steps
    };
  }

  return {
    async getCategories() {
      if (!cache.categories) {
        const raw = await fetchJSON('data/categories.json');
        cache.categories = (raw || []).map(c => ({
          ...c,
          id: c.id || c.slug,
          name: typeof c.name === 'object' ? (c.name.en || '') : (c.name || ''),
          nameTe: typeof c.name === 'object' ? (c.name.te || '') : (c.nameTe || ''),
          description: typeof c.description === 'object' ? (c.description.en || '') : (c.description || ''),
          descriptionTe: typeof c.description === 'object' ? (c.description.te || '') : (c.descriptionTe || ''),
          image: c.image || c.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'
        }));
      }
      return cache.categories;
    },

    async getGlossary() {
      if (!cache.glossary) {
        cache.glossary = await fetchJSON('data/glossary.json');
      }
      return cache.glossary;
    },

    async getTranslations() {
      if (!cache.translations) {
        cache.translations = await fetchJSON('data/translations.json');
      }
      return cache.translations;
    },

    async getCuisines() {
      if (!cache.cuisines) {
        const data = await fetchJSON('data/cuisines.json');
        cache.cuisines = data.cuisines || [];
      }
      return cache.cuisines;
    },

    async getNutritionData() {
      if (!cache.nutritionData) {
        cache.nutritionData = await fetchJSON('data/nutrition-data.json');
      }
      return cache.nutritionData;
    },

    async getIngredientPrices() {
      if (!cache.ingredientPrices) {
        cache.ingredientPrices = await fetchJSON('data/ingredient-prices.json');
      }
      return cache.ingredientPrices;
    },

    async getRecipesByCategory(categoryKey) {
      if (cache.recipesByCategory[categoryKey]) {
        return cache.recipesByCategory[categoryKey];
      }
      try {
        const rawList = await fetchJSON(`data/recipes/${categoryKey}.json`);
        const normalized = rawList.map(normalizeRecipe);
        cache.recipesByCategory[categoryKey] = normalized;
        return normalized;
      } catch (err) {
        console.warn(`Could not load recipes for category ${categoryKey}:`, err);
        return [];
      }
    },

    async getAllRecipes() {
      if (cache.allRecipes) {
        return cache.allRecipes;
      }

      const promises = CATEGORY_FILES.map((cat) => this.getRecipesByCategory(cat));
      const results = await Promise.all(promises);
      const flattened = results.flat();

      // Deduplicate by slug or id
      const unique = [];
      const seen = new Set();
      for (const recipe of flattened) {
        const key = recipe.slug || recipe.id;
        if (!seen.has(key)) {
          seen.add(key);
          unique.push(recipe);
        }
      }

      cache.allRecipes = unique;
      return cache.allRecipes;
    },

    async getRecipeBySlug(slug) {
      const all = await this.getAllRecipes();
      return all.find((r) => r.slug === slug) || null;
    },

    async getRecipeById(id) {
      const all = await this.getAllRecipes();
      return all.find((r) => r.id === id) || null;
    },

    async getRecipesByCuisine(cuisineId) {
      const all = await this.getAllRecipes();
      const target = (cuisineId || '').toLowerCase().replace(/\s+/g, '-');
      return all.filter((r) => {
        const cId = (r.cuisineId || '').toLowerCase();
        const cName = (r.cuisine || '').toLowerCase().replace(/\s+/g, '-');
        return cId === target || cName === target || cId.includes(target) || target.includes(cId);
      });
    },

    async getFeaturedRecipes() {
      const all = await this.getAllRecipes();
      return all.filter((r) => r.isFeatured);
    },

    async getPopularRecipes(limit = 6) {
      const all = await this.getAllRecipes();
      return all
        .slice()
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, limit);
    },

    async getBeginnerRecipes(limit = 4) {
      const all = await this.getAllRecipes();
      return all
        .filter((r) => (r.difficulty || '').toLowerCase() === 'easy')
        .slice(0, limit);
    }
  };
})();

window.APIManager = APIManager;
