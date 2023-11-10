import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import recipesLogo from '../assets/logo Recipes App.png';
import tomatoes from '../assets/tomate.png';
import '../styles/login.css';

type InputsLoginType = { email: string, password: string };

function Login() {
  const [disabled, setDisabled] = useState(true);
  const [credential, setCredential] = useState<InputsLoginType>(
    { email: '', password: '' },
  );
  const navigate = useNavigate();

  useEffect(() => {
    const regexEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const isValidateEmail = regexEmail.test(credential.email);
    const isValidatePassword = credential.password.length > 6;

    if (isValidateEmail && isValidatePassword) {
      setDisabled(false);
    }
    if (!isValidateEmail || !isValidatePassword) {
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
    const user = JSON.stringify({ email: credential.email });
    localStorage.setItem('user', user);
    navigate('/meals');
  };

  return (
    <div>
      <div className="upper-container">
        <img src={ recipesLogo } alt="recipesApp-logo" />
        <img src={ tomatoes } alt="tomatoes" className="tomatoes" />
      </div>
      <div className="bottom-container">
        <h2
          data-testid="login-title"
        >
          LOGIN
        </h2>
        <form>
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
            ENTRAR
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
