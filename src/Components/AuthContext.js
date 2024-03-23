import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [access, setAccess] = useState(false);

  const login = () => {
    console.log('Login called');
    setAccess(true);
  };

  const logout = () => {
    console.log('Logout called');
    setAccess(false);
  };

  return (
    <AuthContext.Provider value={{ access, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

