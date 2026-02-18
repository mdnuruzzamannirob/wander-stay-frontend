import { BookingCardSkeleton } from '@/components/modules/bookings/BookingCard';

export default function MyBookingsLoading() {
  return (
    <div className="bg-gray-50 pb-12 sm:pb-16">
      {/* Hero skeleton */}
      <div className="relative min-h-70 sm:min-h-80">
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
        <div className="absolute inset-0 bg-linear-to-b from-gray-900/80 via-gray-900/70 to-gray-950/90" />
        <div className="app-container relative flex min-h-70 flex-col items-center justify-center gap-4 sm:min-h-80">
          <div className="h-9 w-44 animate-pulse rounded-lg bg-white/20 sm:h-11 sm:w-56" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 animate-pulse rounded bg-white/10" />
            <div className="size-4 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-24 animate-pulse rounded bg-white/10" />
          </div>
        </div>
      </div>

      <section className="app-container -mt-8 sm:-mt-10">
        {/* Summary card skeletons */}
        <div className="mb-6 grid grid-cols-3 gap-3 sm:mb-8 sm:gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border bg-white p-3 sm:gap-4 sm:rounded-2xl sm:p-5"
            >
              <div className="hidden h-10 w-10 animate-pulse rounded-xl bg-gray-200 sm:block sm:h-11 sm:w-11" />
              <div className="space-y-1.5 sm:space-y-2">
                <div className="h-5 w-8 animate-pulse rounded bg-gray-200 sm:h-6 sm:w-10" />
                <div className="h-3.5 w-16 animate-pulse rounded bg-gray-100 sm:h-4 sm:w-20" />
              </div>
            </div>
          ))}
        </div>

        {/* Booking card skeletons */}
        <div className="space-y-4 sm:space-y-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <BookingCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
