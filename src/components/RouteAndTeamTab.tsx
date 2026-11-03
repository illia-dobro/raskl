import React, { useState } from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { CLIMATE_PROFILES } from '../data/climateProfiles';
import { ClimateProfileId, FuelType, HikeType } from '../types/domain';
import { Plus, Trash2, Users, MapPin, Settings } from 'lucide-react';

export const RouteAndTeamTab: React.FC = () => {
  const {
    project,
    updateSettings,
    addParticipant,
    updateParticipant,
    removeParticipant,
    addStage,
    updateStage,
    removeStage,
  } = useProjectStore();

  const [newPartName, setNewPartName] = useState('');
  const [newPartGender, setNewPartGender] = useState<'M' | 'F'>('M');
  const [newPartCoeff, setNewPartCoeff] = useState<number>(1.0);
  const [newPartRole, setNewPartRole] = useState('Учасник');
  const [newPartDiet, setNewPartDiet] = useState('');
  const [newPartGear, setNewPartGear] = useState<number>(2000);

  const [newStageName, setNewStageName] = useState('');
  const [newStageStart, setNewStageStart] = useState<number>(1);
  const [newStageEnd, setNewStageEnd] = useState<number>(4);
  const [newStageNote, setNewStageNote] = useState('');

  const sumCoeffs = project.participants.reduce((acc, p) => acc + (p.carryingCapacityCoeff || 1), 0);

  const handleAddParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartName.trim()) return;
    addParticipant({
      name: newPartName.trim(),
      gender: newPartGender,
      carryingCapacityCoeff: Number(newPartCoeff),
      role: newPartRole.trim() || 'Учасник',
      dietaryRestrictions: newPartDiet.trim(),
      assignedSharedGearWeightGrams: Number(newPartGear) || 0,
    });
    setNewPartName('');
    setNewPartDiet('');
  };

  const handleAddStage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStageName.trim()) return;
    addStage({
      name: newStageName.trim(),
      startDay: Number(newStageStart),
      endDay: Number(newStageEnd),
      storageMethodNote: newStageNote.trim() || 'Зберігання на маршруті',
    });
    setNewStageName('');
    setNewStageNote('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Секція 1: Параметри походу */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Settings className="w-5 h-5 text-emerald-600" />
          Загальні параметри походу та Цільові норми
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-600 font-semibold mb-1">Назва походу / Маршруту:</label>
            <input
              type="text"
              value={project.settings.name}
              onChange={e => updateSettings({ name: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">Вид туризму:</label>
            <select
              value={project.settings.hikeType}
              onChange={e => updateSettings({ hikeType: e.target.value as HikeType })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
            >
              <option value="mountain">Гірський туризм</option>
              <option value="hiking">Піший туризм</option>
              <option value="ski">Лижний / Зимовий туризм</option>
              <option value="water">Водний туризм</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">Категорія складності (к.с.):</label>
            <select
              value={project.settings.difficultyCategory}
              onChange={e => updateSettings({ difficultyCategory: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
            >
              <option value={1}>1 категорія складності</option>
              <option value={2}>2 категорія складності</option>
              <option value={3}>3 категорія складності</option>
              <option value={4}>4 категорія складності</option>
              <option value={5}>5 категорія складності</option>
              <option value={6}>6 категорія складності</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">Кліматичний профіль Б:Ж:В:</label>
            <select
              value={project.settings.climateProfile}
              onChange={e => updateSettings({ climateProfile: e.target.value as ClimateProfileId })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
            >
              {Object.entries(CLIMATE_PROFILES).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">Максимальна висота (м):</label>
            <input
              type="number"
              min="0"
              max="8848"
              value={project.settings.maxAltitudeMeters}
              onChange={e => updateSettings({ maxAltitudeMeters: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">Цільова вага сухого пайка на день (г/ос):</label>
            <input
              type="number"
              step="10"
              min="400"
              max="1200"
              value={project.settings.targetDailyWeightNetGrams}
              onChange={e => updateSettings({ targetDailyWeightNetGrams: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">Базова калорійність (ккал/ос-день):</label>
            <input
              type="number"
              step="50"
              min="1800"
              max="5000"
              value={project.settings.targetDailyKcal}
              onChange={e => updateSettings({ targetDailyKcal: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-600 font-semibold mb-1">Тип палива:</label>
            <select
              value={project.settings.fuelType}
              onChange={e => updateSettings({ fuelType: e.target.value as FuelType })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none bg-white"
            >
              <option value="gas">Газові балони (різьбові 230г / 450г)</option>
              <option value="liquid_fuel">Рідке паливо (бензин «Калоша»)</option>
              <option value="campfire">Кострове харчування (дрова)</option>
            </select>
          </div>

          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="meltsSnow"
              checked={project.settings.meltsSnowForWater}
              onChange={e => updateSettings({ meltsSnowForWater: e.target.checked })}
              className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
            />
            <label htmlFor="meltsSnow" className="text-slate-800 font-semibold cursor-pointer">
              Топимо сніг/лід для води (+30-50% витрати газу)
            </label>
          </div>
        </div>
      </section>

      {/* Секція 2: Етапи та Заброски */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              Етапи маршруту та Заброски
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              За В. Хачикяном та О. Алексєєвим, поділ маршруту на кільця із забросками дозволяє істотно полегшити рюкзаки на першому етапі.
            </p>
          </div>
        </div>

        {/* Список етапів */}
        <div className="space-y-3">
          {project.stages.map((stage, idx) => (
            <div
              key={stage.id}
              className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={stage.name}
                    onChange={e => updateStage(stage.id, { name: e.target.value })}
                    className="font-bold bg-transparent border-b border-dashed border-slate-400 hover:border-emerald-600 focus:border-emerald-600 outline-none px-1"
                  />
                  <span className="text-slate-500 font-normal">
                    (Дні {stage.startDay} - {stage.endDay})
                  </span>
                </div>
                <div className="text-slate-600 pl-7 flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">Схованка:</span>
                  <input
                    type="text"
                    value={stage.storageMethodNote}
                    onChange={e => updateStage(stage.id, { storageMethodNote: e.target.value })}
                    placeholder="Напр., залишаємо в притулку на висоті 2400м"
                    className="flex-1 bg-white border border-slate-300 rounded px-2 py-0.5 text-xs text-slate-700"
                  />
                </div>
              </div>

              {project.stages.length > 1 && (
                <button
                  onClick={() => removeStage(stage.id)}
                  className="text-rose-600 hover:text-rose-800 p-1.5 rounded hover:bg-rose-50 transition self-end md:self-center"
                  title="Видалити етап"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Форма додавання нового етапу */}
        <form onSubmit={handleAddStage} className="bg-slate-50/70 border border-dashed border-slate-300 rounded-lg p-3 text-xs flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Назва нового етапу / заброски"
            value={newStageName}
            onChange={e => setNewStageName(e.target.value)}
            className="flex-1 min-w-[200px] px-3 py-1.5 bg-white border border-slate-300 rounded text-slate-900"
          />
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Дні:</span>
            <input
              type="number"
              min="1"
              value={newStageStart}
              onChange={e => setNewStageStart(Number(e.target.value))}
              className="w-14 px-2 py-1 bg-white border border-slate-300 rounded text-center"
            />
            <span>-</span>
            <input
              type="number"
              min="1"
              value={newStageEnd}
              onChange={e => setNewStageEnd(Number(e.target.value))}
              className="w-14 px-2 py-1 bg-white border border-slate-300 rounded text-center"
            />
          </div>
          <input
            type="text"
            placeholder="Де зберігається заброска"
            value={newStageNote}
            onChange={e => setNewStageNote(e.target.value)}
            className="flex-1 min-w-[200px] px-3 py-1.5 bg-white border border-slate-300 rounded text-slate-900"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium flex items-center gap-1 transition"
          >
            <Plus className="w-4 h-4" />
            Додати етап
          </button>
        </form>
      </section>

      {/* Секція 3: Учасники та коефіцієнти */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              Учасники групи та вантажопідйомність (k_i)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Коефіцієнт k_i (0.5–1.3) за О. Алексєєвим: 1.0 — середній чоловік, 0.75 — жінка, 0.8–1.0 — керівник (щоб не перевантажувати мислення), до 1.2–1.3 — фізично міцні учасники.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
            Учасників: {project.participants.length}
          </span>
        </div>

        {/* Таблиця учасників */}
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="min-w-full text-xs divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-900 font-semibold">
              <tr>
                <th className="px-3 py-2.5 text-left">Ім'я</th>
                <th className="px-2 py-2.5 text-center">Стать</th>
                <th className="px-3 py-2.5 text-center">Коефіцієнт k_i</th>
                <th className="px-3 py-2.5 text-center">Частка вантажу</th>
                <th className="px-3 py-2.5 text-left">Роль у групі</th>
                <th className="px-3 py-2.5 text-center">Громадське спорядження</th>
                <th className="px-3 py-2.5 text-left">Алергії / Харчові обмеження</th>
                <th className="px-2 py-2.5 text-center"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {project.participants.map(p => {
                const sharePct = sumCoeffs > 0 ? Math.round(((p.carryingCapacityCoeff || 1) / sumCoeffs) * 100) : 0;
                return (
                  <tr key={p.id} className="hover:bg-slate-50/80">
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={p.name}
                        onChange={e => updateParticipant(p.id, { name: e.target.value })}
                        className="font-medium text-slate-900 bg-transparent border-b border-dashed border-slate-300 focus:border-emerald-600 outline-none w-full"
                      />
                    </td>
                    <td className="px-2 py-2 text-center">
                      <select
                        value={p.gender}
                        onChange={e => updateParticipant(p.id, { gender: e.target.value as 'M' | 'F' })}
                        className="bg-slate-50 border border-slate-200 rounded px-1.5 py-0.5 text-slate-700 font-bold"
                      >
                        <option value="M">Чол</option>
                        <option value="F">Жін</option>
                      </select>
                    </td>
                    <td className="px-3 py-2 text-center">
                      <input
                        type="number"
                        step="0.05"
                        min="0.4"
                        max="1.5"
                        value={p.carryingCapacityCoeff}
                        onChange={e => updateParticipant(p.id, { carryingCapacityCoeff: Number(e.target.value) })}
                        className="w-16 px-1.5 py-0.5 border border-slate-300 rounded text-center font-bold text-emerald-800"
                      />
                    </td>
                    <td className="px-3 py-2 text-center font-semibold text-slate-600">
                      {sharePct}%
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={p.role}
                        onChange={e => updateParticipant(p.id, { role: e.target.value })}
                        className="text-slate-700 bg-transparent border-b border-dashed border-slate-300 focus:border-emerald-600 outline-none w-full"
                      />
                    </td>
                    <td className="px-3 py-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <input
                          type="number"
                          step="100"
                          min="0"
                          value={p.assignedSharedGearWeightGrams}
                          onChange={e => updateParticipant(p.id, { assignedSharedGearWeightGrams: Number(e.target.value) })}
                          className="w-20 px-1.5 py-0.5 border border-slate-300 rounded text-center font-medium"
                        />
                        <span className="text-[10px] text-slate-400">г</span>
                      </div>
                    </td>
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={p.dietaryRestrictions}
                        placeholder="Напр., без лактози / вегетаріанець"
                        onChange={e => updateParticipant(p.id, { dietaryRestrictions: e.target.value })}
                        className="text-slate-600 placeholder:text-slate-300 bg-transparent border-b border-dashed border-slate-300 focus:border-emerald-600 outline-none w-full text-xs"
                      />
                    </td>
                    <td className="px-2 py-2 text-center">
                      {project.participants.length > 1 && (
                        <button
                          onClick={() => removeParticipant(p.id)}
                          className="text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-50 transition"
                          title="Видалити учасника"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Форма швидкого додавання учасника */}
        <form onSubmit={handleAddParticipant} className="bg-slate-50/70 border border-dashed border-slate-300 rounded-lg p-3 text-xs flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Ім'я нового учасника"
            value={newPartName}
            onChange={e => setNewPartName(e.target.value)}
            className="flex-1 min-w-[150px] px-3 py-1.5 bg-white border border-slate-300 rounded"
          />
          <select
            value={newPartGender}
            onChange={e => {
              const g = e.target.value as 'M' | 'F';
              setNewPartGender(g);
              setNewPartCoeff(g === 'M' ? 1.0 : 0.75);
            }}
            className="px-2 py-1.5 bg-white border border-slate-300 rounded font-medium"
          >
            <option value="M">Чоловік</option>
            <option value="F">Жінка</option>
          </select>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">k_i:</span>
            <input
              type="number"
              step="0.05"
              min="0.5"
              max="1.5"
              value={newPartCoeff}
              onChange={e => setNewPartCoeff(Number(e.target.value))}
              className="w-16 px-2 py-1.5 bg-white border border-slate-300 rounded text-center font-bold"
            />
          </div>
          <input
            type="text"
            placeholder="Роль (напр., Медик)"
            value={newPartRole}
            onChange={e => setNewPartRole(e.target.value)}
            className="w-28 px-3 py-1.5 bg-white border border-slate-300 rounded"
          />
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Спорядження:</span>
            <input
              type="number"
              step="100"
              value={newPartGear}
              onChange={e => setNewPartGear(Number(e.target.value))}
              className="w-20 px-2 py-1.5 bg-white border border-slate-300 rounded text-center font-medium"
            />
            <span className="text-slate-400 text-[10px]">г</span>
          </div>
          <input
            type="text"
            placeholder="Харчові обмеження / алергії"
            value={newPartDiet}
            onChange={e => setNewPartDiet(e.target.value)}
            className="flex-1 min-w-[180px] px-3 py-1.5 bg-white border border-slate-300 rounded"
          />
          <button
            type="submit"
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded font-medium flex items-center gap-1 transition"
          >
            <Plus className="w-4 h-4" />
            Додати учасника
          </button>
        </form>
      </section>
    </div>
  );
};
