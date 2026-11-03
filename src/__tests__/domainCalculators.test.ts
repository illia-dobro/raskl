import { describe, it, expect } from 'vitest';
import { createDemoProject } from '../data/demoProject';
import { calculateMealItemMetrics, calculateDaySummary, calculateProjectSummary } from '../domain/nutritionCalculator';
import { validateProjectRation } from '../domain/rationValidator';
import { calculateShoppingAndDryingPlan } from '../domain/shoppingAndDryingCalculator';
import { calculateWaterAndFuelNeeds } from '../domain/waterAndFuelCalculator';
import { calculateStageParticipantQuotas, autoAssignStagePackages } from '../domain/loadDistributor';
import { parseAndValidateProjectJson, serializeProjectToJson } from '../domain/projectSerializer';

describe('Domain Calculators & Review Focus Edge Cases', () => {
  it('Review Focus #1: scales dehydrated recipe macros and raw ingredients when gramsPerPerson != dryWeightPerServingGrams', () => {
    const recipeItem = { id: 'item-1', sourceType: 'recipe' as const, sourceId: 'recipe-canyon-chili', gramsPerPerson: 180 };
    const baseItem = { id: 'item-2', sourceType: 'recipe' as const, sourceId: 'recipe-canyon-chili', gramsPerPerson: 90 };
    const m180 = calculateMealItemMetrics(recipeItem);
    const m90 = calculateMealItemMetrics(baseItem);
    expect(m180.kcal).toBeCloseTo(m90.kcal * 2, 1);
    expect(m180.protein).toBeCloseTo(m90.protein * 2, 1);
    expect(m180.fat).toBeCloseTo(m90.fat * 2, 1);
    expect(m180.carbs).toBeCloseTo(m90.carbs * 2, 1);
    expect(m180.fiber).toBeCloseTo(m90.fiber * 2, 1);
  });

  it('Review Focus #2: handles empty participants list or zero total capacity coeff without NaN/Infinity', () => {
    const demo = createDemoProject();
    demo.participants = [];
    const quotas = calculateStageParticipantQuotas(demo, demo.stages[0].id);
    expect(quotas).toEqual([]);
    const daySum = calculateDaySummary(demo.days[0], demo.settings, 0);
    expect(Number.isFinite(daySum.totalGroupGrossWeightKg)).toBe(true);
    expect(daySum.totalGroupGrossWeightKg).toBe(0);

    const projSum = calculateProjectSummary(demo);
    expect(Number.isFinite(projSum.avgDailyNetGrams)).toBe(true);
    expect(Number.isFinite(projSum.avgDailyKcal)).toBe(true);
  });

  it('Review Focus #3: clamps participant food quota to 0 when assignedSharedGearWeightGrams > total quota and redistributes food', () => {
    const demo = createDemoProject();
    // Навантажуємо першого учасника спорядженням (15 кг), більше його загальної квоти T_i
    demo.participants[0].assignedSharedGearWeightGrams = 15000;
    const quotas = calculateStageParticipantQuotas(demo, demo.stages[0].id);
    expect(quotas[0].targetFoodWeightGrams).toBe(0);
    const totalFoodTarget = quotas.reduce((acc, q) => acc + q.targetFoodWeightGrams, 0);
    const totalStageFood = quotas[0].stageTotalFoodGrossGrams;
    expect(totalFoodTarget).toBeCloseTo(totalStageFood, 0);
  });

  it('Review Focus #4: converts dry weights to raw weights for both standalone dried products and recipes', () => {
    const demo = createDemoProject();
    const { shoppingItems, dryingTasks } = calculateShoppingAndDryingPlan(demo);
    expect(shoppingItems.length).toBeGreaterThan(0);
    expect(dryingTasks.length).toBeGreaterThan(0);
    const driedMeatTask = dryingTasks.find(t => t.sourceId === 'meat-beef-dried' || t.sourceType === 'recipe');
    expect(driedMeatTask).toBeDefined();
    expect(driedMeatTask!.rawWeightTotalGrams).toBeGreaterThan(driedMeatTask!.dryWeightTotalGrams);
  });

  it('Review Focus #5: validates imported JSON and returns Ukrainian error message on malformed input', () => {
    const badRes = parseAndValidateProjectJson('{"invalid": true}');
    expect(badRes.ok).toBe(false);
    if (!badRes.ok) {
      expect(badRes.error).toMatch(/Некоректний формат проєкту/i);
    }
    const demo = createDemoProject();
    const goodRes = parseAndValidateProjectJson(serializeProjectToJson(demo));
    expect(goodRes.ok).toBe(true);
  });

  it('calculates fuel canisters, boiling point, and auto-assigns stage packages across participants', () => {
    const demo = createDemoProject();
    const fuel = calculateWaterAndFuelNeeds(demo);
    expect(fuel.canisters450gCount).toBeGreaterThan(0);
    expect(fuel.boilingPointAtMaxAltCelsius).toBeLessThan(100);
    expect(fuel.dailyDrinkingWaterLitersPerPerson).toBeGreaterThanOrEqual(1.5);

    const assigned = autoAssignStagePackages(demo, demo.stages[0].id);
    const stage1Days = assigned.days.filter(d => d.stageId === demo.stages[0].id);
    const allItems = stage1Days.flatMap(d => Object.values(d.meals).flatMap(m => m.items));
    expect(allItems.every(i => Boolean(i.assignedParticipantId))).toBe(true);

    const warnings = validateProjectRation(demo);
    expect(Array.isArray(warnings)).toBe(true);
  });
});
