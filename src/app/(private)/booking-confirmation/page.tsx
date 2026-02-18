'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import BookingConfirmation from '@/components/modules/checkout/BookingConfirmation';
import BookingConfirmationSkeleton from '@/components/modules/checkout/BookingConfirmationSkeleton';
import { getHotelById } from '@/lib/utils/getHotelById';
import { getDemoRooms } from '@/lib/constants/hotel-details-data';
import type { BookingConfirmationData } from '@/types/checkout';

function ConfirmationContent() {
  const searchParams = useSearchParams();

  const bookingId = searchParams.get('bookingId') ?? 'BK-0000000000';
  const hotelId = searchParams.get('hotelId') ?? 'h1';
  const roomId = searchParams.get('roomId');

  const hotel = getHotelById(hotelId);

  if (!hotel) {
    return (
      <div className="app-container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <h2 className="text-xl font-bold">Booking not found</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          We couldn&apos;t find the booking you&apos;re looking for.
        </p>
      </div>
    );
  }

  const rooms = getDemoRooms(hotel.id, hotel.price);
  const room = roomId ? (rooms.find((r) => r.id === roomId) ?? rooms[0]) : rooms[0];

  // Demo data for confirmation
  const nights = 3;
  const subtotal = room.price * nights;
  const taxes = Math.round(subtotal * 0.12);
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + taxes + serviceFee;

  const confirmationData: BookingConfirmationData = {
    bookingId,
    status: 'confirmed',
    guest: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      specialRequests: 'Late check-in requested',
    },
    booking: {
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelImage: hotel.image,
      hotelCity: hotel.city,
      hotelCountry: hotel.country,
      hotelRating: hotel.rating,
      room,
      dates: {
        checkIn: 'Mar 15, 2026',
        checkOut: 'Mar 18, 2026',
        nights,
      },
      guests: 2,
      subtotal,
      taxes,
      serviceFee,
      total,
    },
    paymentMethod: 'credit-card',
    confirmedAt: new Date().toISOString(),
  };

  return <BookingConfirmation data={confirmationData} />;
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<BookingConfirmationSkeleton />}>
      <ConfirmationContent />
    </Suspense>
  );
}
