import React, { useState } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { PRODUCTS_CATALOG } from '../data/productsCatalog';
import { DEHYDRATED_RECIPES } from '../data/dehydratedRecipes';
import {
  Product,
  DehydratedRecipe,
  MealType,
} from '../types/domain';
import {
  Search,
  Plus,
  Flame,
  ChefHat,
  Apple,
  Info,
  Clock,
  Droplets,
  PackageCheck,
} from 'lucide-react';

export const CatalogAndRecipesTab: React.FC = () => {
  const { project, customProducts, customRecipes, addMealItem } = useProjectStore();

  const [activeView, setActiveView] = useState<'recipes' | 'products'>('recipes');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [detailRecipe, setDetailRecipe] = useState<DehydratedRecipe | null>(null);

  // Стан для додавання в меню
  const [targetDay, setTargetDay] = useState<number>(1);
  const [targetMeal, setTargetMeal] = useState<MealType>('dinner');
  const [portionGrams, setPortionGrams] = useState<number>(85);

  const allProducts = [...PRODUCTS_CATALOG, ...customProducts];
  const allRecipes = [...DEHYDRATED_RECIPES, ...customRecipes];

  const filteredRecipes = allRecipes.filter(r => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      r.title.toLowerCase().includes(q) ||
      r.rawIngredients.some(i => i.name.toLowerCase().includes(q));
    const matchCat = selectedCategory === 'all' || r.category === selectedCategory || r.mealTypes.includes(selectedCategory as MealType);
    return matchSearch && matchCat;
  });

  const filteredProducts = allProducts.filter(p => {
    const q = searchTerm.toLowerCase();
    const matchSearch = p.name.toLowerCase().includes(q);
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleAddRecipeToMenu = (recipe: DehydratedRecipe) => {
    addMealItem(targetDay, targetMeal, {
      sourceType: 'recipe',
      sourceId: recipe.id,
      gramsPerPerson: portionGrams || recipe.dryWeightPerServingGrams,
    });
    alert(`«${recipe.title}» додано в День ${targetDay} (${targetMeal})!`);
  };

  const handleAddProductToMenu = (product: Product) => {
    addMealItem(targetDay, targetMeal, {
      sourceType: 'product',
      sourceId: product.id,
      gramsPerPerson: portionGrams || product.recommendedNormGrams.default,
    });
    alert(`«${product.name}» додано в День ${targetDay} (${targetMeal})!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Верхня панель вибору режиму та призначення в день */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Перемикач Рецепти / Продукти */}
        <div className="flex bg-slate-100 p-1 rounded-lg">
          <button
            onClick={() => {
              setActiveView('recipes');
              setSelectedCategory('all');
            }}
            className={`px-4 py-2 rounded-md text-xs font-bold transition flex items-center gap-2 ${
              activeView === 'recipes'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ChefHat className="w-4 h-4" />
            Рецепти сушених страв ({allRecipes.length})
          </button>

          <button
            onClick={() => {
              setActiveView('products');
              setSelectedCategory('all');
            }}
            className={`px-4 py-2 rounded-md text-xs font-bold transition flex items-center gap-2 ${
              activeView === 'products'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Apple className="w-4 h-4" />
            Каталог продуктів ({allProducts.length})
          </button>
        </div>

        {/* Швидке додавання у вибраний день */}
        <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-xs">
          <span className="text-slate-500 font-semibold">Додати в меню:</span>
          <select
            value={targetDay}
            onChange={e => setTargetDay(Number(e.target.value))}
            className="bg-white border border-slate-300 rounded px-2 py-1 font-bold text-slate-800"
          >
            {project.days.map(d => (
              <option key={d.dayNumber} value={d.dayNumber}>
                День {d.dayNumber}
              </option>
            ))}
          </select>

          <select
            value={targetMeal}
            onChange={e => setTargetMeal(e.target.value as MealType)}
            className="bg-white border border-slate-300 rounded px-2 py-1 font-bold text-slate-800"
          >
            <option value="breakfast">Сніданок</option>
            <option value="snack">Перекус</option>
            <option value="lunch">Обід</option>
            <option value="dinner">Вечеря</option>
          </select>

          <div className="flex items-center gap-1">
            <input
              type="number"
              step="5"
              min="5"
              value={portionGrams}
              onChange={e => setPortionGrams(Number(e.target.value))}
              className="w-16 bg-white border border-slate-300 rounded px-1.5 py-1 text-center font-bold"
            />
            <span className="text-slate-400 text-[10px]">г/ос</span>
          </div>
        </div>
      </div>

      {/* Пошук та фільтри категорій */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder={activeView === 'recipes' ? 'Пошук страви або продукту (чілі, борщ, хумус, паста...)' : 'Пошук продукту (гречка, сало, яловичина, висівки...)'}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {activeView === 'recipes' ? (
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 outline-none"
          >
            <option value="all">Всі типи страв</option>
            <option value="breakfast">Сніданки</option>
            <option value="soup">Супи та борщі</option>
            <option value="main">Другі страви та пасти</option>
            <option value="spread">Намазки та паштети</option>
            <option value="snack">Снеки та батончики</option>
          </select>
        ) : (
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-700 outline-none"
          >
            <option value="all">Всі категорії продуктів</option>
            <option value="grains">Крупи та макарони</option>
            <option value="meat_fish">М'ясо, риба, тушонка</option>
            <option value="dairy_eggs">Молочні та яйця</option>
            <option value="fats">Жири та сало</option>
            <option value="sweets">Солодощі та шоколад</option>
            <option value="dried_fruits_nuts">Сухофрукти та горіхи</option>
            <option value="vegetables_mushrooms">Сушені овочі та гриби</option>
            <option value="bread_crackers">Хліб, сухарі, галети</option>
            <option value="soups_concentrates">Супи та концентрати</option>
            <option value="supplements">Висівки, льон, ізотоніки</option>
          </select>
        )}
      </div>

      {/* Список карток: Рецепти або Продукти */}
      {activeView === 'recipes' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecipes.map(recipe => (
            <div
              key={recipe.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{recipe.title}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                    {recipe.dryWeightPerServingGrams} г сух
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 mt-1 italic">{recipe.sourceBook}</p>

                {/* Нутрієнти порції */}
                <div className="grid grid-cols-4 gap-1 mt-2.5 p-2 bg-slate-50 rounded-lg text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Ккал</span>
                    <span className="font-bold text-amber-600">{recipe.kcalPerServing}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Білки</span>
                    <span className="font-semibold text-slate-800">{recipe.proteinPerServing} г</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Жири</span>
                    <span className="font-semibold text-slate-800">{recipe.fatPerServing} г</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Вуглеводи</span>
                    <span className="font-semibold text-slate-800">{recipe.carbsPerServing} г</span>
                  </div>
                </div>

                {/* Параметри дегідратора та відновлення */}
                <div className="mt-3 space-y-1 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Дегідратор: <b>{recipe.dehydrationParams.tempCelsius}°C</b> ({recipe.dehydrationParams.timeHours})</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px]">
                    <Droplets className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                    <span className="line-clamp-1">{recipe.campRehydration.waterRatioNote}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setDetailRecipe(recipe)}
                  className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
                >
                  <Info className="w-3.5 h-3.5" />
                  Технологія
                </button>

                <button
                  onClick={() => handleAddRecipeToMenu(recipe)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold flex items-center gap-1 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  В день {targetDay}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Каталог окремих продуктів */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{product.name}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 shrink-0">
                    {product.recommendedNormGrams.default} г / ос
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                    {product.category}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Засвоєння: {product.digestibilityPercent}%
                  </span>
                </div>

                {/* Нутрієнти на 100 г */}
                <div className="grid grid-cols-4 gap-1 mt-2.5 p-2 bg-slate-50 rounded-lg text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Ккал/100г</span>
                    <span className="font-bold text-amber-600">{product.kcalPer100g}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Білки</span>
                    <span className="font-semibold text-slate-800">{product.proteinPer100g} г</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Жири</span>
                    <span className="font-semibold text-slate-800">{product.fatPer100g} г</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Вуглеводи</span>
                    <span className="font-semibold text-slate-800">{product.carbsPer100g} г</span>
                  </div>
                </div>

                {product.fiberPer100g > 0 && (
                  <div className="mt-2 text-[11px] text-emerald-800 bg-emerald-50/70 px-2 py-1 rounded flex items-center justify-between">
                    <span>Харчові волокна (клітковина):</span>
                    <span className="font-bold">{product.fiberPer100g} г / 100г</span>
                  </div>
                )}

                {product.dryingInfo && (
                  <div className="mt-2 text-[11px] text-amber-900 bg-amber-50 p-2 rounded space-y-0.5">
                    <span className="font-bold block">🏠 Сушиться вдома:</span>
                    <span>100 г сух = <b>{Math.round(100 * product.dryingInfo.rawToDryRatio)} г</b> сировини ({product.dryingInfo.rawProductName})</span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-500 line-clamp-1">{product.packagingType}</span>
                <button
                  onClick={() => handleAddProductToMenu(product)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold flex items-center gap-1 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  В день {targetDay}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Модальне вікно детального перегляду рецепта */}
      {detailRecipe && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Рецепт Backpack Gourmet</span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">{detailRecipe.title}</h3>
                <p className="text-xs text-slate-500">{detailRecipe.sourceBook}</p>
              </div>
              <button
                onClick={() => setDetailRecipe(null)}
                className="text-slate-400 hover:text-slate-600 text-xl font-bold p-1"
              >
                ✕
              </button>
            </div>

            {/* Сирі інгредієнти для домашнього готування */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                <PackageCheck className="w-4 h-4 text-emerald-600" />
                Сирі інгредієнти для закупки (на {detailRecipe.servingsYield} порцій):
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {detailRecipe.rawIngredients.map((ing, iIdx) => (
                  <li key={iIdx} className="p-2 bg-slate-50 rounded border border-slate-100 flex justify-between">
                    <span className="font-medium text-slate-800">{ing.name}</span>
                    <span className="font-bold text-emerald-700">{ing.amount} {ing.unit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Домашнє приготування */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 mb-1.5">Кроки приготування вдома перед сушінням:</h4>
              <ol className="list-decimal list-inside space-y-1 text-xs text-slate-700 leading-relaxed">
                {detailRecipe.homePrepSteps.map((step, stIdx) => (
                  <li key={stIdx}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Дегідратор */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 text-xs space-y-1.5">
              <h4 className="font-bold text-amber-950 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-600" />
                Режим дегідратора:
              </h4>
              <div className="grid grid-cols-2 gap-2 text-amber-900">
                <div>Температура: <b>{detailRecipe.dehydrationParams.tempCelsius}°C (145°F)</b></div>
                <div>Час: <b>{detailRecipe.dehydrationParams.timeHours}</b></div>
                <div>Піддон: <b>{detailRecipe.dehydrationParams.trayLining}</b></div>
                <div>Тест сухості: <b>{detailRecipe.dehydrationParams.drynessTest}</b></div>
              </div>
            </div>

            {/* Відновлення в поході */}
            <div className="bg-sky-50 border border-sky-200/80 rounded-xl p-3 text-xs space-y-1.5 text-sky-950">
              <h4 className="font-bold flex items-center gap-1.5 text-sky-900">
                <Droplets className="w-4 h-4 text-sky-600" />
                Приготування в таборі (Camp Rehydration):
              </h4>
              <p>{detailRecipe.campRehydration.waterRatioNote}. Варити на слабкому вогні: <b>{detailRecipe.campRehydration.boilMinutes} хв</b>.</p>
              {detailRecipe.campRehydration.altitudeNote && (
                <p className="text-sky-800 font-medium">🏔️ {detailRecipe.campRehydration.altitudeNote}</p>
              )}
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setDetailRecipe(null)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Закрити
              </button>
              <button
                onClick={() => {
                  handleAddRecipeToMenu(detailRecipe);
                  setDetailRecipe(null);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Додати в День {targetDay}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
