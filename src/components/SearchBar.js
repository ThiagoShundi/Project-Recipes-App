import React from 'react';

function SearchBar() {
  return (
    <>
      <label htmlFor="type">
        <input name="type" type="radio" data-testid="ingredient-search-radio" />
        <span>Ingredient</span>
        <input name="type" type="radio" data-testid="name-search-radio" />
        <span>Name</span>
        <input name="type" type="radio" data-testid="first-letter-search-radio" />
        <span>First Letter</span>
      </label>
      <button type="button" data-testid="exec-search-btn">Filter</button>
    </>
  );
}

export default SearchBar;
