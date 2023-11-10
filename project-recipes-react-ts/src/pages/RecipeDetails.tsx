import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getDrinkId,
  getFoodId,
  getRecommendationsDrinks,
  getRecommendationsFoods } from '../services/API-calls';
import { DrinkType, FoodType } from '../types';
import CardCarousel from '../components/CardCarousel';
import '../styles/recipeDetails.css';

function RecipeDetails() {
  const [dataID, setDataID] = useState<FoodType[] | DrinkType[]>();
  const [dataRecommendations, setDataRecommendations] = useState<
  FoodType[] | DrinkType[]>([]);
  const [url, SetURL] = useState('');
  const [ingredientes, setIngredientes] = useState<any[] | null | undefined>([]);
  const { ID_DA_RECEITA } = useParams();

  const ingredientFormatDrinks = (dataItem: any) => {
    if (dataItem !== null && dataItem !== undefined) {
      return Array.from({ length: 15 }, (_, i) => i + 1)
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
  const ingredientFormatMeals = (dataItem: any) => {
    return Array.from({ length: 20 }, (_, i) => i + 1)
      .map((i) => {
        const ingredientKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;
        const ingredient = dataItem[ingredientKey];
        const measure = dataItem[measureKey];
        if (ingredient && measure) {
          return [ingredient, ' ', measure];
        }
        return null;
      })
      .filter((pair) => pair !== null);
  };
  function filtraIngrediente() {
    const data = dataID?.[0];
    if (url.includes('drinks')) {
      return ingredientFormatDrinks(data);
    }
    if (url.includes('meals') && dataID !== undefined) {
      return ingredientFormatMeals(data);
    }
    return null;
  }
  function chamaApi() {
    if (url.includes('drinks')) {
      return getDrinkId(ID_DA_RECEITA);
    }
    return getFoodId(ID_DA_RECEITA);
  }
  function chamaApiRecommendations() {
    if (url.includes('drinks')) {
      return getRecommendationsFoods();
    }
    return getRecommendationsDrinks();
  }
  useEffect(() => {
    async function fetchData() {
      SetURL(window.location.href);
      setDataID(await chamaApi());
      setDataRecommendations(await chamaApiRecommendations());
      setIngredientes(filtraIngrediente());
    }
    fetchData();
  }, [ID_DA_RECEITA, url, ingredientes]);
  return (
    <div className="details-container">
      {dataID?.map((data: any) => (
        <div key={ data.idMeal || data.idDrink }>
          <h2 data-testid="recipe-title">{data.strMeal || data.strDrink}</h2>
          <h3 data-testid="recipe-category">{data.strCategory}</h3>
          {url.includes('drinks') && (
            <h4 data-testid="recipe-category">{data.strAlcoholic}</h4>
          )}
          <img
            className="picture-recipe"
            data-testid="recipe-photo"
            src={ data.strMealThumb || data.strDrinkThumb }
            alt="drink-ilustration"
          />
          <h4>Ingredients:</h4>
          <ul>
            {ingredientes?.map((ingrediente, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {ingrediente}
              </li>
            ))}
          </ul>
          <h4>Instructions:</h4>
          <p data-testid="instructions">{data.strInstructions}</p>
          {url.includes('meals') && (
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={ data.strYoutube }
              title="YouTube Video"
            />
          )}
        </div>
      ))}
      <div>
        <CardCarousel dataRecommendations={ dataRecommendations } />
      </div>
      <div>
        <button
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
        >
          Start Recipe
        </button>
      </div>
    </div>
  );
}
export default RecipeDetails;
