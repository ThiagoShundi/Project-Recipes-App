import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [formEmail, setFormEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const emailValidation = formEmail.match(emailRegex);
  const PASSWORD_LIMIT = 6;
  const passwordValidation = password.length > PASSWORD_LIMIT;

  const saveSubmition = () => {
    const user = {
      email: formEmail,
    };
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        data-testid="email-input"
        placeholder="Email"
        onChange={ (event) => setFormEmail(event.target.value) }
      />
      <input
        type="password"
        data-testid="password-input"
        placeholder="Password"
        onChange={ (event) => setPassword(event.target.value) }
      />
      <Link to="/meals">
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !(emailValidation && passwordValidation) }
          onClick={ saveSubmition }
        >
          Enter
        </button>
      </Link>
    </div>
  );
}

export default Login;
