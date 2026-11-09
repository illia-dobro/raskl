/**
 * Доменні типи для веб-додатка «Похідний Завгосп»
 */

export type ProductCategory =
  | 'grains'               // Крупи, макарони, пластівці
  | 'meat_fish'            // М'ясо сушене/сублімоване, ковбаса, риба, тушонка
  | 'dairy_eggs'           // Сир, сухе молоко, сублімований сир, яєчний порошок
  | 'fats'                 // Сало, масло топлене, рослинна олія
  | 'sweets'               // Цукор, халва, шоколад, карамель, щербет, мед
  | 'dried_fruits_nuts'    // Курага, родзинки, чорнослив, горіхи
  | 'vegetables_mushrooms' // Сушені та свіжі овочі, сушені гриби
  | 'bread_crackers'       // Сухарі житні/білі, галети, печиво, бублики
  | 'soups_concentrates'   // Сухі супи, бульйонні кубики, концентрати
  | 'drinks_spices'        // Чай, кава, какао, сіль, спеції, томат
  | 'supplements';         // Висівки, насіння льону, ізотоніки, вітаміни

export type WaterContentClass =
  | 'very_low_under_20'    // <20% води (сухарі, крупи, горіхи, цукор, сало, сублімати)
  | 'low_20_33'            // 20-33% води (сухофрукти)
  | 'medium_33_50'         // 33-50% води (свіжий хліб, твердий сир)
  | 'high_50_75'           // 50-75% води (свіже м'ясо, згущене молоко, варені ковбаси)
  | 'very_high_over_75';   // >75% води (свіжі овочі, фрукти, консервовані компоти)

export interface DryingInfo {
  rawToDryRatio: number;      // Коефіцієнт усушки: скільки г сирого продукту треба на 1 г сухого (напр. 3.3 для яловичини)
  rawProductName: string;     // Назва сирого продукту для магазину (напр. «Яловичина нежирна (м'якоть/фарш)»)
  tempCelsius: number;        // Температура дегідратора (°C), напр. 60
  timeHours: string;          // Орієнтовний час сушіння (напр. «6-8 год»)
  drynessTest: string;        // Тест на готовність (напр. «Тверді, темні, ламкі гранули без вологи»)
  prepNotes: string;          // Поради з підготовки (напр. «Відварити у підсоленій воді, просушити паперовим рушником»)
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  kcalPer100g: number;
  proteinPer100g: number;
  fatPer100g: number;
  carbsPer100g: number;
  fiberPer100g: number;       // Клітковина (г / 100 г)
  digestibilityPercent: number; // % засвоюваності / їстівної частини (за Додатком 1 О. Алексєєва)
  waterContentClass: WaterContentClass;
  recommendedNormGrams: {
    min: number;
    default: number;
    max: number;
  };
  packagingTareRatio: number; // Коефіцієнт ваги тари (за замовчуванням 0.05, тобто +5%)
  packagingType: string;      // Рекомендована упаковка
  dryingInfo?: DryingInfo;    // Заповнюється, якщо це домашній сушений напівфабрикат
  isIndivisiblePkg?: boolean; // Чи є упаковка неподільною
  isCustom?: boolean;         // Чи додано користувачем
}

export type MealType = 'breakfast' | 'snack' | 'lunch' | 'dinner';

export interface RawIngredient {
  name: string;
  amount: number;
  unit: string;
  category: string;
  isDriedAtHome?: boolean;    // Чи сушиться цей компонент вдома в дегідраторі
  rawToDryRatio?: number;     // Коефіцієнт усушки (скільки г сирого продукту на 1 г сухого)
  rawProductName?: string;    // Назва сирого продукту для магазину (якщо сушиться вдома)
}

export interface DehydratedRecipe {
  id: string;
  title: string;
  category: 'breakfast' | 'soup' | 'main' | 'lunch' | 'snack' | 'spread';
  mealTypes: MealType[];
  servingsYield: number;             // Базова кількість порцій у рецепті (напр. 4)
  dryWeightPerServingGrams: number;  // Вага 1 сухої порції у грамах
  kcalPerServing: number;
  proteinPerServing: number;
  fatPerServing: number;
  carbsPerServing: number;
  fiberPerServing: number;
  rawIngredients: RawIngredient[];   // Сирі інгредієнти для домашнього приготування
  homePrepSteps: string[];           // Покрокове приготування перед сушінням
  dehydrationParams: {
    tempCelsius: number;
    timeHours: string;
    trayLining: string;              // Силікон, пергамент, сітка
    drynessTest: string;
  };
  campRehydration: {
    waterRatioNote: string;          // Напр. «Залити водою на 1.5-2 см вище рівня їжі (~350-400 мл/порцію)»
    soakMinutes: number;             // Хвилин попереднього замочування (0 якщо не потрібно)
    boilMinutes: number;             // Хвилин варіння (зазвичай 2-3 хв)
    altitudeNote?: string;
  };
  packagingTareRatio: number;        // Стандартно 0.05
  sourceBook: string;                // Посилання на першоджерело
  isCustom?: boolean;
}

