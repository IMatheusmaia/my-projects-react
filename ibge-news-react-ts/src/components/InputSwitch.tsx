import { useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import '../styles/inputSwitch.css';

function InputSwitch() {
  const { toggleTheme, theme } = useContext(GlobalContext);
  return (
    <input
      data-testid="input-switch"
      onChange={ toggleTheme }
      type="checkbox"
      checked={ theme === 'dark' }
    />
  );
}

export default InputSwitch;
