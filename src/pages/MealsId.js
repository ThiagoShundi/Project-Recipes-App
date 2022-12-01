import React, { useEffect, useState } from 'react';

export default function RecipeDetails() {
  const {
    mealsIdState,
  } = userDataInfos();

  return (
    <div>
      <h3 data-testid="recipe-title">{mealsIdState.strMeal}</h3>
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
