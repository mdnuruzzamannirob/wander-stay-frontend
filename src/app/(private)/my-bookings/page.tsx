'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CalendarCheck, Calendar, Clock, AlertTriangle, Luggage, Search } from 'lucide-react';
import { toast } from 'sonner';
import PageHero from '@/components/shared/PageHero';
import BookingCard, { BookingCardSkeleton } from '@/components/modules/bookings/BookingCard';
import { ACTIVE_BOOKINGS, type Booking } from '@/lib/constants/bookings-data';

type ActiveFilterTab = 'all' | 'confirmed' | 'checked-in' | 'cancelled';

const ACTIVE_TABS: { value: ActiveFilterTab; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'checked-in', label: 'Checked In' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function MyBookingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveFilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredBookings = useMemo(() => {
    let result = bookings;

    if (activeTab !== 'all') {
      result = result.filter((b) => b.status === activeTab);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.hotel.name.toLowerCase().includes(q) ||
          b.hotel.city.toLowerCase().includes(q) ||
          b.id.toLowerCase().includes(q),
      );
    }

    return result;
  }, [bookings, activeTab, searchQuery]);

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

        {/* Filter bar */}
        <div className="mb-5 flex flex-col gap-3 rounded-xl border bg-white p-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl sm:p-4">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {ACTIVE_TABS.map((tab) => {
              const count =
                tab.value === 'all'
                  ? bookings.length
                  : tab.value === 'confirmed'
                    ? confirmed.length
                    : tab.value === 'checked-in'
                      ? checkedIn.length
                      : cancelled.length;
              return (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition sm:gap-1.5 sm:px-3.5 sm:py-2 sm:text-sm ${
                    activeTab === tab.value
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                      activeTab === tab.value
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by hotel, city, or ID"
              className="h-9 w-full rounded-lg border bg-gray-50 pr-4 pl-9 text-sm transition outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-200 sm:h-10"
            />
          </div>
        </div>

        {/* Bookings list */}
        <div className="space-y-4 sm:space-y-5">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => <BookingCardSkeleton key={i} />)
          ) : filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
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
        href="/"
        className="bg-primary hover:bg-primary/90 mt-5 inline-flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium text-white transition sm:mt-6 sm:px-6 sm:py-2.5"
      >
        <Calendar className="size-4" /> Explore Hotels
      </Link>
    </div>
  );
}
