import React from 'react';
import { screen } from '@testing-library/react';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import { renderWithRouter } from './helpers/renderWith';

const mockLocalStorage = [{
  id: '52771',
  type: 'meal',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
},
{
  id: '178319',
  type: 'drink',
  nationality: '',
  category: 'Cocktail',
  alcoholicOrNot: 'Alcoholic',
  name: 'Aquamarine',
  image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
}];

describe('Testes do Footer', () => {
  test('Se é renderizado as receitas com o localStorage com a chave favoriteRecipes', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockLocalStorage));
    renderWithRouter(<FavoriteRecipes />);
    const categoryMeal = screen.getByText(/Italian - Vegetarian/i);
    const nameMeal = screen.getByText(/Spicy Arrabiata Penne/i);
    const imgMeal = screen.getByTestId(/0-horizontal-image/i);
    const categoryDrink = screen.getByText(/Alcoholic/i);
    const nameDrink = screen.getByText(/Aquamarine/i);
    const imgDrink = screen.getByTestId(/1-horizontal-image/i);

    expect(categoryMeal).toBeInTheDocument();
    expect(nameMeal).toBeInTheDocument();
    expect(categoryDrink).toBeInTheDocument();
    expect(nameDrink).toBeInTheDocument();
    expect(imgMeal.src).toBe('https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(imgDrink.src).toBe('https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
  });
  test('Se não é renderizado as receitas com o localStorage sem favoriteRecipes', () => {
    localStorage.clear();
    renderWithRouter(<FavoriteRecipes />);
    const favoriteRecipes = screen.getByText(/Favorite Recipes/i);
    const imgProfile = screen.getByTestId(/profile-top-btn/i);

    expect(favoriteRecipes).toBeInTheDocument();
    expect(imgProfile.src).toBe('http://localhost/profileIcon.svg');
  });
});
