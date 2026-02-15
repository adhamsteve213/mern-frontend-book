import { render, screen } from '@testing-library/react';
import Home from './pages/Home';
import { CartProvider } from './contexts/CartContext';
import { AuthProvider } from './contexts/AuthContext';

test('renders hero heading', () => {
  render(
    <AuthProvider>
      <CartProvider>
        <Home />
      </CartProvider>
    </AuthProvider>
  );
  const heading = screen.getByText(/Discover bold stories, vivid art, and the books everyone is talking about./i);
  expect(heading).toBeInTheDocument();
});
