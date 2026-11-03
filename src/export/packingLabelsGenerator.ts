import { HikeProject, Product, DehydratedRecipe, MealType } from '../types/domain';
import { calculateMealItemMetrics } from '../domain/nutritionCalculator';
import { PRODUCTS_CATALOG } from '../data/productsCatalog';
import { DEHYDRATED_RECIPES } from '../data/dehydratedRecipes';

export interface PackingLabelCard {
  itemId: string;
  dayNumber: number;
  stageId: string;
  stageName: string;
  mealType: MealType;
  mealTypeName: string;
  itemName: string;
  totalNetGrams: number;
  totalGrossGrams: number;
  carrierName: string;
  instructions: string;
}

export function generatePackingLabels(
  project: HikeProject,
  stageFilterId?: string,
  customProducts: Product[] = [],
  customRecipes: DehydratedRecipe[] = []
): PackingLabelCard[] {
  const labels: PackingLabelCard[] = [];
  const pCount = Math.max(1, project.participants.length);
  const partMap = new Map(project.participants.map(p => [p.id, p.name]));
  const stageMap = new Map(project.stages.map(s => [s.id, s.name]));

  const daysToProcess = stageFilterId
    ? project.days.filter(d => d.stageId === stageFilterId)
    : project.days;

  const mealTypeLabels: Record<MealType, string> = {
    breakfast: 'Сніданок',
    snack: 'Перекус',
    lunch: 'Обід',
    dinner: 'Вечеря',
  };

  daysToProcess.forEach(day => {
    const sName = stageMap.get(day.stageId) || day.stageId;

    (['breakfast', 'snack', 'lunch', 'dinner'] as const).forEach(mKey => {
      const meal = day.meals[mKey];

      meal.items.forEach(item => {
        const m = calculateMealItemMetrics(item, customProducts, customRecipes);
        const carrier = item.assignedParticipantId
          ? partMap.get(item.assignedParticipantId) || item.assignedParticipantId
          : 'Завгосп (не призначено)';

        let instructions = 'Готове до вживання на маршруті';

        if (item.sourceType === 'recipe') {
          const rec =
            customRecipes.find(r => r.id === item.sourceId) ||
            DEHYDRATED_RECIPES.find(r => r.id === item.sourceId);

          if (rec) {
            instructions = `${rec.campRehydration.waterRatioNote}. Варити: ${rec.campRehydration.boilMinutes} хв. ${rec.campRehydration.altitudeNote || ''}`.trim();
          }
        } else {
          const prod =
            customProducts.find(p => p.id === item.sourceId) ||
            PRODUCTS_CATALOG.find(p => p.id === item.sourceId);

          if (prod) {
            if (prod.category === 'grains') {
              instructions = 'Варити у підсоленій киплячій воді за нормою кружки на людину (1:3 за об\'ємом).';
            } else if (prod.category === 'meat_fish') {
              instructions = 'Закладати в холодну воду або додавати за 3 хв до готовності каші.';
            } else if (prod.packagingType) {
              instructions = `Тара: ${prod.packagingType}`;
            }
          }
        }

        labels.push({
          itemId: item.id,
          dayNumber: day.dayNumber,
          stageId: day.stageId,
          stageName: sName,
          mealType: mKey,
          mealTypeName: mealTypeLabels[mKey],
          itemName: m.title,
          totalNetGrams: m.netGrams * pCount,
          totalGrossGrams: m.grossGrams * pCount,
          carrierName: carrier,
          instructions,
        });
      });
    });
  });

  return labels;
}
