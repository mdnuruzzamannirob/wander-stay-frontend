'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CheckoutForm from '@/components/modules/checkout/CheckoutForm';
import CheckoutSkeleton from '@/components/modules/checkout/CheckoutSkeleton';
import { getHotelById } from '@/lib/utils/getHotelById';
import { getDemoRooms } from '@/lib/constants/hotel-details-data';
import type { BookingSummaryData } from '@/types/checkout';

function CheckoutContent() {
  const searchParams = useSearchParams();

  const hotelId = searchParams.get('hotelId') ?? 'h1';
  const roomId = searchParams.get('roomId');
  const checkIn = searchParams.get('checkIn') ?? '2026-03-15';
  const checkOut = searchParams.get('checkOut') ?? '2026-03-18';
  const guests = parseInt(searchParams.get('guests') ?? '2', 10);

  const hotel = getHotelById(hotelId);

  if (!hotel) {
    return (
      <div className="app-container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <h2 className="text-xl font-bold">Hotel not found</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          The hotel you&apos;re trying to book doesn&apos;t exist.
        </p>
      </div>
    );
  }

  const rooms = getDemoRooms(hotel.id, hotel.price);
  const room = roomId ? (rooms.find((r) => r.id === roomId) ?? rooms[0]) : rooms[0];

  // Calculate dates
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.max(
    1,
    Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)),
  );

  // Calculate pricing
  const subtotal = room.price * nights;
  const taxes = Math.round(subtotal * 0.12);
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + taxes + serviceFee;

  const bookingData: BookingSummaryData = {
    hotelId: hotel.id,
    hotelName: hotel.name,
    hotelImage: hotel.image,
    hotelCity: hotel.city,
    hotelCountry: hotel.country,
    hotelRating: hotel.rating,
    room,
    dates: {
      checkIn: checkInDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      checkOut: checkOutDate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      nights,
    },
    guests,
    subtotal,
    taxes,
    serviceFee,
    total,
  };

  return (
    <div className="app-container py-8 md:py-10">
      <CheckoutForm bookingData={bookingData} />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      <CheckoutContent />
    </Suspense>
  );
}
