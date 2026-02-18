import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../baseQuery';
import type {
  BookingConfirmationData,
  BookingSummaryData,
  GuestDetails,
  PaymentMethod,
} from '@/types/checkout';

// ─── Types ─────────────────────────────────────────────
export type CreateBookingRequest = {
  hotelId: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestDetails: GuestDetails;
  paymentMethod: PaymentMethod;
};

export type CreateBookingResponse = {
  success: boolean;
  data: BookingConfirmationData;
};

export type BookingListResponse = {
  success: boolean;
  data: {
    bookings: BookingConfirmationData[];
    total: number;
    page: number;
    totalPages: number;
  };
};

export type BookingDetailResponse = {
  success: boolean;
  data: BookingConfirmationData;
};

// ─── API ───────────────────────────────────────────────
export const bookingApi = createApi({
  reducerPath: 'bookingApi',
  baseQuery,
  tagTypes: ['Bookings', 'BookingDetail'],
  endpoints: (builder) => ({
    // Create a booking
    createBooking: builder.mutation<CreateBookingResponse, CreateBookingRequest>({
      query: (body) => ({
        url: '/bookings',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Bookings'],
    }),

    // Get booking by ID
    getBookingById: builder.query<BookingDetailResponse, string>({
      query: (id) => `/bookings/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'BookingDetail', id }],
    }),

    // List user bookings
    getUserBookings: builder.query<BookingListResponse, { page?: number; limit?: number }>({
      query: (params) => ({
        url: '/bookings',
        params,
      }),
      providesTags: ['Bookings'],
    }),

    // Cancel a booking
    cancelBooking: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/bookings/${id}/cancel`,
        method: 'PATCH',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'BookingDetail', id }, 'Bookings'],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingByIdQuery,
  useGetUserBookingsQuery,
  useCancelBookingMutation,
} = bookingApi;
