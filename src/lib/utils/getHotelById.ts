import { HOTELS } from '@/lib/constants/hotels-data';

export function getHotelById(id: string) {
  return HOTELS.find((hotel) => hotel.id === id) ?? null;
}
