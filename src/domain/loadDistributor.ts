import {
  HikeProject,
  ParticipantStageQuota,
  Product,
  DehydratedRecipe,
} from '../types/domain';
import { calculateMealItemMetrics } from './nutritionCalculator';

export function calculateStageParticipantQuotas(
  project: HikeProject,
  stageId: string,
  customProducts: Product[] = [],
  customRecipes: DehydratedRecipe[] = []
): ParticipantStageQuota[] {
  const participants = project.participants;
  if (!participants || participants.length === 0) {
    return [];
  }

  const stageDays = project.days.filter(d => d.stageId === stageId);
  const pCount = participants.length;

  // Рахуємо повну вагу їжі брутто на весь цей етап на всю групу
  let stageTotalFoodGrossGrams = 0;
  stageDays.forEach(day => {
    Object.values(day.meals).forEach(meal => {
      meal.items.forEach(item => {
        const m = calculateMealItemMetrics(item, customProducts, customRecipes);
        stageTotalFoodGrossGrams += m.grossGrams * pCount;
      });
    });
  });

  const totalSharedGearGrams = participants.reduce(
    (acc, p) => acc + (p.assignedSharedGearWeightGrams || 0),
    0
  );

  const totalStageLoad = stageTotalFoodGrossGrams + totalSharedGearGrams;
  const sumCoeffs = participants.reduce((acc, p) => acc + (p.carryingCapacityCoeff || 1), 0);

  if (sumCoeffs <= 0) {
    return [];
  }

  // Первинний розрахунок загальної квоти T_i та попередньої квоти їжі F'_i
  const initialQuotas = participants.map(p => {
    const coeff = p.carryingCapacityCoeff || 1;
    const targetTotalLoad = Math.round(totalStageLoad * (coeff / sumCoeffs));
    const gear = p.assignedSharedGearWeightGrams || 0;
    // Клампимо до 0 за Review Focus #3, якщо спорядження перевищує повну квоту
    const rawFoodTarget = Math.max(0, targetTotalLoad - gear);

    return {
      participantId: p.id,
      participantName: p.name,
      coeff,
      sharedGearGrams: gear,
      targetTotalLoad,
      rawFoodTarget,
    };
  });

  // Нормалізація, щоб сума targetFoodWeightGrams точно дорівнювала stageTotalFoodGrossGrams
  const sumRawFood = initialQuotas.reduce((acc, q) => acc + q.rawFoodTarget, 0);
  const scale = sumRawFood > 0 ? stageTotalFoodGrossGrams / sumRawFood : 0;

  // Рахуємо фактично призначену вагу їжі (assignedFoodWeightGrams) на цьому етапі
  const assignedByParticipant: Record<string, number> = {};
  stageDays.forEach(day => {
    Object.values(day.meals).forEach(meal => {
      meal.items.forEach(item => {
        if (item.assignedParticipantId) {
          const m = calculateMealItemMetrics(item, customProducts, customRecipes);
          const pkgGross = m.grossGrams * pCount;
          assignedByParticipant[item.assignedParticipantId] =
            (assignedByParticipant[item.assignedParticipantId] || 0) + pkgGross;
        }
      });
    });
  });

  return initialQuotas.map(q => {
    const targetFoodWeightGrams = Math.round(q.rawFoodTarget * scale);
    const assignedFoodWeightGrams = Math.round(assignedByParticipant[q.participantId] || 0);
    const totalLoadGrams = q.sharedGearGrams + assignedFoodWeightGrams;

    return {
      participantId: q.participantId,
      participantName: q.participantName,
      coeff: q.coeff,
      sharedGearGrams: q.sharedGearGrams,
      targetFoodWeightGrams,
      assignedFoodWeightGrams,
      totalLoadGrams,
      stageTotalFoodGrossGrams,
    };
  });
}

/**
 * Автоматичний жадібний розподіл групових упаковок продуктів на етапі
 * між учасниками пропорційно їхнім квотам їжі targetFoodWeightGrams.
 */
export function autoAssignStagePackages(
  project: HikeProject,
  stageId: string,
  customProducts: Product[] = [],
  customRecipes: DehydratedRecipe[] = []
): HikeProject {
  const quotas = calculateStageParticipantQuotas(project, stageId, customProducts, customRecipes);
  if (quotas.length === 0) return project;

  const pCount = project.participants.length;

  // Збираємо всі пакети на цьому етапі
  interface PackageToAssign {
    dayIndex: number;
    mealKey: 'breakfast' | 'snack' | 'lunch' | 'dinner';
    itemIndex: number;
    weightGross: number;
    dayNumber: number;
  }

  const packages: PackageToAssign[] = [];

  project.days.forEach((day, dIdx) => {
    if (day.stageId !== stageId) return;

    (['breakfast', 'snack', 'lunch', 'dinner'] as const).forEach(mealKey => {
      day.meals[mealKey].items.forEach((item, itIdx) => {
        const m = calculateMealItemMetrics(item, customProducts, customRecipes);
        packages.push({
          dayIndex: dIdx,
          mealKey,
          itemIndex: itIdx,
          weightGross: m.grossGrams * pCount,
          dayNumber: day.dayNumber,
        });
      });
    });
  });

  // Сортуємо пакети від важчих до легших для оптимального жадібного розподілу
  packages.sort((a, b) => b.weightGross - a.weightGross);

  // Відстежуємо поточну завантаженість учасників їжею
  const currentAssigned: Record<string, number> = {};
  quotas.forEach(q => {
    currentAssigned[q.participantId] = 0;
  });

  // Клонуємо дні проєкту для оновлення
  const updatedDays = JSON.parse(JSON.stringify(project.days));

  // Призначаємо кожен пакет учаснику з найбільшим дефіцитом до його targetFoodWeightGrams
  packages.forEach(pkg => {
    let bestParticipantId = quotas[0].participantId;
    let maxDeficit = -Infinity;

    quotas.forEach(q => {
      const assigned = currentAssigned[q.participantId] || 0;
      const deficit = q.targetFoodWeightGrams - assigned;
      if (deficit > maxDeficit) {
        maxDeficit = deficit;
        bestParticipantId = q.participantId;
      }
    });

    currentAssigned[bestParticipantId] += pkg.weightGross;
    updatedDays[pkg.dayIndex].meals[pkg.mealKey].items[pkg.itemIndex].assignedParticipantId =
      bestParticipantId;
  });

  return {
    ...project,
    days: updatedDays,
    updatedAt: new Date().toISOString(),
  };
}
