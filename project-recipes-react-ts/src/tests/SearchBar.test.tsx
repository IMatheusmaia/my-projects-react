import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Meals from '../pages/Meals';
import { renderWithRouter } from './helpers/customRenders';
import MainGlobalProvider from '../context/MainGlobalProvider';
import { mockOneMealIngredientData, mockMealsIngredientData } from './mocks/mockMealsIngredientData';

const searchTopIcon = 'search-top-btn';
const search = 'search-input';
const ingredientOpt = 'ingredient-search-radio';
const nameOpt = 'name-search-radio';
const letterOpt = 'first-letter-search-radio';
const searchButtn = 'exec-search-btn';

describe('Testar o comportamento do component: "SearchBar na rota Meals"', () => {
  test('verifica se SearchBar é renderizado corretamente', async () => {
    renderWithRouter(
      <MainGlobalProvider>
        <Meals />
      </MainGlobalProvider>,
      { route: '/meals' },
    );

    const searchIcon = screen.getByTestId(searchTopIcon);
    expect(searchIcon).toBeInTheDocument();
    await userEvent.click(searchIcon);
    const searchBar = screen.getByTestId(search);
    expect(searchBar).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();

    const radio1 = screen.getByTestId(ingredientOpt);
    const radio2 = screen.getByTestId(nameOpt);
    const radio3 = screen.getByTestId(letterOpt);
    expect(radio1).toBeInTheDocument();
    expect(radio1).toBeChecked();
    expect(radio2).toBeInTheDocument();
    expect(radio2).not.toBeChecked();
    expect(radio3).toBeInTheDocument();
    expect(radio3).not.toBeChecked();

    const searchButton = screen.getByTestId(searchButtn);
    expect(searchButton).toBeInTheDocument();
  });

  test('verifica se o direcionamento de rota funciona em meals', async () => {
    renderWithRouter(
      <MainGlobalProvider>
        <Meals />
      </MainGlobalProvider>,
      { route: '/meals' },
    );
    vi.spyOn(global, 'fetch').mockResolvedValue(await Promise.resolve({ ok: true, status: 200, json: async () => (mockOneMealIngredientData) } as Response));

    const searchIcon = screen.getByTestId(searchTopIcon);
    expect(searchIcon).toBeInTheDocument();
    await userEvent.click(searchIcon);
    const searchBar = screen.getByTestId(search);
    expect(searchBar).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    const radio2 = screen.getByTestId(nameOpt);
    expect(radio2).toBeInTheDocument();
    await userEvent.click(radio2);
    expect(radio2).toBeChecked();
    await userEvent.type(searchBar, 'tunisian');
    const searchButton = screen.getByTestId(searchButtn);
    expect(searchButton).toBeInTheDocument();
    await userEvent.click(searchButton);
    const tunisianTitle = screen.getByText(/tunisian/i);
    expect(tunisianTitle).toBeInTheDocument();
    expect(window.location.pathname).toBe('/meals/52970');
    vi.clearAllMocks();
  });
  test('verifica se a busca por ingredientes funciona em meals', async () => {
    renderWithRouter(
      <MainGlobalProvider>
        <Meals />
      </MainGlobalProvider>,
      { route: '/meals' },
    );

    vi.spyOn(global, 'fetch').mockResolvedValue(await Promise.resolve({ ok: true, status: 200, json: async () => (mockMealsIngredientData) } as Response));

    const searchIcon = screen.getByTestId(searchTopIcon);
    expect(searchIcon).toBeInTheDocument();
    await userEvent.click(searchIcon);
    const searchBar = screen.getByTestId(search);
    expect(searchBar).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    const radio1 = screen.getByTestId(ingredientOpt);
    expect(radio1).toBeInTheDocument();
    await userEvent.click(radio1);
    expect(radio1).toBeChecked();
    await userEvent.type(searchBar, 'eggs');
    const searchButton = screen.getByTestId(searchButtn);
    expect(searchButton).toBeInTheDocument();
    await userEvent.click(searchButton);
    const recipe1Title = await screen.findByText(/tuna nicoise/i);
    const recipe2Title = await screen.findByText(/tuna and egg/i);

    expect(recipe1Title).toBeInTheDocument();
    expect(recipe2Title).toBeInTheDocument();
  });
  test('verifica se um alerta é emitido quando o ingredite não é encontrado', async () => {
    renderWithRouter(
      <MainGlobalProvider>
        <Meals />
      </MainGlobalProvider>,
      { route: '/meals' },
    );
    vi.spyOn(global, 'fetch').mockResolvedValue(await Promise.resolve({ ok: true, status: 200, json: async () => ({ meals: null }) } as Response));
    vi.spyOn(window, 'alert').mockImplementation(() => { });

    const searchIcon = screen.getByTestId(searchTopIcon);
    expect(searchIcon).toBeInTheDocument();
    await userEvent.click(searchIcon);
    const searchBar = screen.getByTestId(search);
    expect(searchBar).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    const radio1 = screen.getByTestId(ingredientOpt);
    expect(radio1).toBeInTheDocument();
    await userEvent.click(radio1);
    expect(radio1).toBeChecked();
    await userEvent.type(searchBar, 'anything');
    const searchButton = screen.getByTestId(searchButtn);
    expect(searchButton).toBeInTheDocument();
    await userEvent.click(searchButton);
    expect(alert).toBeCalled();
    expect(alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    vi.clearAllMocks();
  });
});

describe('verifica os resultados de pesquisa em letter', () => {
  test('verifica se ao pesquisar receitas por letra em meals obtem o resultado esperado', async () => {
    renderWithRouter(
      <MainGlobalProvider>
        <Meals />
      </MainGlobalProvider>,
      { route: '/meals' },
    );
    vi.spyOn(global, 'fetch').mockResolvedValue(await Promise.resolve({ ok: true, status: 200, json: async () => (mockMealsIngredientData) } as Response));

    vi.spyOn(window, 'alert').mockImplementation(() => { });

    const searchIcon = screen.getByTestId(searchTopIcon);
    expect(searchIcon).toBeInTheDocument();
    await userEvent.click(searchIcon);
    const searchBar = screen.getByTestId(search);
    expect(searchBar).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    const radio3 = screen.getByTestId(letterOpt);
    expect(radio3).toBeInTheDocument();
    await userEvent.click(radio3);
    expect(radio3).toBeChecked();
    await userEvent.type(searchBar, 't');
    const searchButton = screen.getByTestId(searchButtn);
    expect(searchButton).toBeInTheDocument();
    await userEvent.click(searchButton);

    expect(screen.getByText(/tuna nicoise/i)).toBeInTheDocument();
    expect(screen.getByText(/tuna and egg/i)).toBeInTheDocument();

    await userEvent.clear(searchBar);
    await userEvent.type(searchBar, 'aaa');
    await userEvent.click(searchButton);

    expect(alert).toBeCalled();
    expect(alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    vi.clearAllMocks();
  });
});
