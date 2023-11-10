import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { mockFavorite } from '../utils/favorite';
import { renderWithRouter } from './helpers/customRenders';
import FavoriteRecipes from '../pages/FavoriteRecipes';

describe('Testa se os elementos e funcionalidade de Favorite Recipes estão como o esperado', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockFavorite));
  });
  test('Testa se a página contém os elementos esperados', () => {
    renderWithRouter(<FavoriteRecipes />);
    const titlePage = screen.getByTestId('page-title');
    expect(titlePage).toBeInTheDocument();
    expect(screen.getByAltText(/favorite-icon/i)).toBeInTheDocument();
    const categorys = screen.getAllByTestId(/filter-by-/i);
    expect(categorys.length).toBe(3);
    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();
  });
  test('Testa se ao clicar nas categorias os elementos são renderizados corretamente', async () => {
    renderWithRouter(<FavoriteRecipes />);
    const all = screen.getByTestId('filter-by-all-btn');
    expect(all).toBeInTheDocument();
    const food = screen.getByTestId('filter-by-meal-btn');
    expect(food).toBeInTheDocument();
    const drink = screen.getByTestId('filter-by-drink-btn');
    expect(drink).toBeInTheDocument();

    expect(screen.getAllByTestId(/horizontal-image/i)).toHaveLength(3);
    await userEvent.click(food);
    expect(screen.getAllByTestId(/horizontal-image/i)).toHaveLength(2);
    await userEvent.click(drink);
    expect(screen.getAllByTestId(/horizontal-image/i)).toHaveLength(1);
    await userEvent.click(all);
    expect(screen.getAllByTestId(/horizontal-image/i)).toHaveLength(3);
  });
});
