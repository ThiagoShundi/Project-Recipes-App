import React from 'react';
import { render, screen } from '@testing-library/react';
import Profile from '../pages/Profile';

describe('Testes do Footer', () => {
  localStorage.setItem('user', JSON.stringify({ email: 'teste@trybe.com' }));
  test('O footer no profile', () => {
    render(<Profile />);
    const email = screen.getByText(/teste@trybe.com/i);
    const doneRecipes = screen.getByText(/Done Recipes/i);
    const favoriteRecipes = screen.getByText(/Favorite Recipes/i);
    const logout = screen.getByText(/Logout/i);
    expect(email).toBeInTheDocument();
    expect(doneRecipes).toBeInTheDocument();
    expect(favoriteRecipes).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
  });
});
