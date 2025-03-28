
// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Modify as per your auth logic
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;