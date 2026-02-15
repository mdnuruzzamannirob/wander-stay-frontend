import SignInForm from "@/components/modules/auth/SignInForm";

export const metadata = {
  title: "Sign In - WanderStay",
  description:
    "Sign in to your WanderStay account to manage your bookings and explore new stays.",
};

const SignInPage = () => {
  return (
    <>
      <SignInForm />
    </>
  );
};

export default SignInPage;
