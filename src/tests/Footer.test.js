import React from 'react';
import { render, screen } from '@testing-library/react';
import Meals from '../pages/Meals';

test('Farewell, front-end', () => {
  render(<Meals />);
  const drinksIcons = screen.getByTestId(/drinks-bottom-btn/i);
  const mealsIcons = screen.getByTestId(/meals-bottom-btn/i);
  expect(drinksIcons).toBeInTheDocument();
  expect(mealsIcons).toBeInTheDocument();
});
