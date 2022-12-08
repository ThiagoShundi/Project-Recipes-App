import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchDrinks } from '../services/fetchRecipes';
import '../styles/ProgressDetails.css';

export default function ProgressDetailsDrinks() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataDrinksInProgress, setDataDrinksInProgress] = useState([]);
  const [btnShare, setBtnShare] = useState(false);
  const [verifiedElements, setVerifiedElements] = useState([]);

  const location = useLocation();
  let dataProgress = [];
  let ingredients = [];

  const errorMessage = 'Um erro inesperado ocorreu';

  const verifyElement = ({ target: { checked, id } }) => {
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
  }, [location.pathname]);

  useEffect(() => {
    if (verifiedElements.length > 0) {
      console.log(verifiedElements);
      localStorage.setItem('inProgressRecipes', JSON.stringify(verifiedElements));
    }
  }, [verifiedElements]);

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
    if (dataDrinksInProgress.length > 0) {
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
                    checked={ verifiedElements
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
