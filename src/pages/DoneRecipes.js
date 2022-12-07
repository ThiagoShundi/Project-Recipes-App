import React from 'react';
import HeaderNoSearch from '../components/HeaderNoSearch';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const getDoneRecipes = localStorage
    .getItem('doneRecipes') ? JSON
      .parse(localStorage.getItem('doneRecipes')) : [];
  // console.log(getDoneRecipes);

  // if (getDoneRecipes.length > 0) {
  //   const drinks = getDoneRecipes.filter((drink) => drink.type === 'drink');
  //   const meals = getDoneRecipes.filter((meal) => meal.type === 'meal');
  // }

  return (
    <div>
      <HeaderNoSearch title="Done Recipes" />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-meal-btn">Meals</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      {getDoneRecipes.length > 0 && (
        getDoneRecipes.map((recipe, index) => (
          <div data-testid="done-recipes" key={ index }>
            <h3 data-testid={ `${index}-horizontal-name` }>{ recipe.name }</h3>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
              width="200px"
            />
            {recipe.type === 'meal' ? (
              <p data-testid={ `${index}-horizontal-top-text` }>
                {`${recipe.nationality} - ${recipe.category}` }
              </p>
            ) : (
              <p data-testid={ `${index}-horizontal-top-text` }>{ recipe.category }</p>
            )}
            <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
            {recipe.type === 'drink' && (
              <p data-testid={ `${index}-horizontal-top-text` }>
                { recipe.alcoholicOrNot }
              </p>
            )}
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              // onClick={ linkCopied }
            >
              Share
            </button>
            <ul>
              { recipe.tags.map((tag, i) => (
                <li key={ `tag-${i}` } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  { tag }
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default DoneRecipes;
