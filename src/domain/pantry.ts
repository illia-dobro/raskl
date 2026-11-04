import { MealItem, MealType } from '../types/domain';

/**
 * «Базові речі» — цукор, сіль, приправи. Це не страви, тому в розкладці
 * вони показуються окремим рядком дня, а не всередині сніданку/обіду/вечері.
 */
export interface PantryOption {
  id: string;
  label: string;
  defaultGrams: number;
  hint: string;
}

export const PANTRY_OPTIONS: PantryOption[] = [
  { id: 'sweet-sugar', label: 'Цукор', defaultGrams: 20, hint: 'г/ос (хто не вживає — менше середнє)' },
  { id: 'spice-salt', label: 'Сіль', defaultGrams: 5, hint: 'г/ос' },
  { id: 'spice-tomato-paste', label: 'Томатна паста', defaultGrams: 10, hint: 'г/ос' },
  { id: 'spice-citric-acid', label: 'Лимонна кислота', defaultGrams: 2, hint: 'г/ос' },
];

export const PANTRY_PRODUCT_IDS = new Set(PANTRY_OPTIONS.map(o => o.id));

export function isPantryItem(item: MealItem): boolean {
  return item.sourceType === 'product' && PANTRY_PRODUCT_IDS.has(item.sourceId);
}

/** Місце, куди зберігаються нові базові речі (у розкладці не відображається як страва). */
export const PANTRY_STORAGE_MEAL: MealType = 'dinner';
