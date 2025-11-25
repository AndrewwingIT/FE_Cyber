import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../../App';
import RegisterPage from '../pages/register/RegisterPage';
import PricePage from '../pages/price/PricePage';
import PaymentPage from '../pages/payment/PaymentPage';
import LoginPage from '../pages/login/LoginPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/price', element: <PricePage /> },
<<<<<<< HEAD
  {
    path: '/admin',
    element: <PrivateRoute requiredRole="Admin" />,
    children: [
      { index: true, element: <AdminDashboard /> },
    ],
  },
=======
  { path: '/payment', element: <PaymentPage /> },
  { path: '/admin', element: <AdminDashboard /> },
>>>>>>> 474d156a600df0161e963178c4b40d07664b0a9e
]);

const MainRoute: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default MainRoute;
