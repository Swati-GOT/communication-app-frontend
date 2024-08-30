import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../storage/userStorage';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = getToken() ? true : false
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
