import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import { renderWithRouter } from './helpers/renderWith';

describe('Testes do Footer', () => {
  localStorage.setItem('user', JSON.stringify({ email: 'teste@trybe.com' }));
  test('O footer no profile', () => {
    renderWithRouter(<Profile />);
    const email = screen.getByText(/teste@trybe.com/i);
    const doneRecipes = screen.getByText(/Done Recipes/i);
    const favoriteRecipes = screen.getByText(/Favorite Recipes/i);
    const logout = screen.getByText(/Logout/i);
    expect(email).toBeInTheDocument();
    expect(doneRecipes).toBeInTheDocument();
    expect(favoriteRecipes).toBeInTheDocument();
    expect(logout).toBeInTheDocument();
  });
  test('O footer no profile', () => {
    renderWithRouter(<Profile />);
    const logout = screen.getByText(/Logout/i);
    expect(logout).toBeInTheDocument();
    userEvent.click(logout);
    expect(localStorage.length).toBe(0);
  });
});
