import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalContext from '../context/GlobalContext';
import loginIlustration from '../assets/login-ilustration.svg';
import loginIlustrationDark from '../assets/login-ilustration-dark.svg';
import '../styles/login.css';

type InputsLoginType = { email: string, password: string, name: string };

function Login() {
  const { theme } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [credential, setCredential] = useState<InputsLoginType>(
    { email: '', password: '', name: '' },
  );

  useEffect(() => {
    const regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const isValidateEmail = regexEmail.test(credential.email);
    const isValidatePassword = credential.password.length > 6;
    const isValidateName = credential.name.length > 0;

    if (isValidateEmail && isValidatePassword && isValidateName) {
      setDisabled(false);
    }
    if (!isValidateEmail || !isValidatePassword || !isValidateName) {
      setDisabled(true);
    }
  }, [credential]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setCredential((prevInput) => (
      { ...prevInput,
        [target.name]: target.value,
      }
    ));
  };

  const handleRedirect = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const user = JSON.stringify({ email: credential.email, name: credential.name });
    localStorage.setItem('user', user);
    navigate('/user');
  };

  return (
    <div className="login-container">
      <div className="upper-container">
        <img
          src={
                theme === 'dark'
                  ? loginIlustrationDark
                  : loginIlustration
              }
          alt="ilustration"
        />
      </div>
      <div className="bottom-container">
        <h2
          data-testid="login-title"
        >
          Login
        </h2>
        <form id={ theme === 'dark' ? 'form-dark' : '' }>
          <input
            data-testid="user-name"
            name="name"
            type="text"
            placeholder="Como quer ser chamado?"
            value={ credential.name }
            onChange={ handleChange }
            required
          />
          <input
            data-testid="email-input"
            name="email"
            type="text"
            placeholder="E-mail"
            value={ credential.email }
            onChange={ handleChange }
          />
          <input
            data-testid="password-input"
            name="password"
            type="password"
            placeholder="Senha"
            value={ credential.password }
            onChange={ handleChange }
          />
          <button
            className="login-btn"
            data-testid="login-submit-btn"
            disabled={ disabled }
            onClick={ handleRedirect }
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
