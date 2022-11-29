import { screen } from '@testing-library/react';
import Profile from '../pages/Profile';
import { renderWithRouter } from '../services/renderWith';

describe('Teste do componente HeaderNoSearch', () => {
  it('Verificar os elementos do HeaderNoSearch', () => {
    renderWithRouter(<Profile />);
    const buttonProfile = screen.getByTestId('profile-top-btn');
    expect(buttonProfile).toBeInTheDocument();
  });
});
