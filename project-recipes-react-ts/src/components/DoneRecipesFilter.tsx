import iconFood from '../images/iconFood.svg';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

type FilterDoneRecipeType = {
  filteredRecipes: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function DoneRecipesFilter({ filteredRecipes }: FilterDoneRecipeType) {
  return (
    <nav>
      <button
        name="all"
        data-testid="filter-by-all-btn"
        onClick={ (e) => filteredRecipes(e) }
      >
        All
        <img src={ iconFood } alt="all" />
      </button>
      <button
        name="meal"
        data-testid="filter-by-meal-btn"
        onClick={ (e) => filteredRecipes(e) }
      >
        Meals
        <img src={ mealIcon } alt="meal" />
      </button>
      <button
        name="drink"
        data-testid="filter-by-drink-btn"
        onClick={ (e) => filteredRecipes(e) }
      >
        Drinks
        <img src={ drinkIcon } alt="drink" />
      </button>
    </nav>
  );
}

export default DoneRecipesFilter;
