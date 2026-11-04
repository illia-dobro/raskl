import React, { useState } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { AutoFillFilters, CookingStyle, DEFAULT_AUTOFILL_FILTERS } from '../domain/autoFill';
import { X, Sparkles, Wand2, Check, ShoppingBag, UtensilsCrossed, Scale } from 'lucide-react';

interface AutoFillModalProps {
  onClose: () => void;
}

export const AutoFillModal: React.FC<AutoFillModalProps> = ({ onClose }) => {
  const { project, autoFillMenu } = useProjectStore();
  const [filters, setFilters] = useState<AutoFillFilters>(DEFAULT_AUTOFILL_FILTERS);

  const setCooking = (style: CookingStyle) => {
    setFilters(f => ({ ...f, cooking: style }));
  };

  const toggleFilter = (key: keyof Omit<AutoFillFilters, 'cooking'>) => {
    setFilters(f => ({ ...f, [key]: !f[key] }));
  };

  const handleApply = () => {
    autoFillMenu(filters);
    onClose();
  };

  const cookingOptions: { id: CookingStyle; title: string; desc: string; icon: React.ReactNode }[] = [
    {
      id: 'simple',
      title: 'Магазинні продукти',
      desc: 'Каші швидкого варіння, ковбаса, сир, тушонка, сухарі, солодощі. Без сушарки/дегідратора.',
      icon: <ShoppingBag className="w-5 h-5 text-emerald-600" />,
    },
    {
      id: 'dried',
      title: 'Сушені страви',
      desc: 'Борщі, супи, сушене м\'ясо, плов, сублімати. Мінімум ваги в рюкзаках.',
      icon: <UtensilsCrossed className="w-5 h-5 text-indigo-600" />,
    },
    {
      id: 'mix',
      title: 'Змішане меню',
      desc: 'Чергування: сушені гарячі страви + прості ситні магазинні перекуси та сніданки.',
      icon: <Scale className="w-5 h-5 text-amber-600" />,
    },
  ];

  const dietaryOptions: { key: keyof Omit<AutoFillFilters, 'cooking'>; label: string; icon: string }[] = [
    { key: 'noMeat', label: 'Без м\'яса (вегетаріанське)', icon: '🥦' },
    { key: 'noDairy', label: 'Без молочного (без лактози)', icon: '🥛' },
    { key: 'noNuts', label: 'Без горіхів (алергія)', icon: '🥜' },
    { key: 'noSugar', label: 'Без цукру', icon: '🚫' },
  ];

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
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </span>
            <div>
              <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                Автозаповнення розкладки
              </div>
              <h2 className="text-base font-bold">Скласти меню за фільтрами</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Тіло модалки */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-sm">
          {/* Інформаційна плашка про цілі походу */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-600">
              Похід на <b>{project.days.length} днів</b> для <b>{project.participants.length} учасників</b>
            </span>
            <span className="font-semibold text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded">
              Ціль: ~{project.settings.targetDailyKcal} ккал / ос-день
            </span>
          </div>

          {/* 1. Стиль харчування */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              1. Тип продуктів для походу
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {cookingOptions.map(opt => {
                const isSelected = filters.cooking === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setCooking(opt.id)}
                    className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs shrink-0 mt-0.5">
                      {opt.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-xs">{opt.title}</span>
                        {isSelected && (
                          <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                            <Check className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{opt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Дієтичні обмеження та фільтри */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
              2. Обмеження та фільтри
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {dietaryOptions.map(opt => {
                const isActive = filters[opt.key];
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => toggleFilter(opt.key)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between gap-2 transition cursor-pointer ${
                      isActive
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 font-medium'
                    }`}
                  >
                    <span className="flex items-center gap-2 text-xs">
                      <span>{opt.icon}</span>
                      <span>{opt.label}</span>
                    </span>
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                        isActive
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isActive && <Check className="w-3.5 h-3.5" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Футер */}
        <div className="bg-slate-100 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-semibold"
          >
            Скасувати
          </button>

          <button
            type="button"
            onClick={handleApply}
            className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Wand2 className="w-4 h-4" />
            Заповнити розкладку
          </button>
        </div>
      </div>
    </div>
  );
};
