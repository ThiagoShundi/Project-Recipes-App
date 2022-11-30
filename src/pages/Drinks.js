import { React, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchDrinks } from '../services/fetchRecipes';
import Loading from '../components/Loading';
import '../styles/Drinks.css';

export default function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const [categoryDrinks, setcategoryDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  console.log(categoryDrinks);

  useEffect(() => {
    const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    fetchDrinks(urlDrinks)
      .then((response) => setDrinks(response.drinks))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));

    const urlDrinksCategory = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    fetchDrinks(urlDrinksCategory)
      .then((response) => setcategoryDrinks(response.drinks))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  const twelve = 12;
  const theFirstTwelve = drinks.slice(0, twelve);

  const five = 5;
  const theFirstFive = categoryDrinks.slice(0, five);

  return (
    <div className="drinks-page">
      <Header title="Drinks" />
      {
        theFirstFive.map((categoryName, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${categoryName.strCategory}-category-filter` }
            className="category-filter"
          >
            { categoryName.strCategory }
          </button>
        ))
      }
      {isLoading && <Loading />}
      {error && <p>{error}</p>}
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
      <Footer />
    </div>
  );
}
