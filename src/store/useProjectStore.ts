import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  HikeProject,
  HikeSettings,
  Participant,
  RouteStage,
  MealType,
  MealItem,
  DayLoadProfileId,
  Product,
  DehydratedRecipe,
} from '../types/domain';
import { createDemoProject } from '../data/demoProject';
import { autoAssignStagePackages } from '../domain/loadDistributor';

export type AppTabId = 'theory' | 'route' | 'menu' | 'catalog' | 'shopping' | 'distribution';

interface ProjectState {
  project: HikeProject;
  activeTab: AppTabId;
  customProducts: Product[];
  customRecipes: DehydratedRecipe[];
  checkedShoppingIds: Record<string, boolean>;
  checkedDryingIds: Record<string, boolean>;

  // Tab
  setActiveTab: (tab: AppTabId) => void;

  // Settings
  updateSettings: (settings: Partial<HikeSettings>) => void;

  // Participants
  addParticipant: (participant: Omit<Participant, 'id'>) => void;
  updateParticipant: (id: string, updates: Partial<Participant>) => void;
  removeParticipant: (id: string) => void;

  // Stages (Заброски)
  addStage: (stage: Omit<RouteStage, 'id'>) => void;
  updateStage: (id: string, updates: Partial<RouteStage>) => void;
  removeStage: (id: string) => void;

  // Days
  addDay: (stageId: string) => void;
  updateDaySettings: (dayNumber: number, updates: { dayLoadProfile?: DayLoadProfileId; altitudeMeters?: number; notes?: string; stageId?: string }) => void;
  removeDay: (dayNumber: number) => void;
  duplicateDay: (dayNumber: number) => void;
  swapDays: (dayNumA: number, dayNumB: number) => void;

  // Meal items
  addMealItem: (dayNumber: number, mealType: MealType, item: Omit<MealItem, 'id'>) => void;
  updateMealItemGrams: (dayNumber: number, mealType: MealType, itemId: string, grams: number) => void;
  assignItemParticipant: (dayNumber: number, mealType: MealType, itemId: string, participantId: string | undefined) => void;
  removeMealItem: (dayNumber: number, mealType: MealType, itemId: string) => void;

  // Load Distribution
  runAutoAssignStage: (stageId: string) => void;
  runAutoAssignAllStages: () => void;

  // Custom Items
  addCustomProduct: (product: Product) => void;
  addCustomRecipe: (recipe: DehydratedRecipe) => void;

  // Checkboxes
  toggleShoppingCheck: (id: string) => void;
  toggleDryingCheck: (id: string) => void;

  // Project Management
  loadProject: (project: HikeProject) => void;
  resetToDemoProject: () => void;
}

