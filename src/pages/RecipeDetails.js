import React from 'react';
import { useLocation } from 'react-router-dom';
import useDataInfos from '../hooks/useDataInfos';

export default function RecipeDetails() {
  const {
    dataMeals,
    dataDrinks,
  } = useDataInfos();
  const location = useLocation();
  const sete = 7;
  const oito = 8;
  let id = 0;
  const type = location.pathname.slice(1, sete);

  let dataRecipe = [];
  let ingredients = [];
  let a = '';
  if ((type === 'meals/') && (dataMeals.length > 0)) {
    id = location.pathname.slice(sete);
    dataRecipe = [dataMeals.find((meal) => meal.idMeal === id)];
    const ytVideo = dataRecipe[0].strYoutube;
    a = ytVideo.replace('watch?v=', 'embed/');
    console.log(dataRecipe);
  }

  if ((type === 'drinks') && (dataDrinks.length > 0)) {
    id = location.pathname.slice(oito);
    dataRecipe = [dataDrinks.find((meal) => meal.idDrink === id)];
    // console.log(dataRecipe);
    // console.log(id);
  }

  if (dataRecipe.length > 0) {
    // console.log(dataRecipe);
    const ingredientsAll = [dataRecipe[0].strIngredient1,
      dataRecipe[0].strIngredient2,
      dataRecipe[0].strIngredient3,
      dataRecipe[0].strIngredient4,
      dataRecipe[0].strIngredient5,
      dataRecipe[0].strIngredient6,
      dataRecipe[0].strIngredient7,
      dataRecipe[0].strIngredient8,
      dataRecipe[0].strIngredient9,
      dataRecipe[0].strIngredient10,
      dataRecipe[0].strIngredient11,
      dataRecipe[0].strIngredient12,
      dataRecipe[0].strIngredient13,
      dataRecipe[0].strIngredient14,
      dataRecipe[0].strIngredient15,
      dataRecipe[0].strIngredient16,
      dataRecipe[0].strIngredient17,
      dataRecipe[0].strIngredient18,
      dataRecipe[0].strIngredient19,
      dataRecipe[0].strIngredient20,
    ];
    // console.log(ingredientsAll);
    ingredients = ingredientsAll
      .filter((ingre) => (ingre !== null) && (ingre !== undefined) && (ingre.length > 0));
    // console.log(ingredients);
  }

  return (
    // <h1>RecipeDetails</h1>
    <div>
      { (dataRecipe.length > 0) && (
        <div>
          <h3 data-testid="recipe-title">{ dataRecipe[0].idMeal }</h3>
          <img
            data-testid="recipe-photo"
            src={ dataRecipe[0].strMealThumb }
            alt={ dataRecipe[0].idMeal }
          />
          <h2 data-testid="recipe-category">{ dataRecipe[0].strCategory }</h2>
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
    </div>
  );
}
