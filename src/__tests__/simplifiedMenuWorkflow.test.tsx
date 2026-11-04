import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import { MenuMatrixTab } from '../components/MenuMatrixTab';
import { useProjectStore } from '../store/useProjectStore';

describe('Simplified Menu Matrix Workflow', () => {
  it('opens directly on Menu Matrix with clear dish names and simplified cards', () => {
    render(<App />);
    // Verify default active tab is the Menu Matrix and days are rendered
    expect(screen.getAllByText(/День 1/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Альпійська гранола з горіхами та сушеними ягодами/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Склад/i).length).toBeGreaterThan(0);
  });

  it('opens dish composition modal separately when clicking "Склад"', () => {
    render(<MenuMatrixTab />);

    // Click on the first "Склад" button
    const skladButtons = screen.getAllByRole('button', { name: /^Склад$/ });
    fireEvent.click(skladButtons[0]);

    // Modal should appear with raw ingredients breakdown and cooking tips
    expect(screen.getByText(/Склад страви • День 1/i)).toBeDefined();
    expect(screen.getByText(/Склад та інгредієнти/i)).toBeDefined();
    expect(screen.getByText(/Порція сухої ваги:/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Готово/i })).toBeDefined();

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

    // Етапи: прибираємо розбивку → один етап на всі дні
    expect(s.stages.length).toBeGreaterThan(1);
    useProjectStore.getState().collapseToSingleStage();
    s = useProjectStore.getState().project;
    expect(s.stages.length).toBe(1);
    expect(s.days.every(d => d.stageId === s.stages[0].id)).toBe(true);
    expect(s.stages[0].endDay).toBe(s.days.length);
  });

  it('allows lightweight addition of dishes and custom meals', () => {
    render(<MenuMatrixTab />);

    // Click "+ Додати страву" on breakfast
    const addButtons = screen.getAllByRole('button', { name: /Додати страву/i });
    fireEvent.click(addButtons[0]);

    // Quick add modal opens with categories and custom dish input
    expect(screen.getByPlaceholderText(/Швидкий пошук/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Своя страва/i)).toBeDefined();

    // Add custom meal
    const customInput = screen.getByPlaceholderText(/Своя страва/i);
    fireEvent.change(customInput, { target: { value: 'Кускус швидкий з родзинками' } });
    fireEvent.click(screen.getByRole('button', { name: /Додати свою/i }));

    // Now the custom meal should appear on screen
    expect(screen.getByText(/Кускус швидкий з родзинками/i)).toBeDefined();
  });
});
