import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DoneRecipes from '../pages/DoneRecipes';
import { renderWithRouter } from './helpers/renderWith';

const mockDoneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: [
      'Pasta',
      'Curry',
    ],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

describe('Testes da page DoneRecipes', () => {
  localStorage.setItem('doneRecipes', JSON.stringify(mockDoneRecipes));
  it('Componentes do localStorage estão sendo renderizados', () => {
    renderWithRouter(<DoneRecipes />);
    const penne = screen.getByText('Spicy Arrabiata Penne');
    expect(penne).toBeInTheDocument();
  });
  it('Componentes do localStorage estão sendo renderizados', () => {
    localStorage.clear();
    renderWithRouter(<DoneRecipes />);
    // expect(screen.getByTestId('done-recipes')).not.toBeInTheDocument();
  });
  it('Deve ter um titulo Done Recipes e um botão para ir ao profile', async () => {
    const { history } = renderWithRouter(<DoneRecipes />);
    const doneRecipesTitle = screen.getByRole('heading', { level: 1, name: 'Done Recipes' });
    expect(doneRecipesTitle).toBeInTheDocument();
    const profileButton = screen.getByRole('link', { href: '/profile' });
    expect(profileButton).toBeInTheDocument();
    const profileImage = screen.getByTestId('profile-top-btn');
    expect(profileImage).toBeInTheDocument();
    userEvent.click(profileButton);
    await waitFor(() => expect(history.location.pathname).toBe('/profile'));
  });
});
