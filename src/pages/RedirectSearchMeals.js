import { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import mealIcon from '../images/drinkIcon.svg';
import { FilterContextState } from '../context/InfoContext';
import '../styles/Meals.css';

export default function RecipeSearchsMeals() {
  const { state: { searchInputRecipesMeals } } = useContext(FilterContextState);

  const twelve = 12;
  const theFirstTwelve = searchInputRecipesMeals.slice(0, twelve);

  return (
    <div className="meals-page">
      <Header title="Meals" />
      <div className="meal-icon">
        <img src={ mealIcon } alt="meal-icon" />
      </div>
      <div>
        {theFirstTwelve.map((meal, index) => (
          <div
            className="meal-card"
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid={ `${index}-card-img` }
            />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
