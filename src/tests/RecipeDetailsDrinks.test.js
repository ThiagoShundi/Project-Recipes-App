import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeDetails from '../pages/RecipeDetails';
import mockDrinkDetails from './helpers/mockDrinkDetails';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes da page RecipeDetailsMeals', () => {
  it('Testa os componentes do RecipeDetails', () => {
    const { history } = renderWithRouter(<RecipeDetails />);
    history.push('/meals/52977');
    expect(screen.getByRole('heading', { name: 'RecipeDetails' })).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();
  });
  it('Testa se possui os componentes de imagem, titulo, categoria, etc', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockDrinkDetails),
    }));
    const { history } = renderWithRouter(<RecipeDetails />);
    history.push('/drinks/15997');
    const recipePhoto = await screen.findByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    const recipeCategory = await screen.findByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();
    for (let i = 0; i <= 2; i += 1) {
      expect(screen.getByTestId(`${i}-ingredient-name-and-measure`)).toBeInTheDocument();
    }
    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(startRecipeBtn);
    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });
});
