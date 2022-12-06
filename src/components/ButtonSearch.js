import React from 'react';

function ButtonSearch() {
  return (
    <label htmlFor="search">
      Search
      {' '}
      <input
        id="search"
        type="search"
        name="search"
        data-testid="search-input"
      />
    </label>
  );
}

export default ButtonSearch;
