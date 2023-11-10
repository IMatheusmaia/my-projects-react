import { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import MainGlobalContext from '../context/MainGlobalContext';
import AllMeals from '../images/allMeals.svg';
import AllDrinks from '../images/AllDrinks.svg';

function ButtonReset() {
  const { page, setPage } = useContext(MainGlobalContext);
  const { pathname } = useLocation();
  return (

    <button
      className="category-reset"
      data-testid="All-category-filter"
      onClick={ () => (setPage({ ...page, category: 'all' })) }
    >
      { (pathname === '/meals') ? <img src={ AllMeals } alt="all meals" />
        : <img src={ AllDrinks } alt="all drinks" /> }
      <span>All</span>
    </button>
  );
}

export default ButtonReset;
