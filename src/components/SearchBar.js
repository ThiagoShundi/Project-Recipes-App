import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

function SearchBar({ title }) {
  const [redirectIdMeal, setRedirectIdMeal] = useState(false);
  const [idMeal, setIdMeal] = useState('');
  const [redirectIdDrink, setRedirectIdDrink] = useState(false);
  const [idDrink, setIdDrink] = useState('');
  if (redirectIdMeal) return <Redirect to={ `/meals/${idMeal}` } />;
  if (redirectIdDrink) return <Redirect to={ `/drinks/${idDrink}` } />;

  const fetchApiMeals = async () => {
    let http = '';
    const radios = document.getElementsByName('type');
    const input = document.getElementsByTagName('input')[0].value;
    if (radios[0].checked) {
      http = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`;
    }
    if (radios[1].checked) {
      http = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
    }
    if ((radios[2].checked) && (input.length === 1)) {
      http = `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`;
    }
    if (http.length > 0) {
      const response = await fetch(http);
      const repos = await response.json();
      if ((repos) && (repos.meals.length === 1)) {
        setIdMeal(repos.meals[0].idMeal);
        setRedirectIdMeal(true);
      }
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const fetchApiDrinks = async () => {
    let http = '';
    const radios = document.getElementsByName('type');
    const input = document.getElementsByTagName('input')[0].value;
    if (radios[0].checked) {
      http = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`;
    }
    if (radios[1].checked) {
      http = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`;
    }
    if ((radios[2].checked) && (input.length === 1)) {
      http = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`;
    }
    if (http.length > 0) {
      const response = await fetch(http);
      const repos = await response.json();
      if (repos.drinks.length === 1) {
        setIdDrink(repos.drinks[0].idDrink);
        setRedirectIdDrink(true);
      }
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const fetchApi = async (titleFetch) => {
    if (titleFetch === 'Meals') {
      fetchApiMeals();
    }
    if (titleFetch === 'Drinks') {
      fetchApiDrinks();
    }
  };

  return (
    <>
      <label htmlFor="type">
        <input name="type" type="radio" data-testid="ingredient-search-radio" />
        <span>Ingredient</span>
        <input name="type" type="radio" data-testid="name-search-radio" />
        <span>Name</span>
        <input name="type" type="radio" data-testid="first-letter-search-radio" />
        <span>First Letter</span>
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => fetchApi(title) }
      >
        Search
      </button>
    </>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
}.isRequired;

export default SearchBar;
