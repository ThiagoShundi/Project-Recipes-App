import React from 'react';
import { render, screen } from '@testing-library/react';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import Profile from '../pages/Profile';

describe('Testes do Footer', () => {
  test('O footer no Meals', () => {
    render(<Meals />);
    const drinksIcons = screen.getByTestId(/drinks-bottom-btn/i);
    const mealsIcons = screen.getByTestId(/meals-bottom-btn/i);
    expect(drinksIcons).toBeInTheDocument();
    expect(mealsIcons).toBeInTheDocument();
  });

  test('O footer no drinks', () => {
    render(<Drinks />);
    const drinksIcons = screen.getByTestId(/drinks-bottom-btn/i);
    const mealsIcons = screen.getByTestId(/meals-bottom-btn/i);
    expect(drinksIcons).toBeInTheDocument();
    expect(mealsIcons).toBeInTheDocument();
  });

  test('O footer no profile', () => {
    render(<Profile />);
    const drinksIcons = screen.getByTestId(/drinks-bottom-btn/i);
    const mealsIcons = screen.getByTestId(/meals-bottom-btn/i);
    expect(drinksIcons).toBeInTheDocument();
    expect(mealsIcons).toBeInTheDocument();
  });
});
