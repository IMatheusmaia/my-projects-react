import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/customRenders';
import MainGlobalProvider from '../context/MainGlobalProvider';
import App from '../App';

describe('4. Footer.', () => {
  test('Verifica se os elementos necessárioa estão presentes na rota "/meals"', () => {
    renderWithRouter(
      <MainGlobalProvider>
        <App />
      </MainGlobalProvider>,
      { route: '/meals' },
    );

    const drinksBtn = screen.getByRole('img', {
      name: /drinks/i,
    });
    const mealsBtn = screen.getByRole('img', {
      name: /foods/i,
    });

    expect(drinksBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
  });

  test('Verifica se o botão de bebidas direciona para a rota "/drinks" a partir da rota "/meals"', async () => {
    renderWithRouter(
      <MainGlobalProvider>
        <App />
      </MainGlobalProvider>,
      { route: '/meals' },
    );

    const drinksBtn = screen.getByRole('img', {
      name: /drinks/i,
    });
    expect(drinksBtn).toBeInTheDocument();
    await userEvent.click(drinksBtn);

    const drinksTitle = screen.getByRole('heading', {
      name: /drinks/i,
    });
    expect(drinksTitle).toBeInTheDocument();
  });

  test('Verifica se o botão de bebidas direciona para a rota "/meals" a partir da rota "/drinks"', async () => {
    renderWithRouter(
      <MainGlobalProvider>
        <App />
      </MainGlobalProvider>,
      { route: '/drinks' },
    );
    const foodsBtn = screen.getByRole('img', {
      name: /foods/i,
    });
    expect(foodsBtn).toBeInTheDocument();
    await userEvent.click(foodsBtn);
    const foodsTitle = screen.getByRole('heading', {
      name: /meals/i,
    });
    expect(foodsTitle).toBeInTheDocument();
  });
});
