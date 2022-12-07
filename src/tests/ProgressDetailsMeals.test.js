import { screen } from '@testing-library/react';
import ProgressDetailsMeals from '../components/ProgressDetailMeals';
import mockMealDetails from './helpers/mockMealDetails';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes da page ProgressDetailsDrink', () => {
  it('Testa os componentes do RecipeDetails', () => {
    const { history } = renderWithRouter(<ProgressDetailsMeals />);
    history.push('/meals/52977/in-progress');
    expect(screen.getByRole('heading', { name: 'ProgressMeals' })).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
  });
  it('Testa se possui os componentes de imagem, titulo, categoria, etc', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockMealDetails),
    }));
    const { history } = renderWithRouter(<ProgressDetailsMeals />);
    history.push('/meals/52977/in-progress');
    const recipePhoto = await screen.findByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();
    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();
    const recipeCategory = await screen.findByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();
    for (let i = 0; i <= 2; i += 1) {
      expect(screen.getByTestId(`${i}-ingredient-step`)).toBeInTheDocument();
    }
    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();
  });
});
