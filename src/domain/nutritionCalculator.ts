import {
  MealItem,
  HikeDay,
  HikeSettings,
  HikeProject,
  Product,
  DehydratedRecipe,
  DailyNutritionSummary,
} from '../types/domain';
import { PRODUCTS_CATALOG } from '../data/productsCatalog';
import { DEHYDRATED_RECIPES } from '../data/dehydratedRecipes';
import { DAY_LOAD_PROFILES } from '../data/climateProfiles';

export interface MealItemMetrics {
  title: string;
  netGrams: number;
  grossGrams: number;
  kcal: number;
  effectiveKcal: number;
  protein: number;
  fat: number;
  carbs: number;
  fiber: number;
}

export function calculateMealItemMetrics(
  item: MealItem,
  customProducts: Product[] = [],
  customRecipes: DehydratedRecipe[] = []
): MealItemMetrics {
  if (item.sourceType === 'product') {
    const product =
      customProducts.find(p => p.id === item.sourceId) ||
      PRODUCTS_CATALOG.find(p => p.id === item.sourceId);

    if (!product) {
      return {
        title: 'Невідомий продукт',
        netGrams: item.gramsPerPerson,
        grossGrams: item.gramsPerPerson * 1.05,
        kcal: 0,
        effectiveKcal: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
        fiber: 0,
      };
    }

    const ratio = item.gramsPerPerson / 100;
    const tareRatio = product.packagingTareRatio ?? 0.05;
    const grossGrams = Math.round(item.gramsPerPerson * (1 + tareRatio));
    const kcal = Math.round(product.kcalPer100g * ratio);
    const effectiveKcal = Math.round(kcal * ((product.digestibilityPercent ?? 85) / 100));

    return {
      title: product.name,
      netGrams: item.gramsPerPerson,
      grossGrams,
      kcal,
      effectiveKcal,
      protein: Math.round(product.proteinPer100g * ratio * 10) / 10,
      fat: Math.round(product.fatPer100g * ratio * 10) / 10,
      carbs: Math.round(product.carbsPer100g * ratio * 10) / 10,
      fiber: Math.round(product.fiberPer100g * ratio * 10) / 10,
    };
  }

  // sourceType === 'recipe'
  const recipe =
    customRecipes.find(r => r.id === item.sourceId) ||
    DEHYDRATED_RECIPES.find(r => r.id === item.sourceId);

  if (!recipe) {
    return {
      title: 'Невідомий рецепт',
      netGrams: item.gramsPerPerson,
      grossGrams: item.gramsPerPerson * 1.05,
      kcal: 0,
      effectiveKcal: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
      fiber: 0,
    };
  }

  // Масштабування порції рецепта за Review Focus #1
  const scale = recipe.dryWeightPerServingGrams > 0
    ? item.gramsPerPerson / recipe.dryWeightPerServingGrams
    : 1;

  const tareRatio = recipe.packagingTareRatio ?? 0.05;
  const grossGrams = Math.round(item.gramsPerPerson * (1 + tareRatio));
  const kcal = Math.round(recipe.kcalPerServing * scale);
  const effectiveKcal = Math.round(kcal * 0.9); // домашні сушені страви мають високу засвоюваність ~90%

  return {
    title: recipe.title,
    netGrams: item.gramsPerPerson,
    grossGrams,
    kcal,
    effectiveKcal,
    protein: Math.round(recipe.proteinPerServing * scale * 10) / 10,
    fat: Math.round(recipe.fatPerServing * scale * 10) / 10,
    carbs: Math.round(recipe.carbsPerServing * scale * 10) / 10,
    fiber: Math.round(recipe.fiberPerServing * scale * 10) / 10,
  };
}

