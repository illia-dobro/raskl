import React from 'react';
import { useProjectStore } from './store/useProjectStore';
import { TopSummaryBar } from './components/TopSummaryBar';
import { TheoryHandbookTab } from './components/TheoryHandbookTab';
import { RouteAndTeamTab } from './components/RouteAndTeamTab';
import { MenuMatrixTab } from './components/MenuMatrixTab';
import { CatalogAndRecipesTab } from './components/CatalogAndRecipesTab';
import { ShoppingAndDryingTab } from './components/ShoppingAndDryingTab';
import { LoadAndExportTab } from './components/LoadAndExportTab';

export const App: React.FC = () => {
  const { activeTab } = useProjectStore();

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans">
      <TopSummaryBar />

      <main className="flex-1 pb-16">
        {activeTab === 'theory' && <TheoryHandbookTab />}
        {activeTab === 'route' && <RouteAndTeamTab />}
        {activeTab === 'menu' && <MenuMatrixTab />}
        {activeTab === 'catalog' && <CatalogAndRecipesTab />}
        {activeTab === 'shopping' && <ShoppingAndDryingTab />}
        {activeTab === 'distribution' && <LoadAndExportTab />}
      </main>

      {/* Футер для десктопа */}
      <footer className="bg-slate-900 text-slate-400 py-6 text-center text-xs border-t border-slate-800 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            <b>Похідний Завгосп</b> — науково обґрунтована розкладка на основі праць В. Хачикяна, О. Алексєєва, Л. Яффе (*Backpack Gourmet*) та Г. Кепхарта.
          </p>
          <p className="text-slate-500">
            100% автономний браузерний інструмент (Offline-first SPA)
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
