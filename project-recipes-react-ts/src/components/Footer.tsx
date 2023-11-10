import { useContext } from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import foodIcon from '../images/mealIcon.svg';
import MainGlobalContext from '../context/MainGlobalContext';
import '../styles/footer.css';

function Footer() {
  const { setIsSearching } = useContext(MainGlobalContext);
  return (
    <footer data-testid="footer" className="footer">
      <Link to="/drinks">
        <button
          onClick={ () => setIsSearching(false) }
        >
          <img
            src={ drinkIcon }
            alt="drinks"
            data-testid="drinks-bottom-btn"
          />
        </button>
      </Link>
      <Link to="/meals">
        <button
          onClick={ () => setIsSearching(false) }
        >
          <img
            src={ foodIcon }
            alt="foods"
            data-testid="meals-bottom-btn"
          />
        </button>
      </Link>
    </footer>
  );
}

export default Footer;
