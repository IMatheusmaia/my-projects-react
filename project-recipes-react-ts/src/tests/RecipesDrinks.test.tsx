import { vi } from 'vitest';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/customRenders';
import MainGlobalProvider from '../context/MainGlobalProvider';
import Recipes from '../components/Recipes';
import { mockDrinksIngredientData } from './mocks/mockDrinksIngredientData';

describe('Verifica se a página drinks contem elementos esperados ao recarregar a página', async () => {
  test('Verifica se ao recarregar a página na rota drink, exibe o elemento de loading', async () => {
    renderWithRouter(
      <MainGlobalProvider>
        <Recipes />
      </MainGlobalProvider>,
      { route: '/drinks' },
    );
    vi.spyOn(global, 'fetch').mockResolvedValue(await Promise.resolve({ ok: true, status: 200, json: async () => (mockDrinksIngredientData) } as Response));

    const loading = await screen.findByAltText('loading');
    expect(loading).toBeInTheDocument();
    vi.clearAllMocks();
  });

  test('Verifica se os cards de receitas na página drinks são renderizados', async () => {
    renderWithRouter(
      <MainGlobalProvider>
        <Recipes />
      </MainGlobalProvider>,
      { route: '/drinks' },
    );
    vi.spyOn(global, 'fetch').mockResolvedValue(await Promise.resolve({ ok: true, status: 200, json: async () => (mockDrinksIngredientData) } as Response));

    const allCategory = await screen.findByText('All');
    expect(allCategory).toBeInTheDocument();

    const cards = await screen.findAllByAltText('drinkPicture');
    expect(cards).toHaveLength(3);

    await userEvent.click(allCategory);
    expect(cards).toHaveLength(3);
  });
});
