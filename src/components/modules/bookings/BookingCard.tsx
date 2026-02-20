'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  BadgeCheck,
  Bed,
  Calendar,
  CheckCircle2,
  CreditCard,
  MapPin,
  Moon,
  Star,
  Users,
  XCircle,
  AlertCircle,
  Clock,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Booking, BookingStatus } from '@/lib/constants/bookings-data';

/* ─── Status badge styling ─── */
const statusConfig: Record<
  BookingStatus,
  { label: string; className: string; bgClassName: string; icon: React.ReactNode }
> = {
  confirmed: {
    label: 'Confirmed',
    className: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    bgClassName: 'border-l-emerald-500',
    icon: <CheckCircle2 className="size-3.5" />,
  },
  'checked-in': {
    label: 'Checked In',
    className: 'bg-blue-100 text-blue-700 border-blue-200',
    bgClassName: 'border-l-blue-500',
    icon: <Clock className="size-3.5" />,
  },
  completed: {
    label: 'Completed',
    className: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    bgClassName: 'border-l-emerald-500',
    icon: <BadgeCheck className="size-3.5" />,
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-red-100 text-red-600 border-red-200',
    bgClassName: 'border-l-red-500',
    icon: <XCircle className="size-3.5" />,
  },
  'no-show': {
    label: 'No Show',
    className: 'bg-amber-100 text-amber-700 border-amber-200',
    bgClassName: 'border-l-amber-500',
    icon: <AlertCircle className="size-3.5" />,
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatCurrency(amount: number) {
  return `$${amount.toLocaleString()}`;
}

type BookingCardProps = {
  booking: Booking;
  variant?: 'active' | 'history';
  onCancel?: (id: string) => void;
  cancellingId?: string | null;
};

export default function BookingCard({
  booking,
  variant = 'active',
  onCancel,
  cancellingId,
}: BookingCardProps) {
  const { hotel, room, status } = booking;
  const config = statusConfig[status];
  const isCancelling = cancellingId === booking.id;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border bg-white md:h-64 md:flex-row">
      {/* --- Image --- */}
      <div className="relative h-52 w-full shrink-0 overflow-hidden md:h-full md:w-64">
        <Image
          src={hotel.image}
          alt={hotel.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 256px"
        />
      </div>

      {/* --- Content --- */}
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        {/* Header: Title + Rating + Booking ID + Status */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <Link
                href={`/hotels/${hotel.id}`}
                className="truncate text-base font-bold tracking-tight transition hover:text-emerald-600 sm:text-lg"
              >
                {hotel.name}
              </Link>
              <div className="hidden shrink-0 items-center gap-2 sm:flex">
                <span className="text-muted-foreground text-[11px]">{booking.id}</span>
                <Badge
                  variant="outline"
                  className={`${config.className} inline-flex items-center gap-1 border px-2 py-0.5 text-[10px] font-semibold`}
                >
                  {config.icon}
                  {config.label}
                </Badge>
              </div>
            </div>
            {/* Mobile: show status below title */}
            <div className="mt-1.5 flex items-center gap-2 sm:hidden">
              <span className="text-muted-foreground text-[10px]">{booking.id}</span>
              <Badge
                variant="outline"
                className={`${config.className} inline-flex items-center gap-1 border px-2 py-0.5 text-[10px] font-semibold`}
              >
                {config.icon}
                {config.label}
              </Badge>
            </div>
            <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs sm:text-sm">
              <span className="flex items-center gap-1">
                <MapPin className="size-3.5" /> {hotel.city}, {hotel.country}
              </span>
              <span className="flex items-center gap-1">
                <Star className="size-3 fill-amber-400 text-amber-400" /> {hotel.rating}
                <span className="text-[10px]">({hotel.reviews.toLocaleString()})</span>
              </span>
            </div>
          </div>
        </div>

        {/* Details grid */}
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:mt-4 sm:grid-cols-4 sm:gap-x-6 sm:text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="text-primary size-3.5 shrink-0 sm:size-4" />
            <div>
              <p className="text-muted-foreground text-[10px] sm:text-[11px]">Check-in</p>
              <p className="font-medium">{formatDate(booking.checkIn)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="text-primary size-3.5 shrink-0 sm:size-4" />
            <div>
              <p className="text-muted-foreground text-[10px] sm:text-[11px]">Check-out</p>
              <p className="font-medium">{formatDate(booking.checkOut)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Moon className="text-primary size-3.5 shrink-0 sm:size-4" />
            <div>
              <p className="text-muted-foreground text-[10px] sm:text-[11px]">Duration</p>
              <p className="font-medium">
                {booking.nights} night{booking.nights > 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="text-primary size-3.5 shrink-0 sm:size-4" />
            <div>
              <p className="text-muted-foreground text-[10px] sm:text-[11px]">Guests</p>
              <p className="font-medium">
                {booking.guests} guest{booking.guests > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Footer: Room + Payment chips | Price + Action */}
        <div className="mt-auto flex flex-wrap items-end justify-between gap-3 border-t border-gray-100 pt-3 sm:pt-4">
          {/* Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <div className="flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1 text-[10px] font-medium sm:px-2.5 sm:text-xs">
              <Bed className="size-3 sm:size-3.5" /> {room.name}
            </div>
            <div className="flex items-center gap-1 rounded-md bg-gray-50 px-2 py-1 text-[10px] font-medium sm:px-2.5 sm:text-xs">
              <CreditCard className="size-3 sm:size-3.5" />{' '}
              {booking.paymentMethod === 'credit-card'
                ? 'Credit Card'
                : booking.paymentMethod === 'debit-card'
                  ? 'Debit Card'
                  : 'PayPal'}
            </div>
          </div>

          {/* Price + Action */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="text-right">
              <p className="text-muted-foreground text-[10px] sm:text-[11px]">Total paid</p>
              <p className="text-base font-bold sm:text-lg">{formatCurrency(booking.total)}</p>
            </div>

            {variant === 'active' && booking.cancellable && onCancel && (
              <Button
                size="sm"
                className="h-8 gap-1 bg-red-600 px-2.5 text-xs text-white hover:bg-red-700 sm:h-9 sm:gap-1.5 sm:px-3 sm:text-sm"
                onClick={() => onCancel(booking.id)}
                disabled={isCancelling}
              >
                <XCircle className="size-3 sm:size-3.5" />
                {isCancelling ? 'Cancelling...' : 'Cancel'}
              </Button>
            )}

            {variant === 'history' && status === 'completed' && (
              <Link href={`/hotels/${hotel.id}`}>
                <Button
                  size="sm"
                  className="h-8 gap-1 px-2.5 text-xs sm:h-9 sm:gap-1.5 sm:px-3 sm:text-sm"
                >
                  <BadgeCheck className="size-3 sm:size-3.5" /> Book Again
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ─── Skeleton — matches fixed card height ─── */
export function BookingCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-2xl border bg-white md:h-64 md:flex-row">
      {/* Image skeleton */}
      <div className="h-52 w-full shrink-0 bg-gray-200 md:h-full md:w-64" />

      {/* Content skeleton */}
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        {/* Title + ID */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-2">
            <div className="h-5 w-3/5 rounded bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="h-3.5 w-3.5 rounded-full bg-gray-200" />
              <div className="h-3.5 w-1/3 rounded bg-gray-100" />
            </div>
          </div>
          <div className="hidden h-3.5 w-28 rounded bg-gray-100 sm:block" />
        </div>

        {/* Details grid */}
        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:mt-4 sm:grid-cols-4 sm:gap-x-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="h-3 w-12 rounded bg-gray-100" />
              <div className="h-4 w-20 rounded bg-gray-200" />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-end justify-between border-t border-gray-100 pt-3 sm:pt-4">
          <div className="flex gap-1.5">
            <div className="h-6 w-20 rounded-md bg-gray-100 sm:h-7 sm:w-24" />
            <div className="h-6 w-20 rounded-md bg-gray-100 sm:h-7 sm:w-24" />
          </div>
          <div className="space-y-1 text-right">
            <div className="ml-auto h-3 w-12 rounded bg-gray-100" />
            <div className="ml-auto h-5 w-16 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
