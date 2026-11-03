import React, { useState } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { calculateStageParticipantQuotas } from '../domain/loadDistributor';
import { generatePackingLabels } from '../export/packingLabelsGenerator';
import { downloadProjectExcel } from '../export/excelExporter';
import { serializeProjectToJson } from '../domain/projectSerializer';
import {
  Scale,
  Sparkles,
  FileSpreadsheet,
  Printer,
  Download,
  Tag,
  CheckCircle2,
} from 'lucide-react';

export const LoadAndExportTab: React.FC = () => {
  const {
    project,
    customProducts,
    customRecipes,
    runAutoAssignAllStages,
    runAutoAssignStage,
  } = useProjectStore();

  const [selectedStageId, setSelectedStageId] = useState<string>(project.stages[0]?.id || 'stage-1');
  const [filterCarrier, setFilterCarrier] = useState<string>('all');

  const quotas = calculateStageParticipantQuotas(
    project,
    selectedStageId,
    customProducts,
    customRecipes
  );

  const labels = generatePackingLabels(
    project,
    selectedStageId === 'all' ? undefined : selectedStageId,
    customProducts,
    customRecipes
  );

  const filteredLabels = filterCarrier === 'all'
    ? labels
    : labels.filter(l => l.carrierName.toLowerCase().includes(filterCarrier.toLowerCase()));

  const handleDownloadExcel = () => {
    downloadProjectExcel(project, customProducts, customRecipes);
  };

  const handlePrintPdf = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const jsonStr = serializeProjectToJson(project);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.settings.name.replace(/[/\\?%*:|"<>]/g, '_')}_проєкт.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalStageFood = quotas[0]?.stageTotalFoodGrossGrams || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Верхня панель дій експорту та авторозподілу */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-600" />
            Розподіл навантаження по рюкзаках та Експорт
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Справедливий розподіл громадського вантажу за формулою О. Алексєєва: <b>Загальний вантаж (спорядження + їжа)</b> пропорційний коефіцієнту <b>k_i</b> кожного учасника.
          </p>
        </div>

        {/* Кнопки експорту */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={runAutoAssignAllStages}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
          >
            <Sparkles className="w-4 h-4" />
            Авторозподіл по рюкзаках
          </button>

          <button
            onClick={handleDownloadExcel}
            className="px-3.5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
          >
            <FileSpreadsheet className="w-4 h-4" />
            Завантажити Excel (.xlsx)
          </button>

          <button
            onClick={handlePrintPdf}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
          >
            <Printer className="w-4 h-4" />
            Друк / Зберегти в PDF
          </button>

          <button
            onClick={handleDownloadJson}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold flex items-center gap-1.5 border border-slate-300 transition"
          >
            <Download className="w-4 h-4" />
            JSON
          </button>
        </div>
      </div>

      {/* Секція 1: Квоти учасників по обраному етапу */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-semibold text-slate-700">Оберіть етап (кільце):</span>
            <select
              value={selectedStageId}
              onChange={e => setSelectedStageId(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg font-bold text-slate-800 outline-none"
            >
              {project.stages.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} (Дні {s.startDay} - {s.endDay})
                </option>
              ))}
            </select>
          </div>

          <div className="text-xs text-slate-600 flex items-center gap-3">
            <span>Всього їжі на цей етап: <b>{(totalStageFood / 1000).toFixed(2)} кг</b></span>
            <button
              onClick={() => runAutoAssignStage(selectedStageId)}
              className="text-emerald-700 hover:text-emerald-900 font-bold underline"
            >
              Перерозподілити тільки цей етап
            </button>
          </div>
        </div>

        {/* Таблиця квот */}
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="min-w-full text-xs divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-900 font-semibold">
              <tr>
                <th className="px-3 py-2.5 text-left">Учасник</th>
                <th className="px-2 py-2.5 text-center">k_i</th>
                <th className="px-3 py-2.5 text-center">Громадське спорядження</th>
                <th className="px-3 py-2.5 text-center text-emerald-800">Цільова їжа (квота)</th>
                <th className="px-3 py-2.5 text-center font-bold">Фактично в рюкзаку</th>
                <th className="px-3 py-2.5 text-center bg-slate-100 font-bold">СТАРТОВИЙ ВАНТАЖ РАЗОМ</th>
                <th className="px-3 py-2.5 text-center">Статус квоти</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {quotas.map(q => {
                const diff = q.assignedFoodWeightGrams - q.targetFoodWeightGrams;
                const isBalanced = Math.abs(diff) < 400;
                return (
                  <tr key={q.participantId} className="hover:bg-slate-50/80">
                    <td className="px-3 py-2 font-bold text-slate-900">{q.participantName}</td>
                    <td className="px-2 py-2 text-center font-bold text-slate-600">{q.coeff}</td>
                    <td className="px-3 py-2 text-center text-slate-600">{(q.sharedGearGrams / 1000).toFixed(2)} кг</td>
                    <td className="px-3 py-2 text-center font-bold text-emerald-700">{(q.targetFoodWeightGrams / 1000).toFixed(2)} кг</td>
                    <td className="px-3 py-2 text-center font-bold text-slate-900">{(q.assignedFoodWeightGrams / 1000).toFixed(2)} кг</td>
                    <td className="px-3 py-2 text-center font-black bg-slate-50 text-slate-950 text-sm">
                      {(q.totalLoadGrams / 1000).toFixed(2)} кг
                    </td>
                    <td className="px-3 py-2 text-center">
                      {isBalanced ? (
                        <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> В нормі
                        </span>
                      ) : diff > 0 ? (
                        <span className="text-[11px] text-amber-700 font-bold">
                          +{Math.round(diff)} г
                        </span>
                      ) : (
                        <span className="text-[11px] text-sky-700 font-bold">
                          {Math.round(diff)} г
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Секція 2: Розрізні картки-етикетки пакування та опис забросок */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Tag className="w-5 h-5 text-emerald-600" />
              Етикетки для пакування пакетів та опис забросок ({filteredLabels.length})
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Роздрукуйте ці картки або експортуйте у PDF: кожна картка вкладається всередину або наклеюється на пакет із харчами для чергових.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-semibold">Фільтр по людині:</span>
            <select
              value={filterCarrier}
              onChange={e => setFilterCarrier(e.target.value)}
              className="px-2.5 py-1 bg-slate-50 border border-slate-300 rounded font-medium text-slate-700"
            >
              <option value="all">Всі учасники</option>
              {project.participants.map(p => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Сітка етикеток */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 print:grid-cols-2">
          {filteredLabels.map((lbl, idx) => (
            <div
              key={`${lbl.itemId}-${idx}`}
              className="p-3.5 rounded-xl border border-dashed border-slate-300 bg-slate-50/80 hover:bg-white text-xs space-y-2 shadow-2xs avoid-break"
            >
              <div className="flex items-start justify-between gap-1 border-b border-slate-200 pb-1.5">
                <span className="font-black text-slate-900 text-sm">
                  День {lbl.dayNumber} • {lbl.mealTypeName}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {lbl.totalGrossGrams} г брутто
                </span>
              </div>

              <div>
                <span className="font-bold text-slate-900 text-sm block">{lbl.itemName}</span>
                <span className="text-[11px] text-slate-500 block">{lbl.stageName}</span>
              </div>

              <div className="bg-white p-2 rounded border border-slate-200 text-slate-700 text-[11px] leading-relaxed">
                <span className="font-semibold text-slate-900 block mb-0.5">Інструкція черговим:</span>
                {lbl.instructions}
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1 text-slate-600 font-medium">
                <span>Чиста вага: <b>{lbl.totalNetGrams} г</b></span>
                <span className="text-emerald-800 font-bold">Несе: {lbl.carrierName}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