export function calculateDaySummary(
  day: HikeDay,
  settings: HikeSettings,
  participantCount: number,
  customProducts: Product[] = [],
  customRecipes: DehydratedRecipe[] = []
): DailyNutritionSummary {
  let totalNet = 0;
  let totalGross = 0;
  let totalKcal = 0;
  let totalEffectiveKcal = 0;
  let totalProtein = 0;
  let totalFat = 0;
  let totalCarbs = 0;
  let totalFiber = 0;

  const meals = Object.values(day.meals);
  for (const meal of meals) {
    for (const item of meal.items) {
      const m = calculateMealItemMetrics(item, customProducts, customRecipes);
      totalNet += m.netGrams;
      totalGross += m.grossGrams;
      totalKcal += m.kcal;
      totalEffectiveKcal += m.effectiveKcal;
      totalProtein += m.protein;
      totalFat += m.fat;
      totalCarbs += m.carbs;
      totalFiber += m.fiber;
    }
  }

  const safeCount = Math.max(0, participantCount);
  const totalGroupGrossWeightKg = Math.round((totalGross * safeCount) / 100) / 10;

  // Розрахунок рекомендованої калорійності за плаваючим профілем
  const profile = DAY_LOAD_PROFILES[day.dayLoadProfile] || DAY_LOAD_PROFILES.standard;
  const recommendedKcal = Math.round(settings.targetDailyKcal * profile.kcalMultiplier);

  // Співвідношення Б:Ж:В
  let b = 1;
  let j = 1;
  let u = 4;
  if (totalProtein > 0) {
    b = 1;
    j = Math.round((totalFat / totalProtein) * 10) / 10;
    u = Math.round((totalCarbs / totalProtein) * 10) / 10;
  }

  return {
    dayNumber: day.dayNumber,
    stageId: day.stageId,
    dayLoadProfile: day.dayLoadProfile,
    recommendedKcal,
    totalNetWeightGrams: Math.round(totalNet),
    totalGrossWeightGrams: Math.round(totalGross),
    totalGroupGrossWeightKg,
    kcal: Math.round(totalKcal),
    effectiveKcal: Math.round(totalEffectiveKcal),
    proteinGrams: Math.round(totalProtein * 10) / 10,
    fatGrams: Math.round(totalFat * 10) / 10,
    carbsGrams: Math.round(totalCarbs * 10) / 10,
    fiberGrams: Math.round(totalFiber * 10) / 10,
    bjuRatio: [b, j, u],
  };
}

export function calculateProjectSummary(
  project: HikeProject,
  customProducts: Product[] = [],
  customRecipes: DehydratedRecipe[] = []
) {
  const pCount = project.participants.length;
  const daySummaries = project.days.map(d =>
    calculateDaySummary(d, project.settings, pCount, customProducts, customRecipes)
  );

  const totalDays = daySummaries.length;
  if (totalDays === 0) {
    return {
      daySummaries: [],
      avgDailyNetGrams: 0,
      avgDailyGrossGrams: 0,
      avgDailyKcal: 0,
      avgDailyProtein: 0,
      avgDailyFat: 0,
      avgDailyCarbs: 0,
      avgDailyFiber: 0,
      totalGroupFoodWeightKg: 0,
      overallBjuRatio: [1, 1, 4] as [number, number, number],
    };
  }

  const sumNet = daySummaries.reduce((acc, d) => acc + d.totalNetWeightGrams, 0);
  const sumGross = daySummaries.reduce((acc, d) => acc + d.totalGrossWeightGrams, 0);
  const sumKcal = daySummaries.reduce((acc, d) => acc + d.kcal, 0);
  const sumProtein = daySummaries.reduce((acc, d) => acc + d.proteinGrams, 0);
  const sumFat = daySummaries.reduce((acc, d) => acc + d.fatGrams, 0);
  const sumCarbs = daySummaries.reduce((acc, d) => acc + d.carbsGrams, 0);
  const sumFiber = daySummaries.reduce((acc, d) => acc + d.fiberGrams, 0);
  const totalGroupFoodWeightKg = daySummaries.reduce((acc, d) => acc + d.totalGroupGrossWeightKg, 0);

  const avgProtein = sumProtein / totalDays;
  const avgFat = sumFat / totalDays;
  const avgCarbs = sumCarbs / totalDays;

  let overallBju: [number, number, number] = [1, 1, 4];
  if (avgProtein > 0) {
    overallBju = [
      1,
      Math.round((avgFat / avgProtein) * 10) / 10,
      Math.round((avgCarbs / avgProtein) * 10) / 10,
    ];
  }

  return {
    daySummaries,
    avgDailyNetGrams: Math.round(sumNet / totalDays),
    avgDailyGrossGrams: Math.round(sumGross / totalDays),
    avgDailyKcal: Math.round(sumKcal / totalDays),
    avgDailyProtein: Math.round((sumProtein / totalDays) * 10) / 10,
    avgDailyFat: Math.round((sumFat / totalDays) * 10) / 10,
    avgDailyCarbs: Math.round((sumCarbs / totalDays) * 10) / 10,
    avgDailyFiber: Math.round((sumFiber / totalDays) * 10) / 10,
    totalGroupFoodWeightKg: Math.round(totalGroupFoodWeightKg * 10) / 10,
    overallBjuRatio: overallBju,
  };
}
