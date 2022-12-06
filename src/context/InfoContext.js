import { PropTypes } from 'prop-types';
import { createContext, useMemo, useReducer } from 'react';

const INITIAL_STATE = {
  searchInputRecipesDrinks: [],
  searchInputRecipesMeals: [],
  progressDataDrinks: [],
};

const FilterContextState = createContext();

const filterReducer = (state, action) => {
  switch (action.type) {
  case 'ADD_FILTER-DRINKS':
    return {
      ...state,
      searchInputRecipesDrinks: action.payload,
    };
  case 'ADD_FILTER-MEALS':
    return {
      ...state,
      searchInputRecipesMeals: action.payload,
    };
  default:
    return state;
  }
};

function FilterProvider({ children }) {
  const [state, dispatch] = useReducer(filterReducer, INITIAL_STATE);
  const values = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return (
    <FilterContextState.Provider value={ values }>
      {children}
    </FilterContextState.Provider>
  );
}

FilterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { FilterContextState, FilterProvider };
