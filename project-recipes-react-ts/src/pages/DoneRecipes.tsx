import { useEffect, useState } from 'react';
import { DoneRecipeType } from '../types';
import Header from '../components/Header';
import DoneRecipesFilter from '../components/DoneRecipesFilter';
import DoneRecipesCard from '../components/DoneRecipesCard';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const doneRecipesStorage = localStorage.getItem('doneRecipes');
    const doneRcipesJSON = doneRecipesStorage ? JSON.parse(doneRecipesStorage) : [];
    setDoneRecipes(doneRcipesJSON);
  }, []);

  const filterRecipesData = (filter === 'all')
    ? doneRecipes
    : doneRecipes.filter((item: DoneRecipeType) => item.type === filter);

  const filteredRecipes = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setFilter(e.currentTarget.name);
  };

  return (
    <>
      <Header />
      <h2 data-testid="page-title">Done Recipes</h2>
      <DoneRecipesFilter filteredRecipes={ filteredRecipes } />
      { filterRecipesData.length > 0 && filterRecipesData.map(({ id, image,
        name, category, nationality, doneDate, tags, type, alcoholicOrNot }, index) => (
          <DoneRecipesCard
            key={ id }
            id={ id }
            image={ image }
            name={ name }
            category={ category }
            nationality={ nationality }
            doneDate={ doneDate }
            tags={ tags }
            type={ type }
            alcoholicOrNot={ alcoholicOrNot }
            index={ index }
          />))}
    </>
  );
}

export default DoneRecipes;
