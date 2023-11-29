import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiAdminFill, RiFileListFill } from 'react-icons/ri';
import GlobalContext from '../context/GlobalContext';
import logo from '../assets/ibge-logo.png';
import InputSwitch from './InputSwitch';

function NavBar() {
  const navegate = useNavigate();
  const isLoged = localStorage.getItem('user');
  const { theme } = useContext(GlobalContext);
  return (
    <nav className={ theme === 'light' ? 'navBar' : 'navBarDark' }>
      <div className="nav-left-container">
        <img src={ logo } alt="ibge-logo" />
      </div>
      <div className="nav-right-container">
        <i onClickCapture={ () => navegate('/') }>
          <RiFileListFill />
        </i>
        <i onClickCapture={ () => (isLoged ? navegate('/user') : navegate('/login')) }>
          <RiAdminFill />
        </i>
        <InputSwitch />
      </div>
    </nav>
  );
}

export default NavBar;
