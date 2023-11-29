export type Response = {
  count: number,
  page: number,
  totalPages: number,
  nextPage: number,
  previousPage: number,
  showingFrom: number,
  showingTo: number,
  items: NewsType[],
};

export type NewsType = {
  id: number,
  tipo: string,
  titulo: string,
  introducao: string,
  data_publicacao: string,
  produto_id: number,
  produtos: string,
  editorias: string,
  imagens?: string,
  produtos_relacionados: string,
  destaque: boolean,
  link: string,
  diffDays?: number,
};

export type GlobalContextType = {
  isLoged: boolean,
  setIsLoged: (isLoged: boolean) => void,
  loading: boolean,
  theme: 'light' | 'dark',
  toggleTheme: () => void,
  news: NewsType[],
  favorite: NewsType[] | [],
  setFavorite: (news: NewsType[]) => void,
};
