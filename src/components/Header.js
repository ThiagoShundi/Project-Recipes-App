import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ButtonSearch from './ButtonSearch';

function Header({ title }) {
  const [loadSearch, setLoadSearch] = useState(false);

  const loadSearchButton = () => {
    if (loadSearch === true) {
      setLoadSearch(false);
    } else {
      setLoadSearch(true);
    }
  };

  return (
    <header>
      <h1 data-testid="page-title">{title}</h1>
      <Link to="/profile">
        <button
          type="button"
          data-testid="profile-top-btn"
          src="src/images/profileIcon.svg"
          alt="Profile"
        />
      </Link>
      <button
        type="button"
        data-testid="search-top-btn"
        src="src/images/searchIcon.svg"
        alt="Search"
        onClick={ loadSearchButton }
      />
      {
        loadSearch && (
          <ButtonSearch />
        )
      }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}.isRequired;

export default Header;
