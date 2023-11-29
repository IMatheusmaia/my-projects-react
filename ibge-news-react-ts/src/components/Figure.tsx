import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import { NewsType } from '../types';
import Card from './Card';

type FigureProps = {
  notice: NewsType,
};

function Figure({ notice }: FigureProps) {
  const { theme } = useContext(GlobalContext);
  return (
    <section className={ theme === 'light' ? 'wallpaper' : 'wallpaper-dark' }>
      <Card notice={ notice } />
    </section>
  );
}

export default Figure;
