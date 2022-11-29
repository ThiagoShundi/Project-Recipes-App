import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Profile() {
  const getEmail = JSON.parse(localStorage.getItem('user')).email;

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
      <button type="button" data-testid="profile-logout-btn">Logout</button>
      <Footer />
    </>
  );
}

export default Profile;
