// import { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import useDataInfos from '../hooks/useDataInfos';
// import AppContext from '../context/AppContext';
import '../styles/Meals.css';

export default function Meals() {
  // const { dataMealsState } = useContext(AppContext);
  // console.log(dataMealsState);

  const {
    dataMeals,
    dataMealsCategory,
    isLoading,
    error,
    categoryFilterMeals,
    setFilterMeals,
  } = useDataInfos();

  const twelve = 12;
  const theFirstTwelve = dataMeals.slice(0, twelve);

  const five = 5;
  const theFirstFive = dataMealsCategory.slice(0, five);

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
                onClick={ () => categoryFilterMeals(meal.strCategory) }
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
              <div
                className="meal-card"
                key={ index }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
