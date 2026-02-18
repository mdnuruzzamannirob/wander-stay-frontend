import Image from 'next/image';
import { BadgeCheck, BedDouble, Clock, Maximize2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { HotelRoom } from '@/lib/constants/hotel-details-data';

type RoomCardProps = {
  room: HotelRoom;
};

export default function RoomCard({ room }: RoomCardProps) {
  const discount = Math.round(((room.originalPrice - room.price) / room.originalPrice) * 100);

  return (
    <div className="group flex h-auto flex-col overflow-hidden rounded-2xl border bg-white sm:h-57.5 sm:flex-row">
      {/* Room Image */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-full sm:w-52 md:w-60">
        <Image
          src={room.image}
          alt={room.name}
          fill
          sizes="(max-width: 640px) 100vw, 240px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold tracking-wide text-white">
            {discount}% OFF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex min-h-0 flex-1 flex-col p-4 sm:py-4 sm:pr-5 sm:pl-4">
        {/* Title & Specs */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-start justify-between gap-3">
            <h4 className="text-base font-bold tracking-tight sm:text-lg">{room.name}</h4>
            {room.breakfastIncluded && (
              <span className="shrink-0 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-semibold text-amber-700">
                Breakfast incl.
              </span>
            )}
          </div>
          <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-[11px] font-medium sm:gap-4 sm:text-xs">
            <span className="flex items-center gap-1.5">
              <Maximize2 className="size-3.5" /> {room.size} m²
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-3.5" /> Up to {room.maxGuests}
            </span>
            <span className="flex items-center gap-1.5">
              <BedDouble className="size-3.5" /> {room.bedType}
            </span>
          </div>
        </div>

        {/* Amenities */}
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {room.amenities.slice(0, 5).map((a) => (
            <span
              key={a}
              className="rounded-full border border-gray-100 bg-gray-50/80 px-2.5 py-0.5 text-[10px] font-semibold text-gray-600 uppercase"
            >
              {a}
            </span>
          ))}
          {room.amenities.length > 5 && (
            <span className="text-muted-foreground self-center text-[10px] font-semibold">
              +{room.amenities.length - 5} more
            </span>
          )}
        </div>

        {/* Features */}
        <div className="mt-2 flex flex-wrap items-center gap-3">
          {room.freeCancellation && (
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
              <Clock className="size-3.5" /> Free Cancellation
            </div>
          )}
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-600">
            <BadgeCheck className="size-3.5" /> Instant Confirmation
          </div>
        </div>

        {/* Footer: Price + Book */}
        <div className="mt-3 flex items-end justify-between gap-4 border-t border-dashed border-gray-200 pt-3 sm:mt-auto">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm line-through">
                ${room.originalPrice}
              </span>
              {discount > 0 && (
                <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-500">
                  SAVE ${room.originalPrice - room.price}
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold tracking-tight sm:text-2xl">
                ${room.price}
              </span>
              <span className="text-muted-foreground text-xs font-medium">/ night</span>
            </div>
          </div>
          <Button className="text-xs font-semibold sm:text-sm">Select Room</Button>
        </div>
      </div>
    </div>
  );
}
