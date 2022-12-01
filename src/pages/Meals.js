import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import useDataInfos from '../hooks/useDataInfos';
import '../styles/Meals.css';

export default function Meals() {
  const {
    dataMeals,
    dataMealsCategory,
    isLoading,
    error,
    categoryFilterMeals,
    setFilterMeals,
    getMealsId,
  } = useDataInfos();

  const [toggle, setToggle] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (error) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [error]);

  const twelve = 12;
  const theFirstTwelve = dataMeals.slice(0, twelve);

  const five = 5;
  const theFirstFive = dataMealsCategory.slice(0, five);

  const setCategoryFilterMeals = (meal) => {
    categoryFilterMeals(meal);
    setToggle(!toggle);
  };

  const returnToDefaultMeals = () => {
    setFilterMeals();
    setToggle(!toggle);
  };

  const redirectToDetails = (id) => {
    history.push(`/meals/${id}`);
    getMealsId(id);
  };

  return (
    <div className="meals-page">
      <Header title="Meals" />
      <div className="meals-container">
        <div className="meals-categories">
          <div className="meals-categories-list">
            {theFirstFive.map((meal, index) => (
              <button
                type="button"
                key={ index }
                data-testid={ `${meal.strCategory}-category-filter` }
                onClick={ () => (!toggle
                  ? setCategoryFilterMeals(meal.strCategory)
                  : returnToDefaultMeals()) }
              >
                {meal.strCategory}
              </button>
            ))}
            <button
              data-testid="All-category-filter"
              type="button"
              onClick={ () => setFilterMeals() }
            >
              All
            </button>
          </div>
        </div>
        <div className="meals-list">
          <div className="meals-list-container">
            {isLoading && <Loading />}
            {error && <p>{error}</p>}
            {theFirstTwelve.map((meal, index) => (
              <button
                key={ index }
                type="button"
                onClick={ () => redirectToDetails(meal.idMeal) }
              >
                <div
                  className="meal-card"
                  data-testid={ `${index}-recipe-card` }
                >
                  <img
                    src={ meal.strMealThumb }
                    alt={ meal.strMeal }
                    data-testid={ `${index}-card-img` }
                  />

                  <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
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
