'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { CalendarCheck, Calendar, Clock, AlertTriangle, Luggage } from 'lucide-react';
import { toast } from 'sonner';
import PageHero from '@/components/shared/PageHero';
import BookingCard, { BookingCardSkeleton } from '@/components/modules/bookings/BookingCard';
import { ACTIVE_BOOKINGS, type Booking } from '@/lib/constants/bookings-data';

export default function MyBookingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // Simulate fetching bookings
  useEffect(() => {
    const t = setTimeout(() => {
      setBookings(ACTIVE_BOOKINGS);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const handleCancel = useCallback(async (id: string) => {
    setCancellingId(id);
    await new Promise((r) => setTimeout(r, 1200));
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, status: 'cancelled' as const, cancellable: false } : b,
      ),
    );
    setCancellingId(null);
    toast.success('Booking cancelled successfully');
  }, []);

  const confirmed = bookings.filter((b) => b.status === 'confirmed');
  const checkedIn = bookings.filter((b) => b.status === 'checked-in');
  const cancelled = bookings.filter((b) => b.status === 'cancelled');

  return (
    <>
      <PageHero
        title="My Bookings"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'My Bookings' }]}
      />

      <section className="app-container py-16 sm:py-20">
        {/* Summary cards */}
        <div className="mb-6 grid grid-cols-3 gap-3 sm:mb-8 sm:gap-4">
          <SummaryCard
            icon={<CalendarCheck className="size-4 text-emerald-600 sm:size-5" />}
            label="Confirmed"
            value={isLoading ? '–' : confirmed.length}
            accent="emerald"
          />
          <SummaryCard
            icon={<Clock className="size-4 text-blue-600 sm:size-5" />}
            label="Checked In"
            value={isLoading ? '–' : checkedIn.length}
            accent="blue"
          />
          <SummaryCard
            icon={<AlertTriangle className="size-4 text-red-500 sm:size-5" />}
            label="Cancelled"
            value={isLoading ? '–' : cancelled.length}
            accent="red"
          />
        </div>

        {/* Bookings list */}
        <div className="space-y-4 sm:space-y-5">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <BookingCardSkeleton key={i} />)
          ) : bookings.length > 0 ? (
            bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                variant="active"
                onCancel={handleCancel}
                cancellingId={cancellingId}
              />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </section>
    </>
  );
}

/* ─── Summary card ─── */
function SummaryCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  accent: 'emerald' | 'blue' | 'red';
}) {
  const bg =
    accent === 'emerald'
      ? 'bg-emerald-50 border-emerald-100'
      : accent === 'blue'
        ? 'bg-blue-50 border-blue-100'
        : 'bg-red-50 border-red-100';

  return (
    <div
      className={`flex items-center gap-3 rounded-xl border p-3 sm:gap-4 sm:rounded-2xl sm:p-5 ${bg}`}
    >
      <div className="hidden rounded-lg bg-white p-2 shadow-sm sm:block sm:rounded-xl sm:p-2.5">
        {icon}
      </div>
      <div>
        <p className="text-lg font-bold sm:text-2xl">{value}</p>
        <p className="text-muted-foreground text-xs sm:text-sm">{label}</p>
      </div>
    </div>
  );
}

/* ─── Empty state ─── */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border bg-white px-4 py-16 text-center sm:py-20">
      <div className="mb-4 rounded-full bg-gray-100 p-4 sm:p-5">
        <Luggage className="text-muted-foreground size-8 sm:size-10" />
      </div>
      <h3 className="text-base font-semibold sm:text-lg">No active bookings</h3>
      <p className="text-muted-foreground mt-1 max-w-sm text-xs sm:text-sm">
        You don&apos;t have any upcoming bookings. Start exploring hotels and plan your next trip!
      </p>
      <Link
        href="/hotels"
        className="bg-primary hover:bg-primary/90 mt-5 inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium text-white transition sm:mt-6 sm:px-6 sm:py-2.5"
      >
        <Calendar className="size-4" /> Explore Hotels
      </Link>
    </div>
  );
}
