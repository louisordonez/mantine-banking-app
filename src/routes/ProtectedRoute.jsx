import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getLocalStorageItem } from '../services/utilities/localStorage';

const ProtectedRoute = () => {
  const userDataLocalStorage = getLocalStorageItem('userData');

  return userDataLocalStorage !== null ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
