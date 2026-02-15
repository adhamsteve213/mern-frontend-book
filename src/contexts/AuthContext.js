import React, { createContext, useEffect, useState } from 'react';
import { api, setAuthToken } from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const token = localStorage.getItem('token');
      if (token) setAuthToken(token);
      return null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      // Optionally fetch user profile
      api.get('/users/profile').then(res => setUser(res.data.user)).catch((err) => {
        // If token is invalid, ensure we clear it and unset headers
        if (err?.response?.status === 401) {
          localStorage.removeItem('token');
          setAuthToken(null);
          setUser(null);
        }
      });
    }
  }, []);

  const login = (userData) => {
    // userData may contain token and user info
    if (userData?.token) {
      localStorage.setItem('token', userData.token);
      setAuthToken(userData.token);
    }
    if (userData?.user) setUser(userData.user);
    else if (userData?.id) setUser({ id: userData.id, name: userData.name, email: userData.email });
    else setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
