import type { Hotel } from '@/types/hotel';
import { HOTELS } from './hotels-data';
import { getDemoRooms, type HotelRoom } from './hotel-details-data';

/* ─── Booking status types ─── */
export type BookingStatus = 'confirmed' | 'checked-in' | 'completed' | 'cancelled' | 'no-show';

/* ─── Single booking entity ─── */
export type Booking = {
  id: string;
  hotel: Pick<Hotel, 'id' | 'name' | 'city' | 'country' | 'image' | 'rating' | 'reviews'>;
  room: Pick<HotelRoom, 'id' | 'name' | 'bedType' | 'maxGuests' | 'size' | 'price'>;
  checkIn: string; // ISO date
  checkOut: string; // ISO date
  nights: number;
  guests: number;
  status: BookingStatus;
  guestName: string;
  guestEmail: string;
  paymentMethod: 'credit-card' | 'debit-card' | 'paypal';
  subtotal: number;
  taxes: number;
  serviceFee: number;
  total: number;
  bookedAt: string; // ISO timestamp
  cancellable: boolean;
};

/* ─── Helpers ─── */
function pickHotel(hotel: Hotel) {
  return {
    id: hotel.id,
    name: hotel.name,
    city: hotel.city,
    country: hotel.country,
    image: hotel.image,
    rating: hotel.rating,
    reviews: hotel.reviews,
  };
}

function pickRoom(room: HotelRoom) {
  return {
    id: room.id,
    name: room.name,
    bedType: room.bedType,
    maxGuests: room.maxGuests,
    size: room.size,
    price: room.price,
  };
}

function buildBooking(
  id: string,
  hotel: Hotel,
  roomIndex: number,
  checkIn: string,
  checkOut: string,
  nights: number,
  guests: number,
  status: BookingStatus,
  bookedAt: string,
  cancellable: boolean,
): Booking {
  const rooms = getDemoRooms(hotel.id, hotel.price);
  const room = rooms[roomIndex] ?? rooms[0];
  const subtotal = room.price * nights;
  const taxes = Math.round(subtotal * 0.12);
  const serviceFee = Math.round(subtotal * 0.05);
  return {
    id,
    hotel: pickHotel(hotel),
    room: pickRoom(room),
    checkIn,
    checkOut,
    nights,
    guests,
    status,
    guestName: 'John Doe',
    guestEmail: 'john@gmail.com',
    paymentMethod: 'credit-card',
    subtotal,
    taxes,
    serviceFee,
    total: subtotal + taxes + serviceFee,
    bookedAt,
    cancellable,
  };
}

/* ─── Active bookings (upcoming & checked-in) ─── */
export const ACTIVE_BOOKINGS: Booking[] = [
  buildBooking(
    'BK-20260310001',
    HOTELS[0],
    1,
    '2026-03-10',
    '2026-03-14',
    4,
    2,
    'confirmed',
    '2026-02-15T09:30:00Z',
    true,
  ),
  buildBooking(
    'BK-20260318002',
    HOTELS[2],
    0,
    '2026-03-18',
    '2026-03-21',
    3,
    3,
    'confirmed',
    '2026-02-16T14:12:00Z',
    true,
  ),
  buildBooking(
    'BK-20260220003',
    HOTELS[4 % HOTELS.length],
    2,
    '2026-02-20',
    '2026-02-25',
    5,
    2,
    'checked-in',
    '2026-02-01T11:00:00Z',
    false,
  ),
];

/* ─── Past bookings (completed, cancelled, no-show) ─── */
export const PAST_BOOKINGS: Booking[] = [
  buildBooking(
    'BK-20260105004',
    HOTELS[1],
    0,
    '2026-01-05',
    '2026-01-09',
    4,
    2,
    'completed',
    '2025-12-20T08:00:00Z',
    false,
  ),
  buildBooking(
    'BK-20251218005',
    HOTELS[3 % HOTELS.length],
    1,
    '2025-12-18',
    '2025-12-22',
    4,
    2,
    'completed',
    '2025-12-01T16:40:00Z',
    false,
  ),
  buildBooking(
    'BK-20251130006',
    HOTELS[5 % HOTELS.length],
    0,
    '2025-11-30',
    '2025-12-03',
    3,
    1,
    'cancelled',
    '2025-11-15T10:20:00Z',
    false,
  ),
  buildBooking(
    'BK-20251010007',
    HOTELS[6 % HOTELS.length],
    2,
    '2025-10-10',
    '2025-10-13',
    3,
    4,
    'completed',
    '2025-09-28T12:30:00Z',
    false,
  ),
  buildBooking(
    'BK-20250905008',
    HOTELS[7 % HOTELS.length],
    0,
    '2025-09-05',
    '2025-09-08',
    3,
    2,
    'no-show',
    '2025-08-20T07:15:00Z',
    false,
  ),
  buildBooking(
    'BK-20250720009',
    HOTELS[8 % HOTELS.length],
    1,
    '2025-07-20',
    '2025-07-25',
    5,
    2,
    'completed',
    '2025-07-05T18:00:00Z',
    false,
  ),
  buildBooking(
    'BK-20250610010',
    HOTELS[9 % HOTELS.length],
    0,
    '2025-06-10',
    '2025-06-14',
    4,
    3,
    'completed',
    '2025-05-25T09:45:00Z',
    false,
  ),
];