export const useProjectStore = create<ProjectState>()(
  persist(
    (set, get) => ({
      project: createDemoProject(),
      activeTab: 'theory',
      customProducts: [],
      customRecipes: [],
      checkedShoppingIds: {},
      checkedDryingIds: {},

      setActiveTab: tab => set({ activeTab: tab }),

      updateSettings: settings =>
        set(state => ({
          project: {
            ...state.project,
            settings: { ...state.project.settings, ...settings },
            updatedAt: new Date().toISOString(),
          },
        })),

      addParticipant: p =>
        set(state => {
          const newParticipant: Participant = {
            ...p,
            id: `part-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          };
          return {
            project: {
              ...state.project,
              participants: [...state.project.participants, newParticipant],
              updatedAt: new Date().toISOString(),
            },
          };
        }),

      updateParticipant: (id, updates) =>
        set(state => ({
          project: {
            ...state.project,
            participants: state.project.participants.map(p => (p.id === id ? { ...p, ...updates } : p)),
            updatedAt: new Date().toISOString(),
          },
        })),

      removeParticipant: id =>
        set(state => ({
          project: {
            ...state.project,
            participants: state.project.participants.filter(p => p.id !== id),
            updatedAt: new Date().toISOString(),
          },
        })),

      addStage: stage =>
        set(state => {
          const newStage: RouteStage = {
            ...stage,
            id: `stage-${Date.now()}`,
          };
          return {
            project: {
              ...state.project,
              stages: [...state.project.stages, newStage],
              updatedAt: new Date().toISOString(),
            },
          };
        }),

      updateStage: (id, updates) =>
        set(state => ({
          project: {
            ...state.project,
            stages: state.project.stages.map(s => (s.id === id ? { ...s, ...updates } : s)),
            updatedAt: new Date().toISOString(),
          },
        })),

      removeStage: id =>
        set(state => ({
          project: {
            ...state.project,
            stages: state.project.stages.filter(s => s.id !== id),
            updatedAt: new Date().toISOString(),
          },
        })),

      addDay: stageId =>
        set(state => {
          const nextDayNum = state.project.days.length + 1;
          const newDay = {
            dayNumber: nextDayNum,
            stageId: stageId || state.project.stages[0]?.id || 'stage-1',
            dayLoadProfile: 'standard' as const,
            altitudeMeters: 1500,
            notes: '',
            meals: {
              breakfast: { title: 'Сніданок', items: [] },
              snack: { title: 'Перекус', items: [] },
              lunch: { title: 'Обід', items: [] },
              dinner: { title: 'Вечеря', items: [] },
            },
          };
          return {
            project: {
              ...state.project,
              days: [...state.project.days, newDay],
              updatedAt: new Date().toISOString(),
            },
          };
        }),

      updateDaySettings: (dayNumber, updates) =>
        set(state => ({
          project: {
            ...state.project,
            days: state.project.days.map(d =>
              d.dayNumber === dayNumber ? { ...d, ...updates } : d
            ),
            updatedAt: new Date().toISOString(),
          },
        })),

      removeDay: dayNumber =>
        set(state => {
          const filtered = state.project.days.filter(d => d.dayNumber !== dayNumber);
          // Перенумеровуємо дні
          const renumbered = filtered.map((d, idx) => ({ ...d, dayNumber: idx + 1 }));
          return {
            project: {
              ...state.project,
              days: renumbered,
              updatedAt: new Date().toISOString(),
            },
          };
        }),

      duplicateDay: dayNumber =>
        set(state => {
          const targetDay = state.project.days.find(d => d.dayNumber === dayNumber);
          if (!targetDay) return state;

          const cloned = JSON.parse(JSON.stringify(targetDay));
          const insertIdx = state.project.days.findIndex(d => d.dayNumber === dayNumber);
          const newDays = [...state.project.days];
          newDays.splice(insertIdx + 1, 0, cloned);
          const renumbered = newDays.map((d, idx) => ({ ...d, dayNumber: idx + 1 }));

          return {
            project: {
              ...state.project,
              days: renumbered,
              updatedAt: new Date().toISOString(),
            },
          };
        }),

      swapDays: (dayNumA, dayNumB) =>
        set(state => {
          const idxA = state.project.days.findIndex(d => d.dayNumber === dayNumA);
          const idxB = state.project.days.findIndex(d => d.dayNumber === dayNumB);
          if (idxA === -1 || idxB === -1) return state;

          const newDays = [...state.project.days];
          const temp = newDays[idxA];
          newDays[idxA] = newDays[idxB];
          newDays[idxB] = temp;
          const renumbered = newDays.map((d, idx) => ({ ...d, dayNumber: idx + 1 }));

          return {
            project: {
              ...state.project,
              days: renumbered,
              updatedAt: new Date().toISOString(),
            },
          };
        }),

      addMealItem: (dayNumber, mealType, item) =>
        set(state => {
          const newItem: MealItem = {
            ...item,
            id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          };

          return {
            project: {
              ...state.project,
              days: state.project.days.map(d => {
                if (d.dayNumber !== dayNumber) return d;
                return {
                  ...d,
                  meals: {
                    ...d.meals,
                    [mealType]: {
                      ...d.meals[mealType],
                      items: [...d.meals[mealType].items, newItem],
                    },
                  },
                };
              }),
              updatedAt: new Date().toISOString(),
            },
          };
        }),

      updateMealItemGrams: (dayNumber, mealType, itemId, grams) =>
        set(state => ({
          project: {
            ...state.project,
            days: state.project.days.map(d => {
              if (d.dayNumber !== dayNumber) return d;
              return {
                ...d,
                meals: {
                  ...d.meals,
                  [mealType]: {
                    ...d.meals[mealType],
                    items: d.meals[mealType].items.map(it =>
                      it.id === itemId ? { ...it, gramsPerPerson: Math.max(1, grams) } : it
                    ),
                  },
                },
              };
            }),
            updatedAt: new Date().toISOString(),
          },
        })),

      assignItemParticipant: (dayNumber, mealType, itemId, participantId) =>
        set(state => ({
          project: {
            ...state.project,
            days: state.project.days.map(d => {
              if (d.dayNumber !== dayNumber) return d;
              return {
                ...d,
                meals: {
                  ...d.meals,
                  [mealType]: {
                    ...d.meals[mealType],
                    items: d.meals[mealType].items.map(it =>
                      it.id === itemId ? { ...it, assignedParticipantId: participantId } : it
                    ),
                  },
                },
              };
            }),
            updatedAt: new Date().toISOString(),
          },
        })),

      removeMealItem: (dayNumber, mealType, itemId) =>
        set(state => ({
          project: {
            ...state.project,
            days: state.project.days.map(d => {
              if (d.dayNumber !== dayNumber) return d;
              return {
                ...d,
                meals: {
                  ...d.meals,
                  [mealType]: {
                    ...d.meals[mealType],
                    items: d.meals[mealType].items.filter(it => it.id !== itemId),
                  },
                },
              };
            }),
            updatedAt: new Date().toISOString(),
          },
        })),

      runAutoAssignStage: stageId =>
        set(state => {
          const updated = autoAssignStagePackages(
            state.project,
            stageId,
            state.customProducts,
            state.customRecipes
          );
          return { project: updated };
        }),

      runAutoAssignAllStages: () =>
        set(state => {
          let updated = { ...state.project };
          state.project.stages.forEach(s => {
            updated = autoAssignStagePackages(
              updated,
              s.id,
              state.customProducts,
              state.customRecipes
            );
          });
          return { project: updated };
        }),

      addCustomProduct: product =>
        set(state => ({
          customProducts: [...state.customProducts, { ...product, isCustom: true }],
        })),

      addCustomRecipe: recipe =>
        set(state => ({
          customRecipes: [...state.customRecipes, { ...recipe, isCustom: true }],
        })),

      toggleShoppingCheck: id =>
        set(state => ({
          checkedShoppingIds: {
            ...state.checkedShoppingIds,
            [id]: !state.checkedShoppingIds[id],
          },
        })),

      toggleDryingCheck: id =>
        set(state => ({
          checkedDryingIds: {
            ...state.checkedDryingIds,
            [id]: !state.checkedDryingIds[id],
          },
        })),

      loadProject: project => set({ project, checkedShoppingIds: {}, checkedDryingIds: {} }),

      resetToDemoProject: () =>
        set({ project: createDemoProject(), checkedShoppingIds: {}, checkedDryingIds: {} }),
    }),
    {
      name: 'raskl_project_storage_v1',
      partialize: state => ({
        project: state.project,
        customProducts: state.customProducts,
        customRecipes: state.customRecipes,
        checkedShoppingIds: state.checkedShoppingIds,
        checkedDryingIds: state.checkedDryingIds,
      }),
    }
  )
);
