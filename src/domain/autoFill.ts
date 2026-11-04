import {
  DehydratedRecipe,
  HikeDay,
  HikeProject,
  MealItem,
  MealType,
  Product,
} from '../types/domain';
import { PRODUCTS_CATALOG } from '../data/productsCatalog';
import { DEHYDRATED_RECIPES } from '../data/dehydratedRecipes';
import { DAY_LOAD_PROFILES } from '../data/climateProfiles';
import { calculateMealItemMetrics } from './nutritionCalculator';

export type CookingStyle = 'mix' | 'dried' | 'simple';

export interface AutoFillFilters {
  /** Страви з рецептами сушіння (потрібен дегідратор) / тільки магазинні продукти / змішано */
  cooking: CookingStyle;
  noMeat: boolean;
  noDairy: boolean;
  noNuts: boolean;
  noSugar: boolean;
}

export const DEFAULT_AUTOFILL_FILTERS: AutoFillFilters = {
  cooking: 'simple',
  noMeat: false,
  noDairy: false,
  noNuts: false,
  noSugar: false,
};

interface Tags {
  meat: boolean;
  dairy: boolean;
  nuts: boolean;
}

const MEAT_WORDS = /м'яс|шинк|ковбас|курк|курят|яловичин|свинин|сало|тунц|салямі|бекон|корейк|риб/i;

function productTags(p: Product): Tags {
  return {
    meat: p.category === 'meat_fish' || p.id === 'fat-salo' || MEAT_WORDS.test(p.name),
    dairy:
      p.category === 'dairy_eggs' ||
      p.id === 'fat-ghee-butter' ||
      p.id === 'sweet-chocolate-milk' ||
      /молоч|сир |вершк/i.test(p.name),
    nuts: p.id.startsWith('nut-') || p.id === 'sweet-energy-bar' || /горіх|арахіс|мигдал/i.test(p.name),
  };
}

function recipeTags(r: DehydratedRecipe): Tags {
  const ings = r.rawIngredients;
  return {
    meat: ings.some(i => i.category.startsWith("м'я") || i.category === 'риба' || MEAT_WORDS.test(i.name)),
    dairy: ings.some(i => i.category === 'молочні' || i.category === 'яйця'),
    nuts: ings.some(i => i.category === 'горіхи' || /горіх|арахіс|мигдал/i.test(i.name)),
  };
}

function allowed(tags: Tags, f: AutoFillFilters): boolean {
  if (f.noMeat && tags.meat) return false;
  if (f.noDairy && tags.dairy) return false;
  if (f.noNuts && tags.nuts) return false;
  return true;
}

// --- Детермінований ГПСЧ, щоб «Заповнити ще раз» давало інший варіант ---
function makeRng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s >>>= 0;
    s ^= s >>> 17;
    s ^= s << 5;
    s >>>= 0;
    return s / 4294967296;
  };
}

/** Циклічний вибір зі змішаного пулу без повторів, поки не вичерпаються варіанти. */
function makePicker<T>(pool: T[], rng: () => number) {
  let queue: T[] = [];
  return (): T | undefined => {
    if (pool.length === 0) return undefined;
    if (queue.length === 0) {
      queue = [...pool];
      for (let i = queue.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [queue[i], queue[j]] = [queue[j], queue[i]];
      }
    }
    return queue.pop();
  };
}

interface Draft {
  sourceType: 'product' | 'recipe';
  sourceId: string;
  grams: number;
  scalable: boolean;
}

const MEAL_SHARE: Record<MealType, number> = {
  breakfast: 0.28,
  snack: 0.17,
  lunch: 0.27,
  dinner: 0.28,
};

const round5 = (n: number) => Math.max(5, Math.round(n / 5) * 5);

