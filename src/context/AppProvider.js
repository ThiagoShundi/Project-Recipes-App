import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';
import {
  // fetchData,
  fetchDrinks,
  fetchMeals,
  fetchDrinksCategory,
  fetchMealsCategory,
} from '../services/fetchRecipes';

const INITIAL_STATE = {
  dataTotalInfosState: [],
  drinksState: [],
  mealsState: [],
  mealsCategoryState: [],
  drinksCategoryState: [],
  isLoadingState: true,
  errorState: '',
};

const useDataInfos = () => {
  const [dataDrinksState, setDataDrinksState] = useState(INITIAL_STATE.drinks);
  const [dataMealsState, setDataMealsState] = useState(INITIAL_STATE.mealsState);
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [errorState, setErrorState] = useState(INITIAL_STATE.errorState);
  const [
    dataDrinksCategoryState,
    setDataDrinksCategoryState,
  ] = useState(INITIAL_STATE.drinksCategory);
  const [
    dataMealsCategoryState,
    setDataMealsCategoryState,
  ] = useState(INITIAL_STATE.mealsCategoryState);

  const categoryFilterMeals = (category) => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    fetchMeals(url)
      .then((response) => setDataMealsState(response.meals))
      .catch((err) => setErrorState(err.message))
      .finally(() => setIsLoadingState(false));
  };

  const categoryFilterDrinks = (category) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    fetchDrinks(url)
      .then((response) => setDataDrinksState(response.drinks))
      .catch((err) => setErrorState(err.message))
      .finally(() => setIsLoadingState(false));
  };

  const setFilterDrinks = () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    fetchDrinks(url)
      .then((response) => setDataDrinksState(response.drinks))
      .catch((err) => setErrorState(err.message))
      .finally(() => setIsLoadingState(false));
  };

  const setFilterMeals = () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetchMeals(url)
      .then((response) => setDataMealsState(response.meals))
      .catch((err) => setErrorState(err.message))
      .finally(() => setIsLoadingState(false));
  };

  useEffect(() => {
  //   const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  //   fetchData(url)
  //     .then((response) => setData(response.meals))
  //     .catch((err) => setError(err.message))
  //     .finally(() => setIsLoading(false));
  //   dispatch({ type: 'SET_DATA', payload: data });

    const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    fetchDrinks(urlDrinks)
      .then((response) => setDataDrinksState(response.drinks))
      .catch((err) => setErrorState(err.message))
      .finally(() => setIsLoadingState(false));

    const urlMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetchMeals(urlMeals)
      .then((response) => setDataMealsState(response.meals))
      .catch((err) => setErrorState(err.message))
      .finally(() => setIsLoadingState(false));

    const urlDrinksCategory = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    fetchDrinksCategory(urlDrinksCategory)
      .then((response) => setDataDrinksCategoryState(response.drinks))
      .catch((err) => setErrorState(err.message))
      .finally(() => setIsLoadingState(false));

    const urlMealsCategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    fetchMealsCategory(urlMealsCategory)
      .then((response) => setDataMealsCategoryState(response.meals))
      .catch((err) => setErrorState(err.message))
      .finally(() => setIsLoadingState(false));
  }, []);

  return {
    dataDrinksState,
    dataMealsState,
    dataMealsCategoryState,
    dataDrinksCategoryState,
    isLoadingState,
    errorState,
    categoryFilterMeals,
    categoryFilterDrinks,
    setFilterDrinks,
    setFilterMeals,
  };
};

function AppProvider({ children }) {
  const valueInfosData = useDataInfos();

  return (
    <AppContext.Provider value={ valueInfosData }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
