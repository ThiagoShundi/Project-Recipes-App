import React, { useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

const INITIAL_STATE = {
  data: [],
  drinks: [],
  meals: [],
};

const dataReducer = (state, action) => {
  switch (action.type) {
  case 'DATA_FETCH_SUCCESS':
    return {
      ...state,
      data: action.payload,
    };
  case 'SET_DRINKS':
    return {
      ...state,
      drinks: action.payload,
    };
  case 'SET_MEALS':
    return {
      ...state,
      meals: action.payload,
    };
  default:
    return state;
  }
};

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, INITIAL_STATE);
  const values = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <AppContext.Provider value={ values }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AppProvider;
