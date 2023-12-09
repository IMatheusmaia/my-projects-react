import { screen } from '@testing-library/react';
import { vi } from 'vitest';
import App from '../App';
import renderWithContext from '../utils/renderWithContext';
import { responseAPI } from './mocks/responseAPI';

describe('Testa se a partir da rota raiz os elementos esperados são renderizados e se os redirecionamentos de rota tem o comportamento esperado', async () => {
  beforeEach(async () => (
    vi.spyOn(global, 'fetch').mockResolvedValue(await Promise.resolve({
      ok: true,
      status: 200,
      json: async () => responseAPI,
    }) as Response)
  ));
  test('testa se na rota raiz possui os elementos esperados', async () => {
    renderWithContext(<App />);
    const logo = await screen.findByRole('img', { name: /logo/i });
    const home = await screen.findByTestId('nav-home');
    const user = await screen.findByTestId('nav-user');
    const inputSwitch = await screen.findByTestId('input-switch');
    const latestCard = await screen.findByTestId('card-38378');
    const cardTitle = await screen.findByTestId('card-title-38378');
    const cardText = await screen.findByTestId('card-text-38378');
    const cardDate = await screen.findByTestId('card-date-38378');
    const link = await screen.findByTestId('know-more-38378');
    const favorite = await screen.findByTestId('favorite-38378');
    const sortCards = await screen.findByRole('list');
    const allCards = await screen.findAllByRole('article');
    const buttonMoreCards = await screen.findByTestId('more-news');
    const linkedin = await screen.findByTestId('linkedin');
    const github = await screen.findByTestId('github');

    expect(logo).toBeInTheDocument();
    expect(home).toBeInTheDocument();
    expect(user).toBeInTheDocument();
    expect(inputSwitch).toBeInTheDocument();
    expect(latestCard).toBeInTheDocument();
    expect(cardTitle).toBeInTheDocument();
    expect(cardTitle).toHaveTextContent('6ª edição do Seminário IBGE de Portas...');
    expect(cardText).toBeInTheDocument();
    expect(cardText).toHaveTextContent('Citando a missão do IBGE, a gerente...');
    expect(link).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
    expect(cardDate).toBeInTheDocument();
    expect(sortCards).toBeInTheDocument();
    expect(allCards).toHaveLength(10);
    expect(buttonMoreCards).toBeInTheDocument();
    expect(linkedin).toBeInTheDocument();
    expect(github).toBeInTheDocument();
  });
});
