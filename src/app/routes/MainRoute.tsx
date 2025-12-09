import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../../App';
import RegisterPage from '../pages/register/RegisterPage';
import PricePage from '../pages/price/PricePage';
import PaymentPage from '../pages/payment/PaymentPage';
import LoginPage from '../pages/login/LoginPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import PrivateRoute from './PrivateRoute';
import RootLayout from '../../components/Layout/RootLayout';
import Profile from '../pages/Profile';

// Lazy load components để tránh lỗi undefined
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      { path: '/price', element: <PricePage /> },
      { path: '/profile', element: <Profile /> },
      {
        path: '/admin',
        element: <PrivateRoute requiredRole="Admin" />,
        children: [
          { index: true, element: <AdminDashboard /> },
        ],
      },
      { path: '/payment', element: <PaymentPage /> },
    ],
  },
]);

const MainRoute: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default MainRoute;
