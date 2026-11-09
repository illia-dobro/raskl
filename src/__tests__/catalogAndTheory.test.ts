import { describe, it, expect } from 'vitest';
import { PRODUCTS_CATALOG, getProductById } from '../data/productsCatalog';
import { DEHYDRATED_RECIPES, getRecipeById } from '../data/dehydratedRecipes';
import { THEORY_CHAPTERS } from '../data/theoryChapters';
import { createDemoProject } from '../data/demoProject';
import { autoFillProject } from '../domain/autoFill';

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

  it('includes TKG KPI Globus recipes (tkg.org.ua/node/22586) and dehydration ratios', () => {
    const globusRecipes = DEHYDRATED_RECIPES.filter(r => r.sourceBook.includes('Глобус'));
    expect(globusRecipes.length).toBeGreaterThanOrEqual(40);
    expect(getRecipeById('recipe-globus-rassolnik')).toBeDefined();
    expect(getRecipeById('recipe-globus-kharcho')).toBeDefined();
    expect(getRecipeById('recipe-globus-solyanka')).toBeDefined();
    expect(getRecipeById('recipe-globus-kulesh')).toBeDefined();
    expect(getRecipeById('recipe-globus-banosh-brynza')).toBeDefined();
    expect(getRecipeById('recipe-globus-lagman')).toBeDefined();
    expect(getRecipeById('recipe-globus-goulash-csipetke')).toBeDefined();

    // Перевірка холодних обідів без варіння
    const coldSalamiLunch = getRecipeById('recipe-globus-lunch-salami-choc');
    expect(coldSalamiLunch).toBeDefined();
    expect(coldSalamiLunch?.campRehydration.boilMinutes).toBe(0);
    expect(coldSalamiLunch?.mealTypes).toContain('lunch');

    const coldCheeseLunch = getRecipeById('recipe-globus-lunch-cheese-nuts-choc');
    expect(coldCheeseLunch?.campRehydration.boilMinutes).toBe(0);

    const coldSaloLunch = getRecipeById('recipe-globus-lunch-salo-crackers-choc');
    expect(coldSaloLunch?.campRehydration.boilMinutes).toBe(0);

    const coldFishLunch = getRecipeById('recipe-globus-lunch-fish-canned-crackers');
    expect(coldFishLunch?.campRehydration.boilMinutes).toBe(0);

    // Перевірка сніданків та вечерь за розкладкою 2014 року
    expect(getRecipeById('recipe-globus-pasta-cheese-tushonka')).toBeDefined();
    expect(getRecipeById('recipe-globus-arnautka-tushonka')).toBeDefined();
    expect(getRecipeById('recipe-globus-soup-cheese-curd-tushonka')).toBeDefined();
    expect(getRecipeById('recipe-globus-canned-fish-ukha-tushonka')).toBeDefined();
    expect(getRecipeById('recipe-globus-borscht-tushonka-salo')).toBeDefined();
    expect(getRecipeById('recipe-globus-muesli-milk-crackers')).toBeDefined();

    const driedPumpkin = getProductById('veg-pumpkin-dried');
    expect(driedPumpkin?.dryingInfo?.rawToDryRatio).toBe(13.0);
    const driedZucchini = getProductById('veg-zucchini-dried');
    expect(driedZucchini?.dryingInfo?.rawToDryRatio).toBe(25.0);

    // Нові продукти
    expect(getProductById('grain-muesli')).toBeDefined();
    expect(getProductById('grain-arnautka')).toBeDefined();
    expect(getProductById('dairy-cheese-processed')).toBeDefined();
    expect(getProductById('meat-fish-canned-sardine')).toBeDefined();
    expect(getProductById('sweet-grillage')).toBeDefined();
    expect(getProductById('sweet-kozinak')).toBeDefined();
    expect(getProductById('sweet-toffee-iris')).toBeDefined();
    expect(getProductById('bread-crackers-sweet')).toBeDefined();
    expect(getProductById('bread-gingerbread')).toBeDefined();
    expect(getProductById('drink-kisel')).toBeDefined();
    expect(getProductById('spice-ketchup')).toBeDefined();
  });

  it('autoFillProject assigns cold no-cook meals (boilMinutes === 0) for lunch', () => {
    const demo = createDemoProject();
    const filled = autoFillProject(demo, {
      cooking: 'mix',
      noMeat: false,
      noDairy: false,
      noNuts: false,
      noSugar: false,
    });
    for (const day of filled.days) {
      const lunchItems = day.meals.lunch.items.filter(it => it.sourceType === 'recipe');
      expect(lunchItems.length).toBeGreaterThan(0);
      for (const it of lunchItems) {
        const recipe = getRecipeById(it.sourceId);
        expect(recipe?.campRehydration.boilMinutes).toBe(0);
      }
    }
  });
});
