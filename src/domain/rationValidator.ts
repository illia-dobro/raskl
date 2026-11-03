import {
  HikeProject,
  ValidationWarning,
  Product,
  DehydratedRecipe,
} from '../types/domain';
import { calculateDaySummary } from './nutritionCalculator';
import { CLIMATE_PROFILES } from '../data/climateProfiles';
import { PRODUCTS_CATALOG } from '../data/productsCatalog';
import { DEHYDRATED_RECIPES } from '../data/dehydratedRecipes';

export function validateProjectRation(
  project: HikeProject,
  customProducts: Product[] = [],
  customRecipes: DehydratedRecipe[] = []
): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];
  const pCount = project.participants.length;
  const targetNet = project.settings.targetDailyWeightNetGrams || 650;
  const targetClimate = CLIMATE_PROFILES[project.settings.climateProfile] || CLIMATE_PROFILES.temperate_1_1_4;
  const [targetB, targetJ, targetU] = targetClimate.bjuRatio;

  const allProducts = [...PRODUCTS_CATALOG, ...customProducts];
  const allRecipes = [...DEHYDRATED_RECIPES, ...customRecipes];

  // 1. Поденні перевірки нутрієнтів
  project.days.forEach(day => {
    const summary = calculateDaySummary(day, project.settings, pCount, customProducts, customRecipes);

    // Вага
    if (summary.totalNetWeightGrams > targetNet + 80) {
      warnings.push({
        id: `warn-weight-high-d${day.dayNumber}`,
        dayNumber: day.dayNumber,
        type: 'weight',
        severity: 'warning',
        message: `День ${day.dayNumber}: Вага раціону (${summary.totalNetWeightGrams} г) перевищує цільову норму (${targetNet} г) на ${summary.totalNetWeightGrams - targetNet} г. Рюкзаки будуть перевантажені!`,
      });
    } else if (summary.totalNetWeightGrams < 400 && summary.totalNetWeightGrams > 0) {
      warnings.push({
        id: `warn-weight-low-d${day.dayNumber}`,
        dayNumber: day.dayNumber,
        type: 'weight',
        severity: 'info',
        message: `День ${day.dayNumber}: Дуже мала вага раціону (${summary.totalNetWeightGrams} г). Переконайтеся, що група не голодуватиме понад норму.`,
      });
    }

    // Білок
    if (summary.proteinGrams < 40 && summary.totalNetWeightGrams > 0) {
      warnings.push({
        id: `warn-protein-low-d${day.dayNumber}`,
        dayNumber: day.dayNumber,
        type: 'protein',
        severity: 'warning',
        message: `День ${day.dayNumber}: Дефіцит білка (${summary.proteinGrams} г < 40 г). Недостатньо для відновлення м'язів за нормами О. Алексєєва. Додайте сушеного м'яса, сиру чи бобових.`,
      });
    }

    // Клітковина (за Хачикяном норма 15-20 г)
    if (summary.fiberGrams < 15 && summary.totalNetWeightGrams > 0) {
      warnings.push({
        id: `warn-fiber-low-d${day.dayNumber}`,
        dayNumber: day.dayNumber,
        type: 'fiber',
        severity: 'info',
        message: `День ${day.dayNumber}: Замало харчових волокон / клітковини (${summary.fiberGrams} г < 15 г). Загроза атонії кишечника. Додайте вівсяні висівки, льон, сухофрукти чи сушені гриби.`,
      });
    }

    // Відхилення БЖВ
    if (summary.proteinGrams > 0) {
      const [, actualJ, actualU] = summary.bjuRatio;
      const jRatioDiff = Math.abs(actualJ - targetJ) / (targetJ || 1);
      const uRatioDiff = Math.abs(actualU - targetU) / (targetU || 1);

      if (jRatioDiff > 0.4 || uRatioDiff > 0.4) {
        warnings.push({
          id: `warn-bju-d${day.dayNumber}`,
          dayNumber: day.dayNumber,
          type: 'bju',
          severity: 'info',
          message: `День ${day.dayNumber}: Співвідношення Б:Ж:В (${summary.bjuRatio.join(':')}) відхиляється від кліматичного профілю (${targetB}:${targetJ}:${targetU}).`,
        });
      }
    }
  });

  // 2. Перевірка повторів страв поспіль (правило різноманітності)
  for (let i = 0; i < project.days.length - 1; i++) {
    const curDay = project.days[i];
    const nextDay = project.days[i + 1];

    const curBreakfastItems = curDay.meals.breakfast.items.map(it => it.sourceId);
    const nextBreakfastItems = nextDay.meals.breakfast.items.map(it => it.sourceId);
    const curDinnerItems = curDay.meals.dinner.items.map(it => it.sourceId);
    const nextDinnerItems = nextDay.meals.dinner.items.map(it => it.sourceId);

    // Шукаємо повтор головної крупи чи страви на сніданок
    for (const id of curBreakfastItems) {
      if ((id.startsWith('grain-') || id.startsWith('recipe-') || id.startsWith('custom-')) && nextBreakfastItems.includes(id)) {
        const prod = allProducts.find(p => p.id === id);
        const rec = allRecipes.find(r => r.id === id);
        const title = rec?.title || prod?.name || id;
        warnings.push({
          id: `warn-repeat-b-${curDay.dayNumber}-${nextDay.dayNumber}-${id}`,
          dayNumber: nextDay.dayNumber,
          type: 'repeat',
          severity: 'info',
          message: `Повторення каші на сніданок два дні поспіль: «${title}» у дні ${curDay.dayNumber} та ${nextDay.dayNumber}. Завгоспу варто урізноманітнити меню!`,
        });
      }
    }

    // Шукаємо повтор вечері
    for (const id of curDinnerItems) {
      if ((id.startsWith('recipe-') || id.startsWith('soup-') || id.startsWith('grain-') || id.startsWith('custom-')) && nextDinnerItems.includes(id)) {
        const itemObj =
          allRecipes.find(r => r.id === id) ||
          allProducts.find(p => p.id === id);
        warnings.push({
          id: `warn-repeat-d-${curDay.dayNumber}-${nextDay.dayNumber}-${id}`,
          dayNumber: nextDay.dayNumber,
          type: 'repeat',
          severity: 'info',
          message: `Повторення страви на вечерю два дні поспіль: «${itemObj ? ('title' in itemObj ? itemObj.title : itemObj.name) : id}» у дні ${curDay.dayNumber} та ${nextDay.dayNumber}.`,
        });
      }
    }
  }

  // 3. Перевірка харчових обмежень та алергій учасників
  project.participants.forEach(participant => {
    if (!participant.dietaryRestrictions) return;
    const restrLower = participant.dietaryRestrictions.toLowerCase();

    // Якщо є обмеження на лактозу / молоко
    if (restrLower.includes('лактоз') || restrLower.includes('молок')) {
      project.days.forEach(day => {
        const allItems = Object.values(day.meals).flatMap(m => m.items);
        const hasDairy = allItems.some(it => {
          if (it.sourceType === 'product') {
            const p = allProducts.find(pr => pr.id === it.sourceId);
            return p?.category === 'dairy_eggs' && (p.id.includes('milk') || p.id.includes('dairy') || p.name.toLowerCase().includes('молок'));
          }
          return false;
        });

        if (hasDairy) {
          warnings.push({
            id: `warn-diet-${participant.id}-d${day.dayNumber}`,
            dayNumber: day.dayNumber,
            type: 'dietary',
            severity: 'warning',
            message: `День ${day.dayNumber}: Меню містить молочні продукти, а в учасника ${participant.name} зазначено: «${participant.dietaryRestrictions}». Фасуйте молоко в окремий пакет!`,
          });
        }
      });
    }
  });

  return warnings;
}
