import SignUpForm from "@/components/modules/auth/SignUpForm";

export const metadata = {
  title: "Sign Up - WanderStay",
  description:
    "Create a new WanderStay account to start booking your perfect stay and explore exclusive deals.",
};

const SignUpPage = () => {
  return (
    <>
      <SignUpForm />
    </>
  );
};

export default SignUpPage;
