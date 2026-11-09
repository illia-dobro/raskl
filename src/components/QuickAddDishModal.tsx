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

type CategoryTab = 'popular' | 'lunch' | 'breakfast' | 'soup' | 'main' | 'spread' | 'snack' | 'drink' | 'all';

export function getDishBadge(
  category: string,
  mealTypes: MealType[] = [],
  boilMinutes: number = 0,
  isSimple: boolean = false,
  isCustom: boolean = false
): { text: string; colorClass: string } {
  if (isCustom) {
    return { text: 'Власна страва', colorClass: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
  }
  if (category === 'soup') {
    return {
      text: boilMinutes > 0 ? `🍲 Гарячий суп (${boilMinutes} хв)` : '🍲 Гарячий суп',
      colorClass: 'bg-amber-50 text-amber-800 border-amber-200',
    };
  }
  if (category === 'lunch' || (mealTypes.includes('lunch') && boilMinutes === 0)) {
    return { text: '🥪 Холодний обід (без варіння)', colorClass: 'bg-sky-50 text-sky-800 border-sky-200' };
  }
  if (category === 'spread') {
    return { text: '🥫 Холодна намазка / паштет (з сухарями)', colorClass: 'bg-teal-50 text-teal-800 border-teal-200' };
  }
  if (category === 'breakfast') {
    return { text: '🥣 Солодка каша / Мюслі (сніданок/вечеря)', colorClass: 'bg-orange-50 text-orange-800 border-orange-200' };
  }
  if (category === 'snack') {
    return { text: '🍫 Снек / карманка', colorClass: 'bg-purple-50 text-purple-800 border-purple-200' };
  }
  if (category === 'drink') {
    return { text: '☕ Похідний напій', colorClass: 'bg-emerald-50 text-emerald-800 border-emerald-200' };
  }
  if (isSimple) {
    return { text: '🛒 Магазинна страва (сніданок/вечеря)', colorClass: 'bg-blue-50 text-blue-800 border-blue-200' };
  }
  return { text: '🍛 Гаряча страва (сніданок/вечеря)', colorClass: 'bg-indigo-50 text-indigo-800 border-indigo-200' };
}

export const QuickAddDishModal: React.FC<QuickAddDishModalProps> = ({
  dayNumber,
  mealType,
  onClose,
}) => {
  const {
    addMealItem,
    addCustomRecipe,
    customRecipes,
  } = useProjectStore();

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryTab>(
    mealType === 'lunch'
      ? 'lunch'
      : mealType === 'breakfast'
        ? 'main'
        : mealType === 'dinner'
          ? 'soup'
          : mealType === 'snack'
            ? 'snack'
            : 'popular'
  );
  const [customTitle, setCustomTitle] = useState('');
  const [customGrams, setCustomGrams] = useState(80);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Список популярних готових страв для швидкого кліку
  const popularDishIds = useMemo(() => [
    'recipe-globus-lunch-salami-choc',
    'recipe-globus-lunch-cheese-nuts-choc',
    'recipe-globus-lunch-salo-crackers-choc',
    'recipe-globus-lunch-fish-canned-crackers',
    'recipe-simple-lunch-salami-cheese',
    'recipe-simple-lunch-salo-garlic',
    'recipe-simple-oatmeal-raisins',
    'recipe-simple-semolina-honey',
    'recipe-granola-alpine',
    'recipe-quick-oatmeal-plus',
    'recipe-celebration-brunch',
    'recipe-borscht-home-style',
    'recipe-simple-pea-soup-lunch',
    'recipe-caldo-verde-hiker',
    'recipe-simple-buckwheat-tushonka',
    'recipe-simple-pasta-cheese-salami',
    'recipe-simple-mashed-potato-sausage',
    'recipe-simple-rice-tushonka',
    'recipe-sierra-spaghetti',
    'recipe-lazy-lasagna',
    'recipe-chicken-pilaf-oriental',
    'recipe-canyon-chili',
    'recipe-simple-snack-nuts-choc',
    'recipe-spiced-mixed-nuts',
    'recipe-globus-rassolnik',
    'recipe-globus-kharcho',
    'recipe-globus-solyanka',
    'recipe-globus-kulesh',
    'recipe-globus-banosh-brynza',
    'recipe-globus-lagman',
    'recipe-globus-goulash-csipetke',
    'recipe-globus-pumpkin-porridge',
    'recipe-globus-pasta-cheese-tushonka',
    'recipe-globus-arnautka-tushonka',
    'recipe-globus-soup-cheese-curd-tushonka',
    'recipe-globus-canned-fish-ukha-tushonka',
    'recipe-globus-borscht-tushonka-salo',
  ], []);

  // Всі доступні страви (включно з власними та магазинними стравами без сушарки)
  const allItems = useMemo(() => {
    const recipes = [
      ...customRecipes.map(r => {
        const badgeInfo = getDishBadge(r.category, r.mealTypes, r.campRehydration?.boilMinutes ?? 0, false, true);
        return {
          id: r.id,
          title: r.title,
          type: 'recipe' as const,
          category: r.category,
          defaultGrams: r.dryWeightPerServingGrams || 80,
          kcal: r.kcalPerServing || 350,
          badge: badgeInfo.text,
          badgeClass: badgeInfo.colorClass,
          isPopular: true,
          boilMinutes: r.campRehydration?.boilMinutes ?? 0,
          mealTypes: r.mealTypes,
        };
      }),
      ...DEHYDRATED_RECIPES.map(r => {
        const badgeInfo = getDishBadge(
          r.category,
          r.mealTypes,
          r.campRehydration.boilMinutes,
          r.id.startsWith('recipe-simple-'),
          false
        );
        return {
          id: r.id,
          title: r.title,
          type: 'recipe' as const,
          category: r.category,
          defaultGrams: r.dryWeightPerServingGrams,
          kcal: r.kcalPerServing,
          badge: badgeInfo.text,
          badgeClass: badgeInfo.colorClass,
          isPopular: popularDishIds.includes(r.id),
          boilMinutes: r.campRehydration?.boilMinutes ?? 0,
          mealTypes: r.mealTypes,
        };
      }),
    ];

    const drinksOnly = PRODUCTS_CATALOG.filter(
      p => p.category === 'drinks_spices' && !PANTRY_PRODUCT_IDS.has(p.id)
    ).map(p => ({
      id: p.id,
      title: p.name,
      type: 'product' as const,
      category: 'drink',
      defaultGrams: p.recommendedNormGrams.default,
      kcal: Math.round(p.kcalPer100g * (p.recommendedNormGrams.default / 100)),
      badge: '☕ Напій',
      badgeClass: 'bg-teal-50 text-teal-800 border-teal-200',
      isPopular: false,
      boilMinutes: 0,
      mealTypes: ['breakfast', 'snack', 'lunch', 'dinner'] as MealType[],
    }));

    return [...recipes, ...drinksOnly];
  }, [customRecipes, popularDishIds]);

  // Фільтрація
  const filteredItems = useMemo(() => {
    const list = allItems;

    if (search.trim()) {
      const q = search.toLowerCase();
      return list.filter(item => item.title.toLowerCase().includes(q) || item.badge.toLowerCase().includes(q));
    }

    if (activeCategory === 'popular') {
      return list.filter(item => item.isPopular);
    }
    if (activeCategory === 'lunch') {
      return list.filter(
        item => item.category === 'lunch' || (item.mealTypes?.includes('lunch') && item.boilMinutes === 0)
      );
    }
    if (activeCategory === 'main') {
      return list.filter(item => item.category === 'main');
    }
    if (activeCategory === 'breakfast') {
      return list.filter(item => item.category === 'breakfast');
    }
    if (activeCategory === 'soup') {
      return list.filter(item => item.category === 'soup');
    }
    if (activeCategory === 'spread') {
      return list.filter(item => item.category === 'spread');
    }
    if (activeCategory === 'snack') {
      return list.filter(item => item.category === 'snack');
    }
    if (activeCategory === 'drink') {
      return list.filter(
        item =>
          item.category === 'drink' ||
          item.id === 'recipe-globus-uzvar-classic' ||
          item.id === 'recipe-globus-berry-compote' ||
          item.id === 'recipe-simple-globus-spiced-cocoa'
      );
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
              onClick={() => { setActiveCategory('main'); setSearch(''); }}
              className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition ${
                activeCategory === 'main' && !search
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              🍛 Другі страви & каші (сніданок/вечеря)
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
              🥣 Солодкі каші & мюслі
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
              🍲 Супи та борщі (вечеря)
            </button>
            <button
              type="button"
              onClick={() => { setActiveCategory('lunch'); setSearch(''); }}
              className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition ${
                activeCategory === 'lunch' && !search
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              🥪 Холодні обіди (без варіння)
            </button>
            <button
              type="button"
              onClick={() => { setActiveCategory('spread'); setSearch(''); }}
              className={`px-3 py-1.5 rounded-lg font-bold shrink-0 transition ${
                activeCategory === 'spread' && !search
                  ? 'bg-teal-700 text-white shadow-2xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              🥫 Намазки та паштети (з сухарями)
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
              🍫 Снеки & карманка
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
                      <div className="text-[11px] text-slate-500 mt-1 flex flex-wrap items-center gap-1.5">
                        <span className="font-medium text-emerald-800 bg-emerald-100/70 px-1.5 py-0.5 rounded text-[10px]">
                          {item.defaultGrams} г/ос
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">{item.kcal} ккал</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium border ${item.badgeClass}`}>
                          {item.badge}
                        </span>
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
