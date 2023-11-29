import { useContext } from 'react';
import NotFound from './NotFound';
import Login from './Login';
import GlobalContext from '../context/GlobalContext';

function LoginWrapper() {
  const { isLoged } = useContext(GlobalContext);
  return (isLoged ? <NotFound /> : <Login />);
}

export default LoginWrapper;
