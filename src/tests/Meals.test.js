import { screen } from '@testing-library/react';
import Meals from '../pages/Meals';
import mockMeals from './helpers/mockMeals';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes da page Meals', () => {
  it('Verificar os elementos do Meals', async () => {
    renderWithRouter(<Meals />);
    const buttonMeals1 = await screen.findByTestId('Beef-category-filter');
    expect(buttonMeals1).toBeInTheDocument();

    const buttonMeals2 = await screen.findByTestId('Breakfast-category-filter');
    expect(buttonMeals2).toBeInTheDocument();

    const buttonMeals3 = await screen.findByTestId('Chicken-category-filter');
    expect(buttonMeals3).toBeInTheDocument();
  });
  it('Testa se renderiza os 12 recipe-cards', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockMeals),
    }));
    renderWithRouter(<Meals />);
    const recipeCards = await screen.findAllByTestId(/recipe-card/);
    expect(recipeCards.length).toBe(12);
  });
});
