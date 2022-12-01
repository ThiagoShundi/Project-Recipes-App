import React, { useState } from 'react';
import HeaderNoSearch from '../components/HeaderNoSearch';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/FavoriteRecipe.css';

function FavoriteRecipes() {
  const getFavoritesLocalStorage = localStorage
    .getItem('favoriteRecipes') ? JSON
      .parse(localStorage.getItem('favoriteRecipes')) : [];

  const [getFavorites, setGetFavorites] = useState(getFavoritesLocalStorage);
  const [filters, setFilters] = useState('');

  const arrayFavorites = getFavorites
    .filter((favoriteFiltered) => favoriteFiltered.type !== filters);

  const unfavorite = ({ target }) => {
    const newFavorites = getFavorites
      .filter((_recipe, index) => index !== parseInt(target.name, 10));
    setGetFavorites(newFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  };

  const allFilter = () => {
    setFilters('');
  };

  const mealsFilter = () => {
    setFilters('drink');
  };

  const drinksFilter = () => {
    setFilters('meal');
  };

  return (
    <div>
      <HeaderNoSearch title="Favorite Recipes" />
      <div className="filters">
        <button type="button" data-testid="filter-by-all-btn" onClick={ allFilter }>
          All
        </button>
        <button type="button" data-testid="filter-by-meal-btn" onClick={ mealsFilter }>
          Meals
        </button>
        <button type="button" data-testid="filter-by-drink-btn" onClick={ drinksFilter }>
          Drinks
        </button>
      </div>
      <ul>
        { arrayFavorites && (arrayFavorites.map((favoriteMeal, indexMeal) => (
          <li key={ indexMeal }>
            <img
              className="imgRecipes"
              src={ favoriteMeal.image }
              alt="recipe"
              data-testid={ `${indexMeal}-horizontal-image` }
            />
            <p data-testid={ `${indexMeal}-horizontal-top-text` }>
              {favoriteMeal.type === 'meal' ? (
                `${favoriteMeal.nationality} - ${favoriteMeal.category}`
              ) : `${favoriteMeal.alcoholicOrNot}` }
            </p>
            <p data-testid={ `${indexMeal}-horizontal-name` }>{ favoriteMeal.name }</p>
            <div className="buttons">
              <button
                type="button"
                data-testid={ `${indexMeal}-horizontal-share-btn` }
                src={ shareIcon }
              >
                <img src={ shareIcon } alt="icon share" className="imgBtn" />
              </button>
              <button
                type="button"
                data-testid={ `${indexMeal}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                onClick={ (event) => unfavorite(event) }
              >
                <img
                  name={ indexMeal }
                  src={ blackHeartIcon }
                  alt="icon black heart"
                  className="imgBtn"
                />
              </button>
            </div>
          </li>
        )))}
      </ul>

    </div>
  );
}

export default FavoriteRecipes;
