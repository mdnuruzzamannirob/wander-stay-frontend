import LoginForm from '@/components/modules/auth/LoginForm';

export const metadata = {
  title: 'Login - WanderStay',
  description: 'Login to your WanderStay account to manage your bookings and explore new stays.',
};

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
