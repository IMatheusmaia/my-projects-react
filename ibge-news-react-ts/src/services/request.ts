import { NewsType, Response } from '../types';

async function fetchData(): Promise<NewsType[]> {
  try {
    const request = await fetch('https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=100');
    if (request.status !== 200) {
      throw new Error('Erro ao buscar os dados');
    } else {
      const response = await request.json() as Response;
      return response.items;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export default fetchData;
