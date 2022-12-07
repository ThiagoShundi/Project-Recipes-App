import React, { useState } from 'react';
import HeaderNoSearch from '../components/HeaderNoSearch';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipes() {
  const [btnShare, setBtnShare] = useState(false);
  const [filters, setFilters] = useState('');

  const getDoneRecipes = localStorage
    .getItem('doneRecipes') ? JSON
      .parse(localStorage.getItem('doneRecipes')) : [];

  const allFilter = () => setFilters('');

  const mealsFilter = () => setFilters('drink');

  const drinksFilter = () => setFilters('meal');

  const linkCopied = ({ target }) => {
    const mil = 1000;
    setBtnShare(true);
    navigator.clipboard.writeText(`http://localhost:3000/${target.name}`);
    setTimeout(() => {
      setBtnShare(false);
    }, mil);
  };

  return (
    <div>
      <HeaderNoSearch title="Done Recipes" />
      <button type="button" data-testid="filter-by-all-btn" onClick={ allFilter }>
        All
      </button>
      <button type="button" data-testid="filter-by-meal-btn" onClick={ mealsFilter }>
        Meals
      </button>
      <button type="button" data-testid="filter-by-drink-btn" onClick={ drinksFilter }>
        Drinks
      </button>
      {getDoneRecipes.length > 0 && (
        getDoneRecipes.filter((filter) => filter.type !== filters)
          .map((recipe, index) => (
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
                name={ `${recipe.type}s/${recipe.id}` }
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                onClick={ linkCopied }
              >
                Share
              </button>
              {btnShare && <span data-testid="link-copied">Link copied!</span>}
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
