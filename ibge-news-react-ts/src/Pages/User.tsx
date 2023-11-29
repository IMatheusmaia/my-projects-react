import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ImExit } from 'react-icons/im';
import GlobalContext from '../context/GlobalContext';
import Favorites from '../components/Favorites';
import voidFavoriteIlustration from '../assets/void-favorites.svg';
import '../styles/user.css';

function User() {
  const { favorite } = useContext(GlobalContext);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <div
      className="user-container"
    >
      <h1>{ `Olá, ${user.name}!`}</h1>
      { favorite.length > 0 ? <Favorites /> : (
        <>
          <p>Você ainda não favoritou uma notícia.</p>
          <img src={ voidFavoriteIlustration } alt="void-favorite-ilustration" />
        </>
      )}
      <button
        onClick={ handleLogout }
        className="logout"
      >
        Sair
        <ImExit />
      </button>
    </div>
  );
}
export default User;
