import { screen } from '@testing-library/react';
import Meals from '../pages/Meals';
import { renderWithRouter } from './helpers/renderWith';

describe('Teste do componente Meals', () => {
  it('Verificar os elementos do Meals', async () => {
    renderWithRouter(<Meals />);
    const buttonMeals1 = await screen.findByTestId('Beef-category-filter');
    expect(buttonMeals1).toBeInTheDocument();

    const buttonMeals2 = await screen.findByTestId('Breakfast-category-filter');
    expect(buttonMeals2).toBeInTheDocument();

    const buttonMeals3 = await screen.findByTestId('Chicken-category-filter');
    expect(buttonMeals3).toBeInTheDocument();
  });
});
