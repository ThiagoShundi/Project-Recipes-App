import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { fetchDrinks } from '../services/fetchRecipes';
import '../styles/RecipeDetails.css';

export default function RecipeDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [dataMeals, setDataMeals] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [btnInProgress, setBtnInProgress] = useState(false);
  const [btnShare, setBtnShare] = useState(false);
  const location = useLocation();
  const sete = 7;
  const oito = 8;
  const type = location.pathname.slice(1, sete);
  let dataRecipe = [];
  let ingredients = [];
  let a = '';
  const SIX = 6;
  const errorMessage = 'Um erro inesperado ocorreu';
  useEffect(() => {
    let recipe = {};
    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipes !== null) recipe = JSON.parse(inProgressRecipes);
    const keysInProgress = Object.keys(recipe);
    if ((type === 'meals/')) {
      const id = location.pathname.slice(sete);
      if (keysInProgress.includes('meals')) {
        const keysMeals = Object.keys(recipe.meals);
        setBtnInProgress(keysMeals.includes(`${id}`));
      }
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const urlRecom = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      fetchDrinks(url)
        .then((response) => setDataMeals(response.meals))
        .catch(() => console.log(errorMessage))
        .finally(() => setIsLoading(false));

      fetchDrinks(urlRecom)
        .then((response) => setRecomendation(response.drinks.slice(0, SIX)))
        .catch(() => console.log(errorMessage))
        .finally(() => setRecomendation(recomendation));
    }

    if ((type === 'drinks')) {
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
        .catch(() => console.log(errorMessage))
        .finally(() => setRecomendation(recomendation.slice(0, SIX)));
    }
  }, [location.pathname, type]);

  if ((type === 'drinks') && (dataDrinks.length > 0)) {
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

  if ((type === 'meals/') && (dataMeals.length > 0)) {
    dataRecipe = dataMeals;
    const ytVideo = dataRecipe[0].strYoutube;
    a = ytVideo.replace('watch?v=', 'embed/');
    const keysData = Object.keys(dataMeals[0]);
    const ingredientsFilter = keysData.filter((key) => key.includes('strIngredient'));
    const meansureFilter = keysData.filter((key) => key.includes('strMeasure'));
    const valuesIng = ingredientsFilter.filter((ingre) => dataMeals[0][ingre] !== null);
    const valuesMen = meansureFilter.filter((ingre) => dataMeals[0][ingre] !== null);
    valuesIng.forEach((add, index) => {
      let newValue = '';
      if (dataMeals[0][valuesMen[index]] !== undefined) {
        newValue = `${dataMeals[0][add]} - ${dataMeals[0][valuesMen[index]]}`;
      } else { newValue = `${dataMeals[0][add]}`; }
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
    if (dataMeals.length > 0) {
      newFavorite.id = dataMeals[0].idMeal;
      newFavorite.type = 'meal';
      newFavorite.nationality = dataMeals[0].strArea;
      newFavorite.category = dataMeals[0].strCategory;
      newFavorite.alcoholicOrNot = '';
      newFavorite.name = dataMeals[0].strMeal;
      newFavorite.image = dataMeals[0].strMealThumb;
    }
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
          {((!isLoading) && (type === 'meals/')) && (
            <>
              <h2 data-testid="recipe-title">{ dataRecipe[0].strMeal }</h2>
              <img
                data-testid="recipe-photo"
                src={ dataRecipe[0].strMealThumb }
                alt={ dataRecipe[0].idMeal }
                height="150px"
              />
              <h2 data-testid="recipe-category">{ dataRecipe[0].strCategory }</h2>
            </>
          )}
          {((!isLoading) && (type === 'drinks')) && (
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
          { (type === 'meals/') && (
            <iframe title="video" data-testid="video" src={ a } />
          )}
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
              {(type === 'meals/') && (
                <>
                  <img
                    className="imgRecomendation"
                    src={ ele.strDrinkThumb }
                    alt={ ele.strDrink }
                  />
                  <p data-testid={ `${ind}-recommendation-title` }>{ele.strDrink}</p>
                </>
              )}
              {(type === 'drinks') && (
                <>
                  <img
                    className="imgRecomendation"
                    src={ ele.strMealThumb }
                    alt={ ele.strMeal }
                  />
                  <p data-testid={ `${ind}-recommendation-title` }>{ele.strMeal}</p>
                </>
              )}
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
