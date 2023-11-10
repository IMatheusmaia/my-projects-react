import { screen } from '@testing-library/dom';
import { renderWithRouter } from './helpers/customRenders';
import MainGlobalProvider from '../context/MainGlobalProvider';
import Recipes from '../components/Recipes';

describe('Verifica se a página meals contem elementos esperados ao recarregar a página', async () => {
  test('Verifica se ao recarregar a página na rota meal, exibe o elemento de loading', async () => {
    renderWithRouter(
      <MainGlobalProvider>
        <Recipes />
      </MainGlobalProvider>,
      { route: '/meals' },
    );
    const loading = await screen.findByAltText('loading');
    expect(loading).toBeInTheDocument();
  });
});
