import RegisterForm from "../../../components/Register/RegisterForm";
import AuthLayout from "../../layouts/AuthLayout";

const RegisterPage = () => (
  <AuthLayout mode='register'>
    <RegisterForm />
  </AuthLayout>
);

export default RegisterPage;