import React, { useState, useMemo } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { MealType, DehydratedRecipe } from '../types/domain';
import { PRODUCTS_CATALOG } from '../data/productsCatalog';
import { DEHYDRATED_RECIPES } from '../data/dehydratedRecipes';
import { PANTRY_PRODUCT_IDS } from '../domain/pantry';
import { X, Search, Plus, Sparkles, Coffee, Sun, Moon, Cookie, Check } from 'lucide-react';

interface QuickAddDishModalProps {
  dayNumber: number;
  mealType: MealType;
  onClose: () => void;
}

type CategoryTab = 'popular' | 'breakfast' | 'soup' | 'main' | 'snack' | 'drink' | 'all';

export const QuickAddDishModal: React.FC<QuickAddDishModalProps> = ({
  dayNumber,
  mealType,
  onClose,
}) => {
  const {
    addMealItem,
    addCustomRecipe,
    customProducts,
    customRecipes,
  } = useProjectStore();

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryTab>('popular');
  const [customTitle, setCustomTitle] = useState('');
  const [customGrams, setCustomGrams] = useState(80);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Список популярних готових страв для швидкого кліку
  const popularDishIds = useMemo(() => [
    'recipe-granola-alpine',
    'recipe-oatmeal-apple-cinnamon',
    'recipe-borscht-traditional',
    'recipe-pea-soup-smoked',
    'recipe-buckwheat-merchant-beef',
    'recipe-plov-uzbek-beef',
    'recipe-mashed-potato-beef',
    'recipe-pasta-carbonara',
    'prod-chocolate-dark-70',
    'prod-nuts-walnut',
    'prod-dried-apricots',
    'prod-tea-black',
    'prod-coffee-ground',
    'prod-salo-cured',
    'prod-crackers-rye',
    'prod-cheese-cheddar',
  ], []);

  // Всі доступні страви та продукти
  const allItems = useMemo(() => {
    const recipes = [
      ...customRecipes.map(r => ({
        id: r.id,
        title: r.title,
        type: 'recipe' as const,
        category: r.category,
        defaultGrams: r.dryWeightPerServingGrams || 80,
        kcal: r.kcalPerServing || 350,
        badge: 'Власний рецепт',
        isPopular: false,
      })),
      ...DEHYDRATED_RECIPES.map(r => ({
        id: r.id,
        title: r.title,
        type: 'recipe' as const,
        category: r.category,
        defaultGrams: r.dryWeightPerServingGrams,
        kcal: r.kcalPerServing,
        badge: 'Сушена страва',
        isPopular: popularDishIds.includes(r.id),
      })),
    ];

    const products = [
      ...customProducts.map(p => ({
        id: p.id,
        title: p.name,
        type: 'product' as const,
        category: p.category,
        defaultGrams: p.recommendedNormGrams.default || 50,
        kcal: Math.round(p.kcalPer100g * ((p.recommendedNormGrams.default || 50) / 100)),
        badge: 'Власний продукт',
        isPopular: false,
      })),
      ...PRODUCTS_CATALOG.map(p => {
        let cat = 'snack';
        if (p.category === 'drinks_spices') cat = 'drink';
        else if (p.category === 'grains') cat = 'main';
        else if (['dairy_eggs', 'meat_fish', 'fats', 'sweets', 'dried_fruits_nuts', 'bread_crackers'].includes(p.category)) cat = 'snack';

        return {
          id: p.id,
          title: p.name,
          type: 'product' as const,
          category: cat,
          defaultGrams: p.recommendedNormGrams.default,
          kcal: Math.round(p.kcalPer100g * (p.recommendedNormGrams.default / 100)),
          badge: p.category,
          isPopular: popularDishIds.includes(p.id),
        };
      }),
    ];

    return [...recipes, ...products].filter(
      it => !(it.type === 'product' && PANTRY_PRODUCT_IDS.has(it.id))
    );
  }, [customProducts, customRecipes, popularDishIds]);

  // Фільтрація
  const filteredItems = useMemo(() => {
    let list = allItems;

    if (search.trim()) {
      const q = search.toLowerCase();
      return list.filter(item => item.title.toLowerCase().includes(q) || item.badge.toLowerCase().includes(q));
    }

    if (activeCategory === 'popular') {
      return list.filter(item => item.isPopular);
    }
    if (activeCategory === 'breakfast') {
      return list.filter(item => item.category === 'breakfast' || item.title.toLowerCase().includes('вівс') || item.title.toLowerCase().includes('гранол') || item.title.toLowerCase().includes('каша'));
    }
    if (activeCategory === 'soup') {
      return list.filter(item => item.category === 'soup' || item.title.toLowerCase().includes('суп') || item.title.toLowerCase().includes('борщ') || item.title.toLowerCase().includes('харчо'));
    }
    if (activeCategory === 'main') {
      return list.filter(item => item.category === 'main' || ['гречка', 'рис', 'плов', 'пюре', 'макарони', 'паста', 'кускус'].some(w => item.title.toLowerCase().includes(w)));
    }
    if (activeCategory === 'snack') {
      return list.filter(item => item.category === 'snack' || ['шоколад', 'горіхи', 'сир', 'сало', 'ковбаса', 'сухофрукти', 'батончик', 'печиво'].some(w => item.title.toLowerCase().includes(w)));
    }
    if (activeCategory === 'drink') {
      return list.filter(item => item.category === 'drink' || ['чай', 'кава', 'какао', 'кисіль', 'ізотонік'].some(w => item.title.toLowerCase().includes(w)));
    }

    return list;
  }, [allItems, search, activeCategory]);

  const handleAddItem = (item: { id: string; type: 'product' | 'recipe'; defaultGrams: number }) => {
    addMealItem(dayNumber, mealType, {
      sourceType: item.type,
      sourceId: item.id,
      gramsPerPerson: item.defaultGrams,
    });
    setRecentlyAddedId(item.id);
    setTimeout(() => {
      onClose();
    }, 250);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    const newRecipeId = `custom-dish-${Date.now()}`;
    const grams = Number(customGrams) || 80;

    const newRecipe: DehydratedRecipe = {
      id: newRecipeId,
      title: customTitle.trim(),
      category: 'main',
      mealTypes: [mealType],
      servingsYield: 1,
      dryWeightPerServingGrams: grams,
      kcalPerServing: Math.round(grams * 3.8),
      proteinPerServing: Math.round(grams * 0.12),
      fatPerServing: Math.round(grams * 0.1),
      carbsPerServing: Math.round(grams * 0.6),
      fiberPerServing: 3,
      rawIngredients: [
        { name: customTitle.trim(), amount: grams, unit: 'г', category: 'основне' }
      ],
      homePrepSteps: ['Домашня сушена страва за власним рецептом'],
      dehydrationParams: {
        tempCelsius: 60,
        timeHours: '6-8 год',
        trayLining: 'пергамент / сітка',
        drynessTest: 'сухе, без вологи',
      },
      campRehydration: {
        waterRatioNote: 'Залити окропом, накрити кришкою та настояти 5-10 хв',
        soakMinutes: 0,
        boilMinutes: 2,
      },
      packagingTareRatio: 0.05,
      sourceBook: 'Власний рецепт',
      isCustom: true,
    };

    addCustomRecipe(newRecipe);
    addMealItem(dayNumber, mealType, {
      sourceType: 'recipe',
      sourceId: newRecipeId,
      gramsPerPerson: grams,
    });

    onClose();
  };

  const mealLabels: Record<MealType, { title: string; icon: React.ReactNode }> = {
    breakfast: { title: 'Сніданок', icon: <Coffee className="w-4 h-4 text-amber-500" /> },
    snack: { title: 'Перекус / Карманка', icon: <Cookie className="w-4 h-4 text-orange-500" /> },
    lunch: { title: 'Обід', icon: <Sun className="w-4 h-4 text-sky-500" /> },
    dinner: { title: 'Вечеря', icon: <Moon className="w-4 h-4 text-indigo-500" /> },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Шапка модалки */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {mealLabels[mealType].icon}
            <div>
              <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                День {dayNumber} • {mealLabels[mealType].title}
              </div>
              <h2 className="text-base font-bold">Оберіть страву або продукт</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Швидкий пошук та категорії */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              autoFocus
              placeholder="Швидкий пошук (наприклад: борщ, вівсянка, гречка, шоколад, чай)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 shadow-2xs font-medium"
            />
          </div>

          {/* Категорії */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            <button
              type="button"
              onClick={() => { setActiveCategory('popular'); setSearch(''); }}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 shrink-0 transition ${
                activeCategory === 'popular' && !search
                  ? 'bg-emerald-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Популярні
            </button>
            <button
              type="button"
              onClick={() => { setActiveCategory('breakfast'); setSearch(''); }}
              className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition ${
                activeCategory === 'breakfast' && !search
                  ? 'bg-amber-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              🥣 Сніданки / Каші
            </button>
            <button
              type="button"
              onClick={() => { setActiveCategory('soup'); setSearch(''); }}
              className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition ${
                activeCategory === 'soup' && !search
                  ? 'bg-sky-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              🍲 Супи та борщі
            </button>
            <button
              type="button"
              onClick={() => { setActiveCategory('main'); setSearch(''); }}
              className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition ${
                activeCategory === 'main' && !search
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              🍛 Другі страви
            </button>
            <button
              type="button"
              onClick={() => { setActiveCategory('snack'); setSearch(''); }}
              className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition ${
                activeCategory === 'snack' && !search
                  ? 'bg-orange-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              🍫 Перекуси & Сир/Сало
            </button>
            <button
              type="button"
              onClick={() => { setActiveCategory('drink'); setSearch(''); }}
              className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition ${
                activeCategory === 'drink' && !search
                  ? 'bg-teal-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              ☕ Напої
            </button>
            <button
              type="button"
              onClick={() => { setActiveCategory('all'); setSearch(''); }}
              className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition ${
                activeCategory === 'all' && !search
                  ? 'bg-slate-800 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              📦 Всі
            </button>
          </div>
        </div>

        {/* Список страв для вибору в 1 клік */}
        <div className="p-4 flex-1 overflow-y-auto space-y-2">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              Нічого не знайдено за запитом «{search}».
              <div className="mt-2 text-slate-500 font-medium">
                Ви можете ввести свою назву страви нижче та додати її в один клік!
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {filteredItems.map(item => {
                const isJustAdded = recentlyAddedId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleAddItem(item)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between gap-2.5 transition group cursor-pointer ${
                      isJustAdded
                        ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50/40 shadow-2xs'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="font-bold text-slate-900 text-xs group-hover:text-emerald-900 truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                        <span className="font-medium text-emerald-800 bg-emerald-100/70 px-1.5 py-0.2 rounded text-[10px]">
                          {item.defaultGrams} г/ос
                        </span>
                        <span>{item.kcal} ккал</span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {isJustAdded ? (
                        <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                          <Check className="w-4 h-4" />
                        </span>
                      ) : (
                        <span className="w-7 h-7 rounded-lg bg-slate-100 group-hover:bg-emerald-600 group-hover:text-white text-slate-400 flex items-center justify-center transition">
                          <Plus className="w-4 h-4" />
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Швидке додавання власної страви в один рядок */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <form onSubmit={handleAddCustom} className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="Своя страва (наприклад: Кускус з овочами, Макарони з тушонкою)..."
                value={customTitle}
                onChange={e => setCustomTitle(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-lg px-2 py-1.5">
                <input
                  type="number"
                  min="10"
                  max="300"
                  step="5"
                  value={customGrams}
                  onChange={e => setCustomGrams(Number(e.target.value))}
                  className="w-12 text-center text-xs font-bold text-slate-800 outline-none"
                />
                <span className="text-[10px] text-slate-400 font-semibold">г/ос</span>
              </div>
              <button
                type="submit"
                disabled={!customTitle.trim()}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                Додати свою
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
