import { useState, useEffect } from 'react';
import {
  // fetchData,
  fetchDrinks,
  fetchMeals,
  fetchDrinksCategory,
  fetchMealsCategory } from '../services/fetchRecipes';
// import AppContext from '../context/AppContext';

export default function useDataInfos() {
  // const [data, setData] = useState([]);
  const [dataDrinks, setDataDrinks] = useState([]);
  const [dataMeals, setDataMeals] = useState([]);
  const [dataDrinksCategory, setDataDrinksCategory] = useState([]);
  const [dataMealsCategory, setDataMealsCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const categoryFilterMeals = (category) => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    fetchMeals(url)
      .then((response) => setDataMeals(response.meals))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  const categoryFilterDrinks = (category) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    fetchDrinks(url)
      .then((response) => setDataDrinks(response.drinks))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  const setFilterDrinks = () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    fetchDrinks(url)
      .then((response) => setDataDrinks(response.drinks))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  const setFilterMeals = () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetchMeals(url)
      .then((response) => setDataMeals(response.meals))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
  //   const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  //   fetchData(url)
  //     .then((response) => setData(response.meals))
  //     .catch((err) => setError(err.message))
  //     .finally(() => setIsLoading(false));

    const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    fetchDrinks(urlDrinks)
      .then((response) => setDataDrinks(response.drinks))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));

    const urlMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetchMeals(urlMeals)
      .then((response) => setDataMeals(response.meals))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));

    const urlDrinksCategory = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    fetchDrinksCategory(urlDrinksCategory)
      .then((response) => setDataDrinksCategory(response.drinks))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));

    const urlMealsCategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    fetchMealsCategory(urlMealsCategory)
      .then((response) => setDataMealsCategory(response.meals))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  return {
    // data,
    dataDrinks,
    dataMeals,
    dataDrinksCategory,
    dataMealsCategory,
    isLoading,
    error,
    fetchMeals,
    fetchDrinks,
    fetchMealsCategory,
    fetchDrinksCategory,
    // fetchData,
    categoryFilterMeals,
    categoryFilterDrinks,
    setFilterDrinks,
    setFilterMeals,
  };
}
