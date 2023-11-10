import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import likeButton from '../images/blackHeartIcon.svg';
import shareButton from '../images/shareIcon.svg';
import '../styles/favoriteCard.css';

type FavoriteCardProps = {
  index: number,
  info: any,
  update: (value: any) => void,
};

function FavoriteCard({ index, info, update }: FavoriteCardProps): JSX.Element {
  const [clipBoard, setClipBoard] = useState(false);

  const navigate = useNavigate();
  const handleNavigate = () => {
    if (info.type === 'meal') {
      return navigate(`/meals/${info.id}`);
    }
    if (info.type === 'drink') {
      return navigate(`/drinks/${info.id}`);
    }
  };
  const handleShare = () => {
    navigator.clipboard?.writeText(`http://localhost:3000/${info.type}s/${info.id}`).then(() => {
      setClipBoard(true);
    }).catch((err) => {
      console.log(`Failed to copy: ${err}`);
    });
    setTimeout(() => {
      setClipBoard(false);
    }, 800);
  };
  const handleFavorite = () => {
    const storage = localStorage.getItem('favoriteRecipes');
    const data = JSON.parse(storage || '[]');
    const newData = data.filter((recipe: any) => recipe.id !== info.id);
    update({ all: newData,
      meal: newData.filter((recipe: any) => recipe.type === 'meal'),
      drink: newData.filter((recipe: any) => recipe.type === 'drink'),
    });
    localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
  };
  return (
    <div>
      { clipBoard ? <p className="clipboard">Link copied!</p> : (
        <div className="card-container">
          <section className="left-section">
            <img
              src={ info.image }
              alt="recipe-ilustration"
              data-testid={ `${index}-horizontal-image` }
              onClickCapture={ handleNavigate }
            />
          </section>
          <section
            className="right-section"
          >
            <h3
              data-testid={ `${index}-horizontal-name` }
              onClickCapture={ handleNavigate }
            >
              {info.name}
            </h3>
            <div
              className="tags-container"
            >
              <p
                data-testid={ `${index}-horizontal-top-text` }
              >
                { `${info.nationality} - ${info.category}`}
              </p>
              {info.alcoholicOrNot === 'Alcoholic' && (
                <span
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { info.alcoholicOrNot }
                </span>
              )}
            </div>
            <div
              className="buttons-container"
            >
              <img
                src={ shareButton }
                alt="share button"
                data-testid={ `${index}-horizontal-share-btn` }
                onClickCapture={ handleShare }
              />
              <img
                src={ likeButton }
                alt="like button"
                data-testid={ `${index}-horizontal-favorite-btn` }
                onClickCapture={ handleFavorite }
              />
            </div>
          </section>
        </div>) }
    </div>
  );
}

export default FavoriteCard;
