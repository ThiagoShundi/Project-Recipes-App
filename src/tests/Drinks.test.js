import { screen } from '@testing-library/react';
import Drinks from '../pages/Drinks';
import mockDrinks from './helpers/mockDrinks';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes da page Drinks', () => {
  it('Verificar os elementos do Drink', async () => {
    renderWithRouter(<Drinks />);
    const buttonDrink1 = await screen.findByTestId('Ordinary Drink-category-filter');
    expect(buttonDrink1).toBeInTheDocument();

    const buttonDrink2 = await screen.findByTestId('Cocktail-category-filter');
    expect(buttonDrink2).toBeInTheDocument();

    const buttonDrink3 = await screen.findByTestId('Shake-category-filter');
    expect(buttonDrink3).toBeInTheDocument();
  });
  it('Testa se renderiza os 12 recipe-cards', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockDrinks),
    }));
    renderWithRouter(<Drinks />);
    const drinksTitle = await screen.findByTestId('page-title');
    expect(drinksTitle).toBeInTheDocument();
    const recipeCards = await screen.findAllByTestId(/recipe-card/);
    expect(recipeCards.length).toBe(12);
  });
});
