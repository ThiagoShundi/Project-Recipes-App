import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchMeals } from '../services/fetchRecipes';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function ProgressDetailsMeals() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataMealsInProgress, setDataMealsInProgress] = useState([]);
  const [btnShare, setBtnShare] = useState(false);
  const [verifiedElements, setVerifiedElements] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const location = useLocation();
  let dataProgress = [];
  let ingredients = [];
  const a = '';
  const errorMessage = 'Um erro inesperado ocorreu';

  const verifyElement = ({ target: { checked, id } }) => {
    let allChecked = [];
    const allChecks = document.getElementsByTagName('input', { type: 'checkbox' });
    for (let i = 0; i < allChecks.length; i += 1) {
      if (allChecks[i].checked) allChecked = [...allChecked, allChecks[i]];
    }
    if (allChecked.length === allChecks.length) setIsDone(true);
    else setIsDone(false);
    if (checked) {
      setVerifiedElements([...verifiedElements, id]);
    }
    if (checked === false) {
      setVerifiedElements(verifiedElements.filter((ele) => ele !== id));
    }
  };

  useEffect(() => {
    const local = localStorage.getItem('inProgressRecipes');
    if (local !== null) {
      setVerifiedElements(JSON.parse(local));
    }
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

    const getFavoritesLocalStorage = localStorage
      .getItem('favoriteRecipes') ? JSON
        .parse(localStorage.getItem('favoriteRecipes')) : [];

    if (getFavoritesLocalStorage.length > 0) {
      const keysMeals = getFavoritesLocalStorage
        .filter((favorite) => favorite.type === 'meal');
      if (keysMeals.length > 0) {
        const isFav = keysMeals.find((meal) => meal.id === id);
        console.log(isFav);
        setIsFavorite(isFav);
      }
    }
  }, [location.pathname]);

  useEffect(() => {
    if (verifiedElements.length > 0) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(verifiedElements));
    }
  }, [verifiedElements]);

  const linkCopied = () => {
    const mil = 1000;
    setBtnShare(true);
    const inProg = location.pathname.indexOf('/in-progress');
    navigator.clipboard.writeText(`http://localhost:3000${location.pathname.slice(0, inProg)}`);
    setTimeout(() => {
      setBtnShare(false);
    }, mil);
  };

  const favorite = () => {
    const sete = 7;
    const ids = location.pathname.slice(sete);
    const numberCut = ids.indexOf('/');
    const id = ids.slice(0, numberCut);
    const getFavoritesLocalStorage = localStorage
      .getItem('favoriteRecipes') ? JSON
        .parse(localStorage.getItem('favoriteRecipes')) : [];
    const newFavorite = {};
    let allFavorites = [];
    console.log(isFavorite);
    if (isFavorite) {
      allFavorites = getFavoritesLocalStorage.filter((getFav) => getFav.id !== id);
      setIsFavorite(false);
    }
    if ((dataMealsInProgress.length > 0) && !isFavorite) {
      newFavorite.id = dataMealsInProgress[0].idMeal;
      newFavorite.type = 'meal';
      newFavorite.nationality = dataMealsInProgress[0].strArea;
      newFavorite.category = dataMealsInProgress[0].strCategory;
      newFavorite.alcoholicOrNot = '';
      newFavorite.name = dataMealsInProgress[0].strMeal;
      newFavorite.image = dataMealsInProgress[0].strMealThumb;
      setIsFavorite(true);
      allFavorites = [...getFavoritesLocalStorage, newFavorite];
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(allFavorites));
  };

  if (dataMealsInProgress.length > 0) {
    dataProgress = dataMealsInProgress;
    const keysData = Object.keys(dataMealsInProgress[0]);
    const ingredientsFilter = keysData.filter((key) => key.includes('strIngredient'));
    const meansureFilter = keysData.filter((key) => key.includes('strMeasure'));
    const valuesIng = ingredientsFilter
      .filter((ingre) => (dataMealsInProgress[0][ingre] !== null)
      && (dataMealsInProgress[0][ingre] !== ''));
    const valuesMen = meansureFilter
      .filter((ingre) => dataMealsInProgress[0][ingre] !== null);
    valuesIng.forEach((add, index) => {
      let newValue = '';
      if (dataMealsInProgress[0][valuesMen[index]] !== undefined) {
        newValue = `${dataMealsInProgress[0][add]} 
        - ${dataMealsInProgress[0][valuesMen[index]]}`;
      } else { newValue = `${dataMealsInProgress[0][add]}`; }
      ingredients = [...ingredients, newValue];
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
                <label
                  data-testid={ `${index}-ingredient-step` }
                  htmlFor={ ing }
                  className={ verifiedElements
                    .some((element) => element === ing) ? 'checked' : 'noChecked' }
                >
                  <input
                    onClick={ (event) => verifyElement(event) }
                    type="checkbox"
                    id={ ing }
                    name={ ing }
                    defaultChecked={ verifiedElements
                      .some((element) => element === ing) }
                  />
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
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ favorite }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      >
        <img src={ !isFavorite ? blackHeartIcon : whiteHeartIcon } alt="heart" />
      </button>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ !isDone }
      >
        Recipe Finish
      </button>
    </div>
  );
}
