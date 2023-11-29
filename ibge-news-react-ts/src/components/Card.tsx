import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiChatNewFill, RiDeleteBin2Fill } from 'react-icons/ri';
import { TiInfoLarge } from 'react-icons/ti';
import GlobalContext from '../context/GlobalContext';
import { NewsType } from '../types';
import '../styles/card.css';

type CardProps = {
  notice: NewsType,
};

function Card({ notice }: CardProps) {
  const storage = JSON.parse(localStorage.getItem('favorite') || '[]');
  const bool = storage.some((item: NewsType) => item.id === notice.id);
  const [isFavorite, setIsFavorite] = useState<boolean>(bool);

  const { theme, news, setFavorite, favorite } = useContext(GlobalContext);

  const handleFavorite = (id: number) => {
    const newNotice = news.find((item) => item.id === id);
    if (newNotice !== undefined && favorite !== undefined) {
      const newFavorite = [...favorite, newNotice];
      setFavorite(newFavorite);
      localStorage.setItem('favorite', JSON.stringify(newFavorite));
      setIsFavorite(true);
    }
  };
  const handleRemove = (id: number) => {
    const newFavorite = favorite.filter((item) => item.id !== id);
    setFavorite(newFavorite);
    localStorage.removeItem('favorite');
    localStorage.setItem('favorite', JSON.stringify(newFavorite));
    setIsFavorite(false);
  };
  return (
    <article className={ theme === 'dark' ? 'cardDark' : '' }>
      <h1>{ notice.titulo }</h1>
      <p>{notice.introducao}</p>
      <span>{notice.diffDays === 0 ? 'hoje' : `${notice.diffDays} dia(s) atrás`}</span>
      <Link to={ notice.link }>
        <TiInfoLarge />
      </Link>
      { !isFavorite ? (
        <i
          onClickCapture={ () => handleFavorite(notice.id) }
        >
          <RiChatNewFill />
        </i>
      ) : (
        <i
          onClickCapture={ () => handleRemove(notice.id) }
          className="remove-notice"
        >
          <RiDeleteBin2Fill />
        </i>
      ) }
    </article>
  );
}
export default Card;
