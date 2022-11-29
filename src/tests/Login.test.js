import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';

describe('Testes da page Login', () => {
  it('Deve existir um input para email e senha e um botão submit', () => {
    render(<Login />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    const submitBtn = screen.getByTestId('login-submit-btn');
    expect(submitBtn).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();
  });
  it('O formulário só deve ser válido após um email e senha válidos', () => {
    render(<Login />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitBtn = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, 'teste@gmail.com');
    expect(submitBtn).toBeDisabled();
    userEvent.type(passwordInput, '1234567');
    expect(submitBtn).not.toBeDisabled();
  });
});
