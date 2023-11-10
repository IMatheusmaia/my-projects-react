import { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import { DoneRecipeType } from '../types';

function DoneRecipesCard({ id, image, name, category, nationality, doneDate,
  tags, index, type, alcoholicOrNot }: DoneRecipeType) {
  const [copy, setCopy] = useState(false);

  const handleClipBoard = () => {
    const pathname = window.location.host;
    const link = `http://${pathname}/${type}s/${id}`;
    navigator.clipboard.writeText(link);
    setCopy((prevState) => !prevState);
  };

  return (
    <div className="done-recipes-card">
      <div>
        <Link to={ `../${type}s/${id}` }>
          <img
            src={ image }
            alt={ name }
            width={ 100 }
            data-testid={ `${index}-horizontal-image` }
          />
          <h4
            data-testid={ `${index}-horizontal-name` }
          >
            { name }
          </h4>
        </Link>
        <div>
          { (type === 'meal') && (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${nationality} - ${category}`}
            </p>
          )}
          { (type === 'drink') && (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${alcoholicOrNot} - ${category}`}
            </p>
          )}
        </div>
        <button
          onClick={ () => handleClipBoard() }
        >
          {!copy && <img
            src={ shareIcon }
            alt="share"
            data-testid={ `${index}-horizontal-share-btn` }
          />}
          {copy && <p className="message">Link copied!</p>}
        </button>
      </div>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        { doneDate }
      </p>
      { (type === 'meal') && (
        <div>
          { tags.map((tag) => (
            <span
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default DoneRecipesCard;
