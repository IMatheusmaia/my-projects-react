import { useContext } from 'react';
import MainGlobalContext from '../context/MainGlobalContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import Recipes from '../components/Recipes';
import SearchBarResults from '../components/SearchBarResults';
import drinkIcon from '../images/drinkIcon.svg';
import '../App.css';

function Drinks() {
  const { clickSearch, recipes, isSearching } = useContext(MainGlobalContext);
  return (
    <>
      <Header />
      <div className="title-container-page">
        <img alt="drink-icon" src={ drinkIcon } />
        <h2
          data-testid="page-title"
        >
          Drinks
        </h2>
      </div>
      <div>
        { clickSearch && (<SearchBar />) }
      </div>
      <div>
        { (isSearching
          && recipes !== null) ? <SearchBarResults /> : <Recipes />}
      </div>
      <Footer />
    </>
  );
}

export default Drinks;
