import { createContext } from 'react';
import { MainGlobalContextType } from '../types';

const MainGlobalContext = createContext({} as MainGlobalContextType);

export default MainGlobalContext;
