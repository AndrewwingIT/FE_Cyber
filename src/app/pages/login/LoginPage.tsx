import LoginForm from '../../../components/Login/LoginForm';
import AuthLayout from '../../layouts/AuthLayout';

const LoginPage = () => (
  <AuthLayout mode='login'>
    <LoginForm />
  </AuthLayout>
);

export default LoginPage;
