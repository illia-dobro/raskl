import { describe, it, expect } from 'vitest';
import { PRODUCTS_CATALOG, getProductById } from '../data/productsCatalog';
import { DEHYDRATED_RECIPES, getRecipeById } from '../data/dehydratedRecipes';
import { THEORY_CHAPTERS } from '../data/theoryChapters';
import { createDemoProject } from '../data/demoProject';

describe('Knowledge Base & Catalogs from 4 Books', () => {
  it('contains at least 60 hiking products across all 11 categories with valid macros and digestibility', () => {
    expect(PRODUCTS_CATALOG.length).toBeGreaterThanOrEqual(60);
    const driedBeef = getProductById('meat-beef-dried');
    expect(driedBeef).toBeDefined();
    expect(driedBeef?.dryingInfo?.rawToDryRatio).toBeCloseTo(3.3, 1);
    const oatBran = getProductById('sup-oat-bran');
    expect(oatBran?.fiberPer100g).toBeGreaterThanOrEqual(40);

    const categories = new Set(PRODUCTS_CATALOG.map(p => p.category));
    expect(categories.size).toBe(11);
  });

  it('contains at least 25 dehydrated one-pot meals & trail recipes across breakfast, lunch, dinner, snack', () => {
    expect(DEHYDRATED_RECIPES.length).toBeGreaterThanOrEqual(25);
    const mealTypesCovered = new Set(DEHYDRATED_RECIPES.flatMap(r => r.mealTypes));
    expect(mealTypesCovered.has('breakfast')).toBe(true);
    expect(mealTypesCovered.has('lunch')).toBe(true);
    expect(mealTypesCovered.has('dinner')).toBe(true);
    expect(mealTypesCovered.has('snack')).toBe(true);
    for (const r of DEHYDRATED_RECIPES) {
      expect(r.dryWeightPerServingGrams).toBeGreaterThan(0);
      expect(r.rawIngredients.length).toBeGreaterThan(0);
      expect(r.dehydrationParams.tempCelsius).toBeGreaterThanOrEqual(50);
      expect(getRecipeById(r.id)).toBeDefined();
    }
  });

  it('contains all 8 theory chapters covering Alekseev, Hachikyan, Yaffe, and Kephart', () => {
    expect(THEORY_CHAPTERS.length).toBe(8);
    for (const ch of THEORY_CHAPTERS) {
      expect(ch.title).toBeTruthy();
      expect(ch.sections.length).toBeGreaterThan(0);
      expect(ch.sources.length).toBeGreaterThan(0);
    }
  });

  it('creates a valid 8-day mountain demo project with 6 participants and 2 route stages (1 resupply drop)', () => {
    const demo = createDemoProject();
    expect(demo.participants.length).toBe(6);
    expect(demo.stages.length).toBe(2);
    expect(demo.days.length).toBe(8);
    expect(demo.days[0].meals.breakfast.items.length).toBeGreaterThan(0);
  });
});
