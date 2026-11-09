import {
  HikeProject,
  ShoppingListItem,
  DryingTaskItem,
  Product,
  DehydratedRecipe,
} from '../types/domain';
import { PRODUCTS_CATALOG } from '../data/productsCatalog';
import { DEHYDRATED_RECIPES } from '../data/dehydratedRecipes';

export function calculateShoppingAndDryingPlan(
  project: HikeProject,
  stageFilterId?: string,
  customProducts: Product[] = [],
  customRecipes: DehydratedRecipe[] = []
): { shoppingItems: ShoppingListItem[]; dryingTasks: DryingTaskItem[] } {
  const pCount = Math.max(1, project.participants.length);
  const daysToInclude = stageFilterId
    ? project.days.filter(d => d.stageId === stageFilterId)
    : project.days;

  // Агрегація окремих продуктів
  const productTotals: Record<string, { dryGrams: number; byStage: Record<string, number> }> = {};
  // Агрегація рецептів
  const recipeTotals: Record<string, { servings: number; dryGrams: number; byStage: Record<string, number> }> = {};

  daysToInclude.forEach(day => {
    const stageId = day.stageId;
    const meals = Object.values(day.meals);

    meals.forEach(meal => {
      meal.items.forEach(item => {
        const itemDryGramsForGroup = item.gramsPerPerson * pCount;

        if (item.sourceType === 'product') {
          if (!productTotals[item.sourceId]) {
            productTotals[item.sourceId] = { dryGrams: 0, byStage: {} };
          }
          productTotals[item.sourceId].dryGrams += itemDryGramsForGroup;
          productTotals[item.sourceId].byStage[stageId] =
            (productTotals[item.sourceId].byStage[stageId] || 0) + itemDryGramsForGroup;
        } else {
          // recipe
          const recipe =
            customRecipes.find(r => r.id === item.sourceId) ||
            DEHYDRATED_RECIPES.find(r => r.id === item.sourceId);

          const servingsCount = recipe && recipe.dryWeightPerServingGrams > 0
            ? (item.gramsPerPerson / recipe.dryWeightPerServingGrams) * pCount
            : pCount;

          if (!recipeTotals[item.sourceId]) {
            recipeTotals[item.sourceId] = { servings: 0, dryGrams: 0, byStage: {} };
          }
          recipeTotals[item.sourceId].servings += servingsCount;
          recipeTotals[item.sourceId].dryGrams += itemDryGramsForGroup;
          recipeTotals[item.sourceId].byStage[stageId] =
            (recipeTotals[item.sourceId].byStage[stageId] || 0) + itemDryGramsForGroup;
        }
      });
    });
  });

  const shoppingItems: ShoppingListItem[] = [];
  const dryingTasks: DryingTaskItem[] = [];

  // 1. Обробка продуктів
  Object.entries(productTotals).forEach(([productId, data]) => {
    const product =
      customProducts.find(p => p.id === productId) ||
      PRODUCTS_CATALOG.find(p => p.id === productId);

    if (!product) return;

    const dryWeight = Math.round(data.dryGrams);
    let rawWeight = dryWeight;
    let isDehydratedAtHome = false;
    let rawName = product.name;

    if (product.dryingInfo) {
      isDehydratedAtHome = true;
      rawWeight = Math.round(dryWeight * product.dryingInfo.rawToDryRatio);
      rawName = product.dryingInfo.rawProductName;

      dryingTasks.push({
        id: `drying-prod-${product.id}`,
        title: product.name,
        sourceType: 'product',
        sourceId: product.id,
        servingsCountTotal: Math.round(dryWeight / (product.recommendedNormGrams?.default || 35)),
        dryWeightTotalGrams: dryWeight,
        rawWeightTotalGrams: rawWeight,
        tempCelsius: product.dryingInfo.tempCelsius,
        timeHours: product.dryingInfo.timeHours,
        drynessTest: product.dryingInfo.drynessTest,
        prepNotes: product.dryingInfo.prepNotes,
      });
    }

    let packageCountEstimate = '';
    if (dryWeight >= 1000) {
      packageCountEstimate = `${(dryWeight / 1000).toFixed(2)} кг`;
    } else {
      packageCountEstimate = `${dryWeight} г`;
    }

    shoppingItems.push({
      id: `shop-prod-${product.id}`,
      name: product.name,
      category: product.category,
      dryWeightTotalGrams: dryWeight,
      rawWeightTotalGrams: rawWeight,
      rawProductName: rawName,
      isDehydratedAtHome,
      packageCountEstimate,
      stageDistribution: data.byStage,
    });
  });

  // 2. Обробка сушених рецептів
  Object.entries(recipeTotals).forEach(([recipeId, data]) => {
    const recipe =
      customRecipes.find(r => r.id === recipeId) ||
      DEHYDRATED_RECIPES.find(r => r.id === recipeId);

    if (!recipe) return;

    const dryWeight = Math.round(data.dryGrams);
    const totalServings = Math.round(data.servings * 10) / 10;
    const baseServings = recipe.servingsYield || 4;
    const recipeBatchMultiplier = totalServings / baseServings;

    // Розрахунок загальної сирої ваги інгредієнтів:
    // множимо лише ті компоненти, які реально сушаться (м'ясо, риба, овочі, гриби, зелень, ягоди, фрукти).
    // Сухі магазинні основи (крупи, макарони, пластівці, сир, сухе молоко, горіхи, спеції) рахуються 1:1.
    let estimatedRawWeight = 0;
    recipe.rawIngredients.forEach(ing => {
      const dryIngGrams = ing.amount * recipeBatchMultiplier;
      const cat = ing.category.toLowerCase();

      if (ing.rawToDryRatio && ing.rawToDryRatio > 0) {
        estimatedRawWeight += dryIngGrams * ing.rawToDryRatio;
      } else if (cat.includes('м\'ясо') || cat.includes('риба')) {
        estimatedRawWeight += dryIngGrams * 3.5;
      } else if (cat.includes('овочі') || cat.includes('гриби') || cat.includes('зелень')) {
        estimatedRawWeight += dryIngGrams * 7.0;
      } else if (cat.includes('фрукти') || cat.includes('ягоди')) {
        estimatedRawWeight += dryIngGrams * 5.5;
      } else {
        estimatedRawWeight += dryIngGrams;
      }
    });

    const roundedRawWeight = Math.max(dryWeight + 50, Math.round(estimatedRawWeight) || Math.round(dryWeight * 2.5));

    dryingTasks.push({
      id: `drying-recipe-${recipe.id}`,
      title: `${recipe.title} (сушіння овочів/м'яса та фасування)`,
      sourceType: 'recipe',
      sourceId: recipe.id,
      servingsCountTotal: Math.round(totalServings),
      dryWeightTotalGrams: dryWeight,
      rawWeightTotalGrams: roundedRawWeight,
      tempCelsius: recipe.dehydrationParams.tempCelsius,
      timeHours: recipe.dehydrationParams.timeHours,
      drynessTest: recipe.dehydrationParams.drynessTest,
      prepNotes: `${recipe.homePrepSteps.join(' ')} Піддон: ${recipe.dehydrationParams.trayLining}.`,
    });

    // Додаємо сухий набір страви в список покупок із розгорнутим описом компонентів
    const rawIngredientsDesc = recipe.rawIngredients
      .map(i => `${i.name}: ${Math.round(i.amount * recipeBatchMultiplier)} ${i.unit}`)
      .join(', ');

    shoppingItems.push({
      id: `shop-recipe-${recipe.id}`,
      name: `${recipe.title} (набір на ${Math.round(totalServings)} порцій)`,
      category: 'soups_concentrates',
      dryWeightTotalGrams: dryWeight,
      rawWeightTotalGrams: roundedRawWeight,
      rawProductName: `Склад сухого набору: ${rawIngredientsDesc}`,
      isDehydratedAtHome: true,
      packageCountEstimate: `${Math.round(totalServings)} порцій (${dryWeight} г сухої ваги)`,
      stageDistribution: data.byStage,
    });
  });

  return { shoppingItems, dryingTasks };
}