export type HikeType = 'hiking' | 'mountain' | 'ski' | 'water';

export type ClimateProfileId =
  | 'temperate_1_1_4'
  | 'high_mountain_hot_1_07_4'
  | 'high_pamir_1_07_5'
  | 'cold_winter_1_2_3'
  | 'extreme_winter_1_3_4';

export type DayLoadProfileId =
  | 'acclimatization'
  | 'standard'
  | 'assault'
  | 'post_assault'
  | 'rest_day';

export type FuelType = 'gas' | 'liquid_fuel' | 'campfire';

export interface Participant {
  id: string;
  name: string;
  gender: 'M' | 'F';
  carryingCapacityCoeff: number; // 0.5 - 1.3
  role: string;
  dietaryRestrictions: string;
  assignedSharedGearWeightGrams: number; // Вага громадського спорядження
}

export interface RouteStage {
  id: string;
  name: string;
  startDay: number;
  endDay: number;
  storageMethodNote: string;
}

export interface MealItem {
  id: string;
  sourceType: 'product' | 'recipe';
  sourceId: string;
  gramsPerPerson: number;            // Вага порції сухої їжі на людину
  assignedParticipantId?: string;   // Хто несе у рюкзаку
}

export interface MealPlan {
  title: string;
  items: MealItem[];
}

export interface HikeDay {
  dayNumber: number;
  stageId: string;
  dayLoadProfile: DayLoadProfileId;
  altitudeMeters: number;
  notes: string;
  meals: Record<MealType, MealPlan>;
}

export interface HikeSettings {
  name: string;
  hikeType: HikeType;
  difficultyCategory: number;
  climateProfile: ClimateProfileId;
  maxAltitudeMeters: number;
  targetDailyWeightNetGrams: number;
  targetDailyKcal: number;
  fuelType: FuelType;
  meltsSnowForWater: boolean;
}

export interface HikeProject {
  id: string;
  settings: HikeSettings;
  participants: Participant[];
  stages: RouteStage[];
  days: HikeDay[];
  createdAt: string;
  updatedAt: string;
}

export interface DailyNutritionSummary {
  dayNumber: number;
  stageId: string;
  dayLoadProfile: DayLoadProfileId;
  recommendedKcal: number;
  totalNetWeightGrams: number;
  totalGrossWeightGrams: number;
  totalGroupGrossWeightKg: number;
  kcal: number;
  effectiveKcal: number;
  proteinGrams: number;
  fatGrams: number;
  carbsGrams: number;
  fiberGrams: number;
  bjuRatio: [number, number, number];
}

export interface ValidationWarning {
  id: string;
  dayNumber?: number;
  type: 'weight' | 'protein' | 'fiber' | 'bju' | 'repeat' | 'dietary' | 'fuel';
  severity: 'error' | 'warning' | 'info';
  message: string;
}

export interface ShoppingListItem {
  id: string;
  name: string;
  category: string;
  dryWeightTotalGrams: number;
  rawWeightTotalGrams: number;
  rawProductName: string;
  isDehydratedAtHome: boolean;
  packageCountEstimate: string;
  stageDistribution: Record<string, number>;
}

export interface DryingTaskItem {
  id: string;
  title: string;
  sourceType: 'product' | 'recipe';
  sourceId: string;
  servingsCountTotal: number;
  dryWeightTotalGrams: number;
  rawWeightTotalGrams: number;
  tempCelsius: number;
  timeHours: string;
  drynessTest: string;
  prepNotes: string;
}

export interface ParticipantStageQuota {
  participantId: string;
  participantName: string;
  coeff: number;
  sharedGearGrams: number;
  targetFoodWeightGrams: number;
  assignedFoodWeightGrams: number;
  totalLoadGrams: number;
  stageTotalFoodGrossGrams: number;
}

export interface AssignedPackage {
  itemId: string;
  dayNumber: number;
  stageId: string;
  mealType: MealType;
  itemName: string;
  gramsPerPerson: number;
  totalGrossGrams: number;
  assignedParticipantId: string;
  instructions: string;
}
