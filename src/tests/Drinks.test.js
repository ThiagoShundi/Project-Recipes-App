import { screen } from '@testing-library/react';
import Drinks from '../pages/Drinks';
import { renderWithRouter } from './helpers/renderWith';

describe('Teste do componente Meals', () => {
  it('Verificar os elementos do Meals', async () => {
    renderWithRouter(<Drinks />);
    const buttonDrink1 = await screen.findByTestId('Ordinary Drink-category-filter');
    expect(buttonDrink1).toBeInTheDocument();

    const buttonDrink2 = await screen.findByTestId('Cocktail-category-filter');
    expect(buttonDrink2).toBeInTheDocument();

    const buttonDrink3 = await screen.findByTestId('Shake-category-filter');
    expect(buttonDrink3).toBeInTheDocument();
  });
});
