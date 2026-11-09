import React from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { MealItem, MealType } from '../types/domain';
import { PRODUCTS_CATALOG } from '../data/productsCatalog';
import { DEHYDRATED_RECIPES } from '../data/dehydratedRecipes';
import { calculateMealItemMetrics } from '../domain/nutritionCalculator';
import { X, Trash2, Scale, Flame, User, Droplets, Utensils } from 'lucide-react';

interface DishDetailModalProps {
  dayNumber: number;
  mealType: MealType;
  item: MealItem;
  onClose: () => void;
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dayNumber,
  mealType,
  item,
  onClose,
}) => {
  const {
    project,
    customProducts,
    customRecipes,
    updateMealItemGrams,
    assignItemParticipant,
    removeMealItem,
  } = useProjectStore();

  const pCount = Math.max(1, project.participants.length);
  const metrics = calculateMealItemMetrics(item, customProducts, customRecipes);

  const recipe =
    item.sourceType === 'recipe'
      ? customRecipes.find(r => r.id === item.sourceId) ||
        DEHYDRATED_RECIPES.find(r => r.id === item.sourceId)
      : null;

  const product =
    item.sourceType === 'product'
      ? customProducts.find(p => p.id === item.sourceId) ||
        PRODUCTS_CATALOG.find(p => p.id === item.sourceId)
      : null;

  const handleGramsChange = (newGrams: number) => {
    const valid = Math.max(5, Math.min(500, Math.round(newGrams)));
    updateMealItemGrams(dayNumber, mealType, item.id, valid);
  };

  const handleRemove = () => {
    removeMealItem(dayNumber, mealType, item.id);
    onClose();
  };

  // Розрахунок інгредієнтів рецепта на 1 особу та на всю групу
  const recipeScale = recipe && recipe.dryWeightPerServingGrams > 0
    ? item.gramsPerPerson / recipe.dryWeightPerServingGrams
    : 1;

  const scaledIngredients = recipe
    ? recipe.rawIngredients.map(ing => {
        const perPerson = Math.round((ing.amount / (recipe.servingsYield || 1)) * recipeScale);
        const forGroup = Math.round(perPerson * pCount);
        return {
          name: ing.name,
          category: ing.category,
          perPerson,
          forGroup,
          unit: ing.unit,
        };
      })
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Шапка модалки */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-emerald-950/80 border border-emerald-500/30 rounded-xl text-xl">
              {item.sourceType === 'recipe' ? '🍲' : '🧀'}
            </span>
            <div>
              <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                Склад страви • День {dayNumber}
              </div>
              <h2 className="text-lg font-bold leading-snug">{metrics.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            title="Закрити"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Тіло модалки зі скролом */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-sm">
          {/* Блок порції та ваги */}
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-emerald-700" />
                Порція сухої ваги:
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                На групу ({pCount} ос): <b className="text-slate-900">{Math.round((item.gramsPerPerson * pCount) / 10) / 100} кг</b> ({item.gramsPerPerson * pCount} г)
              </div>
            </div>

            <div className="flex items-center gap-1.5 bg-white border border-emerald-300 rounded-lg p-1 shadow-2xs">
              <button
                type="button"
                onClick={() => handleGramsChange(item.gramsPerPerson - 10)}
                className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-bold transition flex items-center justify-center"
              >
                -10
              </button>
              <div className="flex items-center px-2">
                <input
                  type="number"
                  min="5"
                  max="500"
                  step="5"
                  value={item.gramsPerPerson}
                  onChange={e => handleGramsChange(Number(e.target.value))}
                  className="w-14 text-center font-black text-emerald-800 text-base outline-none bg-transparent"
                />
                <span className="text-xs text-slate-500 font-semibold">г/ос</span>
              </div>
              <button
                type="button"
                onClick={() => handleGramsChange(item.gramsPerPerson + 10)}
                className="w-7 h-7 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-bold transition flex items-center justify-center"
              >
                +10
              </button>
            </div>
          </div>

          {/* Склад (інгредієнти) */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm border-b pb-2 border-slate-200">
              <Utensils className="w-4 h-4 text-emerald-600" />
              Склад та інгредієнти
            </h3>

            {recipe ? (
              scaledIngredients.length > 0 ? (
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600">
                      <tr>
                        <th className="py-2 px-3 font-semibold">Інгредієнт</th>
                        <th className="py-2 px-3 text-right font-semibold">На 1 ос</th>
                        <th className="py-2 px-3 text-right font-semibold text-emerald-800">
                          На групу ({pCount} ос)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {scaledIngredients.map((ing, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60">
                          <td className="py-2 px-3 font-medium text-slate-800">
                            {ing.name}
                          </td>
                          <td className="py-2 px-3 text-right text-slate-600 font-mono">
                            {ing.perPerson} {ing.unit}
                          </td>
                          <td className="py-2 px-3 text-right font-bold text-emerald-700 font-mono">
                            {ing.forGroup} {ing.unit}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-xs text-slate-500 italic p-3 bg-slate-50 rounded-lg">
                  Склад не деталізовано.
                </div>
              )
            ) : product ? (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Категорія продукту:</span>
                  <span className="font-semibold text-slate-800">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Загальна вага на групу:</span>
                  <span className="font-bold text-emerald-700">{item.gramsPerPerson * pCount} г</span>
                </div>
                {product.packagingType && (
                  <div className="pt-2 border-t border-slate-200 text-slate-600">
                    <span className="font-semibold block text-slate-700">Упаковка та зберігання:</span>
                    {product.packagingType}
                  </div>
                )}
                {product.dryingInfo?.prepNotes && (
                  <div className="pt-1 text-slate-600">
                    <span className="font-semibold block text-slate-700">Порада з приготування:</span>
                    {product.dryingInfo.prepNotes}
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Як підготувати вдома (окреме сушіння овочів/м'яса та збірка) */}
          {recipe && recipe.homePrepSteps && recipe.homePrepSteps.length > 0 && (
            <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="font-bold text-amber-950 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-600" />
                Як зібрати сухий набір вдома (сушаться окремо лише овочі та м'ясо):
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-700 leading-relaxed">
                {recipe.homePrepSteps.map((step, sIdx) => (
                  <li key={sIdx}>{step}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Інструкція приготування в поході (якщо є) */}
          {recipe && recipe.campRehydration && (
            <div className="bg-sky-50/60 border border-sky-200 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="font-bold text-sky-900 flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-sky-700" />
                Приготування в таборі / Відновлення водою:
              </div>
              <p className="text-slate-700 leading-relaxed">
                {recipe.campRehydration.waterRatioNote}
              </p>
              <div className="flex flex-wrap gap-4 pt-1 font-semibold text-slate-700">
                {recipe.campRehydration.boilMinutes > 0 ? (
                  <span>🔥 Варіння: <b>{recipe.campRehydration.boilMinutes} хв</b></span>
                ) : (
                  <span className="text-emerald-800 font-bold">✨ Без варіння (холодна страва)</span>
                )}
                {recipe.campRehydration.soakMinutes > 0 && (
                  <span>⏳ Замочування: <b>{recipe.campRehydration.soakMinutes} хв</b></span>
                )}
                {recipe.campRehydration.altitudeNote && (
                  <span className="text-amber-800">🏔️ {recipe.campRehydration.altitudeNote}</span>
                )}
              </div>
            </div>
          )}

          {/* Хто несе у рюкзаку */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-500" />
              Хто несе цю порцію в рюкзаку:
            </label>
            <select
              value={item.assignedParticipantId || ''}
              onChange={e =>
                assignItemParticipant(
                  dayNumber,
                  mealType,
                  item.id,
                  e.target.value || undefined
                )
              }
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="">Не призначено (розподілити пізніше)</option>
              {project.participants.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.role})
                </option>
              ))}
            </select>
          </div>

          {/* Короткі поживні характеристики */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-700">
              <Flame className="w-4 h-4 text-amber-600" />
              {metrics.kcal} ккал
            </div>
            <div className="text-slate-600 flex items-center gap-3 font-medium">
              <span>Б: <b className="text-slate-800">{metrics.protein}г</b></span>
              <span>Ж: <b className="text-slate-800">{metrics.fat}г</b></span>
              <span>В: <b className="text-slate-800">{metrics.carbs}г</b></span>
              {metrics.fiber > 0 && (
                <span>Клітк.: <b className="text-slate-800">{metrics.fiber}г</b></span>
              )}
            </div>
          </div>
        </div>

        {/* Футер дій */}
        <div className="bg-slate-100 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handleRemove}
            className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Видалити страву
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-xs"
          >
            Готово
          </button>
        </div>
      </div>
    </div>
  );
};
