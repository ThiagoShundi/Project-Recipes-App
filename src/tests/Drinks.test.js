import { screen } from '@testing-library/react';
import Drinks from '../pages/Drinks';
import mockDrinks from './helpers/mockDrinks';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes da page Drinks', () => {
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
