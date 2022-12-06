import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RecipeDetailsMeal from '../components/RecipeDetailsMeal';
// import RecipeDetails from '../pages/RecipeDetails';
import mockMealDetails from './helpers/mockMealDetails';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes da page RecipeDetailsMeals', () => {
  it('Testa os componentes do RecipeDetails', () => {
    const { history } = renderWithRouter(<RecipeDetailsMeal />);
    history.push('/meals/52977');
    expect(screen.getByRole('heading', { name: 'RecipeDetails' })).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();
  });
  it('Testa se possui os componentes de imagem, titulo, categoria, etc', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockMealDetails),
    }));
    const { history } = renderWithRouter(<RecipeDetailsMeal />);
    history.push('/meals/52977');
    const recipePhoto = await screen.findByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    const recipeCategory = await screen.findByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();
    for (let i = 0; i <= 19; i += 1) {
      expect(screen.getByTestId(`${i}-ingredient-name-and-measure`)).toBeInTheDocument();
    }
    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
    const video = screen.getByTestId('video');
    expect(video).toBeInTheDocument();
    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    userEvent.click(startRecipeBtn);
    expect(history.location.pathname).toBe('/meals/52977/in-progress');
  });
});
