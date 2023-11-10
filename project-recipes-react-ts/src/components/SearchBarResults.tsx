import { useContext } from 'react';
import MainGlobalContext from '../context/MainGlobalContext';
import '../styles/searchBarResults.css';

function SearchBarResults() {
  const { recipes } = useContext(MainGlobalContext);
  return (
    <div>
      {recipes.length > 0 && (
        <div className="search-recipe-container">
          {recipes.slice(0, 12).map((recipe: any, index: number) => (
            <div
              className="search-recipe-card"
              key={ index }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ recipe.strMealThumb || recipe.strDrinkThumb }
                alt={ recipe.strMeal || recipe.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>
                { recipe.strMeal || recipe.strDrink }
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBarResults;
