import React, { useState } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { calculateDaySummary, calculateMealItemMetrics } from '../domain/nutritionCalculator';
import { validateProjectRation } from '../domain/rationValidator';
import { DAY_LOAD_PROFILES } from '../data/climateProfiles';
import { PRODUCTS_CATALOG } from '../data/productsCatalog';
import { DEHYDRATED_RECIPES } from '../data/dehydratedRecipes';
import {
  DayLoadProfileId,
  MealType,
} from '../types/domain';
import {
  Plus,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
  Mountain,
  Sun,
  Coffee,
  Cookie,
  Moon,
} from 'lucide-react';

export const MenuMatrixTab: React.FC = () => {
  const {
    project,
    customProducts,
    customRecipes,
    addDay,
    removeDay,
    duplicateDay,
    swapDays,
    updateDaySettings,
    addMealItem,
    updateMealItemGrams,
    assignItemParticipant,
    removeMealItem,
  } = useProjectStore();

  const [stageFilter, setStageFilter] = useState<string>('all');
  const [quickAddModal, setQuickAddModal] = useState<{ dayNumber: number; mealType: MealType } | null>(null);
  const [quickSearch, setQuickSearch] = useState('');

  const pCount = Math.max(1, project.participants.length);

  const filteredDays = stageFilter === 'all'
    ? project.days
    : project.days.filter(d => d.stageId === stageFilter);

  const warnings = validateProjectRation(project, customProducts, customRecipes);

  const mealConfigs: { type: MealType; label: string; icon: React.ReactNode; color: string }[] = [
    { type: 'breakfast', label: 'Сніданок (30% ккал)', icon: <Coffee className="w-4 h-4 text-amber-600" />, color: 'border-amber-200 bg-amber-50/40' },
    { type: 'snack', label: 'Перекус / Кармхарч (10-15%)', icon: <Cookie className="w-4 h-4 text-orange-600" />, color: 'border-orange-200 bg-orange-50/40' },
    { type: 'lunch', label: 'Обід / Привал (30-35%)', icon: <Sun className="w-4 h-4 text-sky-600" />, color: 'border-sky-200 bg-sky-50/40' },
    { type: 'dinner', label: 'Вечеря (25% ккал)', icon: <Moon className="w-4 h-4 text-indigo-600" />, color: 'border-indigo-200 bg-indigo-50/40' },
  ];

  const allAvailableItems = [
    ...DEHYDRATED_RECIPES.map(r => ({ id: r.id, title: r.title, type: 'recipe' as const, defaultGrams: r.dryWeightPerServingGrams, kcal: r.kcalPerServing, sub: 'Сушена страва' })),
    ...customRecipes.map(r => ({ id: r.id, title: r.title, type: 'recipe' as const, defaultGrams: r.dryWeightPerServingGrams, kcal: r.kcalPerServing, sub: 'Власний рецепт' })),
    ...PRODUCTS_CATALOG.map(p => ({ id: p.id, title: p.name, type: 'product' as const, defaultGrams: p.recommendedNormGrams.default, kcal: p.kcalPer100g, sub: p.category })),
    ...customProducts.map(p => ({ id: p.id, title: p.name, type: 'product' as const, defaultGrams: p.recommendedNormGrams.default, kcal: p.kcalPer100g, sub: 'Власний продукт' })),
  ];

  const filteredQuickItems = allAvailableItems.filter(it =>
    it.title.toLowerCase().includes(quickSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Верхня панель фільтрації та дій над днями */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Фільтр по етапах (забросках) */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-600">Етап (Заброска):</span>
          <select
            value={stageFilter}
            onChange={e => setStageFilter(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-800 font-bold outline-none"
          >
            <option value="all">Всі дні походу ({project.days.length} днів)</option>
            {project.stages.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} (Дні {s.startDay} - {s.endDay})
              </option>
            ))}
          </select>
        </div>

        {/* Кнопка додавання дня */}
        <button
          onClick={() => addDay(stageFilter === 'all' ? project.stages[0]?.id : stageFilter)}
          className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Додати ходовий день
        </button>
      </div>

      {/* Панель попереджень валідатора */}
      {warnings.length > 0 && (
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Зауваження та рекомендації валідатора розкладки ({warnings.length}):
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-800">
            {warnings.map(w => (
              <div
                key={w.id}
                className={`p-2 rounded border flex items-start gap-2 ${
                  w.severity === 'warning'
                    ? 'bg-amber-100/70 border-amber-300 text-amber-950 font-medium'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-200/80 text-amber-900 shrink-0">
                  {w.type}
                </span>
                <span>{w.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Список днів матриці */}
      <div className="space-y-6">
        {filteredDays.map(day => {
          const summary = calculateDaySummary(day, project.settings, pCount, customProducts, customRecipes);

          return (
            <div
              key={day.dayNumber}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden"
            >
              {/* Шапка дня */}
              <div className="bg-slate-900 text-white p-4 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                {/* Ліва частина: Номер, Етап, Профіль */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-base font-black text-emerald-400 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                    День {day.dayNumber}
                  </span>

                  <select
                    value={day.stageId}
                    onChange={e => updateDaySettings(day.dayNumber, { stageId: e.target.value })}
                    className="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-200 font-semibold"
                  >
                    {project.stages.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>

                  <select
                    value={day.dayLoadProfile}
                    onChange={e => updateDaySettings(day.dayNumber, { dayLoadProfile: e.target.value as DayLoadProfileId })}
                    className="bg-emerald-950/80 border border-emerald-700 rounded px-2.5 py-1 text-emerald-300 font-bold"
                  >
                    {Object.entries(DAY_LOAD_PROFILES).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.name} ({Math.round(project.settings.targetDailyKcal * v.kcalMultiplier)} ккал)
                      </option>
                    ))}
                  </select>

                  <div className="flex items-center gap-1.5 bg-slate-800 px-2 py-1 rounded border border-slate-700">
                    <Mountain className="w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="number"
                      step="100"
                      value={day.altitudeMeters}
                      onChange={e => updateDaySettings(day.dayNumber, { altitudeMeters: Number(e.target.value) })}
                      className="w-16 bg-transparent text-white font-bold outline-none text-center"
                    />
                    <span className="text-slate-400 text-[10px]">м</span>
                  </div>
                </div>

                {/* Права частина: Кнопки дій над днем */}
                <div className="flex items-center gap-1.5 self-end md:self-center">
                  <button
                    onClick={() => duplicateDay(day.dayNumber)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition"
                    title="Дублювати цей день"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  {day.dayNumber > 1 && (
                    <button
                      onClick={() => swapDays(day.dayNumber, day.dayNumber - 1)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition"
                      title="Посунути вгору"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {day.dayNumber < project.days.length && (
                    <button
                      onClick={() => swapDays(day.dayNumber, day.dayNumber + 1)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition"
                      title="Посунути вниз"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {project.days.length > 1 && (
                    <button
                      onClick={() => removeDay(day.dayNumber)}
                      className="p-1.5 bg-rose-950/70 hover:bg-rose-900 text-rose-300 rounded transition border border-rose-800/50"
                      title="Видалити день"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Метрики дня та примітки */}
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-4">
                  <div>
                    <span className="text-slate-500 text-[10px] block">Вага нетто/брутто на 1 ос:</span>
                    <span className="font-bold text-slate-900">
                      {summary.totalNetWeightGrams} г <span className="text-slate-400">({summary.totalGrossWeightGrams} г)</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[10px] block">На всю групу ({pCount} ос):</span>
                    <span className="font-bold text-slate-900">{summary.totalGroupGrossWeightKg} кг</span>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[10px] block">Калорійність (факт / ціль):</span>
                    <span className="font-bold text-amber-600">
                      {summary.kcal} / {summary.recommendedKcal} ккал
                    </span>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[10px] block">Б : Ж : В:</span>
                    <span className="font-semibold text-emerald-800">{summary.bjuRatio.join(' : ')}</span>
                  </div>

                  <div>
                    <span className="text-slate-500 text-[10px] block">Клітковина:</span>
                    <span className={`font-semibold ${summary.fiberGrams < 15 ? 'text-rose-600' : 'text-slate-800'}`}>
                      {summary.fiberGrams} г
                    </span>
                  </div>
                </div>

                <div className="flex-1 min-w-[200px]">
                  <input
                    type="text"
                    value={day.notes}
                    onChange={e => updateDaySettings(day.dayNumber, { notes: e.target.value })}
                    placeholder="Нотатки дня (напр., перевал 1А, підйом серпантином...)"
                    className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-slate-700 text-xs"
                  />
                </div>
              </div>

              {/* 4 прийоми їжі */}
              <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                {mealConfigs.map(mConfig => {
                  const meal = day.meals[mConfig.type];
                  return (
                    <div
                      key={mConfig.type}
                      className={`border rounded-xl p-3.5 space-y-2.5 ${mConfig.color}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                          {mConfig.icon}
                          {mConfig.label}
                        </div>

                        <button
                          onClick={() => {
                            setQuickAddModal({ dayNumber: day.dayNumber, mealType: mConfig.type });
                            setQuickSearch('');
                          }}
                          className="px-2 py-0.5 bg-white border border-slate-300 hover:border-emerald-600 rounded text-[11px] font-semibold text-slate-700 flex items-center gap-1 transition shadow-xs"
                        >
                          <Plus className="w-3 h-3 text-emerald-600" />
                          Додати
                        </button>
                      </div>

                      {/* Елементи прийому їжі */}
                      {meal.items.length === 0 ? (
                        <div className="p-3 text-center text-slate-400 text-xs italic bg-white/60 rounded-lg border border-dashed border-slate-200">
                          Поки порожньо. Натисніть «Додати» щоб обрати страву чи продукт.
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          {meal.items.map(item => {
                            const m = calculateMealItemMetrics(item, customProducts, customRecipes);
                            return (
                              <div
                                key={item.id}
                                className="bg-white border border-slate-200 rounded-lg p-2 flex items-center justify-between gap-2 text-xs shadow-xs"
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-slate-900 truncate">
                                    {m.title}
                                  </div>
                                  <div className="text-[10px] text-slate-500">
                                    {m.kcal} ккал | Б:{m.protein}г Ж:{m.fat}г В:{m.carbs}г
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <div className="flex items-center gap-1">
                                    <input
                                      type="number"
                                      step="5"
                                      min="5"
                                      value={item.gramsPerPerson}
                                      onChange={e =>
                                        updateMealItemGrams(
                                          day.dayNumber,
                                          mConfig.type,
                                          item.id,
                                          Number(e.target.value)
                                        )
                                      }
                                      className="w-14 px-1 py-0.5 border border-slate-300 rounded text-center font-bold text-slate-800"
                                    />
                                    <span className="text-[10px] text-slate-400">г</span>
                                  </div>

                                  <select
                                    value={item.assignedParticipantId || ''}
                                    onChange={e =>
                                      assignItemParticipant(
                                        day.dayNumber,
                                        mConfig.type,
                                        item.id,
                                        e.target.value || undefined
                                      )
                                    }
                                    className="max-w-[100px] text-[11px] bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 truncate"
                                    title="Хто несе у рюкзаку"
                                  >
                                    <option value="">Не призначено</option>
                                    {project.participants.map(p => (
                                      <option key={p.id} value={p.id}>
                                        {p.name.split(' ')[0]}
                                      </option>
                                    ))}
                                  </select>

                                  <button
                                    onClick={() =>
                                      removeMealItem(day.dayNumber, mConfig.type, item.id)
                                    }
                                    className="text-slate-400 hover:text-rose-600 p-0.5"
                                    title="Видалити"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Модальне вікно швидкого додавання продукту / страви */}
      {quickAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[80vh] flex flex-col p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900">
                Додати страву в День {quickAddModal.dayNumber} ({quickAddModal.mealType})
              </h3>
              <button
                onClick={() => setQuickAddModal(null)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <input
              type="text"
              placeholder="Пошук страви або продукту..."
              value={quickSearch}
              onChange={e => setQuickSearch(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:ring-2 focus:ring-emerald-500"
            />

            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 text-xs">
              {filteredQuickItems.slice(0, 30).map(it => (
                <div
                  key={it.id}
                  onClick={() => {
                    addMealItem(quickAddModal.dayNumber, quickAddModal.mealType, {
                      sourceType: it.type,
                      sourceId: it.id,
                      gramsPerPerson: it.defaultGrams,
                    });
                    setQuickAddModal(null);
                  }}
                  className="p-2.5 rounded-lg border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 cursor-pointer transition flex items-center justify-between gap-2"
                >
                  <div>
                    <span className="font-semibold text-slate-900 block">{it.title}</span>
                    <span className="text-[10px] text-slate-500">{it.sub} • {it.defaultGrams} г/ос</span>
                  </div>
                  <span className="font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded text-[11px]">
                    + {it.defaultGrams} г
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
