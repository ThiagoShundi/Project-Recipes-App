// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

export default function RecipeDetails() {
  // const { id } = useParams();
  // const [drinkIdState, setDrinkIdState] = useState([]);
  // const [mealsIdState, setMealsIdState] = useState([]);

  // useEffect();
  return (
    <div>
      <h3 data-testid="recipe-title">Título da receita</h3>
      {/* <img data-testid="recipe-photo" /> */}
      <h2 data-testid="recipe-category">Categoria da receita</h2>
      <ol>
        <li>Item 1</li>
      </ol>
      <p data-testid="instructions">Instruções</p>
      {/* <iframe data-testid="video" /> */}
    </div>
  );
}
