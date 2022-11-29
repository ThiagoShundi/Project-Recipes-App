import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Profile() {
  const getEmail = localStorage
    .getItem('user') ? JSON.parse(localStorage.getItem('user')).email : '';

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  return (
    <>
      <h1>Profile</h1>
      <span>E-mail: </span>
      <p data-testid="profile-email">{getEmail}</p>
      <Link to="/done-recipes">
        <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      </Link>
      <Link to="/favorite-recipes">
        <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ clearLocalStorage }
        >
          Logout
        </button>
      </Link>
      <Footer />
    </>
  );
}

export default Profile;
