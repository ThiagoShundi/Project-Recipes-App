import Footer from '../components/Footer';

function Profile() {
  const getEmail = JSON.parse(localStorage.getItem('user')).email;

  return (
    <>
      <h1>Profile</h1>
      <span>E-mail: </span>
      <p data-testid="profile-email">{getEmail}</p>
      <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button type="button" data-testid="profile-logout-btn">Logout</button>
      <Footer />
    </>
  );
}

export default Profile;
