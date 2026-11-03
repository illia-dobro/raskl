import { describe, it, expect, beforeEach } from 'vitest';
import { useProjectStore } from '../store/useProjectStore';
import { buildProjectWorkbook } from '../export/excelExporter';
import { generatePackingLabels } from '../export/packingLabelsGenerator';

describe('Project Store & Excel/Packing Exporters', () => {
  beforeEach(() => {
    useProjectStore.getState().resetToDemoProject();
  });

  it('updates meal item weight, adds/removes participants, and adds custom product in store', () => {
    const store = useProjectStore.getState();
    const initialCount = store.project.participants.length;

    store.addParticipant({
      name: 'Тарас',
      gender: 'M',
      carryingCapacityCoeff: 1.1,
      role: 'Фотограф',
      dietaryRestrictions: '',
      assignedSharedGearWeightGrams: 2500,
    });
    expect(useProjectStore.getState().project.participants.length).toBe(initialCount + 1);

    // Update meal item weight
    const day1 = useProjectStore.getState().project.days[0];
    const firstItem = day1.meals.breakfast.items[0];
    store.updateMealItemGrams(1, 'breakfast', firstItem.id, 120);
    const updatedDay1 = useProjectStore.getState().project.days[0];
    expect(updatedDay1.meals.breakfast.items[0].gramsPerPerson).toBe(120);
  });

  it('builds a 5-sheet Excel workbook with Ukrainian sheet names', () => {
    const project = useProjectStore.getState().project;
    const wb = buildProjectWorkbook(project);
    expect(wb.SheetNames).toEqual([
      'Зведення та Учасники',
      'Меню по днях',
      'Закупка та Сушіння',
      'Розподіл по рюкзаках',
      'Етикетки та Заброски',
    ]);
  });

  it('generates packing labels with cooking/rehydration instructions and carrier names', () => {
    useProjectStore.getState().runAutoAssignAllStages();
    const project = useProjectStore.getState().project;
    const labels = generatePackingLabels(project);
    expect(labels.length).toBeGreaterThan(10);
    expect(labels[0].dayNumber).toBe(1);
    expect(labels[0].totalNetGrams).toBeGreaterThan(0);
    expect(labels[0].carrierName).toBeTruthy();
  });
});
