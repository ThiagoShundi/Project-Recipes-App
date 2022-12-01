const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const fetchMeals = async (urlMeals) => {
  const response = await fetch(urlMeals);
  const data = await response.json();
  return data;
};

const fetchDrinks = async (urlDrinks) => {
  const response = await fetch(urlDrinks);
  const data = await response.json();
  return data;
};

const fetchMealsCategory = async (urlMealsCategory) => {
  const response = await fetch(urlMealsCategory);
  const data = await response.json();
  return data;
};

const fetchDrinksCategory = async (urlDrinksCategory) => {
  const response = await fetch(urlDrinksCategory);
  const data = await response.json();
  return data;
};

const fetchDrinkId = async (urlDrinkId) => {
  const response = await fetch(urlDrinkId);
  const data = await response.json();
  return data;
};

const fetchMealsId = async (urlMealsId) => {
  const response = await fetch(urlMealsId);
  const data = await response.json();
  return data;
};

export { fetchData, fetchMeals, fetchDrinks, fetchMealsCategory,
  fetchDrinksCategory, fetchDrinkId, fetchMealsId };
