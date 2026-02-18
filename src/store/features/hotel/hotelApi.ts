import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../baseQuery';

// ─── Types ─────────────────────────────────────────────
export type HotelSearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  rooms?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  amenities?: string[];
  propertyTypes?: string[];
  freeCancellation?: boolean;
  payLater?: boolean;
};

export type HotelListResponse = {
  success: boolean;
  data: {
    hotels: any[];
    total: number;
    page: number;
    totalPages: number;
  };
};

export type HotelDetailResponse = {
  success: boolean;
  data: {
    hotel: any;
    rooms: any[];
    reviews: any[];
    gallery: string[];
    policies: any;
    nearbyAttractions: any[];
  };
};

export type HotelReviewsParams = {
  hotelId: string;
  page?: number;
  limit?: number;
};

// ─── API ───────────────────────────────────────────────
export const hotelApi = createApi({
  reducerPath: 'hotelApi',
  baseQuery,
  tagTypes: ['Hotels', 'HotelDetail', 'Reviews'],
  endpoints: (builder) => ({
    // Search & list hotels
    searchHotels: builder.query<HotelListResponse, HotelSearchParams>({
      query: (params) => ({
        url: '/hotels',
        params,
      }),
      providesTags: ['Hotels'],
    }),

    // Get single hotel detail
    getHotelById: builder.query<HotelDetailResponse, string>({
      query: (id) => `/hotels/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'HotelDetail', id }],
    }),

    // Get hotel reviews
    getHotelReviews: builder.query<any, HotelReviewsParams>({
      query: ({ hotelId, ...params }) => ({
        url: `/hotels/${hotelId}/reviews`,
        params,
      }),
      providesTags: (_result, _error, { hotelId }) => [{ type: 'Reviews', id: hotelId }],
    }),

    // Submit a review
    submitReview: builder.mutation<
      any,
      { hotelId: string; rating: number; title: string; comment: string }
    >({
      query: ({ hotelId, ...body }) => ({
        url: `/hotels/${hotelId}/reviews`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_result, _error, { hotelId }) => [{ type: 'Reviews', id: hotelId }],
    }),

    // Check room availability
    checkAvailability: builder.query<
      any,
      { hotelId: string; checkIn: string; checkOut: string; guests: number }
    >({
      query: ({ hotelId, ...params }) => ({
        url: `/hotels/${hotelId}/availability`,
        params,
      }),
    }),
  }),
});

export const {
  useSearchHotelsQuery,
  useGetHotelByIdQuery,
  useGetHotelReviewsQuery,
  useSubmitReviewMutation,
  useCheckAvailabilityQuery,
} = hotelApi;
