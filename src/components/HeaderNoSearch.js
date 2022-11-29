import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Header({ title }) {
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
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}.isRequired;

export default Header;
