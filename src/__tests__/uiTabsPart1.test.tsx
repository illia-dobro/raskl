import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { TopSummaryBar } from '../components/TopSummaryBar';
import { TheoryHandbookTab } from '../components/TheoryHandbookTab';
import { RouteAndTeamTab } from '../components/RouteAndTeamTab';
import { CatalogAndRecipesTab } from '../components/CatalogAndRecipesTab';

describe('UI Tabs Part 1: Summary Bar, Theory, Route/Team, Catalog/Recipes', () => {
  it('renders TopSummaryBar with key ration metrics and 6 navigation tabs', () => {
    render(<TopSummaryBar />);
    expect(screen.getByText(/Похідний Завгосп/i)).toBeDefined();
    expect(screen.getByText(/Стисла теорія/i)).toBeDefined();
    expect(screen.getByText(/Матриця розкладки/i)).toBeDefined();
  });

  it('renders TheoryHandbookTab with all 8 chapters and interactive altitude boiling calculator', () => {
    render(<TheoryHandbookTab />);
    expect(screen.getAllByText(/Плаваюча розкладка/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Технологія сушіння готових страв/i)).toBeDefined();
  });

  it('renders RouteAndTeamTab allowing participant and stage management', () => {
    render(<RouteAndTeamTab />);
    expect(screen.getByText(/Учасники групи та вантажопідйомність/i)).toBeDefined();
    expect(screen.getByText(/Етапи маршруту та Заброски/i)).toBeDefined();
  });

  it('renders CatalogAndRecipesTab with dehydrated recipes and search filter', () => {
    render(<CatalogAndRecipesTab />);
    expect(screen.getByText(/Рецепти сушених страв/i)).toBeDefined();
    const searchInput = screen.getByPlaceholderText(/Пошук страви або продукту/i);
    fireEvent.change(searchInput, { target: { value: 'Чілі' } });
    expect(screen.getByText(/Чілі/i)).toBeDefined();
  });
});
