function CardMeals({ info, index }:any) {
  return (
    <figure
      data-testid={ `${index}-recipe-card` }
      className="recipe-card"
    >
      <img
        data-testid={ `${index}-card-img` }
        alt="mealPicture"
        src={ info.strMealThumb }
      />
      <figcaption
        data-testid={ `${index}-card-name` }
      >
        { info.strMeal }
      </figcaption>
    </figure>
  );
}

export default CardMeals;
