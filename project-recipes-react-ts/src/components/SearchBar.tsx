import { useState, useContext } from 'react';
import '../styles/searchBar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchInputType } from '../types';
import MainGlobalContext from '../context/MainGlobalContext';

function SearchBar() {
  const [searchInput, setSearchInput] = useState<SearchInputType>({
    term: '',
    radio: 'ingredient',
  });
  const [radioStatus, setRadioStatus] = useState(
    { ingredient: true, name: false, letter: false },
  );

  const navigate = useNavigate();
  const location = useLocation();

  const { setRecipes, setIsSearching } = useContext(MainGlobalContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'radio') {
      setRadioStatus({
        ingredient: false,
        name: false,
        letter: false,
        [value]: true,
      });
    }
    setSearchInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleResultMeals = (dataResult: any) => {
    if (dataResult.meals === null) {
      setRecipes([]);
      window.alert("Sorry, we haven't found any recipes for these filters.");
    }
    if (dataResult.meals !== null && dataResult.meals.length === 1) {
      navigate(`/meals/${dataResult.meals[0].idMeal}`);
    }
    setRecipes(dataResult.meals);
  };
  const handleResultDrinks = (dataResult: any) => {
    if (dataResult.drinks === null) {
      setRecipes([]);
      window.alert("Sorry, we haven't found any recipes for these filters.");
    }
    if (dataResult.drinks !== null && dataResult.drinks.length === 1) {
      navigate(`/drinks/${dataResult.drinks[0].idDrink}`);
    }
    setRecipes(dataResult.drinks);
  };
  const handleSearchMeals = async () => {
    switch (searchInput.radio) {
      case 'ingredient': {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput.term}`);
        const data = await response.json();
        handleResultMeals(data);
        break;
      }
      case 'name': {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput.term}`);
        const data = await response.json();
        handleResultMeals(data);
        break;
      }
      case 'letter': {
        if (searchInput.term.length === 1) {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchInput.term}`);
          const data = await response.json();
          handleResultMeals(data);

          break;
        }
        return window.alert('Your search must have only 1 (one) character');
      }
      default:
        break;
    }
    setIsSearching(true);
  };

  const handleSearchDrinks = async () => {
    switch (searchInput.radio) {
      case 'ingredient': {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchInput.term}`);
        const data = await response.json().catch(() => ({ drinks: null }));
        handleResultDrinks(data);
        break;
      }
      case 'name': {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchInput.term}`);
        const data = await response.json();
        handleResultDrinks(data);
        break;
      }
      case 'letter': {
        if (searchInput.term.length === 1) {
          const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchInput.term}`);
          const data = await response.json();
          handleResultDrinks(data);
          break;
        }
        return window.alert('Your search must have only 1 (one) character');
      }
      default:
        break;
    }
    setIsSearching(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (location.pathname.includes('meals')) {
      handleSearchMeals();
    }
    if (location.pathname.includes('drinks')) {
      handleSearchDrinks();
    }
  };
  return (
    <form className="search-form">
      <input
        data-testid="search-input"
        className="search-input"
        type="text"
        name="term"
        value={ searchInput.term }
        onChange={ handleChange }
        placeholder="Search..."
      />

      <div className="radio-input-container">
        <label htmlFor="radio-ingredient">
          Ingredient
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            value="ingredient"
            name="radio"
            id="radio-ingredient"
            onChange={ handleChange }
            checked={ radioStatus.ingredient }
          />
        </label>

        <label htmlFor="radio-name">
          Name
          <input
            data-testid="name-search-radio"
            type="radio"
            value="name"
            name="radio"
            id="radio-name"
            onChange={ handleChange }
            checked={ radioStatus.name }
          />
        </label>

        <label htmlFor="radio-letter">
          First Letter
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            value="letter"
            name="radio"
            id="radio-letter"
            onChange={ handleChange }
            checked={ radioStatus.letter }
          />
        </label>
      </div>
      <button
        data-testid="exec-search-btn"
        className="search-button"
        onClick={ handleClick }
      >
        SEARCH
      </button>
    </form>
  );
}

export default SearchBar;
