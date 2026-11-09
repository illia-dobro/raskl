import { MealItem, MealType } from '../types/domain';

/**
 * «Базові речі» — чай, кава, цукор, сіль, приправи. Це не окремі страви, тому в розкладці
 * вони показуються окремим рядком дня внизу, а в прийомах їжі залишаються лише самі СТРАВИ.
 */
export interface PantryOption {
  id: string;
  label: string;
  defaultGrams: number;
  hint: string;
}

export const PANTRY_OPTIONS: PantryOption[] = [
  { id: 'drink-tea-black', label: 'Чай чорний', defaultGrams: 5, hint: 'г/ос на день' },
  { id: 'drink-coffee-instant', label: 'Кава', defaultGrams: 4, hint: 'г/ос на день' },
  { id: 'sweet-sugar', label: 'Цукор', defaultGrams: 20, hint: 'г/ос (хто не вживає — менше середнє)' },
  { id: 'spice-salt', label: 'Сіль', defaultGrams: 5, hint: 'г/ос на день' },
  { id: 'spice-tomato-paste', label: 'Томатна паста', defaultGrams: 10, hint: 'г/ос' },
  { id: 'spice-citric-acid', label: 'Лимонна кислота', defaultGrams: 2, hint: 'г/ос' },
];

export const PANTRY_PRODUCT_IDS = new Set(PANTRY_OPTIONS.map(o => o.id));

export function isPantryItem(item: MealItem): boolean {
  return item.sourceType === 'product' && PANTRY_PRODUCT_IDS.has(item.sourceId);
}

/** Місце, куди зберігаються нові базові речі (у розкладці не відображається як страва). */
export const PANTRY_STORAGE_MEAL: MealType = 'dinner';
