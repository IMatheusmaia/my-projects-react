import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const [emailProfile, setEmailProfile] = useState(' ');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user !== null) {
      const use = JSON.parse(user);
      setEmailProfile(use.email);
    }
  }, []);

  const redirectLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      <Header />
      <h2 data-testid="page-title">Profile</h2>
      <form>
        <p data-testid="profile-email">{ emailProfile }</p>
        <button
          className="profile-btn-recipes"
          data-testid="profile-done-btn"
          onClick={ () => navigate('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          className="profile-btn-favorite"
          data-testid="profile-favorite-btn"
          onClick={ () => navigate('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          className="profile-btn-logout"
          data-testid="profile-logout-btn"
          onClick={ redirectLogout }
        >
          Logout
        </button>
        <Footer />
      </form>
    </>
  );
}

export default Profile;
