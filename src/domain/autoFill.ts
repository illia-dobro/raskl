import {
  DehydratedRecipe,
  HikeDay,
  HikeProject,
  MealItem,
  MealType,
  Product,
} from '../types/domain';
import { DEHYDRATED_RECIPES } from '../data/dehydratedRecipes';
import { DAY_LOAD_PROFILES } from '../data/climateProfiles';
import { calculateMealItemMetrics } from './nutritionCalculator';
import { isPantryItem } from './pantry';

export type CookingStyle = 'mix' | 'dried' | 'simple';

export interface AutoFillFilters {
  /** Страви із сушеними овочами/м'ясом / магазинні страви без сушарки / змішано */
  cooking: CookingStyle;
  noMeat: boolean;
  noDairy: boolean;
  noNuts: boolean;
  noSugar: boolean;
}

export const DEFAULT_AUTOFILL_FILTERS: AutoFillFilters = {
  cooking: 'mix',
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

const MEAT_WORDS = /м'яс|шинк|ковбас|курк|курят|яловичин|свинин|сало|тунц|салямі|бекон|корейк|риб|тушонк/i;

function recipeTags(r: DehydratedRecipe): Tags {
  const ings = r.rawIngredients;
  return {
    meat: ings.some(i => i.category.startsWith("м'я") || i.category === 'риба' || MEAT_WORDS.test(i.name)),
    dairy: ings.some(i => i.category === 'молочні' || i.category === 'яйця' || /молоч|сир |вершк/i.test(i.name)),
    nuts: ings.some(i => i.category === 'горіхи' || /горіх|арахіс|мигдал|фундук|кеш'ю/i.test(i.name)),
  };
}

function allowed(tags: Tags, f: AutoFillFilters): boolean {
  if (f.noMeat && tags.meat) return false;
  if (f.noDairy && tags.dairy) return false;
  if (f.noNuts && tags.nuts) return false;
  return true;
}

function isSimpleStoreRecipe(r: DehydratedRecipe): boolean {
  return (
    r.id.startsWith('recipe-simple-') ||
    r.dehydrationParams.timeHours.toLowerCase().includes('не потребує')
  );
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
  breakfast: 0.27,
  snack: 0.18,
  lunch: 0.27,
  dinner: 0.28,
};

const round5 = (n: number) => Math.max(20, Math.round(n / 5) * 5);

export function autoFillProject(
  project: HikeProject,
  filters: AutoFillFilters,
  customProducts: Product[] = [],
  customRecipes: DehydratedRecipe[] = [],
  seed: number = Date.now()
): HikeProject {
  const rng = makeRng(seed);
  const allRecipes = [...DEHYDRATED_RECIPES, ...customRecipes];

  // Спочатку фільтруємо за дієтичними обмеженнями
  const dietOkRecipes = allRecipes.filter(r => allowed(recipeTags(r), filters));

  // Підбір страв за стилем приготування (але ЗАВЖДИ саме повноцінні СТРАВИ >= 100 ккал, а не компоти чи окремі продукти!)
  const recipePoolForMeal = (meal: MealType): DehydratedRecipe[] => {
    const forMeal = dietOkRecipes.filter(r => r.mealTypes.includes(meal) && r.kcalPerServing >= 100);
    if (filters.cooking === 'simple') {
      const simpleOnly = forMeal.filter(r => isSimpleStoreRecipe(r));
      if (simpleOnly.length > 0) return simpleOnly;
    } else if (filters.cooking === 'dried') {
      const driedOnly = forMeal.filter(r => !isSimpleStoreRecipe(r));
      if (driedOnly.length > 0) return driedOnly;
    }
    if (forMeal.length > 0) return forMeal;
    // Якщо дуже суворі фільтри відсіяли все — повертаємо базові страви цього прийому їжі
    return allRecipes.filter(r => r.mealTypes.includes(meal));
  };

  const pick = {
    breakfast: makePicker(recipePoolForMeal('breakfast'), rng),
    snack: makePicker(recipePoolForMeal('snack'), rng),
    lunch: makePicker(recipePoolForMeal('lunch'), rng),
    dinner: makePicker(recipePoolForMeal('dinner'), rng),
  };

  const buildMeal = (meal: MealType): Draft[] => {
    const r = pick[meal]();
    if (!r) return [];
    return [{ sourceType: 'recipe', sourceId: r.id, grams: r.dryWeightPerServingGrams, scalable: true }];
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

  const fillDay = (day: HikeDay): HikeDay => {
    const profile = DAY_LOAD_PROFILES[day.dayLoadProfile] ?? DAY_LOAD_PROFILES.standard;
    const dayTarget = project.settings.targetDailyKcal * profile.kcalMultiplier;

    const meals = {} as HikeDay['meals'];
    (['breakfast', 'snack', 'lunch', 'dinner'] as MealType[]).forEach(mt => {
      const drafts = buildMeal(mt);
      const target = dayTarget * MEAL_SHARE[mt];
      const scalableKcal = drafts.reduce((a, d) => a + kcalOf(d, d.grams), 0);
      const factor =
        scalableKcal > 0 ? Math.min(1.85, Math.max(0.75, target / scalableKcal)) : 1;

      meals[mt] = {
        title: day.meals[mt].title,
        items: drafts.map(d => mkItem(d, round5(d.grams * factor))),
      };
    });

    // Базові речі на день (показуються внизу окремим рядком, НЕ всередині страв): чай, кава, сіль, цукор
    const pantry: Draft[] = [
      { sourceType: 'product', sourceId: 'drink-tea-black', grams: 5, scalable: false },
      { sourceType: 'product', sourceId: 'drink-coffee-instant', grams: 4, scalable: false },
      { sourceType: 'product', sourceId: 'spice-salt', grams: 5, scalable: false },
    ];
    if (!filters.noSugar) {
      pantry.push({ sourceType: 'product', sourceId: 'sweet-sugar', grams: 15, scalable: false });
    }
    meals.dinner.items.push(...pantry.map(d => mkItem(d, d.grams)));

    return { ...day, meals };
  };

  return {
    ...project,
    days: project.days.map(d => fillDay(d)),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Перевіряє, чи містить розкладка «розсип окремих продуктів» замість страв
 * (зі старих версій автозаповнення), і автоматично замінює їх на повноцінні страви.
 */
export function hasLegacyProductListInMeals(project: HikeProject): boolean {
  return project.days.some(day =>
    (['breakfast', 'lunch', 'dinner'] as MealType[]).some(mt => {
      const nonPantry = day.meals[mt].items.filter(it => !isPantryItem(it));
      return nonPantry.length > 0 && nonPantry.every(it => it.sourceType === 'product');
    })
  );
}
