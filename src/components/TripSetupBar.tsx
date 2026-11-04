import React from 'react';
import { useProjectStore } from '../store/useProjectStore';
import { ClimateProfileId } from '../types/domain';
import { Users, CalendarDays, Minus, Plus } from 'lucide-react';

type Level = 'easy' | 'medium' | 'hard';

interface LevelDef {
  id: Level;
  label: string;
  emoji: string;
  desc: string;
  difficultyCategory: number;
  targetDailyKcal: number;
  targetDailyWeightNetGrams: number;
  climateProfile: ClimateProfileId;
}

/** Проста класифікація складності замість «категорій складності» (1 к.с. / 2 к.с. ...). */
export const TRIP_LEVELS: LevelDef[] = [
  {
    id: 'easy',
    label: 'Легкий',
    emoji: '🟢',
    desc: 'Рівнина, пагорби, короткі переходи, тепла погода',
    difficultyCategory: 1,
    targetDailyKcal: 2600,
    targetDailyWeightNetGrams: 550,
    climateProfile: 'temperate_1_1_4',
  },
  {
    id: 'medium',
    label: 'Середній',
    emoji: '🟡',
    desc: 'Гори до ~3000 м, повноцінні ходові дні з рюкзаком',
    difficultyCategory: 2,
    targetDailyKcal: 2900,
    targetDailyWeightNetGrams: 620,
    climateProfile: 'high_mountain_hot_1_07_4',
  },
  {
    id: 'hard',
    label: 'Складний',
    emoji: '🔴',
    desc: 'Перевали, високогір\'я, холод або зима, довгі дні',
    difficultyCategory: 3,
    targetDailyKcal: 3300,
    targetDailyWeightNetGrams: 700,
    climateProfile: 'high_pamir_1_07_5',
  },
];

function levelFromCategory(cat: number): Level {
  if (cat <= 1) return 'easy';
  if (cat === 2) return 'medium';
  return 'hard';
}

const Stepper: React.FC<{
  value: number;
  onMinus: () => void;
  onPlus: () => void;
  minusDisabled?: boolean;
  label: string;
}> = ({ value, onMinus, onPlus, minusDisabled, label }) => (
  <div className="flex items-center gap-1 bg-white border border-slate-300 rounded-xl p-1">
    <button
      type="button"
      onClick={onMinus}
      disabled={minusDisabled}
      aria-label={`${label}: менше`}
      className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-30 flex items-center justify-center cursor-pointer"
    >
      <Minus className="w-4 h-4" />
    </button>
    <span className="w-8 text-center text-base font-black text-slate-900">{value}</span>
    <button
      type="button"
      onClick={onPlus}
      aria-label={`${label}: більше`}
      className="w-8 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center cursor-pointer"
    >
      <Plus className="w-4 h-4" />
    </button>
  </div>
);

export const TripSetupBar: React.FC = () => {
  const { project, addParticipant, removeParticipant, addDay, removeDay, updateSettings, collapseToSingleStage } =
    useProjectStore();

  const pCount = project.participants.length;
  const dCount = project.days.length;
  const level = levelFromCategory(project.settings.difficultyCategory);
  const levelDef = TRIP_LEVELS.find(l => l.id === level)!;

  const handleAddParticipant = () => {
    addParticipant({
      name: `Учасник ${pCount + 1}`,
      gender: 'M',
      carryingCapacityCoeff: 1.0,
      role: 'Учасник',
      dietaryRestrictions: '',
      assignedSharedGearWeightGrams: 2000,
    });
  };

  const handleRemoveParticipant = () => {
    const last = project.participants[pCount - 1];
    if (last && pCount > 1) removeParticipant(last.id);
  };

  const handleAddDay = () => {
    const lastDay = project.days[dCount - 1];
    addDay(lastDay?.stageId || project.stages[0]?.id);
  };

  const handleRemoveDay = () => {
    if (dCount > 1) removeDay(dCount);
  };

  const pickLevel = (l: LevelDef) =>
    updateSettings({
      difficultyCategory: l.difficultyCategory,
      targetDailyKcal: l.targetDailyKcal,
      targetDailyWeightNetGrams: l.targetDailyWeightNetGrams,
      climateProfile: l.climateProfile,
    });

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        <div className="flex items-center gap-2.5">
          <Users className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-slate-700">Учасників</span>
          <Stepper
            label="Учасники"
            value={pCount}
            onMinus={handleRemoveParticipant}
            onPlus={handleAddParticipant}
            minusDisabled={pCount <= 1}
          />
        </div>

        <div className="flex items-center gap-2.5">
          <CalendarDays className="w-4 h-4 text-emerald-600" />
          <span className="text-xs font-bold text-slate-700">Днів</span>
          <Stepper
            label="Дні"
            value={dCount}
            onMinus={handleRemoveDay}
            onPlus={handleAddDay}
            minusDisabled={dCount <= 1}
          />
        </div>

        <div className="flex items-center gap-2.5">
          <span className="text-xs font-bold text-slate-700">Складність</span>
          <div className="flex items-center gap-1 bg-slate-100 rounded-xl p-1">
            {TRIP_LEVELS.map(l => (
              <button
                key={l.id}
                type="button"
                onClick={() => pickLevel(l)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  level === l.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {l.emoji} {l.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="text-[11px] text-slate-500">
        {levelDef.desc}. Норма: ~{levelDef.targetDailyKcal} ккал і ~{levelDef.targetDailyWeightNetGrams} г
        їжі на людину в день. Імена учасників — у вкладці «Маршрут і Команда».
      </p>

      {project.stages.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 text-[11px] bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-amber-900">
          <span>
            Похід розбито на етапи (заброски): <b>{project.stages.length}</b>. Для простого походу вони не потрібні.
          </span>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Прибрати розбивку на етапи? Усі дні стануть одним етапом.')) {
                collapseToSingleStage();
              }
            }}
            className="px-2.5 py-1 bg-white border border-amber-300 hover:bg-amber-100 rounded-md font-bold cursor-pointer"
          >
            Прибрати етапи
          </button>
        </div>
      )}
    </div>
  );
};
