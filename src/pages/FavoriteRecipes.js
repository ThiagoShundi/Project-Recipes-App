import React from 'react';
import HeaderNoSearch from '../components/HeaderNoSearch';

function FavoriteRecipes() {
  const getFvorites = localStorage
    .getItem('favoriteRecipes') ? JSON
      .parse(localStorage.getItem('favoriteRecipes')) : [];
  console.log(getFvorites);
  return (
    <div>
      <HeaderNoSearch title="Favorite Recipes" />
      <button type="button" data-testid="filter-by-all-btn"> All</button>
      <button type="button" data-testid="filter-by-meal-btn"> Meals</button>
      <button type="button" data-testid="filter-by-drink-btn"> Drinks</button>
      { getFvorites && getFvorites.map((favorite, index) => (
        <>
          <img
            src={ favorite.image }
            alt="recipe"
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>{ favorite.category }</p>
          <p data-testid={ `${index}-horizontal-name` }>{ favorite.name }</p>
          <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
            Share
          </button>
          <button type="button" data-testid={ `${index}-horizontal-favorite-btn` }>
            Favorite
          </button>
        </>
      ))}
    </div>
  );
}

export default FavoriteRecipes;
