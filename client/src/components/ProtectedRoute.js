import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); // Check authentication status

  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;