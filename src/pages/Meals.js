import { useEffect, useState } from 'react';
import { fetchMeals } from '../services/fetchRecipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import '../styles/Meals.css';

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [mealsCategory, setMealsCategory] = useState([]);
  const [mealsCategoryFilter, setMealsCategoryFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const categoryFilter = async (mealName) => {
    setIsLoading(true);

    console.log(mealName);
    const urlMealsFilter = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealName}`;
    await fetchMeals(urlMealsFilter)
      .then((response) => setMealsCategoryFilter(response.meals))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));

    console.log(urlMealsFilter);
    console.log(mealsCategoryFilter);

    setMeals(mealsCategoryFilter);
    setIsLoading(false);
  };

  useEffect(() => {
    const urlMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetchMeals(urlMeals)
      .then((response) => setMeals(response.meals))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));

    const urlMealsCategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    fetchMeals(urlMealsCategory)
      .then((response) => setMealsCategory(response.meals))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const twelve = 12;
  const theFirstTwelve = meals.slice(0, twelve);

  const five = 5;
  const theFirstFive = mealsCategory.slice(0, five);

  return (
    <div className="meals-page">
      <Header title="Meals" />
      {
        theFirstFive.map((categoryName, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${categoryName.strCategory}-category-filter` }
            className="category-filter"
            onClick={ () => categoryFilter(categoryName.strCategory) }
          >
            { categoryName.strCategory }
          </button>
        ))
      }
      <button
        type="button"
        data-testid="All-category-filter"
        // onClick={ returnFilter }
      >
        All
      </button>
      {isLoading && <Loading />}
      {error && <p>{error}</p>}
      {
        error
          ? global.alert('Sorry, we haven\'t found any recipes for these filters.')
          : theFirstTwelve.map((meal, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recipe-card` }
              className="meal-card"
            >
              <img
                src={ meal.strMealThumb }
                alt={ meal.strMeal }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
            </div>
          ))
      }
      <Footer />
    </div>
  );
}
