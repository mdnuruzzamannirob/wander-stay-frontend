'use client';

import Image from 'next/image';
import { Calendar, Clock, MapPin, Star, Users, Shield, BadgeCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import type { BookingSummaryData } from '@/types/checkout';

type BookingSummaryProps = {
  data: BookingSummaryData;
};

export default function BookingSummary({ data }: BookingSummaryProps) {
  return (
    <div className="rounded-2xl border bg-white">
      {/* Hotel Preview */}
      <div className="relative h-44 w-full overflow-hidden rounded-t-2xl">
        <Image
          src={data.hotelImage}
          alt={data.hotelName}
          fill
          sizes="(max-width: 1024px) 100vw, 400px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <div className="absolute right-4 bottom-4 left-4">
          <h3 className="text-lg font-bold text-white">{data.hotelName}</h3>
          <div className="mt-1 flex items-center gap-2 text-xs text-white/90">
            <MapPin className="size-3" />
            <span>
              {data.hotelCity}, {data.hotelCountry}
            </span>
            <span className="text-white/50">|</span>
            <Star className="size-3 fill-amber-400 text-amber-400" />
            <span>{data.hotelRating}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        {/* Room Info */}
        <div>
          <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
            Room Type
          </p>
          <p className="mt-1 text-sm font-semibold">{data.room.name}</p>
          <div className="text-muted-foreground mt-1.5 flex flex-wrap items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1">
              <Users className="size-3" /> Up to {data.room.maxGuests}
            </span>
            <span>{data.room.bedType}</span>
          </div>
        </div>

        <Separator />

        {/* Dates & Guests */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
              Check-in
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
              <Calendar className="text-primary size-3.5" />
              {data.dates.checkIn}
            </p>
            <p className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-[11px]">
              <Clock className="size-3" /> 3:00 PM
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
              Check-out
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
              <Calendar className="text-primary size-3.5" />
              {data.dates.checkOut}
            </p>
            <p className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-[11px]">
              <Clock className="size-3" /> 11:00 AM
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div>
            <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
              Duration
            </p>
            <p className="mt-1 font-semibold">
              {data.dates.nights} night{data.dates.nights > 1 ? 's' : ''}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
              Guests
            </p>
            <p className="mt-1 font-semibold">
              {data.guests} guest{data.guests > 1 ? 's' : ''}
            </p>
          </div>
        </div>

        <Separator />

        {/* Price Breakdown */}
        <div className="space-y-2.5">
          <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
            Price Details
          </p>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              ${data.room.price} × {data.dates.nights} night{data.dates.nights > 1 ? 's' : ''}
            </span>
            <span className="font-medium">${data.subtotal}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Taxes & fees</span>
            <span className="font-medium">${data.taxes}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Service fee</span>
            <span className="font-medium">${data.serviceFee}</span>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-base font-bold">Total</span>
            <span className="text-xl font-extrabold tracking-tight">${data.total}</span>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="space-y-2 rounded-xl border border-emerald-100 bg-emerald-50/40 p-3">
          {data.room.freeCancellation && (
            <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-700">
              <BadgeCheck className="size-3.5" />
              Free cancellation before check-in
            </div>
          )}
          <div className="flex items-center gap-2 text-[11px] font-semibold text-emerald-700">
            <Shield className="size-3.5" />
            Secure SSL encrypted payment
          </div>
        </div>
      </div>
    </div>
  );
}
