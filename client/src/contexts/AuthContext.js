import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Check for an existing session cookie on component mount
  useEffect(() => {
    const session = Cookies.get('session'); // Retrieve the session cookie
    if (session) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    Cookies.set('session', 'active', { expires: 1 }); // Set a session cookie (expires in 1 day)
  };

  const logout = () => {
    setIsAuthenticated(false);
    Cookies.remove('session'); // Remove the session cookie
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};