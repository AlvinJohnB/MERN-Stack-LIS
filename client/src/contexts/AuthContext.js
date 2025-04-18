import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Import js-cookie
import axios from 'axios';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check for an existing session cookie on component mount
  useEffect(() => {
    const session = Cookies.get('session'); // Retrieve the session cookie
    if (session) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async ({ username, password }) => {
    // Perform login logic here (e.g., API call)
    try {
      const response = await axios.post('http://localhost:5000/auth/', {
        username: username,
        password: password,
      });
      
      if (response.data.token) {
        setIsAuthenticated(true);
        Cookies.set('session', response.data.token, { expires: 1 }); // Set a session cookie (expires in 1 day
      } else {
        console.error('No token received');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }

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