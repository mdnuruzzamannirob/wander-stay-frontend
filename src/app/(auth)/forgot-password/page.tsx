import { ForgotPasswordForm } from '@/components/modules/auth';

export const metadata = {
  title: 'Forgot Password - WanderStay',
  description: 'Forgot your WanderStay account password? Enter your email to reset it.',
};
const ForgotPasswordPage = () => {
  return <ForgotPasswordForm />;
};

export default ForgotPasswordPage;
