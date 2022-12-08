import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchDrinks } from '../services/fetchRecipes';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/ProgressDetails.css';

export default function ProgressDetailsDrinks() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataDrinksInProgress, setDataDrinksInProgress] = useState([]);
  const [btnShare, setBtnShare] = useState(false);
  const [verifiedElements, setVerifiedElements] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const location = useLocation();
  let dataProgress = [];
  let ingredients = [];

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
    const oito = 8;

    const inProgressRecipes = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipes !== null) recipe = JSON.parse(inProgressRecipes);
    const keysInProgress = Object.keys(recipe);

    const ids = location.pathname.slice(oito);
    const numberCut = ids.indexOf('/');
    const id = ids.slice(0, numberCut);

    if (keysInProgress.includes('drinks')) {
      const keysDrinks = Object.keys(recipe.drinks);
      setBtnInProgress(keysDrinks.includes(`${id}`));
    }
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetchDrinks(url)
      .then((response) => setDataDrinksInProgress(response.drinks))
      .catch(() => console.log(errorMessage))
      .finally(() => setIsLoading(false));

    const getFavoritesLocalStorage = localStorage
      .getItem('favoriteRecipes') ? JSON
        .parse(localStorage.getItem('favoriteRecipes')) : [];

    if (getFavoritesLocalStorage.length > 0) {
      const keysDrinks = getFavoritesLocalStorage
        .filter((favorite) => favorite.type === 'drink');
      if (keysDrinks.length > 0) {
        const isFav = keysDrinks.find((drink) => drink.id === id);
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
    const oito = 8;
    const ids = location.pathname.slice(oito);
    const numberCut = ids.indexOf('/');
    const id = ids.slice(0, numberCut);
    const getFavoritesLocalStorage = localStorage
      .getItem('favoriteRecipes') ? JSON
        .parse(localStorage.getItem('favoriteRecipes')) : [];
    const newFavorite = {};
    let allFavorites = [];
    if (isFavorite) {
      allFavorites = getFavoritesLocalStorage.filter((getFav) => getFav.id !== id);
      setIsFavorite(false);
    }
    if ((dataDrinksInProgress.length > 0) && !isFavorite) {
      newFavorite.id = dataDrinksInProgress[0].idDrink;
      newFavorite.type = 'drink';
      newFavorite.nationality = '';
      newFavorite.category = dataDrinksInProgress[0].strCategory;
      newFavorite.alcoholicOrNot = dataDrinksInProgress[0].strAlcoholic;
      newFavorite.name = dataDrinksInProgress[0].strDrink;
      newFavorite.image = dataDrinksInProgress[0].strDrinkThumb;
      setIsFavorite(true);
      allFavorites = [...getFavoritesLocalStorage, newFavorite];
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(allFavorites));
  };

  if (dataDrinksInProgress.length > 0) {
    dataProgress = dataDrinksInProgress;
    const keysData = Object.keys(dataDrinksInProgress[0]);
    const ingredientsFilter = keysData.filter((key) => key.includes('strIngredient'));
    const meansureFilter = keysData.filter((key) => key.includes('strMeasure'));
    const valuesIng = ingredientsFilter
      .filter((ingre) => (
        dataDrinksInProgress[0][ingre] !== null)
         && (dataDrinksInProgress[0][ingre] !== ''));
    const valuesMen = meansureFilter
      .filter((ingre) => dataDrinksInProgress[0][ingre] !== null);
    valuesIng.forEach((add, index) => {
      let newValue = '';
      if (dataDrinksInProgress[0][valuesMen[index]] !== undefined) {
        newValue = `${dataDrinksInProgress[0][add]} 
        - ${dataDrinksInProgress[0][valuesMen[index]]}`;
      } else { newValue = `${dataDrinksInProgress[0][add]}`; }
      ingredients = [...ingredients, newValue];
    });
  }

  return (
    <div>
      <h1>ProgressDrinks</h1>
      { (dataProgress.length > 0) && (
        <div>
          {(!isLoading) && (
            <>
              <h2 data-testid="recipe-title">{ dataProgress[0].strDrink }</h2>
              <img
                data-testid="recipe-photo"
                src={ dataProgress[0].strDrinkThumb }
                alt={ dataProgress[0].idDrink }
                height="150px"
              />
              <h2 data-testid="recipe-category">
                { `${dataProgress[0].strCategory} - ${dataProgress[0].strAlcoholic}` }
              </h2>
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
        <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="heart" />
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
