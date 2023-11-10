import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './helpers/customRenders';
import MainGlobalProvider from '../context/MainGlobalProvider';
import App from '../App';
import Login from '../pages/Login';

const emailTestId = 'email-input';
const passwordTestId = 'password-input';
const buttonTestId = 'login-submit-btn';

describe('Verifica se a página de login contém os elementos e as funcionalidades esperadas', () => {
  test('verifica se os inputs e botão de entrar estão no documento', () => {
    renderWithRouter(<App />);
    const header = screen.getByRole('heading', { name: /login/i });
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const button = screen.getByTestId(buttonTestId);

    expect(header).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('ENTRAR');
  });

  test('verifica se o botão de entrar é habilitado ao inserir um email e senha válidos e se é redirecionado para página correta', async () => {
    renderWithRouter(
      <MainGlobalProvider>
        <App />
      </MainGlobalProvider>,
    );
    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const button = screen.getByTestId(buttonTestId);

    await userEvent.type(emailInput, 'mail@mail.com');
    await userEvent.type(passwordInput, '1234567');
    expect(button).not.toBeDisabled();
    expect(emailInput).toHaveValue('mail@mail.com');
    expect(passwordInput).toHaveValue('1234567');

    await userEvent.click(button);
    expect(window.location.pathname).toBe('/meals');
    expect(await screen.findByTestId('page-title')).toBeInTheDocument();
  });

  test('verifica se o botão de entrar continua desabilitado ao colocar um email ou senha invalidos', async () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByTestId(emailTestId);
    const passwordInput = screen.getByTestId(passwordTestId);
    const button = screen.getByTestId(buttonTestId);

    await userEvent.type(emailInput, 'testmail.com');
    expect(button).toBeDisabled();
    await userEvent.type(passwordInput, '1234567');
    expect(button).toBeDisabled();
    await userEvent.clear(emailInput);
    await userEvent.clear(passwordInput);
    await userEvent.type(emailInput, 'test@mail.com');
    await userEvent.type(passwordInput, '123456');
    expect(button).toBeDisabled();
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, '12345678');
    expect(button).not.toBeDisabled();
  });
});
