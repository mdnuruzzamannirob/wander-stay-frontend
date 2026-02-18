'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BookingConfirmation from '@/components/modules/checkout/BookingConfirmation';
import BookingConfirmationSkeleton from '@/components/modules/checkout/BookingConfirmationSkeleton';
import { getHotelById } from '@/lib/utils/getHotelById';
import { getDemoRooms } from '@/lib/constants/hotel-details-data';
import type { BookingConfirmationData, GuestDetails, PaymentMethod } from '@/types/checkout';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const [confirmationData, setConfirmationData] = useState<BookingConfirmationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const bookingId = searchParams.get('bookingId') ?? 'BK-0000000000';
  const hotelId = searchParams.get('hotelId') ?? 'h1';
  const roomId = searchParams.get('roomId');
  const urlCheckIn = searchParams.get('checkIn') ?? '';
  const urlCheckOut = searchParams.get('checkOut') ?? '';
  const urlGuests = parseInt(searchParams.get('guests') ?? '2', 10);
  const urlNights = parseInt(searchParams.get('nights') ?? '0', 10);

  useEffect(() => {
    const hotel = getHotelById(hotelId);
    if (!hotel) {
      setIsLoading(false);
      return;
    }

    const rooms = getDemoRooms(hotel.id, hotel.price);
    const room = roomId ? (rooms.find((r) => r.id === roomId) ?? rooms[0]) : rooms[0];

    // Try to read actual form data from sessionStorage
    let guest: GuestDetails = {
      firstName: 'Guest',
      lastName: '',
      email: '',
      phone: '',
      specialRequests: '',
    };
    let paymentMethod: PaymentMethod = 'credit-card';
    let checkInStr = urlCheckIn;
    let checkOutStr = urlCheckOut;
    let nights = urlNights;
    let guests = urlGuests;

    try {
      const stored = sessionStorage.getItem('bookingConfirmation');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.guest) guest = parsed.guest;
        if (parsed.paymentMethod) paymentMethod = parsed.paymentMethod;
        if (parsed.booking?.dates) {
          checkInStr = checkInStr || parsed.booking.dates.checkIn;
          checkOutStr = checkOutStr || parsed.booking.dates.checkOut;
          nights = nights || parsed.booking.dates.nights;
        }
        if (parsed.booking?.guests) guests = guests || parsed.booking.guests;
        // Clean up after reading
        sessionStorage.removeItem('bookingConfirmation');
      }
    } catch {
      // sessionStorage unavailable — use defaults
    }

    // Fallback date calculation
    if (!nights || nights <= 0) {
      if (checkInStr && checkOutStr) {
        const inDate = new Date(checkInStr);
        const outDate = new Date(checkOutStr);
        nights = Math.max(
          1,
          Math.ceil((outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24)),
        );
      } else {
        nights = 3;
      }
    }

    // Format dates for display
    const formatDisplayDate = (dateStr: string) => {
      if (!dateStr) return 'N/A';
      try {
        return new Date(dateStr).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        });
      } catch {
        return dateStr;
      }
    };

    const subtotal = room.price * nights;
    const taxes = Math.round(subtotal * 0.12);
    const serviceFee = Math.round(subtotal * 0.05);
    const total = subtotal + taxes + serviceFee;

    setConfirmationData({
      bookingId,
      status: 'confirmed',
      guest,
      booking: {
        hotelId: hotel.id,
        hotelName: hotel.name,
        hotelImage: hotel.image,
        hotelCity: hotel.city,
        hotelCountry: hotel.country,
        hotelRating: hotel.rating,
        room,
        dates: {
          checkIn: formatDisplayDate(checkInStr),
          checkOut: formatDisplayDate(checkOutStr),
          nights,
        },
        guests,
        subtotal,
        taxes,
        serviceFee,
        total,
      },
      paymentMethod,
      confirmedAt: new Date().toISOString(),
    });

    setIsLoading(false);
  }, [bookingId, hotelId, roomId, urlCheckIn, urlCheckOut, urlGuests, urlNights]);

  if (isLoading) return <BookingConfirmationSkeleton />;

  if (!confirmationData) {
    return (
      <div className="app-container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <h2 className="text-xl font-bold">Booking not found</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          We couldn&apos;t find the booking you&apos;re looking for.
        </p>
      </div>
    );
  }

  return <BookingConfirmation data={confirmationData} />;
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={<BookingConfirmationSkeleton />}>
      <ConfirmationContent />
    </Suspense>
  );
}
