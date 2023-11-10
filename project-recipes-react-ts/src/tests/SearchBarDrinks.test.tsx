import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Drinks from '../pages/Drinks';
import { renderWithRouter } from './helpers/customRenders';
import MainGlobalProvider from '../context/MainGlobalProvider';
import { mockOneIngredientDrink, mockDrinksIngredientData } from './mocks/mockDrinksIngredientData';

const searchTopIcon = 'search-top-btn';
const search = 'search-input';
const ingredientOpt = 'ingredient-search-radio';
const nameOpt = 'name-search-radio';
const letterOpt = 'first-letter-search-radio';
const searchButtn = 'exec-search-btn';

describe('Testar o comportamento do component: "SearchBar na rota Drinks"', () => {
  test('verifica se o direcionamento de rota funciona em drinks', async () => {
    renderWithRouter(
      <MainGlobalProvider>
        <Drinks />
      </MainGlobalProvider>,
      { route: '/drinks' },
    );
    vi.spyOn(global, 'fetch').mockResolvedValue(await Promise.resolve({ ok: true, status: 200, json: async () => (mockOneIngredientDrink) } as Response));

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
    await userEvent.type(searchBar, 'long vodka');
    const searchButton = screen.getByTestId(searchButtn);
    expect(searchButton).toBeInTheDocument();
    await userEvent.click(searchButton);
    const vodkaTitle = screen.getByText(/long vodka/i);
    expect(vodkaTitle).toBeInTheDocument();
    expect(window.location.pathname).toBe('/drinks/13196');
    vi.clearAllMocks();
  });

  test('verifica se o alert funciona em drinks', async () => {
    renderWithRouter(
      <MainGlobalProvider>
        <Drinks />
      </MainGlobalProvider>,
      { route: '/drinks' },
    );

    vi.spyOn(global, 'fetch').mockResolvedValue(await Promise.resolve({ ok: true, status: 200, json: async () => ({ drinks: null }) } as Response));

    vi.spyOn(window, 'alert').mockImplementation(() => { });

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
    await userEvent.type(searchBar, 'anything');
    const searchButton = screen.getByTestId(searchButtn);
    expect(searchButton).toBeInTheDocument();
    await userEvent.click(searchButton);

    expect(alert).toBeCalled();
    expect(alert).toHaveBeenCalledWith('Sorry, we haven\'t found any recipes for these filters.');
    vi.clearAllMocks();
  });

  test('verifica se a busca por ingredientes funciona em drinks', async () => {
    renderWithRouter(
      <MainGlobalProvider>
        <Drinks />
      </MainGlobalProvider>,
      { route: '/drinks' },
    );
    vi.spyOn(global, 'fetch').mockResolvedValue(await Promise.resolve({ ok: true, status: 200, json: async () => (mockDrinksIngredientData) } as Response));

    const searchIcon = await screen.findByTestId(searchTopIcon);
    expect(searchIcon).toBeInTheDocument();
    await userEvent.click(searchIcon);
    const searchBar = screen.getByTestId(search);
    expect(searchBar).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    const radio1 = screen.getByTestId(ingredientOpt);
    expect(radio1).toBeInTheDocument();
    await userEvent.click(radio1);
    expect(radio1).toBeChecked();
    await userEvent.type(searchBar, 'ice');
    const searchButton = screen.getByTestId(searchButtn);
    expect(searchButton).toBeInTheDocument();
    await userEvent.click(searchButton);
    const recipe1Title = await screen.findByTestId('0-card-name');
    const recipe2Title = await screen.findByTestId('2-card-name');

    expect(recipe1Title).toBeInTheDocument();
    expect(recipe2Title).toBeInTheDocument();
  });
});

describe('verifica os resultados de pesquisa em letter', () => {
  test('verifica se ao pesquisar receitas por letra em drinks obtem o resultado esperado', async () => {
    renderWithRouter(
      <MainGlobalProvider>
        <Drinks />
      </MainGlobalProvider>,
      { route: '/drinks' },
    );
    vi.spyOn(global, 'fetch').mockResolvedValue(await Promise.resolve({ ok: true, status: 200, json: async () => (mockDrinksIngredientData) } as Response));

    vi.spyOn(window, 'alert');

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
    await userEvent.type(searchBar, 'g');
    const searchButton = screen.getByTestId(searchButtn);
    expect(searchButton).toBeInTheDocument();
    await userEvent.click(searchButton);

    const recipe1Title = await screen.findByTestId('0-card-name');
    const recipe2Title = await screen.findByTestId('2-card-name');

    expect(recipe1Title).toBeInTheDocument();
    expect(recipe2Title).toBeInTheDocument();

    await userEvent.clear(searchBar);
    await userEvent.type(searchBar, 'ggg');
    await userEvent.click(searchButton);

    expect(alert).toBeCalled();
    expect(alert).toHaveBeenCalledWith('Your search must have only 1 (one) character');
    vi.clearAllMocks();
  });
});
