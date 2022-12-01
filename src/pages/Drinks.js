import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import useDataInfos from '../hooks/useDataInfos';
import '../styles/Drinks.css';

export default function Meals() {
  const {
    dataDrinks,
    dataDrinksCategory,
    isLoading,
    error,
    categoryFilterDrinks,
    setFilterDrinks,
  } = useDataInfos();

  const [toggle, setToggle] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (error) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [error]);

  const twelve = 12;
  const theFirstTwelve = dataDrinks.slice(0, twelve);

  const five = 5;
  const theFirstFive = dataDrinksCategory.slice(0, five);

  const setCategoryFilterDrinks = (drink) => {
    categoryFilterDrinks(drink);
    setToggle(!toggle);
  };

  const returnToDefaultDrinks = () => {
    setFilterDrinks();
    setToggle(!toggle);
  };

  const redirectToDetails = (id) => {
    history.push(`/drinks/${id}`);
  };

  return (
    <div className="drinks-page">
      <Header title="Drinks" />
      <div className="drinks-container">
        <div className="drinks-categories">
          <div className="drinks-categories-list">
            {theFirstFive.map((drink, index) => (
              <button
                type="button"
                key={ index }
                data-testid={ `${drink.strCategory}-category-filter` }
                onClick={ () => (!toggle
                  ? setCategoryFilterDrinks(drink.strCategory)
                  : returnToDefaultDrinks()) }
              >
                {drink.strCategory}
              </button>
            ))}
            <button
              data-testid="All-category-filter"
              type="button"
              onClick={ () => setFilterDrinks() }
            >
              All
            </button>
          </div>
        </div>
        <div className="drinks-list">
          <div className="drinks-list-container">
            {isLoading && <Loading />}
            {error && <p>{error}</p>}
            {theFirstTwelve.map((drink, index) => (
              <button
                type="button"
                onClick={ () => redirectToDetails(drink.idDrink) }
                key={ index }
              >
                <div
                  className="drinks-card"
                  data-testid={ `${index}-recipe-card` }
                >
                  <img
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                    data-testid={ `${index}-card-img` }
                  />
                  <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
