import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../../App';
import LoginForm from '../pages/login/LoginForm';
import RegisterForm from '../pages/login/RegisterForm';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <LoginForm /> },
  { path: '/register', element: <RegisterForm /> },
]);

const MainRoute: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default MainRoute;
