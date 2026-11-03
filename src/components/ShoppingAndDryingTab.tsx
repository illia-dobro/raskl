import React, { useState } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { calculateShoppingAndDryingPlan } from '../domain/shoppingAndDryingCalculator';
import { calculateWaterAndFuelNeeds } from '../domain/waterAndFuelCalculator';
import { ShoppingCart, Flame, CheckSquare, Square, Package } from 'lucide-react';

export const ShoppingAndDryingTab: React.FC = () => {
  const {
    project,
    customProducts,
    customRecipes,
    checkedShoppingIds,
    checkedDryingIds,
    toggleShoppingCheck,
    toggleDryingCheck,
  } = useProjectStore();

  const [stageFilter, setStageFilter] = useState<string>('all');

  const { shoppingItems, dryingTasks } = calculateShoppingAndDryingPlan(
    project,
    stageFilter === 'all' ? undefined : stageFilter,
    customProducts,
    customRecipes
  );

  const fuel = calculateWaterAndFuelNeeds(project);

  const totalDryGrams = shoppingItems.reduce((acc, it) => acc + it.dryWeightTotalGrams, 0);
  const totalRawGrams = shoppingItems.reduce((acc, it) => acc + it.rawWeightTotalGrams, 0);

  const totalDryingDryGrams = dryingTasks.reduce((acc, t) => acc + t.dryWeightTotalGrams, 0);
  const totalDryingRawGrams = dryingTasks.reduce((acc, t) => acc + t.rawWeightTotalGrams, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Панель вибору етапу та паливна зводка */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Фільтр етапу */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-2 flex flex-col justify-between">
          <div>
            <label className="block text-xs font-bold text-slate-700">Фільтр по етапах (забросках):</label>
            <select
              value={stageFilter}
              onChange={e => setStageFilter(e.target.value)}
              className="w-full mt-1.5 px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 outline-none"
            >
              <option value="all">Весь похід ({project.days.length} днів разом)</option>
              {project.stages.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-2 border-t border-slate-100 text-xs flex justify-between text-slate-600">
            <span>Суха вага в рюкзаках: <b>{(totalDryGrams / 1000).toFixed(2)} кг</b></span>
            <span>Сира вага в магазині: <b className="text-emerald-700">{(totalRawGrams / 1000).toFixed(2)} кг</b></span>
          </div>
        </div>

        {/* Розрахунок газу / палива */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white shadow-sm lg:col-span-2 flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-emerald-400" />
              Розрахунок похідного палива ({project.settings.fuelType === 'gas' ? 'Газ' : 'Рідке паливо'})
            </h3>
            <span className="text-[11px] text-slate-400">
              Висота: {project.settings.maxAltitudeMeters} м ({project.settings.meltsSnowForWater ? 'топимо сніг' : 'рідка вода'})
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700">
              <span className="text-[10px] text-slate-400 block">Норма / ос-день</span>
              <span className="font-bold text-amber-400">{fuel.dailyGasPerPersonGrams} г газу</span>
            </div>
            <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700">
              <span className="text-[10px] text-slate-400 block">Загальна вага газу</span>
              <span className="font-bold text-white">{fuel.totalGasGrams} г (+10% рез.)</span>
            </div>
            <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700">
              <span className="text-[10px] text-slate-400 block">Балони 450 г</span>
              <span className="font-black text-emerald-400 text-sm">{fuel.canisters450gCount} шт</span>
            </div>
            <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700">
              <span className="text-[10px] text-slate-400 block">Балони 230 г</span>
              <span className="font-black text-emerald-400 text-sm">{fuel.canisters230gCount} шт</span>
            </div>
          </div>
        </div>
      </div>

      {/* Розділ 1: Список покупок у магазині (Сира вага) */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-emerald-600" />
              Список покупок для магазину (СИРА вага для закупки)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Для страв і продуктів, які сушаться вдома, автоматично вираховано коефіцієнт усушки (наприклад, 1 кг сушеного вареного фаршу = 3.3 кг сирого м'яса).
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full self-start sm:self-center">
            Позицій: {shoppingItems.length}
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="min-w-full text-xs divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-900 font-semibold">
              <tr>
                <th className="w-8 px-2 py-2.5 text-center">✓</th>
                <th className="px-3 py-2.5 text-left">Категорія</th>
                <th className="px-3 py-2.5 text-left">Похідна страва / Назва</th>
                <th className="px-3 py-2.5 text-center">Суха вага в похід</th>
                <th className="px-3 py-2.5 text-center text-emerald-800">СИРА вага для магазину</th>
                <th className="px-3 py-2.5 text-left">Що купувати / Склад сировини</th>
                <th className="px-3 py-2.5 text-center">Сушіння</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {shoppingItems.map(item => {
                const isChecked = Boolean(checkedShoppingIds[item.id]);
                return (
                  <tr
                    key={item.id}
                    onClick={() => toggleShoppingCheck(item.id)}
                    className={`cursor-pointer transition ${
                      isChecked ? 'bg-emerald-50/50 text-slate-400 line-through' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="px-2 py-2 text-center">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-emerald-600 inline" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300 inline" />
                      )}
                    </td>
                    <td className="px-3 py-2 text-slate-500 font-medium">{item.category}</td>
                    <td className="px-3 py-2 font-bold text-slate-900">{item.name}</td>
                    <td className="px-3 py-2 text-center font-semibold text-slate-700">
                      {item.dryWeightTotalGrams >= 1000
                        ? `${(item.dryWeightTotalGrams / 1000).toFixed(2)} кг`
                        : `${item.dryWeightTotalGrams} г`}
                    </td>
                    <td className="px-3 py-2 text-center font-black text-emerald-700 text-sm">
                      {item.rawWeightTotalGrams >= 1000
                        ? `${(item.rawWeightTotalGrams / 1000).toFixed(2)} кг`
                        : `${item.rawWeightTotalGrams} г`}
                    </td>
                    <td className="px-3 py-2 text-slate-700">{item.rawProductName}</td>
                    <td className="px-3 py-2 text-center">
                      {item.isDehydratedAtHome ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-900 font-bold">
                          Сушарка
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[10px]">Готове</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Розділ 2: План сушіння в дегідраторі (Чек-ліст) */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-600" />
              План сушіння в дегідраторі (Чек-ліст підготовки завгоспа)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Всі домашні сушені страви одного казана за Backpack Gourmet: температура, час, тест на сухість та інструкції.
            </p>
          </div>
          <span className="text-xs font-semibold text-amber-900 bg-amber-100 px-3 py-1 rounded-full self-start sm:self-center">
            Разом висушити: {(totalDryingRawGrams / 1000).toFixed(2)} кг сировини → {(totalDryingDryGrams / 1000).toFixed(2)} кг сух
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="min-w-full text-xs divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-900 font-semibold">
              <tr>
                <th className="w-8 px-2 py-2.5 text-center">✓</th>
                <th className="px-3 py-2.5 text-left">Страва / Напівфабрикат</th>
                <th className="px-2 py-2.5 text-center">Порцій</th>
                <th className="px-3 py-2.5 text-center">Суха вага</th>
                <th className="px-3 py-2.5 text-center text-emerald-800">Сира вага</th>
                <th className="px-3 py-2.5 text-center">Температура</th>
                <th className="px-3 py-2.5 text-center">Час</th>
                <th className="px-3 py-2.5 text-left">Тест на сухість</th>
                <th className="px-3 py-2.5 text-left">Поради з підготовки</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {dryingTasks.map(task => {
                const isChecked = Boolean(checkedDryingIds[task.id]);
                return (
                  <tr
                    key={task.id}
                    onClick={() => toggleDryingCheck(task.id)}
                    className={`cursor-pointer transition ${
                      isChecked ? 'bg-amber-50/50 text-slate-400 line-through' : 'hover:bg-slate-50/80'
                    }`}
                  >
                    <td className="px-2 py-2 text-center">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-amber-600 inline" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-300 inline" />
                      )}
                    </td>
                    <td className="px-3 py-2 font-bold text-slate-900">{task.title}</td>
                    <td className="px-2 py-2 text-center font-semibold">{task.servingsCountTotal}</td>
                    <td className="px-3 py-2 text-center font-semibold text-slate-700">
                      {task.dryWeightTotalGrams >= 1000
                        ? `${(task.dryWeightTotalGrams / 1000).toFixed(2)} кг`
                        : `${task.dryWeightTotalGrams} г`}
                    </td>
                    <td className="px-3 py-2 text-center font-black text-emerald-700">
                      {task.rawWeightTotalGrams >= 1000
                        ? `${(task.rawWeightTotalGrams / 1000).toFixed(2)} кг`
                        : `${task.rawWeightTotalGrams} г`}
                    </td>
                    <td className="px-3 py-2 text-center font-bold text-amber-700">{task.tempCelsius}°C</td>
                    <td className="px-3 py-2 text-center font-medium">{task.timeHours}</td>
                    <td className="px-3 py-2 text-slate-700">{task.drynessTest}</td>
                    <td className="px-3 py-2 text-slate-600 text-[11px]">{task.prepNotes}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
