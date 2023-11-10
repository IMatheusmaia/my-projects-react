import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getDrinkId, getFoodId } from '../services/API-calls';
import { DrinkType, FoodType } from '../types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const [receita, setReceita] = useState<FoodType[] & DrinkType[]>();
  const [ingredientes, setIngredientes] = useState<any[] | null>([]);
  const [checkboxStates, setCheckboxStates] = useState<boolean[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [buttonCopy, setButtonCopy] = useState(false);
  const { ID_DA_RECEITA } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleCheckboxChange = (index: number) => {
    const newCheckboxStates = [...checkboxStates];
    newCheckboxStates[index] = !newCheckboxStates[index];
    setCheckboxStates(newCheckboxStates);
    localStorage.setItem('inProgressRecipes', JSON.stringify(newCheckboxStates));
  };

  function chamaApi() {
    if (pathname.includes('drinks')) {
      return getDrinkId(ID_DA_RECEITA);
    }
    return getFoodId(ID_DA_RECEITA);
  }

  const filterIngredient = (dataItem: any) => {
    if (dataItem !== null && dataItem !== undefined) {
      return Array.from({ length: 20 }, (_, i) => i + 1)
        .map((i) => {
          const ingredientKey = `strIngredient${i}`;
          const measureKey = `strMeasure${i}`;
          const ingredient = dataItem[ingredientKey];
          const measure = dataItem[measureKey];
          if (ingredient) {
            return [ingredient, ' ', measure];
          }
          return null;
        })
        .filter((pair) => pair !== null);
    }
  };

  function handleFinishRecipe() {
    const date = new Date();
    const formattedDate = date.toISOString();
    const doneRecipe = {
      id: receita?.[0].idMeal || receita?.[0].idDrink,
      type: receita?.[0].idMeal ? 'meal' : 'drink',
      nationality: receita?.[0].strArea || '',
      category: receita?.[0].strCategory || '',
      alcoholicOrNot: receita?.[0].strAlcoholic || '',
      name: receita?.[0].strMeal || receita?.[0].strDrink,
      image: receita?.[0].strMealThumb || receita?.[0].strDrinkThumb,
      doneDate: formattedDate,
      tags: receita?.[0].strTags ? receita?.[0].strTags.split(',') : [],
    };
    const storedDoneRecipes = localStorage.getItem('doneRecipes') || '[]';
    const doneRecipes = JSON.parse(storedDoneRecipes);
    doneRecipes.push(doneRecipe);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    navigate('/done-recipes');
  }

  function formatoCorreto(newFavorites: any) {
    const recipe = newFavorites.map((favorite: any) => (
      {
        id: favorite?.idMeal || favorite?.idDrink,
        type: favorite?.idMeal ? 'meal' : 'drink',
        nationality: favorite?.strArea || '',
        category: favorite?.strCategory,
        alcoholicOrNot: favorite?.strAlcoholic || '',
        name: favorite?.strMeal || favorite?.strDrink,
        image: favorite?.strMealThumb || favorite?.strDrinkThumb,
      }
    ));
    return recipe;
  }

  const isFavorite = () => {
    const storedFavorites = localStorage.getItem('favoriteRecipes');

    if (!storedFavorites) return false;

    return JSON.parse(storedFavorites)
      .some((favorite) => favorite.id === receita?.[0].idMeal
      || favorite.id === receita?.[0].idDrink);
  };

  useEffect(() => {
    chamaApi().then((data) => {
      setReceita(data);
      const ingredientesEMedidas = filterIngredient(data?.[0]);
      if (ingredientesEMedidas !== null || ingredientesEMedidas !== undefined) {
        setIngredientes(ingredientesEMedidas);
      }
      const storedData = localStorage.getItem('inProgressRecipes');
      const storedFavorites = localStorage.getItem('favoriteRecipes');
      if (ingredientesEMedidas !== null || ingredientesEMedidas !== undefined) {
        setCheckboxStates(new Array(ingredientesEMedidas?.length).fill(false));
      }
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      } else {
        setFavorites([]);
      }
      if (storedData) {
        setCheckboxStates(JSON.parse(storedData));
      }
      // if (ingredientesEMedidas !== null || ingredientesEMedidas !== undefined) {
      //   setCheckboxStates(new Array(ingredientesEMedidas?.length).fill(false));
      // }
    });
  }, []);

  console.log(isFavorite());
  console.log(receita);

  return (
    <div>
      {receita ? receita.map((data: any) => (
        <div key={ data.idMeal || data.idDrink }>
          <h2 data-testid="recipe-title">{data.strMeal || data.strDrink}</h2>
          <h3 data-testid="recipe-category">{data.strCategory}</h3>
          {pathname.includes('drinks') && (
            <h4 data-testid="recipe-category">{data.strAlcoholic}</h4>
          )}
          <img
            data-testid="recipe-photo"
            src={ data.strMealThumb || data.strDrinkThumb }
            alt=""
          />
          <h4>Ingredients:</h4>
          <ul>
            {ingredientes?.map((ingrediente, index) => (
              <label
                key={ index }
                data-testid={ `${index}-ingredient-step` }
                style={ { textDecoration: checkboxStates[index]
                  ? 'line-through solid rgb(0, 0, 0)' : 'none' } }
              >
                <div>
                  {ingrediente}
                  <input
                    name="checkbox"
                    type="checkbox"
                    checked={ checkboxStates[index] }
                    onChange={ () => handleCheckboxChange(index) }
                  />
                </div>
              </label>
            ))}
          </ul>
          <h4>Instructions:</h4>
          <p data-testid="instructions">{data.strInstructions}</p>
        </div>
      )) : <p>Loading...</p>}
      <div>
        <div>
          <button
            data-testid="share-btn"
            onClick={ () => {
              if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(`http://localhost:3000${pathname.slice(0, pathname.lastIndexOf('/'))}`);
              }
              setButtonCopy(true);
              setTimeout(() => setButtonCopy(false), 1500);
            } }
          >
            Compartilhar
          </button>
          {buttonCopy && (
            <p data-testid="copyButton">Link copied!</p>
          )}
        </div>
        <div>
          <input
            type="image"
            src={ isFavorite() ? blackHeartIcon : whiteHeartIcon }
            alt="Favorite"
            data-testid="favorite-btn"
            onClick={ () => {
              if (!isFavorite()) {
                const newFavorites = [receita?.[0]];
                const formated = formatoCorreto(newFavorites);
                const oldFavorites = localStorage.getItem('favoriteRecipes') ? JSON.parse(
                  localStorage.getItem('favoriteRecipes'),
                ) : [];
                const favoritesArray = [...oldFavorites, ...formated];
                setFavorites(newFavorites);
                localStorage.setItem('favoriteRecipes', JSON.stringify(
                  favoritesArray,
                ));
              } else {
                const newFavorites = favorites.map((favorite) => {
                  if (favorite?.idMeal === receita?.[0].idMeal) {
                    return null;
                  }
                  return favorite;
                }).filter((favorite) => favorite
                !== null && favorite.idDrink !== receita?.[0].idDrink && favorite);
                setFavorites(newFavorites);
                localStorage.setItem('favoriteRecipes', JSON.stringify(
                  newFavorites,
                ));
              }
            } }
          />
        </div>
        <div>
          <button
            data-testid="finish-recipe-btn"
            onClick={ handleFinishRecipe }
            disabled={ checkboxStates.includes(false) }
          >
            Finalizar Receita
          </button>
        </div>
      </div>
    </div>
  );
}
export default RecipeInProgress;
