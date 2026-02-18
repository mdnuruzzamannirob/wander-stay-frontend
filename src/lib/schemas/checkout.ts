import { z } from 'zod';

export const guestDetailsSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^\+?[\d\s\-()]{7,20}$/, 'Invalid phone number'),
  specialRequests: z
    .string()
    .max(500, 'Special requests must be less than 500 characters')
    .optional(),
});

export const checkoutSchema = guestDetailsSchema.extend({
  paymentMethod: z.enum(['credit-card', 'debit-card', 'paypal'], {
    message: 'Please select a payment method',
  }),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

export type GuestDetailsFormData = z.infer<typeof guestDetailsSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
