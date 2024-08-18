import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = localStorage.getItem("loginUser") ? true : false;
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
