import React from 'react';
import { useLocation } from 'react-router-dom';
import RecipeDetailsDrink from '../components/RecipeDetailsDrink';
import RecipeDetailsMeal from '../components/RecipeDetailsMeal';
import '../styles/RecipeDetails.css';

export default function RecipeDetails() {
  const location = useLocation();
  const sete = 7;
  const type = location.pathname.slice(0, sete);
  if (type === '/meals/') {
    return <RecipeDetailsMeal />;
  }
  if (type === '/drinks') {
    return (
      <RecipeDetailsDrink />
    );
  }
}
