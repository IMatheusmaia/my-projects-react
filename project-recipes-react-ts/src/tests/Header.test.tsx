import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import MainGlobalProvider from '../context/MainGlobalProvider';
import { renderWithRouter } from './helpers/customRenders';
import App from '../App';
import FavoriteRecipes from '../pages/FavoriteRecipes';

const pageTitleId = 'page-title';

describe('Verificar se os elementos de header estão presentes e se o compotamento é o esperado', () => {
  const searchBtn = 'search-top-btn';
  test('verifica se o header contém os elementos esperados para a rota meals', async () => {
    renderWithRouter(
      <MainGlobalProvider>
        <App />
      </MainGlobalProvider>,
      { route: '/meals' },
    );
    const searchIcon = screen.getByTestId(searchBtn);
    const profileIcon = screen.getByTestId('profile-top-btn');
    const pageTitle = await screen.findByTestId(pageTitleId);

    expect(searchIcon).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  test('verifica se o header contém os elementos esperados para a rota drinks', async () => {
    renderWithRouter(
      <MainGlobalProvider>
        <App />
      </MainGlobalProvider>,
      { route: '/drinks' },
    );

    const searchIcon = screen.getByTestId(searchBtn);
    const profileIcon = screen.getByTestId('profile-top-btn');
    const pageTitle = await screen.findByText(/drinks/i);

    expect(pageTitle).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(profileIcon).toBeInTheDocument();
  });

  test('verifica se o header contém os elementos esperados para a rota done-recipes', () => {
    renderWithRouter(<App />, { route: '/done-recipes' });

    const userIcons = screen.getAllByTestId(/top-/i);
    const pageTitle = screen.getByText(/done recipes/i);

    expect(pageTitle).toBeInTheDocument();
    expect(userIcons).toHaveLength(1);
  });

  test('verifica se o header contém os elementos esperados para a rota favorite-recipes', async () => {
    renderWithRouter(
      <MainGlobalProvider>
        <FavoriteRecipes />
      </MainGlobalProvider>,
      { route: '/favorite-recipes' },
    );

    const userIcons = await screen.findAllByTestId(/filter-by-/i);
    const pageTitle = await screen.findByTestId(pageTitleId);

    expect(pageTitle).toBeInTheDocument();
    expect(userIcons).toHaveLength(3);
  });

  test('verifica se ao clicar na lupa aparece o search bar e se clicar novamente o search bar some', async () => {
    renderWithRouter(
      <MainGlobalProvider>
        <App />
      </MainGlobalProvider>,
      { route: '/meals' },
    );

    const searchIcon = screen.getByTestId(searchBtn);

    expect(searchIcon).toBeInTheDocument();
    expect(await screen.findByTestId(pageTitleId)).toBeInTheDocument();

    await userEvent.click(searchIcon);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();

    await userEvent.click(searchIcon);

    expect(searchInput).not.toBeInTheDocument();
  });
});
