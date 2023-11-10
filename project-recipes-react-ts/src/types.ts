export type PageType = {
  currentPage: string;
  category: string,
};

export type MainGlobalContextType = {
  clickSearch: boolean,
  setClickSearch: (value: boolean) => void,
  loading: boolean,
  setLoading: (value: boolean) => void,
  page: PageType,
  setPage: (page: PageType) => void,
  recipes: Array<FoodType | DrinkType>,
  setRecipes: (recipes: Array<FoodType | DrinkType>) => void,
  isSearching: boolean,
  setIsSearching: (value: boolean) => void,
};

export type SearchInputType = {
  term: string,
  radio: string,
};

export type SearchPropsType = {
  type: string,
};

export type FoodType = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
  strInstructions: string;
  strYoutube: string;
};

export type DrinkType = {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strAlcoholic: string;
  strDrinkThumb: string;
  strInstructions: string;
};

export type FavoriteType = {
  all: any,
  foods: any,
  drinks: any,
};

export type DoneRecipeType = {
  id: string,
  category: string,
  name: string,
  image: string,
  doneDate: string,
  tags: string[],
  nationality: string,
  index: number,
  type: string,
  alcoholicOrNot: string
};
