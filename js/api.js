/**
 * Cook With Krushi - API Manager
 * Loads structured JSON data from data/ directory with in-memory caching.
 * Zero external servers, 100% static & offline capable.
 */

const APIManager = (() => {
  const cache = {
    categories: null,
    glossary: null,
    translations: null,
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

  return {
    async getCategories() {
      if (!cache.categories) {
        cache.categories = await fetchJSON('data/categories.json');
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

    async getRecipesByCategory(categoryKey) {
      if (cache.recipesByCategory[categoryKey]) {
        return cache.recipesByCategory[categoryKey];
      }
      try {
        const recipes = await fetchJSON(`data/recipes/${categoryKey}.json`);
        cache.recipesByCategory[categoryKey] = recipes;
        return recipes;
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

      // Deduplicate by id if needed
      const unique = [];
      const seen = new Set();
      for (const recipe of flattened) {
        if (!seen.has(recipe.id)) {
          seen.add(recipe.id);
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
        .filter((r) => r.difficulty === 'Easy')
        .slice(0, limit);
    }
  };
})();

window.APIManager = APIManager;
