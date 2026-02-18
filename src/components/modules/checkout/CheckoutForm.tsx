'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Check, ChevronRight, User, CreditCard, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import ButtonComp from '@/components/shared/ButtonComp';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { checkoutSchema, type CheckoutFormData } from '@/lib/schemas/checkout';
import type { BookingSummaryData, PaymentMethod } from '@/types/checkout';
import BookingSummary from './BookingSummary';
import PaymentMethodSelector from './PaymentMethodSelector';

/* ---------- Progress steps ---------- */
const STEPS = [
  { label: 'Guest Details', icon: User },
  { label: 'Payment', icon: CreditCard },
  { label: 'Confirm', icon: CheckCircle2 },
] as const;

/* --- Horizontal stepper (desktop) — top center above form --- */
function DesktopSteps({ current }: { current: number }) {
  return (
    <nav aria-label="Checkout progress" className="mb-8 hidden w-full md:block">
      <div className="relative flex items-start justify-between">
        {/* Connector lines (absolute behind circles) */}
        <div className="absolute top-5 right-5 left-5 flex -translate-y-1/2">
          <div
            className={`h-0.5 flex-1 rounded-full transition-colors ${
              current > 0 ? 'bg-primary' : 'bg-gray-200'
            }`}
          />
          <div
            className={`h-0.5 flex-1 rounded-full transition-colors ${
              current > 1 ? 'bg-primary' : 'bg-gray-200'
            }`}
          />
        </div>

        {STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isCompleted = idx < current;
          const isCurrent = idx === current;
          return (
            <div
              key={step.label}
              className="relative z-10 flex flex-col items-center gap-1.5"
              aria-current={isCurrent ? 'step' : undefined}
            >
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-full border-2 bg-white transition-all ${
                  isCurrent
                    ? 'border-primary bg-primary shadow-primary/25 text-primary shadow-md'
                    : isCompleted
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 bg-gray-50 text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <Check className="size-4" strokeWidth={3} />
                ) : (
                  <Icon className="size-4" />
                )}
              </div>
              <div className="text-center">
                <p
                  className={`text-xs font-semibold transition-colors ${
                    isCurrent
                      ? 'text-primary'
                      : isCompleted
                        ? 'text-primary/70'
                        : 'text-muted-foreground'
                  }`}
                >
                  {step.label}
                </p>
                <p className="text-muted-foreground text-[10px]">
                  {isCompleted ? 'Completed' : isCurrent ? 'In progress' : `Step ${idx + 1}`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

/* --- Horizontal stepper (mobile) --- */
function MobileSteps({ current }: { current: number }) {
  return (
    <nav
      aria-label="Checkout progress"
      className="mb-6 flex items-center justify-between gap-2 md:hidden"
    >
      {STEPS.map((step, idx) => {
        const Icon = step.icon;
        const isCompleted = idx < current;
        const isCurrent = idx === current;
        return (
          <div key={step.label} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="flex w-full items-center">
              {idx > 0 && (
                <div
                  className={`h-0.5 flex-1 rounded-full ${
                    isCompleted || isCurrent ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              )}
              <div
                className={`flex size-8 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  isCurrent
                    ? 'border-primary bg-primary text-white'
                    : isCompleted
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-gray-200 bg-gray-50 text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <Check className="size-3.5" strokeWidth={3} />
                ) : (
                  <Icon className="size-3.5" />
                )}
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={`h-0.5 flex-1 rounded-full ${
                    isCompleted ? 'bg-primary' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
            <span
              className={`text-[10px] font-semibold ${
                isCurrent
                  ? 'text-primary'
                  : isCompleted
                    ? 'text-primary/70'
                    : 'text-muted-foreground'
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </nav>
  );
}

/* ---------- Field wrapper ---------- */
function FormField({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-muted-foreground mb-1 block text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <div className="mt-1 flex items-center gap-1 text-xs text-red-500" role="alert">
          <AlertCircle size={14} />
          {error}
        </div>
      )}
    </div>
  );
}

/* ---------- Main form component ---------- */
type CheckoutFormProps = {
  bookingData: BookingSummaryData;
};

export default function CheckoutForm({ bookingData }: CheckoutFormProps) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema as any),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      specialRequests: '',
      paymentMethod: undefined,
      agreeToTerms: false,
    },
  });

  const inputClasses =
    'border-gray-200 focus:bg-gray-50/50 h-11 w-full rounded-md border px-4 text-sm transition-all outline-none placeholder:text-slate-400 focus:ring-1 focus:ring-slate-300 disabled:cursor-not-allowed disabled:opacity-50';

  /* Navigate between steps */
  const handleNext = async () => {
    if (step === 0) {
      const valid = await trigger(['firstName', 'lastName', 'email', 'phone']);
      if (valid) setStep(1);
    } else if (step === 1) {
      const valid = await trigger(['paymentMethod']);
      if (valid) setStep(2);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  /* Final submit */
  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);
    try {
      // Simulate API call — replace with actual createBooking mutation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Store form data in sessionStorage for confirmation page
      const confirmationPayload = {
        guest: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          specialRequests: data.specialRequests || '',
        },
        booking: bookingData,
        paymentMethod: data.paymentMethod,
      };
      sessionStorage.setItem('bookingConfirmation', JSON.stringify(confirmationPayload));

      toast.success('Booking confirmed successfully!');

      const params = new URLSearchParams();
      params.set('bookingId', `BK-${Date.now()}`);
      params.set('hotelId', bookingData.hotelId);
      params.set('roomId', bookingData.room.id);
      params.set('checkIn', bookingData.dates.checkIn);
      params.set('checkOut', bookingData.dates.checkOut);
      params.set('guests', String(bookingData.guests));
      params.set('nights', String(bookingData.dates.nights));

      router.push(`/booking-confirmation?${params.toString()}`);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center gap-1.5 text-sm">
        <Link href="/" className="text-muted-foreground hover:text-primary transition">
          Home
        </Link>
        <ChevronRight className="text-muted-foreground size-3.5" />
        <Link href="/hotels" className="text-muted-foreground hover:text-primary transition">
          Hotels
        </Link>
        <ChevronRight className="text-muted-foreground size-3.5" />
        <Link
          href={`/hotels/${bookingData.hotelId}`}
          className="text-muted-foreground hover:text-primary transition"
        >
          {bookingData.hotelName}
        </Link>
        <ChevronRight className="text-muted-foreground size-3.5" />
        <span className="text-foreground font-medium">Checkout</span>
      </nav>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Complete Your Booking</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          You&apos;re just a few steps away from securing your stay
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Mobile: Booking card on top + mobile steps */}
        <div className="mb-6 lg:hidden">
          <BookingSummary data={bookingData} />
        </div>
        <MobileSteps current={step} />

        <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,340px)]">
          {/* ---- Left Column ---- */}
          <div className="min-w-0 space-y-6">
            {/* Steps — centered inside left column */}
            <DesktopSteps current={step} />

            {/* Step 0: Guest Details */}
            {step === 0 && (
              <div className="rounded-2xl border bg-white p-6">
                <div className="mb-5 flex items-center gap-2">
                  <User className="text-primary size-5" />
                  <h2 className="text-lg font-bold tracking-tight">Guest Details</h2>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    label="First Name"
                    htmlFor="firstName"
                    error={errors.firstName?.message}
                    required
                  >
                    <input
                      {...register('firstName')}
                      id="firstName"
                      placeholder="John"
                      disabled={isProcessing}
                      className={inputClasses}
                    />
                  </FormField>

                  <FormField
                    label="Last Name"
                    htmlFor="lastName"
                    error={errors.lastName?.message}
                    required
                  >
                    <input
                      {...register('lastName')}
                      id="lastName"
                      placeholder="Doe"
                      disabled={isProcessing}
                      className={inputClasses}
                    />
                  </FormField>

                  <FormField label="Email" htmlFor="email" error={errors.email?.message} required>
                    <input
                      {...register('email')}
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      disabled={isProcessing}
                      className={inputClasses}
                    />
                  </FormField>

                  <FormField
                    label="Phone Number"
                    htmlFor="phone"
                    error={errors.phone?.message}
                    required
                  >
                    <input
                      {...register('phone')}
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      disabled={isProcessing}
                      className={inputClasses}
                    />
                  </FormField>
                </div>

                <div className="mt-4">
                  <FormField
                    label="Special Requests"
                    htmlFor="specialRequests"
                    error={errors.specialRequests?.message}
                  >
                    <Textarea
                      {...register('specialRequests')}
                      id="specialRequests"
                      placeholder="Any special requirements? (e.g., early check-in, extra pillows, accessibility needs)"
                      rows={3}
                      disabled={isProcessing}
                      className="resize-none text-sm"
                    />
                  </FormField>
                </div>
              </div>
            )}

            {/* Step 1: Payment Method */}
            {step === 1 && (
              <div className="rounded-2xl border bg-white p-6">
                <div className="mb-5 flex items-center gap-2">
                  <CreditCard className="text-primary size-5" />
                  <h2 className="text-lg font-bold tracking-tight">Payment Method</h2>
                </div>

                <Controller
                  name="paymentMethod"
                  control={control}
                  render={({ field }) => (
                    <PaymentMethodSelector
                      value={field.value as PaymentMethod | undefined}
                      onChange={field.onChange}
                      error={errors.paymentMethod?.message}
                    />
                  )}
                />

                {/* Placeholder for card form (future integration) */}
                <div className="mt-5 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-6 text-center">
                  <p className="text-muted-foreground text-sm">
                    Payment details form will be integrated with your payment gateway.
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">(Stripe, PayPal, or similar)</p>
                </div>
              </div>
            )}

            {/* Step 2: Review & Confirm */}
            {step === 2 && (
              <div className="rounded-2xl border bg-white p-6">
                <div className="mb-5 flex items-center gap-2">
                  <CheckCircle2 className="text-primary size-5" />
                  <h2 className="text-lg font-bold tracking-tight">Review & Confirm</h2>
                </div>

                <div className="space-y-4">
                  {/* Summary */}
                  <div className="rounded-xl border bg-gray-50/60 p-4">
                    <p className="text-sm font-semibold">Booking Summary</p>
                    <div className="text-muted-foreground mt-2 space-y-1.5 text-sm">
                      <p>
                        <span className="text-foreground font-medium">{bookingData.hotelName}</span>{' '}
                        — {bookingData.room.name}
                      </p>
                      <p>
                        {bookingData.dates.checkIn} → {bookingData.dates.checkOut} (
                        {bookingData.dates.nights} night{bookingData.dates.nights > 1 ? 's' : ''})
                      </p>
                      <p>
                        {bookingData.guests} guest{bookingData.guests > 1 ? 's' : ''} · Total:{' '}
                        <span className="text-foreground font-bold">${bookingData.total}</span>
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Terms agreement */}
                  <Controller
                    name="agreeToTerms"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-1">
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id="agreeToTerms"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isProcessing}
                            className="mt-0.5"
                            aria-describedby="terms-error"
                          />
                          <label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
                            I agree to the{' '}
                            <Link
                              href="/terms-condition"
                              className="text-primary font-medium hover:underline"
                            >
                              Terms & Conditions
                            </Link>
                            ,{' '}
                            <Link
                              href="/privacy-policy"
                              className="text-primary font-medium hover:underline"
                            >
                              Privacy Policy
                            </Link>
                            , and{' '}
                            <Link
                              href="/cancellation-policy"
                              className="text-primary font-medium hover:underline"
                            >
                              Cancellation Policy
                            </Link>
                          </label>
                        </div>
                        {errors.agreeToTerms && (
                          <p id="terms-error" className="ml-8 text-xs text-red-500" role="alert">
                            {errors.agreeToTerms.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4">
              {step > 0 ? (
                <ButtonComp
                  type="button"
                  variant="outline"
                  loading={false}
                  onClick={handleBack}
                  disabled={isProcessing}
                  className="px-6"
                >
                  Back
                </ButtonComp>
              ) : (
                <div />
              )}

              {step < 2 ? (
                <ButtonComp type="button" loading={false} onClick={handleNext} className="px-8">
                  Continue
                </ButtonComp>
              ) : (
                <ButtonComp
                  type="submit"
                  loading={isProcessing}
                  loadingText="Processing booking..."
                  className="px-8"
                >
                  Confirm & Pay ${bookingData.total}
                </ButtonComp>
              )}
            </div>
          </div>

          {/* ---- Right Sidebar (desktop only) ---- */}
          <aside className="hidden lg:sticky lg:top-25 lg:block lg:self-start">
            <BookingSummary data={bookingData} />
          </aside>
        </div>
      </form>
    </div>
  );
}
