/**
 * Cook With Krushi - Regional Cuisine Discovery Module
 * Filters and organizes recipes across Telugu, Indian, and International cuisines.
 * Powered by Damayanti Technologies
 */

const CuisineDiscovery = (() => {
  let cuisinesCache = null;

  async function getCuisines() {
    if (!cuisinesCache) {
      cuisinesCache = await window.APIManager.getCuisines();
    }
    return cuisinesCache;
  }

  /**
   * Filter recipes with multi-criteria
   */
  function filterRecipes(recipes, filters = {}) {
    return recipes.filter((r) => {
      // Cuisine filter
      if (filters.cuisineId && filters.cuisineId !== 'all') {
        const cId = (r.cuisineId || '').toLowerCase();
        const target = filters.cuisineId.toLowerCase();
        if (cId !== target && !cId.includes(target) && !target.includes(cId)) {
          return false;
        }
      }

      // Region filter
      if (filters.region && filters.region !== 'all') {
        const reg = (r.region || '').toLowerCase();
        if (!reg.includes(filters.region.toLowerCase())) {
          return false;
        }
      }

      // Dietary filter
      if (filters.diet && filters.diet !== 'all') {
        const diet = (r.dietType || r.dietaryType || '').toLowerCase();
        if (filters.diet === 'vegetarian' && !diet.includes('veg')) return false;
        if (filters.diet === 'vegan' && !diet.includes('vegan')) return false;
        if (filters.diet === 'non-veg' && !diet.includes('non')) return false;
      }

      // Difficulty filter
      if (filters.difficulty && filters.difficulty !== 'all') {
        if ((r.difficulty || '').toLowerCase() !== filters.difficulty.toLowerCase()) {
          return false;
        }
      }

      // Meal category
      if (filters.mealCategory && filters.mealCategory !== 'all') {
        const mCat = (r.mealType || '').toLowerCase();
        if (!mCat.includes(filters.mealCategory.toLowerCase())) {
          return false;
        }
      }

      // Max total time
      if (filters.maxTime && filters.maxTime > 0) {
        if (r.totalTime > filters.maxTime) return false;
      }

      // Search query
      if (filters.query && filters.query.trim()) {
        const q = filters.query.trim().toLowerCase();
        const matchTitle = (r.title || '').toLowerCase().includes(q) || (r.titleTe || '').toLowerCase().includes(q);
        const matchDesc = (r.description || '').toLowerCase().includes(q);
        const matchIng = (r.ingredients || []).some(ig => (ig.name || '').toLowerCase().includes(q));
        if (!matchTitle && !matchDesc && !matchIng) return false;
      }

      return true;
    });
  }

  return {
    getCuisines,
    filterRecipes
  };
})();

window.CuisineDiscovery = CuisineDiscovery;
