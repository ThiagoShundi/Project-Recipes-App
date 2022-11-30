import React from 'react';

function SearchBar() {
  const fetchApi = async () => {
    let http = '';
    const radios = document.getElementsByName('type');
    const input = document.getElementsByTagName('input')[0].value;
    if (radios[0].checked) {
      http = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`;
    }
    if (radios[1].checked) {
      http = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
    }
    if ((radios[2].checked) && (input.length === 1)) {
      http = `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`;
    }
    if (http.length > 0) {
      const response = await fetch(http);
      const repos = await response.json();
      console.log(repos);
    } else {
      global.alert('Your search must have only 1 (one) character');
    }
  };

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
      <button type="button" data-testid="exec-search-btn" onClick={ fetchApi }>
        Search
      </button>
    </>
  );
}

export default SearchBar;
