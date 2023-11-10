import { useEffect, useState, useContext } from 'react';
import MainGlobalContext from '../context/MainGlobalContext';
import { FoodType, DrinkType } from '../types';

function useFetchRecipes(local: string) {
  const { setLoading, page } = useContext(MainGlobalContext);

  const [recipe, setRecipe] = useState<FoodType[] | DrinkType[] | []>([]);
  const [categorys, setCategorys] = useState<string[] | []>([]);
  const preventMealsNullData = async (data: any) => {
    if (data.meals !== null) {
      const listMeals = await data.meals.slice(0, 12);
      setRecipe(listMeals);
    }
  };
  const preventMealsNullCategory = async (data: any) => {
    if (data.meals !== null) {
      const list = await data.meals.slice(0, 5);
      const listByCategory = await list.map((category: any) => category.strCategory);
      setCategorys(listByCategory);
    }
  };

  useEffect(() => {
    const MEAL_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const BASE_FILTER_MEAL = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
    const MEAL_CATEGORYS = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const fetchMeals = async () => {
      setLoading(true);
      if (page.category === 'all') {
        const request = await fetch(MEAL_URL);
        const data = await request.json();
        if (data.meals !== null) {
          preventMealsNullData(data);
        }
      }
      if (page.category !== 'all') {
        const request = await fetch(`${BASE_FILTER_MEAL}${page.category}`);
        const data = await request.json();
        preventMealsNullData(data);
      }
      setLoading(false);
    };
    const fetchMealsCategory = async () => {
      const request = await fetch(MEAL_CATEGORYS);
      const data = await request.json();
      preventMealsNullCategory(data);
    };
    if (local === '/meals' && page.category === 'all') {
      fetchMeals();
      fetchMealsCategory();
    }
    if (local === '/meals' && page.category !== 'all') {
      fetchMeals();
      fetchMealsCategory();
    }
  }, [local, page.category]);

  const preventDrinksNullData = async (data: any) => {
    if (data.drinks !== null) {
      const listDrinks = await data.drinks.slice(0, 12);
      setRecipe(listDrinks);
    }
  };
  const preventDrinksNullCategory = async (data: any) => {
    if (data.drinks !== null) {
      const list = await data.drinks.slice(0, 5);
      const listByCategory = await list.map((category: any) => category.strCategory);
      setCategorys(listByCategory);
    }
  };
  useEffect(() => {
    const DRINK_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const BASE_FILTER_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
    const DRINK_CATEGORYS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const fetchDrinks = async () => {
      setLoading(true);
      if (page.category === 'all') {
        const request = await fetch(DRINK_URL);
        const data = await request.json();
        preventDrinksNullData(data);
      }
      if (page.category !== 'all') {
        const request = await fetch(`${BASE_FILTER_DRINK}${page.category}`);
        const data = await request.json();
        preventDrinksNullData(data);
      }
      setLoading(false);
    };
    const fetchDrinksCategory = async () => {
      const request = await fetch(DRINK_CATEGORYS);
      const data = await request.json();
      preventDrinksNullCategory(data);
    };
    if (local === '/drinks' && page.category === 'all') {
      fetchDrinks();
      fetchDrinksCategory();
    }
    if (local === '/drinks' && page.category !== 'all') {
      fetchDrinks();
      fetchDrinksCategory();
    }
  }, [local, page.category]);

  return { recipe, categorys };
}

export default useFetchRecipes;
