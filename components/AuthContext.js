import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [tokenH, setTokenH] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const login = (token) => {
    setLoggedIn(true);
    setShowLoginModal(true);
    setTokenH(token);
  };

  const getToken = () => tokenH;

  const logout = () => {
    setLoggedIn(false);
    setShowLoginModal(false);
    setTokenH('');
    // Supprimer le token du stockage local (AsyncStorage, par exemple)
  };

  return (
    <AuthContext.Provider
      value={{ loggedIn, tokenH, showLoginModal, login, logout, getToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
