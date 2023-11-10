import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import MainGlobalContext from '../context/MainGlobalContext';
import beef from '../images/beef.svg';
import breakfast from '../images/breakfast.svg';
import chicken from '../images/chicken.svg';
import dessert from '../images/dessert.svg';
import goat from '../images/goat.svg';
import ordinary from '../images/OrdinaryDrink.svg';
import cocktail from '../images/cocktail.svg';
import shake from '../images/shake.svg';
import other from '../images/other.svg';
import cocoa from '../images/cocoa.svg';

const categoriesMeals = [beef, breakfast, chicken, dessert, goat];
const categoriesDrinks = [ordinary, cocktail, shake, other, cocoa];

type ButtonFilterProp = {
  category: string
  index: number
};

function ButtonFilter({ category, index }: ButtonFilterProp) {
  const { page, setPage } = useContext(MainGlobalContext);
  const { pathname } = useLocation();

  const toggleCategory = () => {
    if (page.category === 'all' || category !== 'all') {
      setPage({ ...page, category });
    }
    if (category === page.category) {
      setPage({ ...page, category: 'all' });
    }
  };
  return (
    <button
      className="category-btn"
      data-testid={ `${category}-category-filter` }
      onClick={ toggleCategory }
    >
      { (pathname === '/meals')
        ? <img src={ categoriesMeals[index] } alt={ `${category}` } />
        : <img src={ categoriesDrinks[index] } alt={ `${category}` } /> }
      <span>{ category }</span>
    </button>
  );
}

export default ButtonFilter;
