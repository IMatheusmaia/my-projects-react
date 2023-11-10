import { vi } from 'vitest';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/customRenders';
import MainGlobalProvider from '../context/MainGlobalProvider';
import App from '../App';
import { mockMealsCategorys } from './mocks/mockCategorys';
import { mockMealsIngredientData } from './mocks/mockMealsIngredientData';
import { mockBeefResponse } from './mocks/mockBeefResponse';

describe('Verifica se a página meals contem botões esperados ao carregar a página', async () => {
  const MOCK_RESPONSE = {
    ok: true,
    status: 200,
    json: async () => mockMealsIngredientData,
  } as Response;

  const mockFetch = vi.spyOn(global, 'fetch').mockResolvedValue(await Promise.resolve(MOCK_RESPONSE));

  const MOCK_RESPONSE_CATEGORY = {
    ok: true,
    status: 200,
    json: async () => mockMealsCategorys,
  } as Response;

  const mockFetchCategory = vi.spyOn(global, 'fetch').mockResolvedValue(await Promise.resolve(MOCK_RESPONSE_CATEGORY));

  const MOCK_BEEF = {
    ok: true,
    status: 200,
    json: async () => mockBeefResponse,
  } as Response;

  const fetchBeef = vi.spyOn(fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef'), 'then').mockResolvedValue(await Promise.resolve(MOCK_BEEF));

  beforeEach(() => {
    return mockFetch;
  });
  beforeEach(() => {
    return mockFetchCategory;
  });
  beforeEach(() => {
    return fetchBeef;
  });

  test('Verifica se os botões de categorias estão presentes', async () => {
    renderWithRouter(
      <MainGlobalProvider>
        <App />
      </MainGlobalProvider>,
      { route: '/meals' },
    );

    const categorys = await screen.findAllByTestId(/-category-filter/i);
    expect(categorys).toHaveLength(6);

    const beffCategory = await screen.findByText(/beef/i);
    const allCategory = await screen.findByText(/all/i);
    expect(beffCategory).toBeInTheDocument();
    expect(allCategory).toBeInTheDocument();

    const cards = await screen.findAllByTestId(/-card-img/i);
    expect(cards).toHaveLength(5);
    await userEvent.click(allCategory);
    expect(cards).toHaveLength(5);
    await userEvent.click(beffCategory);
    expect(await screen.findAllByTestId(/-card-img/i)).toHaveLength(5);
    expect(await screen.findByTestId('Beef-category-filter')).toBeInTheDocument();
  });
});
