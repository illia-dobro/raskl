import { HikeDay, HikeProject, Participant, RouteStage } from '../types/domain';

export interface EmptyProjectOptions {
  participants?: number;
  days?: number;
}

function emptyDay(dayNumber: number, stageId: string): HikeDay {
  return {
    dayNumber,
    stageId,
    dayLoadProfile: 'standard',
    altitudeMeters: 1500,
    notes: '',
    meals: {
      breakfast: { title: 'Сніданок', items: [] },
      snack: { title: 'Перекус', items: [] },
      lunch: { title: 'Обід', items: [] },
      dinner: { title: 'Вечеря', items: [] },
    },
  };
}

/** Порожній простий похід: один етап, без страв. Усе наповнюється вручну або автозаповненням. */
export function createEmptyProject(opts: EmptyProjectOptions = {}): HikeProject {
  const pCount = Math.max(1, opts.participants ?? 4);
  const dCount = Math.max(1, opts.days ?? 3);
  const now = new Date().toISOString();

  const stages: RouteStage[] = [
    { id: 'stage-1', name: 'Весь похід', startDay: 1, endDay: dCount, storageMethodNote: '' },
  ];

  const participants: Participant[] = Array.from({ length: pCount }, (_, i) => ({
    id: `part-${i + 1}`,
    name: `Учасник ${i + 1}`,
    gender: 'M',
    carryingCapacityCoeff: 1.0,
    role: 'Учасник',
    dietaryRestrictions: '',
    assignedSharedGearWeightGrams: 2000,
  }));

  return {
    id: `project-${Date.now()}`,
    settings: {
      name: 'Мій похід',
      hikeType: 'hiking',
      difficultyCategory: 2,
      climateProfile: 'high_mountain_hot_1_07_4',
      maxAltitudeMeters: 2000,
      targetDailyWeightNetGrams: 620,
      targetDailyKcal: 2900,
      fuelType: 'gas',
      meltsSnowForWater: false,
    },
    stages,
    participants,
    days: Array.from({ length: dCount }, (_, i) => emptyDay(i + 1, 'stage-1')),
    createdAt: now,
    updatedAt: now,
  };
}

export function projectHasMenuItems(project: HikeProject): boolean {
  return project.days.some(d =>
    (['breakfast', 'snack', 'lunch', 'dinner'] as const).some(m => d.meals[m].items.length > 0)
  );
}
