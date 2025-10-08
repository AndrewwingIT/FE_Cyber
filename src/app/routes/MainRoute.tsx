import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../../App';
import LoginForm from '../pages/login/LoginForm';
import RegisterPage from '../pages/register/RegisterPage';
import PricePage from '../pages/price/PricePage';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <LoginForm /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/price', element: <PricePage /> },
]);

const MainRoute: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default MainRoute;
