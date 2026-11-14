/**
 * Cook With Krushi - Budget Calculator Module
 * Calculates estimated recipe preparation costs based on local retail ingredient estimates.
 * Handles unit conversions, serving scaling, budget filtering, and interactive shopping lists.
 * Powered by Damayanti Technologies
 */

const BudgetCalculator = (() => {
  let priceDataset = null;

  async function init() {
    if (!priceDataset) {
      priceDataset = await window.APIManager.getIngredientPrices();
    }
    return priceDataset;
  }

  /**
   * Convert recipe ingredient amount and unit into standard grams or pieces
   */
  function convertQuantityToStandard(amount, unit) {
    if (!amount || isNaN(amount)) return 0;
    const qty = parseFloat(amount);
    const u = (unit || '').toLowerCase().trim();

    if (u === 'g' || u === 'grams' || u === 'gm') return { grams: qty };
    if (u === 'kg' || u === 'kilograms') return { grams: qty * 1000 };
    if (u === 'ml' || u === 'milliliters') return { grams: qty };
    if (u === 'l' || u === 'liter' || u === 'liters') return { grams: qty * 1000 };

    if (u.includes('cup')) return { grams: qty * 180 };
    if (u.includes('tbsp') || u.includes('tablespoon')) return { grams: qty * 15 };
    if (u.includes('tsp') || u.includes('teaspoon')) return { grams: qty * 5 };
    if (u.includes('piece') || u.includes('portion') || u.includes('head')) return { pieces: qty };
    if (u.includes('pinch')) return { grams: qty * 1 };

    return { grams: qty * 50 };
  }

  function findPriceEntry(ingName, dataset) {
    if (!dataset || !dataset.items) return null;
    const name = (ingName || '').toLowerCase().trim();

    // 1. Alias match
    for (const item of dataset.items) {
      if (item.aliases && item.aliases.some(a => a.toLowerCase() === name)) {
        return item;
      }
    }

    // 2. Substring match
    for (const item of dataset.items) {
      if (item.aliases && item.aliases.some(a => name.includes(a.toLowerCase()) || a.toLowerCase().includes(name))) {
        return item;
      }
    }

    return null;
  }

  /**
   * Calculate estimated cost of a recipe for a specific serving size
   */
  async function calculateRecipeCost(recipe, servings = 4) {
    await init();
    if (!recipe || !recipe.ingredients) {
      return { totalCost: 0, costPerServing: 0, isAccurate: false, items: [] };
    }

    const baseServings = recipe.servings || 4;
    const scaleFactor = servings / baseServings;

    let totalCost = 0;
    let missingPricesCount = 0;
    const itemCosts = [];

    recipe.ingredients.forEach((ing) => {
      const scaledAmount = (parseFloat(ing.amount) || 1) * scaleFactor;
      const match = findPriceEntry(ing.name, priceDataset);

      if (match) {
        let cost = 0;
        const conv = convertQuantityToStandard(scaledAmount, ing.unit);

        if (match.standardUnit === 'piece' && conv.pieces) {
          cost = conv.pieces * (match.price || 30);
        } else if (match.pricePerGram) {
          const grams = conv.grams || (conv.pieces ? conv.pieces * 100 : 50);
          cost = grams * match.pricePerGram;
        } else {
          cost = scaledAmount * 15;
        }

        // Clean rounding for individual ingredient cost
        const roundedCost = Math.max(1, Math.round(cost));
        totalCost += roundedCost;

        itemCosts.push({
          id: ing.id,
          name: ing.name,
          nameTe: ing.nameTe || '',
          amount: scaledAmount,
          unit: ing.unit,
          estimatedCost: roundedCost,
          packageUnit: match.packageUnit || 'Standard retail pack',
          hasPrice: true
        });
      } else {
        missingPricesCount++;
        // Minor estimated nominal spice cost
        const fallbackCost = 5;
        totalCost += fallbackCost;

        itemCosts.push({
          id: ing.id,
          name: ing.name,
          nameTe: ing.nameTe || '',
          amount: scaledAmount,
          unit: ing.unit,
          estimatedCost: fallbackCost,
          packageUnit: 'Pantry staple',
          hasPrice: false
        });
      }
    });

    const isAccurate = missingPricesCount <= 2;
    const finalTotal = Math.round(totalCost);
    const costPerServing = Math.round(finalTotal / servings);

    return {
      totalCost: finalTotal,
      costPerServing,
      servings,
      isAccurate,
      missingPricesCount,
      items: itemCosts,
      disclaimer: priceDataset.disclaimer || 'Prices are approximate estimates.'
    };
  }

  /**
   * Filter and classify recipes by user budget
   */
  async function findRecipesByBudget(recipes, budget = 200, servings = 4, sort = 'lowest-cost') {
    await init();

    const scored = await Promise.all(
      recipes.map(async (recipe) => {
        const costData = await calculateRecipeCost(recipe, servings);
        return {
          recipe,
          costData,
          totalCost: costData.totalCost,
          costPerServing: costData.costPerServing,
          remainingBudget: budget - costData.totalCost,
          fitsBudget: costData.totalCost <= budget,
          slightlyOver: costData.totalCost > budget && costData.totalCost <= budget * 1.35
        };
      })
    );

    let withinBudget = scored.filter(s => s.fitsBudget);
    let slightlyOver = scored.filter(s => s.slightlyOver);

    // Sorting
    const sortFn = (a, b) => {
      if (sort === 'lowest-cost') return a.totalCost - b.totalCost;
      if (sort === 'cost-per-serving') return a.costPerServing - b.costPerServing;
      if (sort === 'quickest') return (a.recipe.totalTime || 0) - (b.recipe.totalTime || 0);
      if (sort === 'popular') return (b.recipe.rating || 0) - (a.recipe.rating || 0);
      return 0;
    };

    withinBudget.sort(sortFn);
    slightlyOver.sort(sortFn);

    return {
      budget,
      servings,
      withinBudget,
      slightlyOver
    };
  }

  /**
   * Recalculate shopping list subtracting user-owned pantry items
   */
  function calculateShoppingCost(items, ownedItemIds = new Set()) {
    let outOfPocketCost = 0;
    let ownedCount = 0;
    let missingCount = 0;

    items.forEach((item) => {
      if (ownedItemIds.has(item.id)) {
        ownedCount++;
      } else {
        missingCount++;
        outOfPocketCost += item.estimatedCost;
      }
    });

    return {
      outOfPocketCost: Math.round(outOfPocketCost),
      ownedCount,
      missingCount,
      totalCount: items.length
    };
  }

  return {
    init,
    calculateRecipeCost,
    findRecipesByBudget,
    calculateShoppingCost
  };
})();

window.BudgetCalculator = BudgetCalculator;
