import React, { createContext, useEffect, useState, useContext } from 'react';
import api from '../api';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });
  const [message, setMessage] = useState(null);

  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem('wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    const syncWithBackend = async () => {
      if (user?.id) {
        try {
          // Fetch wishlist from backend
          const wishlistRes = await api.get(`/wishlist/user/${user.id}`);

          // Process and merge wishlist
          if (wishlistRes.data?.products) {
            const backendWishlist = wishlistRes.data.products.map(p => ({...p.productId, id: p.productId._id}));
            setWishlist(prev => [...backendWishlist, ...prev.filter(p1 => !backendWishlist.find(p2 => p2.id === p1.id))]);
          }
        } catch (error) {
          console.error("Failed to sync wishlist with backend", error);
        }
      }
    };
    syncWithBackend();
  }, [user]);

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        setMessage('Product quantity updated in cart.');
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p);
      }
      setMessage('Product added to cart successfully.');
      return [...prev, { ...product, quantity }];
    });
    // Sync with backend if user is logged in
    if (user?.id) {
      try {
        api.post('/cart', { productId: String(product.id), quantity, userId: user.id });
      } catch (e) {
        // ignore for now
      }
    }
    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(p => p.id !== productId));
    if (user?.id) {
      try {
        api.delete(`/cart/user/${user.id}/product/${productId}`);
      } catch (e) { /* ignore */ }
    }
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        setMessage('Product removed from wishlist.');
        // Optionally notify backend
        if (user?.id) api.post('/wishlist/remove', { productId: String(product.id) }).catch(() => {});
        return prev.filter(p => p.id !== product.id);
      }
      setMessage('Product added to wishlist successfully.');
      // Optionally notify backend
      if (user?.id) api.post('/wishlist/add', { productId: String(product.id) }).catch(() => {});
      return [...prev, product];
    });
    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <CartContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, clearCart, toggleWishlist, message }}>
      {children}
    </CartContext.Provider>
  );
};
