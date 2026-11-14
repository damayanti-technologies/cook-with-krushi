/**
 * Cook With Krushi - Nutrition Calculator Module
 * Calculates estimated Calories, Protein, Carbohydrates, Fat, and Fibre.
 * Supports both Per-Serving and Whole-Recipe values with dynamic serving scaling.
 * Powered by Damayanti Technologies
 */

const NutritionCalculator = (() => {
  let nutritionDataset = null;

  async function init() {
    if (!nutritionDataset) {
      nutritionDataset = await window.APIManager.getNutritionData();
    }
    return nutritionDataset;
  }

  /**
   * Convert common kitchen units to standard grams
   */
  function convertToGrams(amount, unit, itemData) {
    if (!amount || isNaN(amount)) return 0;
    const qty = parseFloat(amount);
    const u = (unit || '').toLowerCase().trim();

    if (u === 'g' || u === 'grams' || u === 'gm') return qty;
    if (u === 'kg' || u === 'kilograms') return qty * 1000;
    if (u === 'ml' || u === 'milliliters') return qty * 1.0; // density ~1
    if (u === 'l' || u === 'liter' || u === 'liters') return qty * 1000;

    // Use ingredient specific gram density if available
    if (itemData && itemData.gramsPerUnit) {
      if (u.includes('cup')) return qty * itemData.gramsPerUnit;
      if (u.includes('tbsp') || u.includes('tablespoon')) return qty * (itemData.gramsPerUnit || 15);
      if (u.includes('tsp') || u.includes('teaspoon')) return qty * (itemData.gramsPerUnit || 5);
      if (u.includes('piece') || u.includes('portion') || u.includes('head')) return qty * itemData.gramsPerUnit;
    }

    // Standard culinary fallback densities
    if (u.includes('cup')) return qty * 180;
    if (u.includes('tbsp') || u.includes('tablespoon')) return qty * 15;
    if (u.includes('tsp') || u.includes('teaspoon')) return qty * 5;
    if (u.includes('pinch')) return qty * 1;
    if (u.includes('piece')) return qty * 100;

    return qty * 50;
  }

  /**
   * Find matching ingredient nutrition from dataset
   */
  function findNutritionEntry(ingName, dataset) {
    if (!dataset || !dataset.items) return null;
    const name = (ingName || '').toLowerCase().trim();

    // 1. Exact alias match
    for (const item of dataset.items) {
      if (item.aliases.some(a => a.toLowerCase() === name)) {
        return item;
      }
    }

    // 2. Substring match
    for (const item of dataset.items) {
      if (item.aliases.some(a => name.includes(a.toLowerCase()) || a.toLowerCase().includes(name))) {
        return item;
      }
    }

    return null;
  }

  /**
   * Calculate complete nutrition for a recipe
   * @param {Object} recipe - Normalized recipe object
   * @param {number} servings - Target servings count
   */
  async function calculateRecipeNutrition(recipe, servings = 4) {
    await init();
    if (!recipe || !recipe.ingredients) {
      return { hasData: false, message: 'Nutrition information unavailable' };
    }

    const items = recipe.ingredients;
    const baseServings = recipe.servings || 4;
    const scaleFactor = servings / baseServings;

    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalFibre = 0;

    let matchedCount = 0;
    const breakdowns = [];

    items.forEach((ing) => {
      const match = findNutritionEntry(ing.name, nutritionDataset);
      if (match) {
        matchedCount++;
        const scaledAmount = (parseFloat(ing.amount) || 1) * scaleFactor;
        const grams = convertToGrams(scaledAmount, ing.unit, match);

        // Nutrition data is per 100 grams
        const factor = grams / 100;

        const cal = match.calories * factor;
        const pro = match.protein * factor;
        const carb = match.carbs * factor;
        const fat = match.fat * factor;
        const fib = match.fibre * factor;

        totalCalories += cal;
        totalProtein += pro;
        totalCarbs += carb;
        totalFat += fat;
        totalFibre += fib;

        breakdowns.push({
          ingredient: ing.name,
          grams: Math.round(grams),
          calories: Math.round(cal),
          protein: parseFloat(pro.toFixed(1)),
          carbs: parseFloat(carb.toFixed(1)),
          fat: parseFloat(fat.toFixed(1))
        });
      }
    });

    // Check if we have enough data (at least 40% of ingredients matched)
    if (matchedCount === 0 || matchedCount / items.length < 0.4) {
      return {
        hasData: false,
        message: 'Nutrition information unavailable'
      };
    }

    const perServing = {
      calories: Math.round(totalCalories / servings),
      protein: parseFloat((totalProtein / servings).toFixed(1)),
      carbs: parseFloat((totalCarbs / servings).toFixed(1)),
      fat: parseFloat((totalFat / servings).toFixed(1)),
      fibre: parseFloat((totalFibre / servings).toFixed(1))
    };

    const wholeRecipe = {
      calories: Math.round(totalCalories),
      protein: parseFloat(totalProtein.toFixed(1)),
      carbs: parseFloat(totalCarbs.toFixed(1)),
      fat: parseFloat(totalFat.toFixed(1)),
      fibre: parseFloat(totalFibre.toFixed(1))
    };

    // Calculate % Daily Value (DV) based on 2,000 kcal diet per serving
    const dailyValues = {
      calories: Math.min(100, Math.round((perServing.calories / 2000) * 100)),
      protein: Math.min(100, Math.round((perServing.protein / 50) * 100)),
      carbs: Math.min(100, Math.round((perServing.carbs / 275) * 100)),
      fat: Math.min(100, Math.round((perServing.fat / 78) * 100)),
      fibre: Math.min(100, Math.round((perServing.fibre / 28) * 100))
    };

    return {
      hasData: true,
      servings,
      perServing,
      wholeRecipe,
      dailyValues,
      breakdowns,
      disclaimer: nutritionDataset.disclaimer || 'Nutrition values are estimates and may vary.'
    };
  }

  return {
    init,
    calculateRecipeNutrition
  };
})();

window.NutritionCalculator = NutritionCalculator;
