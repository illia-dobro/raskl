import React, { useState } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { calculateDaySummary, calculateMealItemMetrics } from '../domain/nutritionCalculator';
import { validateProjectRation } from '../domain/rationValidator';
import { DAY_LOAD_PROFILES } from '../data/climateProfiles';
import { DayLoadProfileId, MealType, MealItem } from '../types/domain';
import { DishDetailModal } from './DishDetailModal';
import { QuickAddDishModal } from './QuickAddDishModal';
import { TripSetupBar } from './TripSetupBar';
import { AutoFillModal } from './AutoFillModal';
import { projectHasMenuItems } from '../data/emptyProject';
import { PANTRY_OPTIONS, isPantryItem, PANTRY_STORAGE_MEAL } from '../domain/pantry';
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
  ChevronDown,
  ChevronUp,
  Info,
  SlidersHorizontal,
  CalendarDays,
  Sparkles,
  Wand2,
  RotateCcw,
} from 'lucide-react';

function getDishIcon(title: string): string {
  const t = title.toLowerCase();
  if (t.includes('чай') || t.includes('кава') || t.includes('какао') || t.includes('кисіль') || t.includes('ізотонік')) {
    return '☕';
  }
  if (t.includes('суп') || t.includes('борщ') || t.includes('харчо') || t.includes('бульйон') || t.includes('розсольник')) {
    return '🍲';
  }
  if (t.includes('вівс') || t.includes('гранол') || t.includes('каша') || t.includes('пластівц') || t.includes('мюслі') || t.includes('омлет')) {
    return '🥣';
  }
  if (t.includes('шоколад') || t.includes('горіх') || t.includes('курага') || t.includes('батончик') || t.includes('цукерк') || t.includes('пастила') || t.includes('халва')) {
    return '🍫';
  }
  if (t.includes('сир') || t.includes('сало') || t.includes('ковбас') || t.includes('паштет') || t.includes('хліб') || t.includes('сухар')) {
    return '🥪';
  }
  if (t.includes('гречк') || t.includes('плов') || t.includes('пюре') || t.includes('макарон') || t.includes('паста') || t.includes('кускус') || t.includes('чилі') || t.includes('рис')) {
    return '🍛';
  }
  return '🍽️';
}

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
    removeMealItem,
    addMealItem,
    updateMealItemGrams,
    clearAllMeals,
  } = useProjectStore();

  const [stageFilterRaw, setStageFilter] = useState<string>('all');
  const stageFilter =
    project.stages.length > 1 && project.stages.some(s => s.id === stageFilterRaw) ? stageFilterRaw : 'all';
  const [quickAddModal, setQuickAddModal] = useState<{ dayNumber: number; mealType: MealType } | null>(null);
  const [showAutoFillModal, setShowAutoFillModal] = useState(false);
  const [inspectDish, setInspectDish] = useState<{ dayNumber: number; mealType: MealType; item: MealItem } | null>(null);
  const [expandedDaySettings, setExpandedDaySettings] = useState<Record<number, boolean>>({});
  const [showWarnings, setShowWarnings] = useState<boolean>(false);

  const pCount = Math.max(1, project.participants.length);
  const hasMenuItems = projectHasMenuItems(project);

  const filteredDays = stageFilter === 'all'
    ? project.days
    : project.days.filter(d => d.stageId === stageFilter);

  const warnings = validateProjectRation(project, customProducts, customRecipes);

  const toggleDaySettings = (dayNum: number) => {
    setExpandedDaySettings(prev => ({ ...prev, [dayNum]: !prev[dayNum] }));
  };

  const mealConfigs: { type: MealType; label: string; icon: React.ReactNode; color: string; badgeColor: string }[] = [
    {
      type: 'breakfast',
      label: 'Сніданок',
      icon: <Coffee className="w-4 h-4 text-amber-600" />,
      color: 'bg-amber-50/40 border-amber-200/80',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      type: 'snack',
      label: 'Перекус / Карманка',
      icon: <Cookie className="w-4 h-4 text-orange-600" />,
      color: 'bg-orange-50/40 border-orange-200/80',
      badgeColor: 'bg-orange-100 text-orange-900 border-orange-300',
    },
    {
      type: 'lunch',
      label: 'Обід',
      icon: <Sun className="w-4 h-4 text-sky-600" />,
      color: 'bg-sky-50/40 border-sky-200/80',
      badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
    },
    {
      type: 'dinner',
      label: 'Вечеря',
      icon: <Moon className="w-4 h-4 text-indigo-600" />,
      color: 'bg-indigo-50/40 border-indigo-200/80',
      badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Основні параметри походу: учасники, дні, складність */}
      <TripSetupBar />

      {/* Верхня панель управління: Етап, Швидкі поради та Додавання дня */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Фільтр по етапах (якщо їх більше одного) */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {project.stages.length > 1 ? (
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold text-slate-600">Етап:</span>
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
          ) : (
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <CalendarDays className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">Розкладка меню:</span>
              <span className="font-bold text-slate-900">{project.days.length} ходових днів</span>
            </div>
          )}

          {/* Ненав'язливий бейдж порад валідатора */}
          {warnings.length > 0 && (
            <button
              onClick={() => setShowWarnings(!showWarnings)}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1.5 transition"
              title="Переглянути рекомендації"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Поради валідатора ({warnings.length})</span>
              {showWarnings ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}
        </div>

        {/* Дії розкладки: Автозаповнення, Очищення та Додавання дня */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setShowAutoFillModal(true)}
            className="flex-1 sm:flex-none px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
            title="Автоматично підібрати меню під калорії та дієту"
          >
            <Wand2 className="w-3.5 h-3.5 text-emerald-600" />
            Заповнити за фільтром
          </button>

          {hasMenuItems && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Очистити всі страви з розкладки та почати вручну з чистого аркуша?')) {
                  clearAllMeals();
                }
              }}
              className="px-3 py-2 bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-700 border border-slate-200 hover:border-rose-200 rounded-xl text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
              title="Очистити всі страви (перейти в ручний режим)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Очистити
            </button>
          )}

          <button
            type="button"
            onClick={() => addDay(stageFilter === 'all' ? project.stages[0]?.id : stageFilter)}
            className="flex-1 sm:flex-none px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Додати день
          </button>
        </div>
      </div>

      {/* Якщо розкладка порожня — показуємо банер вибору режиму */}
      {!hasMenuItems && (
        <div className="bg-gradient-to-r from-emerald-50/90 via-teal-50/80 to-sky-50/90 border border-emerald-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[11px] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              2 режими створення розкладки
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              Розкладка готова. Оберіть як почати:
            </h3>
            <p className="text-xs text-slate-600 max-w-xl">
              <b>1. Автоматично за фільтром:</b> система сама підбере сніданки, супи, другі страви та перекуси під ціль {project.settings.targetDailyKcal} ккал/день.
              <br />
              <b>2. Вручну:</b> просто натискайте «+ Додати страву» у потрібних прийомах їжі нижче.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowAutoFillModal(true)}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition cursor-pointer"
            >
              <Wand2 className="w-4 h-4" />
              Заповнити за фільтром
            </button>
          </div>
        </div>
      )}

      {/* Компактний блок порад валідатора (розкривається за бажанням) */}
      {showWarnings && warnings.length > 0 && (
        <div className="bg-amber-50/80 border border-amber-300 rounded-2xl p-4 space-y-2 text-xs animate-in fade-in duration-150">
          <div className="flex items-center justify-between font-bold text-amber-950 pb-1 border-b border-amber-200">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Поради щодо балансу меню та ваги:
            </span>
            <button
              onClick={() => setShowWarnings(false)}
              className="text-amber-800 hover:text-amber-950 font-semibold"
            >
              Сховати ✕
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {warnings.map(w => (
              <div
                key={w.id}
                className="p-2.5 rounded-xl bg-white/80 border border-amber-200 text-slate-800 flex items-start gap-2"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 shrink-0">
                  {w.type}
                </span>
                <span className="text-xs leading-relaxed">{w.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Список днів матриці розкладки */}
      <div className="space-y-6">
        {filteredDays.map(day => {
          const summary = calculateDaySummary(day, project.settings, pCount, customProducts, customRecipes);
          const isSettingsOpen = !!expandedDaySettings[day.dayNumber];

          return (
            <div
              key={day.dayNumber}
              className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden transition"
            >
              {/* Шапка дня: Номер, назва, вага/калорії та дії */}
              <div className="bg-slate-900 text-white px-4 py-3 flex flex-wrap items-center justify-between gap-3">
                {/* Ліва частина: Номер дня та підсумок */}
                <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-emerald-400 bg-slate-800 px-3 py-1 rounded-xl border border-slate-700">
                    День {day.dayNumber}
                  </span>

                  {/* Компактний бейдж ваги та калорій */}
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-800/80 px-3 py-1 rounded-xl border border-slate-700/60">
                    <span className="text-white font-bold">{summary.totalNetWeightGrams} г/ос</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-amber-400 font-bold">{summary.kcal} ккал</span>
                  </div>

                  {/* Нотатки або підпис дня */}
                  <input
                    type="text"
                    value={day.notes || ''}
                    onChange={e => updateDaySettings(day.dayNumber, { notes: e.target.value })}
                    placeholder="Підпис дня (напр. Підйом на хребет, днівка...)"
                    className="hidden sm:block bg-transparent border-b border-transparent hover:border-slate-600 focus:border-emerald-500 text-slate-300 text-xs px-2 py-0.5 outline-none transition max-w-xs truncate"
                  />
                </div>

                {/* Права частина: Кнопки дій */}
                <div className="flex items-center gap-1.5">
                  {/* Кнопка налаштувань дня (висота, етап) */}
                  <button
                    onClick={() => toggleDaySettings(day.dayNumber)}
                    className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                      isSettingsOpen
                        ? 'bg-slate-700 text-white'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white'
                    }`}
                    title="Налаштування дня (висота, профіль)"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span className="hidden md:inline text-[11px]">Параметри</span>
                  </button>

                  {/* Дублювати */}
                  <button
                    onClick={() => duplicateDay(day.dayNumber)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                    title="Дублювати цей день у наступний"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  {/* Перемістити вгору */}
                  {day.dayNumber > 1 && (
                    <button
                      onClick={() => swapDays(day.dayNumber, day.dayNumber - 1)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                      title="Посунути вище"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Перемістити вниз */}
                  {day.dayNumber < project.days.length && (
                    <button
                      onClick={() => swapDays(day.dayNumber, day.dayNumber + 1)}
                      className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition"
                      title="Посунути нижче"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Видалити день */}
                  {project.days.length > 1 && (
                    <button
                      onClick={() => removeDay(day.dayNumber)}
                      className="p-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-300 rounded-lg transition border border-rose-800/40"
                      title="Видалити цей день"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Додаткові параметри дня (приховані за замовчуванням) */}
              {isSettingsOpen && (
                <div className="bg-slate-100/80 border-b border-slate-200 px-4 py-3 flex flex-wrap items-center gap-4 text-xs animate-in fade-in duration-100">
                  {project.stages.length > 1 && (
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-600">Етап:</span>
                    <select
                      value={day.stageId}
                      onChange={e => updateDaySettings(day.dayNumber, { stageId: e.target.value })}
                      className="bg-white border border-slate-300 rounded px-2.5 py-1 text-slate-800 font-semibold"
                    >
                      {project.stages.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  )}

                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-600">Навантаження:</span>
                    <select
                      value={day.dayLoadProfile}
                      onChange={e => updateDaySettings(day.dayNumber, { dayLoadProfile: e.target.value as DayLoadProfileId })}
                      className="bg-white border border-slate-300 rounded px-2.5 py-1 text-slate-800 font-semibold"
                    >
                      {Object.entries(DAY_LOAD_PROFILES).map(([k, v]) => (
                        <option key={k} value={k}>
                          {v.name} ({Math.round(project.settings.targetDailyKcal * v.kcalMultiplier)} ккал)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5 bg-white border border-slate-300 px-2 py-1 rounded">
                    <Mountain className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-slate-500 font-medium">Висота:</span>
                    <input
                      type="number"
                      step="100"
                      value={day.altitudeMeters}
                      onChange={e => updateDaySettings(day.dayNumber, { altitudeMeters: Number(e.target.value) })}
                      className="w-16 text-slate-800 font-bold outline-none text-center"
                    />
                    <span className="text-slate-500">м</span>
                  </div>

                  <div className="flex-1 min-w-[200px]">
                    <input
                      type="text"
                      value={day.notes}
                      onChange={e => updateDaySettings(day.dayNumber, { notes: e.target.value })}
                      placeholder="Нотатки дня (перевал, джерело води, стоянка...)"
                      className="w-full bg-white border border-slate-300 rounded px-2.5 py-1 text-slate-800 text-xs"
                    />
                  </div>
                </div>
              )}

              {/* 4 прийоми їжі: Сніданок, Перекус, Обід, Вечеря */}
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {mealConfigs.map(mConfig => {
                  const meal = { ...day.meals[mConfig.type], items: day.meals[mConfig.type].items.filter(it => !isPantryItem(it)) };

                  return (
                    <div
                      key={mConfig.type}
                      className={`border rounded-2xl p-3 flex flex-col justify-between space-y-3 ${mConfig.color}`}
                    >
                      {/* Шапка прийому їжі */}
                      <div className="flex items-center justify-between pb-1.5 border-b border-slate-200/60">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
                          {mConfig.icon}
                          {mConfig.label}
                        </div>
                        <span className="text-[10px] text-slate-500 font-semibold">
                          {meal.items.length} {meal.items.length === 1 ? 'страва' : 'страв'}
                        </span>
                      </div>

                      {/* Список страв прийому їжі */}
                      <div className="space-y-1.5 flex-1 min-h-[60px]">
                        {meal.items.length === 0 ? (
                          <div
                            onClick={() => setQuickAddModal({ dayNumber: day.dayNumber, mealType: mConfig.type })}
                            className="p-3 text-center text-slate-400 hover:text-emerald-700 text-xs italic bg-white/70 hover:bg-emerald-50/50 rounded-xl border border-dashed border-slate-300 hover:border-emerald-400 cursor-pointer transition flex flex-col items-center justify-center gap-1 h-full"
                          >
                            <Plus className="w-3.5 h-3.5 text-slate-400" />
                            <span>Порожньо. Натисніть, щоб додати</span>
                          </div>
                        ) : (
                          meal.items.map(item => {
                            const m = calculateMealItemMetrics(item, customProducts, customRecipes);
                            const icon = getDishIcon(m.title);

                            return (
                              <div
                                key={item.id}
                                className="bg-white border border-slate-200 hover:border-emerald-400 rounded-xl p-2.5 flex items-center justify-between gap-2 shadow-2xs group transition"
                              >
                                {/* Клікабельна назва страви */}
                                <div
                                  onClick={() => item.sourceType === 'recipe' && setInspectDish({ dayNumber: day.dayNumber, mealType: mConfig.type, item })}
                                  className={`flex items-center gap-2 flex-1 min-w-0 ${item.sourceType === 'recipe' ? 'cursor-pointer' : ''}`}
                                  title={item.sourceType === 'recipe' ? 'Натисніть, щоб переглянути склад' : undefined}
                                >
                                  <span className="text-base shrink-0">{icon}</span>
                                  <div className="min-w-0 flex-1">
                                    <div className="font-bold text-slate-900 text-xs truncate group-hover:text-emerald-800">
                                      {m.title}
                                    </div>
                                    <div className="text-[10px] text-slate-500 font-medium">
                                      {item.gramsPerPerson} г/ос • {m.kcal} ккал
                                    </div>
                                  </div>
                                </div>

                                {/* Кнопки: «Склад» та «Видалити» */}
                                <div className="flex items-center gap-1 shrink-0">
                                  {item.sourceType === 'recipe' && (
                                    <button
                                      type="button"
                                      onClick={() => setInspectDish({ dayNumber: day.dayNumber, mealType: mConfig.type, item })}
                                      className="px-2 py-1 bg-slate-100 hover:bg-emerald-100 text-slate-700 hover:text-emerald-900 rounded-lg text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
                                      title="Відкрити окремо склад і пропорції"
                                    >
                                      <Info className="w-3 h-3 text-slate-500 group-hover:text-emerald-700" />
                                      Склад
                                    </button>
                                  )}

                                  <button
                                    type="button"
                                    onClick={() => removeMealItem(day.dayNumber, mConfig.type, item.id)}
                                    className="p-1 text-slate-300 hover:text-rose-600 rounded transition cursor-pointer"
                                    title="Видалити"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>

                      {/* Кнопка швидкого додавання страви */}
                      <button
                        type="button"
                        onClick={() => setQuickAddModal({ dayNumber: day.dayNumber, mealType: mConfig.type })}
                        className="w-full py-2 bg-white hover:bg-emerald-50 border border-slate-300 hover:border-emerald-500 rounded-xl text-xs font-bold text-slate-700 hover:text-emerald-800 flex items-center justify-center gap-1.5 transition shadow-2xs cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 text-emerald-600" />
                        Додати страву
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Базові речі: чай, кава, цукор, сіль, приправи — окремо від страв */}
              <div className="px-4 pb-4">
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 flex flex-wrap items-center gap-2 text-xs">
                  <span className="font-bold text-slate-600 mr-1">☕🧂 Напої, сіль, цукор на день:</span>
                  {PANTRY_OPTIONS.map(opt => {
                    let found: { mealType: MealType; item: MealItem } | null = null;
                    (['breakfast', 'snack', 'lunch', 'dinner'] as MealType[]).forEach(mt => {
                      day.meals[mt].items.forEach(it => {
                        if (!found && it.sourceType === 'product' && it.sourceId === opt.id) {
                          found = { mealType: mt, item: it };
                        }
                      });
                    });
                    const entry = found as { mealType: MealType; item: MealItem } | null;

                    if (!entry) {
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() =>
                            addMealItem(day.dayNumber, PANTRY_STORAGE_MEAL, {
                              sourceType: 'product',
                              sourceId: opt.id,
                              gramsPerPerson: opt.defaultGrams,
                            })
                          }
                          className="px-2 py-1 bg-white border border-dashed border-slate-300 hover:border-emerald-500 hover:text-emerald-800 text-slate-500 rounded-lg font-semibold transition cursor-pointer"
                        >
                          + {opt.label}
                        </button>
                      );
                    }

                    return (
                      <span
                        key={opt.id}
                        className="px-2 py-1 bg-white border border-slate-300 rounded-lg flex items-center gap-1.5"
                        title={opt.hint}
                      >
                        <span className="font-semibold text-slate-800">{opt.label}</span>
                        <input
                          type="number"
                          min="1"
                          value={entry.item.gramsPerPerson}
                          onChange={e =>
                            updateMealItemGrams(day.dayNumber, entry.mealType, entry.item.id, Math.max(1, Number(e.target.value)))
                          }
                          className="w-10 text-center font-bold text-slate-800 outline-none border-b border-slate-200"
                        />
                        <span className="text-[10px] text-slate-400">г/ос</span>
                        <button
                          type="button"
                          onClick={() => removeMealItem(day.dayNumber, entry.mealType, entry.item.id)}
                          className="text-slate-300 hover:text-rose-600 cursor-pointer"
                          title="Прибрати"
                        >
                          ✕
                        </button>
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Кнопка додавання дня внизу */}
      <div className="text-center pt-2 pb-6">
        <button
          onClick={() => addDay(stageFilter === 'all' ? project.stages[0]?.id : stageFilter)}
          className="px-6 py-3 bg-white hover:bg-emerald-50 border-2 border-dashed border-emerald-400 hover:border-emerald-600 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 mx-auto shadow-xs transition cursor-pointer"
        >
          <Plus className="w-4 h-4 text-emerald-600" />
          Додати ще один ходовий день
        </button>
      </div>

      {/* Модальне вікно вибору страви (легке створення в 1 клік) */}
      {quickAddModal && (
        <QuickAddDishModal
          dayNumber={quickAddModal.dayNumber}
          mealType={quickAddModal.mealType}
          onClose={() => setQuickAddModal(null)}
        />
      )}

      {/* Модальне вікно складу страви («якщо склад то окремо відкривати») */}
      {inspectDish && (
        <DishDetailModal
          dayNumber={inspectDish.dayNumber}
          mealType={inspectDish.mealType}
          item={inspectDish.item}
          onClose={() => setInspectDish(null)}
        />
      )}

      {/* Модальне вікно автозаповнення за фільтром */}
      {showAutoFillModal && (
        <AutoFillModal onClose={() => setShowAutoFillModal(false)} />
      )}
    </div>
  );
};
