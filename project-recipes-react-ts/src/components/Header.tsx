import { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MainGlobalContext from '../context/MainGlobalContext';
import bandeja from '../assets/bandeja.svg';
import search from '../images/searchIcon.svg';
import profile from '../images/profileIcon.svg';

import '../styles/header.css';

function Header() {
  const location = useLocation();
  const [searchView, setSearchView] = useState<string>(location.pathname);
  const { clickSearch, setClickSearch } = useContext(MainGlobalContext);
  const handleClick = (event:React.MouseEvent<HTMLImageElement>) => {
    event.preventDefault();
    setClickSearch(!clickSearch);
  };
  return (
    <header className="header">
      <div className="title-container">
        <img src={ bandeja } alt="bandeja-logo" />
        <p>
          Recipes
          { ' ' }
          <span>app</span>
        </p>
      </div>
      <nav className="nav">
        { (searchView === '/meals' || searchView === '/drinks')
        && (
          <img
            data-testid="search-top-btn"
            src={ search }
            alt="search-icon"
            onClickCapture={ handleClick }
          />
        )}
        <Link to="/profile">
          <img
            data-testid="profile-top-btn"
            src={ profile }
            alt="profileIcon"
          />
        </Link>
      </nav>
    </header>
  );
}

export default Header;
