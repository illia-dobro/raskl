import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { MenuMatrixTab } from '../components/MenuMatrixTab';
import { useProjectStore } from '../store/useProjectStore';

describe('Simplified Menu Matrix Workflow & 2 Filling Modes', () => {
  beforeEach(() => {
    useProjectStore.getState().resetToEmptyProject();
  });

  it('opens directly on Menu Matrix in clean mode showing the 2-mode hero banner', () => {
    render(<App />);
    expect(screen.getAllByText(/День 1/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/2 режими створення розкладки/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Заповнити за фільтром/i).length).toBeGreaterThan(0);
  });

  it('mode 1: allows automatic fill by filter matching target calories and dietary choices', () => {
    render(<MenuMatrixTab />);

    // Open auto-fill modal
    const autoFillBtns = screen.getAllByRole('button', { name: /Заповнити за фільтром/i });
    fireEvent.click(autoFillBtns[0]);

    // Modal is open
    expect(screen.getByText(/Скласти меню за фільтрами/i)).toBeDefined();
    expect(screen.getByText(/Магазинні продукти/i)).toBeDefined();

    // Select vegetarian filter
    fireEvent.click(screen.getByText(/Без м'яса/i));

    // Apply auto-fill
    fireEvent.click(screen.getByRole('button', { name: /Заповнити розкладку/i }));

    // Now days have dishes and hero banner disappears
    const s = useProjectStore.getState().project;
    expect(s.days[0].meals.breakfast.items.length).toBeGreaterThan(0);
    expect(s.days[0].meals.dinner.items.length).toBeGreaterThan(0);
    expect(screen.queryByText(/2 режими створення розкладки/i)).toBeNull();
  });

  it('mode 2: allows manual addition of dishes to clean days', () => {
    render(<MenuMatrixTab />);

    // Click "+ Додати страву" on breakfast
    const addButtons = screen.getAllByRole('button', { name: /Додати страву/i });
    fireEvent.click(addButtons[0]);

    // Quick add modal opens
    expect(screen.getByPlaceholderText(/Швидкий пошук/i)).toBeDefined();

    // Add custom meal
    const customInput = screen.getByPlaceholderText(/Своя страва/i);
    fireEvent.change(customInput, { target: { value: 'Кускус швидкий з родзинками' } });
    fireEvent.click(screen.getByRole('button', { name: /Додати свою/i }));

    // Custom meal is present
    expect(screen.getByText(/Кускус швидкий з родзинками/i)).toBeDefined();
  });

  it('allows clearing all meals to return to clean manual mode', () => {
    // Fill first
    useProjectStore.getState().autoFillMenu({
      cooking: 'simple',
      noMeat: false,
      noDairy: false,
      noNuts: false,
      noSugar: false,
    });
    expect(useProjectStore.getState().project.days[0].meals.breakfast.items.length).toBeGreaterThan(0);

    // Clear all meals
    useProjectStore.getState().clearAllMeals();
    expect(useProjectStore.getState().project.days[0].meals.breakfast.items.length).toBe(0);
  });

  it('opens dish composition modal separately when clicking "Склад" on a recipe', () => {
    // Load recipe
    useProjectStore.getState().autoFillMenu({
      cooking: 'dried',
      noMeat: false,
      noDairy: false,
      noNuts: false,
      noSugar: false,
    });

    render(<MenuMatrixTab />);

    const skladButtons = screen.getAllByRole('button', { name: /^Склад$/ });
    expect(skladButtons.length).toBeGreaterThan(0);
    fireEvent.click(skladButtons[0]);

    // Modal should appear
    expect(screen.getByText(/Склад страви • День 1/i)).toBeDefined();
    expect(screen.getByText(/Склад та інгредієнти/i)).toBeDefined();

    // Close modal
    fireEvent.click(screen.getByRole('button', { name: /Готово/i }));
    expect(screen.queryByText(/Склад страви • День 1/i)).toBeNull();
  });

  it('lets user change participants, days and simple difficulty level on the menu screen', () => {
    render(<MenuMatrixTab />);
    const before = useProjectStore.getState().project;
    const p0 = before.participants.length;
    const d0 = before.days.length;

    fireEvent.click(screen.getByRole('button', { name: /Учасники: більше/i }));
    fireEvent.click(screen.getByRole('button', { name: /Дні: більше/i }));
    let s = useProjectStore.getState().project;
    expect(s.participants.length).toBe(p0 + 1);
    expect(s.days.length).toBe(d0 + 1);

    fireEvent.click(screen.getByRole('button', { name: /Дні: менше/i }));
    expect(useProjectStore.getState().project.days.length).toBe(d0);

    fireEvent.click(screen.getByRole('button', { name: /Складний/i }));
    s = useProjectStore.getState().project;
    expect(s.settings.difficultyCategory).toBe(3);
    expect(s.settings.targetDailyKcal).toBe(3300);
  });
});