export function autoFillProject(
  project: HikeProject,
  filters: AutoFillFilters,
  customProducts: Product[] = [],
  customRecipes: DehydratedRecipe[] = [],
  seed: number = Date.now()
): HikeProject {
  const rng = makeRng(seed);
  const products = [...PRODUCTS_CATALOG, ...customProducts];
  const recipes = [...DEHYDRATED_RECIPES, ...customRecipes];

  const okProducts = products.filter(p => allowed(productTags(p), filters));
  const okRecipes = recipes.filter(r => allowed(recipeTags(r), filters));

  const byId = (ids: string[]): Product[] =>
    ids.map(id => okProducts.find(p => p.id === id)).filter((p): p is Product => !!p);

  const recipePool = (meal: MealType, cats?: string[]) =>
    okRecipes.filter(
      r => r.mealTypes.includes(meal) && (!cats || cats.includes(r.category))
    );

  // --- Пули продуктів ---
  const breakfastGrains = byId(['grain-oat-flakes', 'grain-semolina', 'grain-millet', 'grain-corn-polenta', 'grain-couscous']);
  const breakfastTop = byId(['fruit-dried-raisins', 'fruit-dried-apricot', 'fruit-dried-dates', 'sweet-honey']);
  const dinnerGrains = byId(['grain-pasta-horns', 'grain-buckwheat', 'grain-rice', 'grain-bulgur', 'grain-couscous', 'grain-potato-flakes']);
  const dinnerProtein = byId(
    filters.noMeat
      ? ['grain-lentils', 'dairy-cheese-hard', 'dairy-quark-sublimated']
      : ['meat-chicken-dried', 'meat-beef-canned', 'meat-sausage-salami', 'grain-lentils']
  );
  const veg = byId(['veg-carrots-dried', 'veg-onions-dried', 'veg-tomatoes-dried', 'veg-bell-pepper-dried', 'veg-mushrooms-dried']);
  const bread = byId(['bread-crackers-rye', 'bread-galette-army', 'bread-crackers-wheat', 'bread-sushki']);
  const lunchTopping = byId(
    filters.noMeat
      ? ['dairy-cheese-hard', 'nut-peanut', 'sweet-halva', 'fruit-dried-apricot']
      : ['dairy-cheese-hard', 'meat-sausage-salami', 'fat-salo', 'meat-koreika']
  );
  const sweetsLunch = byId(['sweet-halva', 'sweet-sherbet', 'fruit-pastila-apple', 'sweet-caramel']);
  const snackPool = byId([
    'fruit-dried-apricot', 'fruit-dried-dates', 'fruit-dried-raisins', 'fruit-pastila-apple',
    'nut-walnut', 'nut-almond', 'nut-peanut', 'sweet-chocolate-dark', 'sweet-energy-bar',
    'sweet-sherbet', 'sweet-halva', 'sweet-caramel', 'bread-waffles',
  ]);
  const drinks = byId(['drink-tea-black', 'drink-coffee-instant', 'drink-cocoa-powder']);
  const fatForDinner = byId(filters.noDairy ? ['fat-oil-sunflower'] : ['fat-ghee-butter', 'fat-oil-sunflower']);
  const milkPowder = byId(['dairy-milk-powder']);

  const pick = {
    bGrain: makePicker(breakfastGrains, rng),
    bTop: makePicker(breakfastTop, rng),
    dGrain: makePicker(dinnerGrains, rng),
    dProt: makePicker(dinnerProtein, rng),
    veg: makePicker(veg, rng),
    bread: makePicker(bread, rng),
    lTop: makePicker(lunchTopping, rng),
    lSweet: makePicker(sweetsLunch, rng),
    snack: makePicker(snackPool, rng),
    drink: makePicker(drinks, rng),
    fat: makePicker(fatForDinner, rng),
    recB: makePicker(recipePool('breakfast'), rng),
    recL: makePicker(recipePool('lunch'), rng),
    recD: makePicker(recipePool('dinner'), rng),
    recS: makePicker(recipePool('snack'), rng),
  };

  const prod = (p: Product | undefined, g?: number, scalable = true): Draft[] =>
    p
      ? [{ sourceType: 'product', sourceId: p.id, grams: g ?? p.recommendedNormGrams.default, scalable }]
      : [];
  const rec = (r: DehydratedRecipe | undefined): Draft[] =>
    r
      ? [{ sourceType: 'recipe', sourceId: r.id, grams: r.dryWeightPerServingGrams, scalable: true }]
      : [];

  const useRecipes = (dayIdx: number): boolean =>
    filters.cooking === 'dried' || (filters.cooking === 'mix' && dayIdx % 2 === 0);

  const buildMeal = (meal: MealType, dayIdx: number): Draft[] => {
    const recipesOn = useRecipes(dayIdx);
    const drink = prod(pick.drink(), undefined, false);

    switch (meal) {
      case 'breakfast': {
        const r = recipesOn ? pick.recB() : undefined;
        if (r) return [...rec(r), ...drink];
        return [
          ...prod(pick.bGrain(), 70),
          ...prod(pick.bTop(), 25),
          ...(filters.noDairy ? [] : prod(milkPowder[0], 20)),
          ...drink,
        ];
      }
      case 'snack': {
        const r = recipesOn && rng() < 0.5 ? pick.recS() : undefined;
        return [...rec(r), ...prod(pick.snack()), ...prod(pick.snack())];
      }
      case 'lunch': {
        const r = recipesOn ? pick.recL() : undefined;
        if (r) return [...rec(r), ...prod(pick.bread(), 40), ...drink];
        return [...prod(pick.bread(), 45), ...prod(pick.lTop(), 40), ...prod(pick.lSweet(), 40), ...drink];
      }
      case 'dinner': {
        const r = recipesOn ? pick.recD() : undefined;
        if (r) return [...rec(r), ...prod(pick.bread(), 30), ...drink];
        return [
          ...prod(pick.dGrain(), 70),
          ...prod(pick.dProt(), 30),
          ...prod(pick.veg(), 10),
          ...prod(pick.veg(), 8),
          ...prod(pick.fat(), 12),
          ...drink,
        ];
      }
    }
  };

  let counter = 0;
  const mkItem = (d: Draft, grams: number): MealItem => ({
    id: `item-${seed}-${counter++}`,
    sourceType: d.sourceType,
    sourceId: d.sourceId,
    gramsPerPerson: grams,
  });

  const kcalOf = (d: Draft, grams: number) =>
    calculateMealItemMetrics(
      { id: 'tmp', sourceType: d.sourceType, sourceId: d.sourceId, gramsPerPerson: grams },
      customProducts,
      customRecipes
    ).kcal;

  const fillDay = (day: HikeDay, dayIdx: number): HikeDay => {
    const profile = DAY_LOAD_PROFILES[day.dayLoadProfile] ?? DAY_LOAD_PROFILES.standard;
    const dayTarget = project.settings.targetDailyKcal * profile.kcalMultiplier;

    const meals = {} as HikeDay['meals'];
    (['breakfast', 'snack', 'lunch', 'dinner'] as MealType[]).forEach(mt => {
      const drafts = buildMeal(mt, dayIdx);
      const target = dayTarget * MEAL_SHARE[mt];
      const fixed = drafts.filter(d => !d.scalable).reduce((a, d) => a + kcalOf(d, d.grams), 0);
      const scalableKcal = drafts.filter(d => d.scalable).reduce((a, d) => a + kcalOf(d, d.grams), 0);
      const factor =
        scalableKcal > 0 ? Math.min(1.5, Math.max(0.75, (target - fixed) / scalableKcal)) : 1;

      meals[mt] = {
        title: day.meals[mt].title,
        items: drafts.map(d => mkItem(d, d.scalable ? round5(d.grams * factor) : d.grams)),
      };
    });

    // Базові речі (окремим рядком у розкладці): сіль та цукор
    const pantry: Draft[] = [{ sourceType: 'product', sourceId: 'spice-salt', grams: 5, scalable: false }];
    if (!filters.noSugar) pantry.push({ sourceType: 'product', sourceId: 'sweet-sugar', grams: 15, scalable: false });
    meals.dinner.items.push(...pantry.map(d => mkItem(d, d.grams)));

    return { ...day, meals };
  };

  return {
    ...project,
    days: project.days.map((d, i) => fillDay(d, i)),
    updatedAt: new Date().toISOString(),
  };
}
