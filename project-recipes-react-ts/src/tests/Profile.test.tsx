import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/customRenders';
import MainGlobalProvider from '../context/MainGlobalProvider';
import App from '../App';

const pageTitleid = 'page-title';

describe('Testando a página de Profile', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  test('Teste se a página contém as informações do email do usuário', () => {
    const user = { email: '' };
    localStorage.setItem('user', JSON.stringify(user));
    renderWithRouter(<App />, { route: '/profile' });

    expect(screen.getByTestId('profile-email')).toHaveTextContent('');
  });

  test('Verifica se o email renderiza e os botões funcionam', () => {
    renderWithRouter(<App />, { route: '/profile' });

    const email = screen.getByTestId('profile-email');
    expect(email).toBeInTheDocument();

    const doneRecipes = screen.getByTestId('profile-done-btn');
    expect(doneRecipes).toBeInTheDocument();

    const favoriteRecipes = screen.getByTestId('profile-favorite-btn');
    expect(favoriteRecipes).toBeInTheDocument();

    const logout = screen.getByTestId('profile-logout-btn');
    expect(logout).toBeInTheDocument();
  });

  test('Verifica se limpa o localStorage e redireciona para a página de login', async () => {
    renderWithRouter(<App />, { route: '/profile' });

    const logout = screen.getByTestId('profile-logout-btn');
    await userEvent.click(logout);
    const login = screen.getByTestId('login-title');
    expect(login).toBeInTheDocument();
  });
  test('Verifica se redireciona para a página receitas prontas clicando no botão "Done Recipes", clique', async () => {
    renderWithRouter(<App />, { route: '/profile' });

    const doneRecipes = screen.getByTestId('profile-done-btn');
    await userEvent.click(doneRecipes);
    const doneRecipesPage = await screen.findByTestId(pageTitleid);
    expect(doneRecipesPage).toBeInTheDocument();
  });
  test('Verifica se redireciona para a página receitas favoritas clicando no botão "Favorite Recipes", clique', async () => {
    renderWithRouter(
      <MainGlobalProvider>
        <App />
      </MainGlobalProvider>,
      { route: '/profile' },
    );

    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    await userEvent.click(favoriteBtn);
    const favoriteRecipes = await screen.findByTestId(pageTitleid);
    expect(favoriteRecipes).toBeInTheDocument();
  });
});
