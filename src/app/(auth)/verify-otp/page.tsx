import VerifyOtpForm from "@/components/modules/auth/VerifyOtpForm";

export const metadata = {
  title: "Verify Otp - WanderStay",
  description: "Verify your OTP to complete the account verification process.",
};
const VerifyOtpPage = () => {
  return (
    <>
      <VerifyOtpForm />
    </>
  );
};

export default VerifyOtpPage;
