import type { HotelRoom } from '@/lib/constants/hotel-details-data';

export type PaymentMethod = 'credit-card' | 'debit-card' | 'paypal';

export type GuestDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
};

export type BookingDates = {
  checkIn: string;
  checkOut: string;
  nights: number;
};

export type BookingSummaryData = {
  hotelId: string;
  hotelName: string;
  hotelImage: string;
  hotelCity: string;
  hotelCountry: string;
  hotelRating: number;
  room: HotelRoom;
  dates: BookingDates;
  guests: number;
  subtotal: number;
  taxes: number;
  serviceFee: number;
  total: number;
};

export type CheckoutState = {
  guest: GuestDetails;
  paymentMethod: PaymentMethod;
  booking: BookingSummaryData | null;
  agreeToTerms: boolean;
};

export type BookingConfirmationData = {
  bookingId: string;
  status: 'confirmed' | 'pending';
  guest: GuestDetails;
  booking: BookingSummaryData;
  paymentMethod: PaymentMethod;
  confirmedAt: string;
};
