import { useEffect, useState } from 'react';
import { fetchDrinks } from '../services/fetchRecipes';
import Loading from '../components/Loading';
import '../styles/Drinks.css';
import ButtonDrinks from '../components/ButtonDrinks';
import ButtonMeals from '../components/ButtonMeals';

export default function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    fetchDrinks(urlDrinks)
      .then((response) => setDrinks(response.drinks))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const twelve = 12;
  const theFirstTwelve = drinks.slice(0, twelve);

  return (
    <div className="drinks-page">
      <ButtonDrinks />
      <ButtonMeals />
      {isLoading && <Loading />}
      {error && <p>{error}</p>}
      <h1>Drinks</h1>
      {
        error
          ? global.alert('Sorry, we haven\'t found any recipes for these filters.')
          : theFirstTwelve.map((drink, index) => (
            <div
              key={ index }
              data-testid={ `${index}-recipe-card` }
              className="drinks-card"
            >
              <img
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
            </div>
          ))
      }
    </div>
  );
}
