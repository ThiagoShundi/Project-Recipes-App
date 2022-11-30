export default function ButtonMeals(categoryName) {
  return (
    <button
      type="button"
      data-testid={ `${categoryName}-category-filter` }
      className="category-filter"
    >
      Meals:
    </button>
  );
}
