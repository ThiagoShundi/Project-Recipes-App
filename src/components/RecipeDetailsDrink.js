import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchDrinks } from '../services/fetchRecipes';
import '../styles/RecipeDetails.css';

export default function RecipeDetailsDrink() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [btnInProgress, setBtnInProgress] = useState(false);
  const [btnShare, setBtnShare] = useState(false);

  const location = useLocation();
  let dataRecipe = [];
  let ingredients = [];
  const SIX = 6;
  const errorMessage = 'Um erro inesperado ocorreu';
  useEffect(() => {
    let recipe = {};
    const oito = 8;
    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipes !== null) recipe = JSON.parse(inProgressRecipes);
    const keysInProgress = Object.keys(recipe);

    const id = location.pathname.slice(oito);
    if (keysInProgress.includes('drinks')) {
      const keysDrinks = Object.keys(recipe.drinks);
      setBtnInProgress(keysDrinks.includes(`${id}`));
    }
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    const urlRecom = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetchDrinks(url)
      .then((response) => setDataDrinks(response.drinks))
      .catch(() => console.log(errorMessage))
      .finally(() => setIsLoading(false));

    fetchDrinks(urlRecom)
      .then((response) => setRecomendation(response.meals.slice(0, SIX)))
      .catch(() => console.log(errorMessage));
  }, []);

  if (dataDrinks.length > 0) {
    dataRecipe = dataDrinks;
    const keysData = Object.keys(dataDrinks[0]);
    const ingredientsFilter = keysData.filter((key) => key.includes('strIngredient'));
    const meansureFilter = keysData.filter((key) => key.includes('strMeasure'));
    const valuesIng = ingredientsFilter.filter((ingre) => dataDrinks[0][ingre] !== null);
    const valuesMen = meansureFilter.filter((ingre) => dataDrinks[0][ingre] !== null);
    valuesIng.forEach((add, index) => {
      let newValue = '';
      if (dataDrinks[0][valuesMen[index]] !== undefined) {
        newValue = `${dataDrinks[0][add]} - ${dataDrinks[0][valuesMen[index]]}`;
      } else { newValue = `${dataDrinks[0][add]}`; }
      ingredients = [...ingredients, newValue];
    });
  }

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
    if (dataDrinks.length > 0) {
      newFavorite.id = dataDrinks[0].idDrink;
      newFavorite.type = 'drink';
      newFavorite.nationality = '';
      newFavorite.category = dataDrinks[0].strCategory;
      newFavorite.alcoholicOrNot = dataDrinks[0].strAlcoholic;
      newFavorite.name = dataDrinks[0].strDrink;
      newFavorite.image = dataDrinks[0].strDrinkThumb;
    }
    const allFavorites = [...getFavoritesLocalStorage, newFavorite];
    localStorage.setItem('favoriteRecipes', JSON.stringify(allFavorites));
  };

  return (
    <div className="recipe-details">
      <h1>RecipeDetails</h1>
      { (dataRecipe.length > 0) && (
        <div>
          {(!isLoading) && (
            <>
              <h2 data-testid="recipe-title">{ dataRecipe[0].strDrink }</h2>
              <img
                data-testid="recipe-photo"
                src={ dataRecipe[0].strDrinkThumb }
                alt={ dataRecipe[0].idDrink }
                height="150px"
              />
              <h2 data-testid="recipe-category">
                { `${dataRecipe[0].strCategory} - ${dataRecipe[0].strAlcoholic}` }
              </h2>
            </>
          )}

          <ol>
            {ingredients.map((ing, index) => (
              <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                {ing}
              </li>
            ))}
          </ol>
          <p data-testid="instructions">{ dataRecipe[0].strInstructions }</p>
        </div>
      )}
      { btnInProgress && (
        <button type="button" data-testid="start-recipe-btn">Continue Recipe</button>
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
      {recomendation.length === SIX && (
        <div className="allRecomendation">
          {recomendation.map((ele, ind) => (
            <div
              key={ ind }
              data-testid={ `${ind}-recommendation-card` }
              className="cardRecomendation"
            >
              <img
                className="imgRecomendation"
                src={ ele.strMealThumb }
                alt={ ele.strMeal }
              />
              <p data-testid={ `${ind}-recommendation-title` }>{ele.strMeal}</p>
            </div>
          ))}
        </div>
      )}
      <Link to={ `${location.pathname}/in-progress` }>
        <button type="button" data-testid="start-recipe-btn" className="btnStart">
          Start Recipe
        </button>
      </Link>
    </div>
  );
}