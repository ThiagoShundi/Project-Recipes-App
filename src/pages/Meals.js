import { useEffect, useState } from 'react';
import { fetchMeals } from '../services/fetchRecipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import '../styles/Meals.css';
import ButtonDrinks from '../components/ButtonDrinks';
import ButtonMeals from '../components/ButtonMeals';

export default function Meals() {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const urlMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    fetchMeals(urlMeals)
      .then((response) => setMeals(response.meals))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const twelve = 12;
  const theFirstTwelve = meals.slice(0, twelve);

  return (
    <div className="meals-page">
      <Header title="Meals" />
      <ButtonDrinks />
      <ButtonMeals />
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
