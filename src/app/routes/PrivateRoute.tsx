import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  requiredRole?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ requiredRole }) => {
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null;
  const userRole = typeof window !== 'undefined' ? sessionStorage.getItem('userRole') : null;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;


