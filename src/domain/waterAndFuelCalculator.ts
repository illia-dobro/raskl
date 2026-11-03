import { HikeProject } from '../types/domain';
import { getBoilingPointCelsius } from '../data/climateProfiles';

export interface FuelAndWaterCalculation {
  boilingPointAtMaxAltCelsius: number;
  requiresAutoclaveSuggestion: boolean;
  dailyGasPerPersonGrams: number;
  totalGasGrams: number;
  canisters230gCount: number;
  canisters450gCount: number;
  totalLiquidFuelMilliliters: number;
  dailyDrinkingWaterLitersPerPerson: number;
}

export function calculateWaterAndFuelNeeds(project: HikeProject): FuelAndWaterCalculation {
  const pCount = Math.max(1, project.participants.length);
  const daysCount = Math.max(1, project.days.length);
  const personDays = pCount * daysCount;

  const maxAlt = project.settings.maxAltitudeMeters || 1000;
  const boilingPointAtMaxAltCelsius = getBoilingPointCelsius(maxAlt);
  const requiresAutoclaveSuggestion = maxAlt >= 3200;

  // Витрата газу за нормами В. Хачикяна та О. Алексєєва:
  // 25-30 г/людино-день — стандарт на рідкій воді з вітрозахистом.
  // +10 г, якщо висота > 2500 м.
  // +15-20 г, якщо топимо сніг чи лід.
  let dailyGasPerPersonGrams = 28;
  if (maxAlt > 2500) {
    dailyGasPerPersonGrams += 8;
  }
  if (project.settings.meltsSnowForWater) {
    dailyGasPerPersonGrams += 15;
  }

  const totalGasGrams = Math.round(dailyGasPerPersonGrams * personDays * 1.1); // +10% резерв
  const canisters230gCount = Math.ceil(totalGasGrams / 230);
  const canisters450gCount = Math.ceil(totalGasGrams / 450);

  // Витрата рідкого палива (бензину):
  // 65 мл/людино-день на рідкій воді, 95-100 мл при топленні снігу
  const dailyLiquidFuelMl = project.settings.meltsSnowForWater ? 95 : 65;
  const totalLiquidFuelMilliliters = Math.round(dailyLiquidFuelMl * personDays * 1.1);

  // Рекомендоване пиття на ходовий день
  let dailyDrinkingWaterLitersPerPerson = 2.0;
  if (project.settings.climateProfile === 'high_mountain_hot_1_07_4') {
    dailyDrinkingWaterLitersPerPerson = 2.5;
  } else if (project.settings.climateProfile === 'high_pamir_1_07_5') {
    dailyDrinkingWaterLitersPerPerson = 3.0;
  }

  return {
    boilingPointAtMaxAltCelsius,
    requiresAutoclaveSuggestion,
    dailyGasPerPersonGrams,
    totalGasGrams,
    canisters230gCount,
    canisters450gCount,
    totalLiquidFuelMilliliters,
    dailyDrinkingWaterLitersPerPerson,
  };
}
