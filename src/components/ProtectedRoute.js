import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const getUserAuth = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return { isAuthenticated: false, isAdmin: false };
  }

  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      return { isAuthenticated: false, isAdmin: false };
    }
    return { isAuthenticated: true, isAdmin: decoded.role === 'admin' };
  } catch (e) {
    localStorage.removeItem('token');
    return { isAuthenticated: false, isAdmin: false };
  }
};

const ProtectedRoute = () => {
  const { isAuthenticated, isAdmin } = getUserAuth();

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
