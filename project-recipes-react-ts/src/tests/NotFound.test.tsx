import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/customRenders';
import MainGlobalProvider from '../context/MainGlobalProvider';
import App from '../App';

describe('verifica se ao utilizar uma rota não existente na aplicação uma página NotFound é renderizada', () => {
  test('verifica se elementos da página NotFound estão presentes ', async () => {
    renderWithRouter(<MainGlobalProvider><App /></MainGlobalProvider>, { route: '/any' });
    expect(screen.getByText(/página não encontrada/i)).toBeInTheDocument();
    const retornar = screen.getByText(/retornar/i);
    expect(retornar).toBeInTheDocument();
    await userEvent.click(retornar);
    expect(screen.getByText(/meals/i)).toBeInTheDocument();
  });
});
