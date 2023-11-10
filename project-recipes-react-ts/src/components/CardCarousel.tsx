import '../styles/CardCarousel.css';

function CardCarousel({ dataRecommendations }) {
  return (
    <div className="carousel-container">
      <div className="carousel">
        {dataRecommendations.map((item, index) => (
          <div
            key={ index }
            className={ `carousel-item ${index === 0 ? 'active' : ''}` }
            data-testid={ `${index}-recommendation-card` }
          >
            <img
              src={ item.strDrinkThumb || item.strMealThumb }
              alt={ item.strDrink || item.strMeal }
            />
            <h3 data-testid={ `${index}-recommendation-title` }>
              {item.strDrink || item.strMeal}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
export default CardCarousel;
