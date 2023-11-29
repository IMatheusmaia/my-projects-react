import { useState, useEffect } from 'react';
import GlobalContext from './GlobalContext';
import { NewsType } from '../types';
import request from '../services/request';

type ProviderContextProps = {
  children: React.ReactNode,
};

function ProviderContext({ children }: ProviderContextProps) {
  const favoriteMemory = JSON.parse(localStorage.getItem('favorite') || '[]');
  const themeMemory = JSON.parse(localStorage.getItem('isDark')
  || 'false') === true ? 'dark' : 'light';
  const userMemory = JSON.parse(localStorage.getItem('user') || 'false') as boolean;

  const [loading, setLoading] = useState<boolean>(true);
  const [theme, setTheme] = useState<'light' | 'dark'>(themeMemory);
  const [news, setNews] = useState<NewsType[]>([]);
  const [favorite, setFavorite] = useState<NewsType[]>(favoriteMemory);
  const [isLoged, setIsLoged] = useState<boolean>(userMemory);

  useEffect(() => {
    setLoading(true);
    const getData = async (): Promise<void> => {
      const data = await request();
      setNews(data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    getData();
    if (theme === 'dark') {
      localStorage.setItem('isDark', 'true');
    } else {
      localStorage.removeItem('isDark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <GlobalContext.Provider
      value={
      {
        loading,
        theme,
        toggleTheme,
        news,
        favorite,
        setFavorite,
        isLoged,
        setIsLoged,
      }
      }
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default ProviderContext;
