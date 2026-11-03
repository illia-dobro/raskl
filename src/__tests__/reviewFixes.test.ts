import { describe, it, expect } from 'vitest';
import { createDemoProject } from '../data/demoProject';
import { validateProjectRation } from '../domain/rationValidator';
import { calculateStageParticipantQuotas } from '../domain/loadDistributor';
import { Product, DehydratedRecipe } from '../types/domain';

describe('Code Review Fixes Verification', () => {
  it('Important #1: rationValidator uses customProducts and customRecipes for names in repetitions and lactose check', () => {
    const demo = createDemoProject();
    const customRecipe: DehydratedRecipe = {
      id: 'custom-my-stew',
      title: 'Фірмове рагу туриста',
      category: 'main',
      mealTypes: ['dinner'],
      servingsYield: 4,
      dryWeightPerServingGrams: 80,
      kcalPerServing: 350,
      proteinPerServing: 20,
      fatPerServing: 10,
      carbsPerServing: 40,
      fiberPerServing: 5,
      rawIngredients: [],
      homePrepSteps: [],
      dehydrationParams: { tempCelsius: 60, timeHours: '6 год', trayLining: '', drynessTest: '' },
      campRehydration: { waterRatioNote: '', soakMinutes: 0, boilMinutes: 3 },
      packagingTareRatio: 0.05,
      sourceBook: 'Власний рецепт',
      isCustom: true,
    };

    const customDairy: Product = {
      id: 'custom-dairy-milk-dessert',
      name: 'Фірмовий молочний десерт',
      category: 'dairy_eggs',
      kcalPer100g: 400,
      proteinPer100g: 20,
      fatPer100g: 10,
      carbsPer100g: 50,
      fiberPer100g: 0,
      digestibilityPercent: 90,
      waterContentClass: 'very_low_under_20',
      recommendedNormGrams: { min: 20, default: 30, max: 40 },
      packagingTareRatio: 0.05,
      packagingType: 'Пакет',
      isCustom: true,
    };

    // Додаємо повторення власної страви два дні поспіль
    demo.days[0].meals.dinner.items = [{ id: 'it-1', sourceType: 'recipe', sourceId: 'custom-my-stew', gramsPerPerson: 80 }];
    demo.days[1].meals.dinner.items = [{ id: 'it-2', sourceType: 'recipe', sourceId: 'custom-my-stew', gramsPerPerson: 80 }];

    // Додаємо кастомне молоко в день 1
    demo.days[0].meals.breakfast.items.push({ id: 'it-3', sourceType: 'product', sourceId: 'custom-dairy-milk-dessert', gramsPerPerson: 30 });

    const warnings = validateProjectRation(demo, [customDairy], [customRecipe]);

    // Має вивести реальну назву страви, а не технічний ID
    const repeatWarning = warnings.find(w => w.type === 'repeat' && w.message.includes('Фірмове рагу туриста'));
    expect(repeatWarning).toBeDefined();

    // Має вивести попередження про лактозу для Оксани
    const lactoseWarning = warnings.find(w => w.type === 'dietary' && w.message.includes('Оксана'));
    expect(lactoseWarning).toBeDefined();
  });

  it('Minor #1: carryingCapacityCoeff 0 is respected (child / injured carrying 0 food quota)', () => {
    const demo = createDemoProject();
    demo.participants[3].carryingCapacityCoeff = 0; // Оксана не несе вантажу через травму
    demo.participants[3].assignedSharedGearWeightGrams = 0;
    const quotas = calculateStageParticipantQuotas(demo, demo.stages[0].id);
    expect(quotas[3].targetFoodWeightGrams).toBe(0);
    expect(quotas[3].coeff).toBe(0);
  });
});
