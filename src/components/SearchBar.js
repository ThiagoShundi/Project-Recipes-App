import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { FilterContextState } from '../context/InfoContext';

function SearchBar({ title }) {
  const { dispatch } = useContext(FilterContextState) || {};
  const [redirectIdDrink, setRedirectIdDrink] = useState(false);
  const [redirectIdMeal, setRedirectIdMeal] = useState(false);

  const [redirectSearchDrink, setRedirectSearchDrink] = useState(false);
  const [redirectSearchMeal, setRedirectSearchMeal] = useState(false);

  const [idMeal, setIdMeal] = useState('');
  const [idDrink, setIdDrink] = useState('');

  if (redirectIdMeal) return <Redirect to={ `/meals/${idMeal}` } />;
  if (redirectIdDrink) return <Redirect to={ `/drinks/${idDrink}` } />;
  if (redirectSearchDrink) return <Redirect to={ `/search/drinks/${idDrink}` } />;
  if (redirectSearchMeal) return <Redirect to={ `/search/meals/${idMeal}` } />;

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
    try {
      if (http.length > 0) {
        const response = await fetch(http);
        const repos = await response.json();
        console.log(repos);
        if (repos.meals.length === 1) {
          setIdMeal(repos.meals[0].idMeal);
          setRedirectIdMeal(true);
        } if (repos.meals.length > 1) {
          setIdMeal(repos.meals[0].idMeal);
          setRedirectSearchMeal(true);
        }
        console.log(repos.meals);
        dispatch({ type: 'ADD_FILTER-MEALS', payload: repos.meals });
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    } catch (error) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
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
    try {
      if (http.length > 0) {
        const response = await fetch(http);
        const repos = await response.json();
        if (repos.drinks.length === 1) {
          setIdDrink(repos.drinks[0].idDrink);
          setRedirectIdDrink(true);
        } if (repos.drinks.length > 1) {
          setIdDrink(repos.drinks[0].idDrink);
          setRedirectSearchDrink(true);
        }
        console.log(repos.drinks);
        dispatch({ type: 'ADD_FILTER-DRINKS', payload: repos.drinks });
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
    } catch (error) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const fetchApi = async (titleFetch) => {
    if (titleFetch === 'Meals') {
      await fetchApiMeals();
    }
    if (titleFetch === 'Drinks') {
      await fetchApiDrinks();
    }
  };

  return (
    <div className="search-radios">
      <label htmlFor="type">
        <input name="type" type="radio" data-testid="ingredient-search-radio" />
        {' '}
        <span>Ingredient</span>
        {' '}
        <input name="type" type="radio" data-testid="name-search-radio" />
        {' '}
        <span>Name</span>
        {' '}
        <input name="type" type="radio" data-testid="first-letter-search-radio" />
        {' '}
        <span>First Letter</span>
        {' '}
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => fetchApi(title) }
      >
        Search
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
}.isRequired;

export default SearchBar;
