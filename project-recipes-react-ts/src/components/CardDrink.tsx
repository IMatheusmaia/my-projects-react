function CardDrink({ info, index }:any) {
  return (
    <figure
      data-testid={ `${index}-recipe-card` }
      className="recipe-card"
    >
      <img
        data-testid={ `${index}-card-img` }
        alt="drinkPicture"
        src={ info.strDrinkThumb }
      />
      <figcaption
        data-testid={ `${index}-card-name` }
      >
        { info.strDrink }
      </figcaption>
    </figure>
  );
}

export default CardDrink;
