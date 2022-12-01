import { React, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchDrinks } from '../services/fetchRecipes';
import Loading from '../components/Loading';
import '../styles/Drinks.css';
import ButtonDrinks from '../components/ButtonDrinks';
import ButtonMeals from '../components/ButtonMeals';

export default function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    fetchDrinks(urlDrinks)
      .then((response) => (setDrinks(response.drinks)))
      .catch(() => setError('Um erro aconteceu tente novamente'))
      .finally(() => setIsLoading(false));
  }, []);
  useEffect(() => {
    if (error) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [error]);
  const twelve = 12;
  const theFirstTwelve = drinks.slice(0, twelve);
  return (
    <div className="drinks-page">
      <Header title="Drinks" />
      <ButtonDrinks />
      <ButtonMeals />
      {isLoading && <Loading />}
      {
        theFirstTwelve.map((drink, index) => (
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
      <Footer />
    </div>
  );
}
