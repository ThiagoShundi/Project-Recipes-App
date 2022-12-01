import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes da page FavoriteRecipes', () => {
  it('Deve ter um titulo Favorite Recipes e um botão para ir ao profile', async () => {
    const { history } = renderWithRouter(<FavoriteRecipes />);
    const favoriteTitle = screen.getByRole('heading', { level: 1, name: 'Favorite Recipes' });
    expect(favoriteTitle).toBeInTheDocument();
    const profileButton = screen.getByRole('link', { href: '/profile' });
    expect(profileButton).toBeInTheDocument();
    const profileImage = screen.getByRole('img', { src: '/static/media/profileIcon.44eb3608f431845fe2fc2d2a23d758ae.svg' });
    expect(profileImage).toBeInTheDocument();
    userEvent.click(profileButton);
    await waitFor(() => expect(history.location.pathname).toBe('/profile'));
  });
});
