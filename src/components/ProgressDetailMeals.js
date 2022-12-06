import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchMeals } from '../services/fetchRecipes';

export default function ProgressDetailsMeals() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataMealsInProgress, setDataMealsInProgress] = useState([]);
  const [btnShare, setBtnShare] = useState(false);

  const location = useLocation();
  let dataProgress = [];
  let ingredients = [];
  const a = '';
  const errorMessage = 'Um erro inesperado ocorreu';

  useEffect(() => {
    let recipe = {};
    const sete = 7;

    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipes !== null) recipe = JSON.parse(inProgressRecipes);
    const keysInProgress = Object.keys(recipe);

    const ids = location.pathname.slice(sete);
    const numberCut = ids.indexOf('/');
    const id = ids.slice(0, numberCut);

    if (keysInProgress.includes('meals')) {
      const keysMeals = Object.keys(recipe.meals);
      setBtnInProgress(keysMeals.includes(`${id}`));
    }
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetchMeals(url)
      .then((response) => setDataMealsInProgress(response.meals))
      .catch(() => console.log(errorMessage))
      .finally(() => setIsLoading(false));
  }, []);

  const linkCopied = () => {
    const mil = 1000;
    setBtnShare(true);
    navigator.clipboard.writeText(`http://localhost:3000${location.pathname}`);
    setTimeout(() => {
      setBtnShare(false);
    }, mil);
  };

  const outro = () => {
    const getFavoritesLocalStorage = localStorage
      .getItem('favoriteRecipes') ? JSON
        .parse(localStorage.getItem('favoriteRecipes')) : [];
    // console.log(getFavoritesLocalStorage);
    const newFavorite = {};
    if (dataMealsInProgress.length > 0) {
      newFavorite.id = dataMeals[0].idMeal;
      newFavorite.type = 'meal';
      newFavorite.nationality = dataMeals[0].strArea;
      newFavorite.category = dataMeals[0].strCategory;
      newFavorite.alcoholicOrNot = '';
      newFavorite.name = dataMeals[0].strMeal;
      newFavorite.image = dataMeals[0].strMealThumb;
    }
    const allFavorites = [...getFavoritesLocalStorage, newFavorite];
    localStorage.setItem('favoriteRecipes', JSON.stringify(allFavorites));
  };

  if (dataMealsInProgress.length > 0) {
    dataProgress = dataMealsInProgress;
    const keysData = Object.keys(dataMealsInProgress[0]);
    const ingredientsFilter = keysData.filter((key) => key.includes('strIngredient'));
    const meansureFilter = keysData.filter((key) => key.includes('strMeasure'));
    const valuesIng = ingredientsFilter
      .filter((ingre) => dataMealsInProgress[0][ingre] !== null);
    const valuesMen = meansureFilter
      .filter((ingre) => dataMealsInProgress[0][ingre] !== null);
    valuesIng.forEach((add, index) => {
      let newValue = '';
      if (dataMealsInProgress[0][valuesMen[index]] !== undefined) {
        newValue = `${dataMealsInProgress[0][add]} 
        - ${dataMealsInProgress[0][valuesMen[index]]}`;
      } else { newValue = `${dataMealsInProgress[0][add]}`; }
      ingredients = [...ingredients, newValue];
      console.log(ingredients);
      console.log(ingredients[13]);
    });
  }

  return (
    <div>
      <h1>ProgressMeals</h1>
      { (dataProgress.length > 0) && (
        <div>
          {(!isLoading) && (
            <>
              <h2 data-testid="recipe-title">{ dataProgress[0].strMeal }</h2>
              <img
                data-testid="recipe-photo"
                src={ dataProgress[0].strMealThumb }
                alt={ dataProgress[0].idMeal }
                height="150px"
              />
              <h2 data-testid="recipe-category">{ dataProgress[0].strCategory }</h2>
            </>
          )}

          <ol>
            {ingredients.map((ing, index) => (
              <div key={ index }>
                <input type="checkbox" id={ ing } name={ ing } />
                <label
                  data-testid={ `${index}-ingredient-step` }
                  htmlFor={ ing }
                >
                  {ing}
                </label>
              </div>
            ))}
          </ol>
          <p data-testid="instructions">{ dataProgress[0].strInstructions }</p>
          <iframe title="video" data-testid="video" src={ a } />
        </div>
      )}
      <button
        type="button"
        data-testid="share-btn"
        onClick={ linkCopied }
      >
        Share
      </button>
      {btnShare && <span>Link copied!</span>}
      <button type="button" data-testid="favorite-btn" onClick={ outro }>Favorite</button>
      <button
        type="button"
        data-testid="finish-recipe-btn"
      >
        Recipe Finish
      </button>
    </div>
  );
}
