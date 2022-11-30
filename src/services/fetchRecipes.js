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

export { fetchMeals, fetchDrinks };
