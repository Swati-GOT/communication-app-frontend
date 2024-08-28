import React from 'react';
import { Navigate } from 'react-router-dom';
import { getLoggedInUser } from '../storage/userStorage';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = getLoggedInUser() ? true : false
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/" />;
};

export default ProtectedRoute;
