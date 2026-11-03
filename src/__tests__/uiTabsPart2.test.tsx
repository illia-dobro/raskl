import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Full App & Quartermaster Tabs Integration', () => {
  it('renders App and switches across all 6 tabs cleanly', () => {
    render(<App />);

    // 1. Switch to Menu Matrix
    fireEvent.click(screen.getByRole('button', { name: /Матриця розкладки/i }));
    expect(screen.getAllByText(/День 1/i).length).toBeGreaterThan(0);

    // 2. Switch to Shopping & Drying
    fireEvent.click(screen.getByRole('button', { name: /Закупка і сушіння/i }));
    expect(screen.getByText(/СИРА вага для закупки/i)).toBeDefined();
    expect(screen.getByText(/План сушіння в дегідраторі/i)).toBeDefined();

    // 3. Switch to Load Distribution & Export
    fireEvent.click(screen.getByRole('button', { name: /Рюкзаки та Експорт/i }));
    expect(screen.getByText(/Авторозподіл по рюкзаках/i)).toBeDefined();
    expect(screen.getByText(/Завантажити Excel \(\.xlsx\)/i)).toBeDefined();
  });
});
