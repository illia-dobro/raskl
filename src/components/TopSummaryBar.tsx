import React, { useRef } from 'react';
import { useProjectStore, AppTabId } from '../store/useProjectStore';
import { calculateProjectSummary } from '../domain/nutritionCalculator';
import { validateProjectRation } from '../domain/rationValidator';
import { serializeProjectToJson, parseAndValidateProjectJson } from '../domain/projectSerializer';
import {
  BookOpen,
  Compass,
  CalendarDays,
  UtensilsCrossed,
  ShoppingCart,
  Scale,
  Download,
  Upload,
  RotateCcw,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';

export const TopSummaryBar: React.FC = () => {
  const {
    project,
    activeTab,
    setActiveTab,
    customProducts,
    customRecipes,
    loadProject,
    resetToDemoProject,
    resetToEmptyProject,
  } = useProjectStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const summary = calculateProjectSummary(project, customProducts, customRecipes);
  const warnings = validateProjectRation(project, customProducts, customRecipes);

  const handleExportJson = () => {
    const jsonStr = serializeProjectToJson(project);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.settings.name.replace(/[/\\?%*:|"<>]/g, '_')}_проєкт.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = ev => {
      const content = ev.target?.result as string;
      const res = parseAndValidateProjectJson(content);
      if (res.ok) {
        loadProject(res.project);
        alert('Проєкт успішно завантажено!');
      } else {
        alert(res.error);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const tabs: { id: AppTabId; label: string; icon: React.ReactNode }[] = [
    { id: 'menu', label: 'Матриця розкладки', icon: <CalendarDays className="w-4 h-4" /> },
    { id: 'shopping', label: 'Закупка і сушіння', icon: <ShoppingCart className="w-4 h-4" /> },
    { id: 'distribution', label: 'Рюкзаки та Експорт', icon: <Scale className="w-4 h-4" /> },
    { id: 'route', label: 'Маршрут і Команда', icon: <Compass className="w-4 h-4" /> },
    { id: 'catalog', label: 'База страв і продуктів', icon: <UtensilsCrossed className="w-4 h-4" /> },
    { id: 'theory', label: 'Стисла теорія', icon: <BookOpen className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-slate-900 text-white shadow-lg sticky top-0 z-40 no-print">
      {/* Головна верхня лінія */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Бренд */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏕️</span>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-emerald-400 flex items-center gap-2">
              Похідний Завгосп
              <span className="text-xs font-normal px-2 py-0.5 bg-emerald-950 border border-emerald-700/60 rounded text-emerald-300">
                Offline PWA
              </span>
            </h1>
            <p className="text-xs text-slate-400 line-clamp-1 max-w-sm font-medium">
              {project.settings.name}
            </p>
          </div>
        </div>

        {/* Швидкі метрики походу: прості та інформативні */}
        <div className="hidden md:flex items-center gap-2 text-xs">
          <div
            className="px-2.5 py-1.5 bg-slate-800/80 rounded-xl border border-slate-700/60 flex items-center gap-2"
            title={`Б : Ж : В: ${summary.overallBjuRatio.join(' : ')} | Клітковина: ${summary.avgDailyFiber} г/день`}
          >
            <span className="text-slate-400">Група:</span>
            <span className="font-bold text-white">{project.participants.length} ос</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Днів:</span>
            <span className="font-bold text-white">{project.days.length}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Вага:</span>
            <span className="font-bold text-emerald-400">~{summary.avgDailyNetGrams} г/ос</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Калорії:</span>
            <span className="font-bold text-amber-400">~{summary.avgDailyKcal} ккал</span>
          </div>

          {warnings.length > 0 && (
            <button
              onClick={() => setActiveTab('menu')}
              className="px-2.5 py-1.5 bg-amber-950/80 border border-amber-600/50 rounded-xl flex items-center gap-1.5 text-xs text-amber-300 font-semibold hover:bg-amber-900/80 transition cursor-pointer"
              title="Переглянути рекомендації валідатора"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Поради ({warnings.length})</span>
            </button>
          )}
        </div>

        {/* Кнопки дій проєкту */}
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImportJson}
            accept=".json"
            className="hidden"
          />

          <button
            onClick={handleExportJson}
            title="Зберегти файл проєкту (.json)"
            className="px-2.5 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1.5 transition border border-slate-700"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">JSON</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            title="Завантажити файл проєкту (.json)"
            className="px-2.5 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1.5 transition border border-slate-700"
          >
            <Upload className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Імпорт</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Створити новий чистий похід? Поточні дані розкладки будуть скинуті.')) {
                resetToEmptyProject();
              }
            }}
            title="Створити новий чистий похід з нуля"
            className="px-2.5 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded flex items-center gap-1 transition border border-slate-700 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Новий</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('Скинути всі налаштування та завантажити демо-похід Карпатами?')) {
                resetToDemoProject();
              }
            }}
            title="Скинути до демо-походу"
            className="px-2.5 py-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded flex items-center gap-1 transition border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Демо</span>
          </button>
        </div>
      </div>

      {/* Вкладки навігації */}
      <nav className="bg-slate-950 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto gap-1 py-1 scrollbar-none">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
