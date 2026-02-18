'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { History, Search, Calendar, ChevronRight } from 'lucide-react';
import BookingCard, { BookingCardSkeleton } from '@/components/modules/bookings/BookingCard';
import { PAST_BOOKINGS } from '@/lib/constants/bookings-data';

type FilterTab = 'all' | 'completed' | 'cancelled' | 'no-show';

const TABS: { value: FilterTab; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'no-show', label: 'No Show' },
];

export default function BookingsHistoryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Simulate fetching bookings
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const filteredBookings = useMemo(() => {
    let result = PAST_BOOKINGS;

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
  }, [activeTab, searchQuery]);

  const completedCount = PAST_BOOKINGS.filter((b) => b.status === 'completed').length;
  const cancelledCount = PAST_BOOKINGS.filter((b) => b.status === 'cancelled').length;
  const noShowCount = PAST_BOOKINGS.filter((b) => b.status === 'no-show').length;
  const totalSpent = PAST_BOOKINGS.filter((b) => b.status === 'completed').reduce(
    (s, b) => s + b.total,
    0,
  );

  return (
    <div className="bg-gray-50 pb-12 sm:pb-16">
      <section className="app-container py-6 sm:py-8">
        {/* Breadcrumb */}
        <nav className="mb-5 flex items-center gap-1.5 text-sm">
          <Link href="/" className="text-muted-foreground hover:text-primary transition">
            Home
          </Link>
          <ChevronRight className="text-muted-foreground size-3.5" />
          <span className="text-foreground font-medium">Bookings History</span>
        </nav>

        {/* Page title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Bookings History</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            View your past reservations and booking records
          </p>
        </div>

        {/* Stats row */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:grid-cols-4 sm:gap-4">
          <StatCard label="Total Bookings" value={isLoading ? '–' : PAST_BOOKINGS.length} />
          <StatCard label="Completed" value={isLoading ? '–' : completedCount} />
          <StatCard label="Cancelled" value={isLoading ? '–' : cancelledCount} />
          <StatCard
            label="Total Spent"
            value={isLoading ? '–' : `$${totalSpent.toLocaleString()}`}
          />
        </div>

        {/* Filter bar */}
        <div className="mb-5 flex flex-col gap-3 rounded-xl border bg-white p-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl sm:p-4">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {TABS.map((tab) => {
              const count =
                tab.value === 'all'
                  ? PAST_BOOKINGS.length
                  : tab.value === 'completed'
                    ? completedCount
                    : tab.value === 'cancelled'
                      ? cancelledCount
                      : noShowCount;
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
            Array.from({ length: 4 }).map((_, i) => <BookingCardSkeleton key={i} />)
          ) : filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} variant="history" />
            ))
          ) : (
            <EmptyState query={searchQuery} tab={activeTab} />
          )}
        </div>
      </section>
    </div>
  );
}

/* ─── Stat card ─── */
function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border bg-white p-3 sm:rounded-2xl sm:p-5">
      <p className="text-muted-foreground text-xs sm:text-sm">{label}</p>
      <p className="mt-0.5 text-lg font-bold sm:mt-1 sm:text-2xl">{value}</p>
    </div>
  );
}

/* ─── Empty state ─── */
function EmptyState({ query, tab }: { query: string; tab: FilterTab }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border bg-white px-4 py-16 text-center sm:py-20">
      <div className="mb-4 rounded-full bg-gray-100 p-4 sm:p-5">
        <History className="text-muted-foreground size-8 sm:size-10" />
      </div>
      <h3 className="text-base font-semibold sm:text-lg">No bookings found</h3>
      <p className="text-muted-foreground mt-1 max-w-sm text-xs sm:text-sm">
        {query
          ? `No results match "${query}". Try a different search term.`
          : tab !== 'all'
            ? `No ${tab} bookings in your history.`
            : "You haven't made any bookings yet. Start exploring!"}
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
