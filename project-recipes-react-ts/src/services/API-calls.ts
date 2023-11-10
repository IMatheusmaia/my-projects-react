// chama a api para pegar a comida por id
// 52772
export const getFoodId = async (idFood:string | undefined) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idFood}`;
  try {
    const response = await fetch(URL);
    const apiResponse = await response.json();
    return apiResponse.meals;
  } catch (error) {
    return [];
  }
};
// chama a api para pegar a bebida por id
// 178319
export const getDrinkId = async (idDrink:string | undefined) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
  try {
    const response = await fetch(URL);
    const apiResponse = await response.json();
    return apiResponse.drinks;
  } catch (error) {
    return [];
  }
};

export const getRecommendationsFoods = async () => {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  try {
    const response = await fetch(URL);
    const apiResponse = await response.json();
    const foods = apiResponse.meals.slice(0, 6);
    return foods;
  } catch (error) {
    return [];
  }
};

export const getRecommendationsDrinks = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  try {
    const response = await fetch(URL);
    const apiResponse = await response.json();
    const drinks = apiResponse.drinks.slice(0, 6);
    return drinks;
  } catch (error) {
    return [];
  }
};
