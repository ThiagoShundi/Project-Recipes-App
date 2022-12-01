import { screen } from '@testing-library/react';
import Meals from '../pages/Meals';
import mockMeals from './helpers/mockMeals';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes da page Meals', () => {
  it('Testa se renderiza os 12 recipe-cards', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockMeals),
    }));
    renderWithRouter(<Meals />);
    const recipeCards = await screen.findAllByTestId(/recipe-card/);
    expect(recipeCards.length).toBe(12);
  });
});
