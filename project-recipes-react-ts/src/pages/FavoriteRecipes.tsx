import { useState } from 'react';
import Header from '../components/Header';
import favoriteIcon from '../images/favoriteIcon.svg';
import allIconCategory from '../images/allIconCategory.svg';
import foodsIconCategory from '../images/foodsIconCategory.svg';
import drinksIconCategory from '../images/drinksIconCategory.svg';
import FavoriteCard from '../components/FavoriteCard';
import '../App.css';

function FavoriteRecipes() {
  type ActiveCategoryType = {
    all: boolean,
    meal: boolean,
    drink: boolean,
  };

  const [activeCategory, setActiveCategory] = useState<ActiveCategoryType>(
    { all: true, meal: false, drink: false },
  );
  const storage = localStorage.getItem('favoriteRecipes');
  const data = JSON.parse(storage || '[]');

  const INITIAL_FAVORITE = {
    all: data,
    meal: data.filter((recipe: any) => recipe.type === 'meal'),
    drink: data.filter((recipe: any) => recipe.type === 'drink'),
  };

  const [favorite, setFavorite] = useState<any>(INITIAL_FAVORITE);
  return (
    <>
      <Header />
      <div className="title-container-page">
        <img alt="favorite-icon" src={ favoriteIcon } />
        <h2
          data-testid="page-title"
        >
          Favorite Recipes
        </h2>
      </div>
      <div className="favorite-categorys-container">
        <img
          data-testid="filter-by-all-btn"
          alt="allIcon"
          src={ allIconCategory }
          onClickCapture={ () => setActiveCategory(
            { all: true, meal: false, drink: false },
          ) }
        />
        <img
          data-testid="filter-by-meal-btn"
          alt="foodIcon"
          src={ foodsIconCategory }
          onClickCapture={ () => setActiveCategory(
            { all: false, meal: true, drink: false },
          ) }
        />
        <img
          data-testid="filter-by-drink-btn"
          alt="drinkIcon"
          src={ drinksIconCategory }
          onClickCapture={ () => setActiveCategory(
            { all: false, meal: false, drink: true },
          ) }
        />
      </div>
      <div>
        {(favorite.all.length > 0) ? (
          <div
            className="favorite-cards-container"
          >
            {activeCategory.all && favorite.all.map(
              (info: any, index: number) => (
                <FavoriteCard
                  key={ index }
                  info={ info }
                  index={ index }
                  update={ setFavorite }
                />),
            )}
            {activeCategory.meal && favorite.meal.map(
              (info: any, index: number) => (
                <FavoriteCard
                  key={ index }
                  info={ info }
                  index={ index }
                  update={ setFavorite }
                />),
            )}
            {activeCategory.drink && favorite.drink.map(
              (info: any, index: number) => (
                <FavoriteCard
                  key={ index }
                  info={ info }
                  index={ index }
                  update={ setFavorite }
                />),
            )}
          </div>)
          : (
            <h2
              className="no-favorite-message"
            >
              Você ainda não favoritou nenhuma receita!
            </h2>) }
      </div>
    </>
  );
}

export default FavoriteRecipes;
