import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MainGlobalContext from '../context/MainGlobalContext';
import useFetchRecipes from '../hooks/useFetchRecipes';
import ButtonReset from './ButtonReset';
import ButtonFilter from './ButtonFilter';
import CardMeals from './CardMeals';
import CardDrink from './CardDrink';
import Loading from './Loading';
import '../styles/recipes.css';

function Recipes() {
  const local = useLocation();
  const { pathname } = local;
  const { loading } = useContext(MainGlobalContext);

  const { recipe, categorys } = useFetchRecipes(pathname);

  if (loading) {
    return (<Loading />);
  }
  return (
    <div className="recipe-container">
      <div className="buttons-container">
        <ButtonReset />
        {categorys.map((category: string, index: number) => (
          <ButtonFilter
            key={ category }
            category={ category }
            index={ index }
          />))}
      </div>
      <div className="cards-container">
        { recipe.map((info: any, index) => {
          if (pathname === '/meals') {
            return (
              <Link
                key={ info.idMeal }
                to={ `/meals/${info.idMeal}` }
              >
                <CardMeals
                  index={ index }
                  info={ info }
                />
              </Link>
            );
          }
          return (
            <Link
              key={ info.idDrink }
              to={ `/drinks/${info.idDrink}` }
            >
              <CardDrink
                index={ index }
                info={ info }
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Recipes;
