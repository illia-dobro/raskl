import React, { useState } from 'react';
import { THEORY_CHAPTERS } from '../data/theoryChapters';
import { CLIMATE_PROFILES, getBoilingPointCelsius } from '../data/climateProfiles';
import { useProjectStore } from '../store/useProjectStore';
import { ClimateProfileId } from '../types/domain';
import { Search, Flame, Check, Mountain, Info, BookOpen } from 'lucide-react';

export const TheoryHandbookTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [calcAltitude, setCalcAltitude] = useState<number>(2500);
  const [activeChapterId, setActiveChapterId] = useState<string>(THEORY_CHAPTERS[0].id);

  const { project, updateSettings } = useProjectStore();

  const boilingPoint = getBoilingPointCelsius(calcAltitude);
  const requiresAutoclave = calcAltitude >= 3200;

  const filteredChapters = THEORY_CHAPTERS.filter(ch => {
    const q = searchTerm.toLowerCase();
    return (
      ch.title.toLowerCase().includes(q) ||
      ch.summary.toLowerCase().includes(q) ||
      ch.sections.some(s => s.heading.toLowerCase().includes(q) || s.content.toLowerCase().includes(q))
    );
  });

  const activeChapter = THEORY_CHAPTERS.find(ch => ch.id === activeChapterId) || THEORY_CHAPTERS[0];

  const handleApplyClimate = (profileId: ClimateProfileId) => {
    updateSettings({ climateProfile: profileId });
    alert(`Кліматичний профіль «${CLIMATE_PROFILES[profileId].name}» застосовано до поточного проєкту!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Інтерактивний калькулятор кипіння та автоклава на висоті */}
      <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-800/50 rounded-xl p-5 text-white shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <Mountain className="w-5 h-5 text-emerald-400" />
              Інтерактивний калькулятор: Висота, Кипіння води та Автоклав
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              За фізичними законами похідної кулінарії (О. Алексєєв, Г. Кепхарт), температура кипіння води падає приблизно на 1°C на кожні 300 метрів підйому. На висотах понад 3200 м сирі бобові та крупи не розварюються у відкритому казані.
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-lg flex items-center gap-4 shrink-0">
            <div>
              <label className="block text-[11px] text-slate-400 font-medium">Висота над рівнем моря (м):</label>
              <input
                type="number"
                min="0"
                max="8848"
                step="100"
                value={calcAltitude}
                onChange={e => setCalcAltitude(Number(e.target.value))}
                className="w-28 px-2.5 py-1 bg-slate-900 border border-slate-600 rounded text-sm text-white font-bold mt-0.5 focus:border-emerald-500 outline-none"
              />
            </div>

            <div className="border-l border-slate-700 pl-4">
              <span className="block text-[11px] text-slate-400 font-medium">Точка кипіння:</span>
              <span className="text-lg font-black text-amber-400">{boilingPoint} °C</span>
              <span className={`block text-[10px] font-semibold mt-0.5 ${requiresAutoclave ? 'text-rose-400' : 'text-emerald-400'}`}>
                {requiresAutoclave ? '⚠️ Потрібен автоклав / сублімати!' : '✓ Звичайний казан достатній'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Пошук та вибір розділу теорії */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Ліва колонка: список розділів */}
        <aside className="w-full md:w-80 shrink-0 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Пошук у теорії (БЖВ, сушка, газ...)"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-sm divide-y divide-slate-100 overflow-hidden">
            {filteredChapters.map(ch => {
              const isSelected = ch.id === activeChapter.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => setActiveChapterId(ch.id)}
                  className={`w-full text-left p-3.5 transition flex items-start gap-3 ${
                    isSelected
                      ? 'bg-emerald-50/80 border-l-4 border-emerald-600 text-emerald-950 font-medium'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {ch.chapterNumber}
                  </span>
                  <div>
                    <h3 className="text-xs font-bold leading-snug line-clamp-2">{ch.title}</h3>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{ch.summary}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Шпаргалка швидкого вибору кліматичного профілю */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-emerald-600" />
              Кліматичні норми Б : Ж : В
            </h4>
            <div className="space-y-1.5 text-xs">
              {(Object.keys(CLIMATE_PROFILES) as ClimateProfileId[]).map(key => {
                const prof = CLIMATE_PROFILES[key];
                const isCurrent = project.settings.climateProfile === key;
                return (
                  <div
                    key={key}
                    className={`p-2 rounded border text-[11px] transition flex items-center justify-between gap-2 ${
                      isCurrent
                        ? 'bg-emerald-100/70 border-emerald-400 text-emerald-900 font-semibold'
                        : 'bg-white border-slate-200 text-slate-700'
                    }`}
                  >
                    <div>
                      <span className="block font-bold">{prof.bjuRatio.join(' : ')}</span>
                      <span className="text-[10px] text-slate-500 block leading-tight">{prof.name.split('(')[0]}</span>
                    </div>

                    <button
                      onClick={() => handleApplyClimate(key)}
                      disabled={isCurrent}
                      className={`px-2 py-1 rounded text-[10px] font-medium transition ${
                        isCurrent
                          ? 'bg-emerald-700 text-white cursor-default flex items-center gap-1'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {isCurrent ? <Check className="w-3 h-3" /> : 'В проєкт'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Права колонка: розгорнутий вміст обраного розділу */}
        <main className="flex-1 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              Розділ {activeChapter.chapterNumber} з 8
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">{activeChapter.title}</h2>
            <p className="text-xs text-slate-600 mt-1.5">{activeChapter.summary}</p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {activeChapter.sources.map((s, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] bg-slate-100 text-slate-700 font-medium"
                >
                  <Info className="w-3 h-3 text-slate-400" />
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Секції розділу */}
          <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
            {activeChapter.sections.map((sec, sIdx) => (
              <section key={sIdx} className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 border-l-3 border-emerald-600 pl-2.5">
                  {sec.heading}
                </h3>
                <p className="whitespace-pre-line text-slate-700 leading-relaxed">{sec.content}</p>

                {sec.formula && (
                  <div className="bg-slate-900 text-emerald-300 font-mono text-xs px-4 py-2.5 rounded-lg border border-slate-800">
                    Формула: {sec.formula}
                  </div>
                )}

                {sec.tables && sec.tables.map((t, tIdx) => (
                  <div key={tIdx} className="overflow-x-auto my-3 border border-slate-200 rounded-lg">
                    <table className="min-w-full text-xs divide-y divide-slate-200">
                      <thead className="bg-slate-50 text-slate-900 font-semibold">
                        <tr>
                          {t.headers.map((h, hIdx) => (
                            <th key={hIdx} className="px-3.5 py-2.5 text-left font-bold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {t.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/70">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="px-3.5 py-2 text-slate-700">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}

                {sec.tips && sec.tips.length > 0 && (
                  <div className="bg-amber-50 border border-amber-200/80 rounded-lg p-3 space-y-1.5 text-xs text-amber-950">
                    <div className="font-bold text-amber-900 flex items-center gap-1.5">
                      💡 Поради завгоспу:
                    </div>
                    <ul className="list-disc list-inside space-y-1 pl-1 text-slate-800">
                      {sec.tips.map((tip, tipIdx) => (
                        <li key={tipIdx}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
