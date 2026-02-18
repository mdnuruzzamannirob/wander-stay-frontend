'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  BadgeCheck,
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  Download,
  MapPin,
  Star,
  Users,
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { BookingConfirmationData } from '@/types/checkout';

type BookingConfirmationProps = {
  data: BookingConfirmationData;
};

export default function BookingConfirmation({ data }: BookingConfirmationProps) {
  const { booking, guest, bookingId, confirmedAt } = data;

  const copyBookingId = () => {
    navigator.clipboard.writeText(bookingId);
    toast.success('Booking ID copied to clipboard');
  };

  return (
    <div className="app-container py-8 md:py-12">
      {/* ---- Success Header ---- */}
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="size-10 text-emerald-500" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Booking Confirmed!</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Your reservation has been successfully confirmed. A confirmation email has been sent to{' '}
          <span className="text-foreground font-semibold">{guest.email}</span>.
        </p>

        {/* Booking ID */}
        <div className="mt-5 inline-flex items-center gap-3 rounded-full border bg-gray-50 px-5 py-2.5">
          <span className="text-muted-foreground text-xs font-medium">Booking ID</span>
          <span className="text-sm font-bold tracking-wide">{bookingId}</span>
          <button
            onClick={copyBookingId}
            className="text-muted-foreground hover:text-primary transition"
            aria-label="Copy booking ID"
          >
            <Copy className="size-3.5" />
          </button>
        </div>
      </div>

      {/* ---- Booking Details Card ---- */}
      <div className="mx-auto mt-10 max-w-3xl">
        <div className="overflow-hidden rounded-2xl border bg-white">
          {/* Hotel Image Header */}
          <div className="relative h-48 w-full sm:h-56">
            <Image
              src={booking.hotelImage}
              alt={booking.hotelName}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute right-5 bottom-5 left-5">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="rounded-full bg-emerald-500 px-2.5 py-0.5 text-[10px] font-bold text-white uppercase">
                  Confirmed
                </span>
              </div>
              <h2 className="text-xl font-bold text-white sm:text-2xl">{booking.hotelName}</h2>
              <div className="mt-1 flex items-center gap-2 text-xs text-white/80">
                <MapPin className="size-3" />
                <span>
                  {booking.hotelCity}, {booking.hotelCountry}
                </span>
                <span className="text-white/40">|</span>
                <Star className="size-3 fill-amber-400 text-amber-400" />
                <span>{booking.hotelRating}</span>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            {/* Room & Guest Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Room Details */}
              <div className="space-y-3">
                <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                  Room Details
                </p>
                <div className="space-y-2 rounded-xl border bg-gray-50/60 p-4">
                  <p className="text-sm font-semibold">{booking.room.name}</p>
                  <div className="text-muted-foreground space-y-1 text-xs">
                    <p className="flex items-center gap-1.5">
                      <Users className="size-3" /> Up to {booking.room.maxGuests} guests
                    </p>
                    <p>{booking.room.bedType}</p>
                    <p>{booking.room.size} m²</p>
                  </div>
                  {booking.room.breakfastIncluded && (
                    <span className="inline-block rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-semibold text-amber-700">
                      Breakfast incl.
                    </span>
                  )}
                </div>
              </div>

              {/* Guest Details */}
              <div className="space-y-3">
                <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                  Guest Information
                </p>
                <div className="space-y-2 rounded-xl border bg-gray-50/60 p-4 text-sm">
                  <p className="font-semibold">
                    {guest.firstName} {guest.lastName}
                  </p>
                  <p className="text-muted-foreground text-xs">{guest.email}</p>
                  <p className="text-muted-foreground text-xs">{guest.phone}</p>
                  {guest.specialRequests && (
                    <div className="mt-2 rounded-lg border border-dashed border-gray-200 bg-white p-2.5">
                      <p className="text-muted-foreground text-[10px] font-semibold uppercase">
                        Special Requests
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs">{guest.specialRequests}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Dates & Duration */}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              <div>
                <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                  Check-in
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
                  <Calendar className="text-primary size-3.5" />
                  {booking.dates.checkIn}
                </p>
                <p className="text-muted-foreground mt-0.5 flex items-center gap-1 text-[11px]">
                  <Clock className="size-3" /> 3:00 PM
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                  Check-out
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold">
                  <Calendar className="text-primary size-3.5" />
                  {booking.dates.checkOut}
                </p>
                <p className="text-muted-foreground mt-0.5 flex items-center gap-1 text-[11px]">
                  <Clock className="size-3" /> 11:00 AM
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                  Duration
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {booking.dates.nights} night{booking.dates.nights > 1 ? 's' : ''}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                  Guests
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Payment Summary */}
            <div>
              <p className="text-muted-foreground mb-3 text-[10px] font-bold tracking-wider uppercase">
                Payment Summary
              </p>
              <div className="space-y-2.5 rounded-xl border bg-gray-50/60 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    ${booking.room.price} × {booking.dates.nights} night
                    {booking.dates.nights > 1 ? 's' : ''}
                  </span>
                  <span className="font-medium">${booking.subtotal}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Taxes & fees</span>
                  <span className="font-medium">${booking.taxes}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Service fee</span>
                  <span className="font-medium">${booking.serviceFee}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold">Total Paid</span>
                  <span className="text-xl font-extrabold tracking-tight">${booking.total}</span>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Confirmation Meta */}
            <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <BadgeCheck className="text-primary size-3.5" />
                <span>
                  Confirmed on{' '}
                  {new Date(confirmedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>Payment: {data.paymentMethod.replace('-', ' ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="outline"
            size="lg"
            className="gap-2 text-sm"
            aria-label="Download booking confirmation PDF"
          >
            <Download className="size-4" />
            Download Confirmation
          </Button>
          <Link href="/my-bookings">
            <Button size="lg" className="text-sm">
              View My Bookings
            </Button>
          </Link>
        </div>

        {/* Help banner */}
        <div className="mt-8 mb-4 rounded-2xl border bg-gray-50/60 p-6 text-center">
          <h3 className="font-semibold">Need help with your booking?</h3>
          <p className="text-muted-foreground mt-1 text-sm">
            Our support team is available 24/7 to assist you.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link href="/contact-us">
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
            </Link>
            <Link href="/faq">
              <Button variant="ghost" size="sm">
                View FAQ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
