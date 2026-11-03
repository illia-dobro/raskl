import * as XLSX from 'xlsx';
import { HikeProject, Product, DehydratedRecipe } from '../types/domain';
import { calculateProjectSummary, calculateMealItemMetrics } from '../domain/nutritionCalculator';
import { calculateShoppingAndDryingPlan } from '../domain/shoppingAndDryingCalculator';
import { calculateWaterAndFuelNeeds } from '../domain/waterAndFuelCalculator';
import { calculateStageParticipantQuotas } from '../domain/loadDistributor';
import { generatePackingLabels } from './packingLabelsGenerator';

export function buildProjectWorkbook(
  project: HikeProject,
  customProducts: Product[] = [],
  customRecipes: DehydratedRecipe[] = []
): XLSX.WorkBook {
  const wb = XLSX.utils.book_new();
  const summary = calculateProjectSummary(project, customProducts, customRecipes);
  const fuel = calculateWaterAndFuelNeeds(project);

  // --- Аркуш 1: Зведення та Учасники ---
  const sheet1Data: (string | number)[][] = [
    ['ПАРАМЕТРИ ТА ЗВЕДЕННЯ ПОХОДУ'],
    ['Назва походу:', project.settings.name],
    ['Вид туризму:', project.settings.hikeType],
    ['Категорія складності:', project.settings.difficultyCategory],
    ['Кліматичний профіль Б:Ж:В:', project.settings.climateProfile],
    ['Максимальна висота:', `${project.settings.maxAltitudeMeters} м (Точка кипіння: ~${fuel.boilingPointAtMaxAltCelsius}°C)`],
    ['Потреба в автоклаві:', fuel.requiresAutoclaveSuggestion ? 'Рекомендовано (>3200м)' : 'Звичайний посуд'],
    ['Середня вага нетто на людино-день:', `${summary.avgDailyNetGrams} г`],
    ['Середня вага брутто на людино-день:', `${summary.avgDailyGrossGrams} г`],
    ['Середня калорійність:', `${summary.avgDailyKcal} ккал`],
    ['Середній баланс Б:Ж:В:', `${summary.overallBjuRatio.join(' : ')}`],
    ['Середня клітковина:', `${summary.avgDailyFiber} г/день`],
    ['Загальна вага всієї їжі на групу:', `${summary.totalGroupFoodWeightKg} кг`],
    ['Розрахунок газу:', `${fuel.totalGasGrams} г (${fuel.canisters450gCount} балонів по 450г або ${fuel.canisters230gCount} по 230г)`],
    [],
    ['СПИСОК УЧАСНИКІВ ГРУПИ'],
    ['№', 'Ім\'я учасника', 'Стать', 'Коефіцієнт вантажопідйомності', 'Роль', 'Громадське спорядження (г)', 'Харчові обмеження / Алергії'],
  ];

  project.participants.forEach((p, idx) => {
    sheet1Data.push([
      idx + 1,
      p.name,
      p.gender === 'M' ? 'Чол' : 'Жін',
      p.carryingCapacityCoeff,
      p.role || 'Учасник',
      p.assignedSharedGearWeightGrams || 0,
      p.dietaryRestrictions || 'Немає',
    ]);
  });

  const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);
  XLSX.utils.book_append_sheet(wb, ws1, 'Зведення та Учасники');

  // --- Аркуш 2: Меню по днях ---
  const sheet2Data: (string | number)[][] = [
    [
      'День',
      'Етап',
      'Профіль навантаження',
      'Прийом їжі',
      'Назва страви / продукту',
      'Порція на 1 ос. (г)',
      'Вага на групу брутто (г)',
      'Ккал на 1 ос.',
      'Білки (г)',
      'Жири (г)',
      'Вуглеводи (г)',
      'Клітковина (г)',
      'Хто несе',
    ],
  ];

  const pCount = Math.max(1, project.participants.length);
  const partMap = new Map(project.participants.map(p => [p.id, p.name]));
  const stageMap = new Map(project.stages.map(s => [s.id, s.name]));

  project.days.forEach(day => {
    const mealKeys = ['breakfast', 'snack', 'lunch', 'dinner'] as const;
    const mealLabels = {
      breakfast: 'Сніданок',
      snack: 'Перекус',
      lunch: 'Обід',
      dinner: 'Вечеря',
    };

    mealKeys.forEach(mKey => {
      const meal = day.meals[mKey];
      meal.items.forEach(item => {
        const m = calculateMealItemMetrics(item, customProducts, customRecipes);
        const carrierName = item.assignedParticipantId
          ? partMap.get(item.assignedParticipantId) || item.assignedParticipantId
          : 'Не призначено';

        sheet2Data.push([
          `День ${day.dayNumber}`,
          stageMap.get(day.stageId) || day.stageId,
          day.dayLoadProfile,
          mealLabels[mKey],
          m.title,
          item.gramsPerPerson,
          m.grossGrams * pCount,
          m.kcal,
          m.protein,
          m.fat,
          m.carbs,
          m.fiber,
          carrierName,
        ]);
      });
    });
  });

  const ws2 = XLSX.utils.aoa_to_sheet(sheet2Data);
  XLSX.utils.book_append_sheet(wb, ws2, 'Меню по днях');

  // --- Аркуш 3: Закупка та Сушіння ---
  const { shoppingItems, dryingTasks } = calculateShoppingAndDryingPlan(
    project,
    undefined,
    customProducts,
    customRecipes
  );

  const sheet3Data: (string | number)[][] = [
    ['СПИСОК ПОКУПОК ДЛЯ МАГАЗИНУ (СИРА ПРОТИ СУХОЇ ВАГИ)'],
    ['Категорія', 'Похідна назва', 'Суха вага в похід (г)', 'СИРА вага для магазину (г)', 'Що купувати / Сирий продукт', 'Сушиться вдома?'],
  ];

  shoppingItems.forEach(item => {
    sheet3Data.push([
      item.category,
      item.name,
      item.dryWeightTotalGrams,
      item.rawWeightTotalGrams,
      item.rawProductName,
      item.isDehydratedAtHome ? 'ТАК (дегідратор)' : 'Ні (готове)',
    ]);
  });

  sheet3Data.push([]);
  sheet3Data.push(['ПЛАН СУШІННЯ В ДЕГІДРАТОРІ (ЧЕК-ЛІСТ ЗАВГОСПА)']);
  sheet3Data.push(['Страва / Продукт', 'Порцій', 'Суха вага (г)', 'Сира вага (г)', 'Температура (°C)', 'Час сушіння', 'Тест на сухість', 'Поради з приготування']);

  dryingTasks.forEach(task => {
    sheet3Data.push([
      task.title,
      task.servingsCountTotal,
      task.dryWeightTotalGrams,
      task.rawWeightTotalGrams,
      task.tempCelsius,
      task.timeHours,
      task.drynessTest,
      task.prepNotes,
    ]);
  });

  const ws3 = XLSX.utils.aoa_to_sheet(sheet3Data);
  XLSX.utils.book_append_sheet(wb, ws3, 'Закупка та Сушіння');

  // --- Аркуш 4: Розподіл по рюкзаках ---
  const sheet4Data: (string | number)[][] = [
    ['РОЗПОДІЛ ВАГИ ПО ЕТАПАХ (ЗАБРОСКАХ) ТА УЧАСНИКАХ'],
  ];

  project.stages.forEach(stage => {
    sheet4Data.push([]);
    sheet4Data.push([`ЕТАП: ${stage.name}`]);
    sheet4Data.push(['Учасник', 'Коефіцієнт k_i', 'Громадське спорядження (г)', 'Цільова їжа (г)', 'Фактично призначена їжа (г)', 'РАЗОМ початковий рюкзак (г)']);

    const quotas = calculateStageParticipantQuotas(project, stage.id, customProducts, customRecipes);
    quotas.forEach(q => {
      sheet4Data.push([
        q.participantName,
        q.coeff,
        q.sharedGearGrams,
        q.targetFoodWeightGrams,
        q.assignedFoodWeightGrams,
        q.totalLoadGrams,
      ]);
    });
  });

  const ws4 = XLSX.utils.aoa_to_sheet(sheet4Data);
  XLSX.utils.book_append_sheet(wb, ws4, 'Розподіл по рюкзаках');

  // --- Аркуш 5: Етикетки та Заброски ---
  const labels = generatePackingLabels(project, undefined, customProducts, customRecipes);
  const sheet5Data: (string | number)[][] = [
    ['ЕТИКЕТКИ ПАКУВАННЯ ТА ОПИС ЗАБРОСОК'],
    ['День', 'Етап', 'Прийом їжі', 'Страва / Продукт', 'Вага нетто (г)', 'Вага брутто (г)', 'Хто несе', 'Інструкція приготування'],
  ];

  labels.forEach(l => {
    sheet5Data.push([
      `День ${l.dayNumber}`,
      l.stageName,
      l.mealTypeName,
      l.itemName,
      l.totalNetGrams,
      l.totalGrossGrams,
      l.carrierName,
      l.instructions,
    ]);
  });

  const ws5 = XLSX.utils.aoa_to_sheet(sheet5Data);
  XLSX.utils.book_append_sheet(wb, ws5, 'Етикетки та Заброски');

  return wb;
}

export function downloadProjectExcel(
  project: HikeProject,
  customProducts: Product[] = [],
  customRecipes: DehydratedRecipe[] = []
): void {
  const wb = buildProjectWorkbook(project, customProducts, customRecipes);
  const filename = `${project.settings.name.replace(/[/\\?%*:|"<>]/g, '_')}_Розкладка.xlsx`;
  XLSX.writeFile(wb, filename);
}
