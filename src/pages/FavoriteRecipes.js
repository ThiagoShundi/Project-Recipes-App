import React from 'react';
import HeaderNoSearch from '../components/HeaderNoSearch';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/FavoriteRecipe.css';

function FavoriteRecipes() {
  const getFavorites = localStorage
    .getItem('favoriteRecipes') ? JSON
      .parse(localStorage.getItem('favoriteRecipes')) : [];
  // console.log(getFavorites);

  return (
    <div>
      <HeaderNoSearch title="Favorite Recipes" />
      <button type="button" data-testid="filter-by-all-btn"> All</button>
      <button type="button" data-testid="filter-by-meal-btn"> Meals</button>
      <button type="button" data-testid="filter-by-drink-btn"> Drinks</button>
      <ul>
        { getFavorites && (getFavorites.map((favoriteMeal, indexMeal) => (
          <li key={ indexMeal }>
            <img
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
            <button
              type="button"
              data-testid={ `${indexMeal}-horizontal-share-btn` }
              src={ shareIcon }
            >
              <img src={ shareIcon } alt="icon share" />
            </button>
            <button
              type="button"
              data-testid={ `${indexMeal}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
            >
              <img src={ blackHeartIcon } alt="icon black heart" />
            </button>
          </li>
        )))}
      </ul>

    </div>
  );
}

export default FavoriteRecipes;
