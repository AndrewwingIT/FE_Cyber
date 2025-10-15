import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../../App';
import RegisterPage from '../pages/register/RegisterPage';
import PricePage from '../pages/price/PricePage';
import LoginPage from '../pages/login/LoginPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/price', element: <PricePage /> },
  {
    path: '/admin',
    element: <PrivateRoute requiredRole="Admin" />,
    children: [
      { index: true, element: <AdminDashboard /> },
    ],
  },
]);

const MainRoute: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default MainRoute;
