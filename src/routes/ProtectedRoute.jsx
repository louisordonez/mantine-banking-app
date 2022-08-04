import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../services/utilities/isLoggedIn';

const ProtectedRoute = () => {
  return isLoggedIn() === true ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
