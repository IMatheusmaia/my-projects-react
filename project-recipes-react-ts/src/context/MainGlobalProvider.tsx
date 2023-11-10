import { useState } from 'react';
import MainGlobalContext from './MainGlobalContext';
import { FoodType, PageType, DrinkType } from '../types';

type MainGlobalProviderProps = { children: React.ReactNode };

function MainGlobalProvider({ children }: MainGlobalProviderProps) {
  const [clickSearch, setClickSearch] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<PageType>({ currentPage: '', category: 'all' });
  const [recipes, setRecipes] = useState<Array<FoodType | DrinkType>>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  return (
    <MainGlobalContext.Provider
      value={
      { clickSearch,
        setClickSearch,
        loading,
        setLoading,
        page,
        setPage,
        recipes,
        setRecipes,
        isSearching,
        setIsSearching,
      }
      }
    >
      { children }
    </MainGlobalContext.Provider>
  );
}

export default MainGlobalProvider;
