import { BookingCardSkeleton } from '@/components/modules/bookings/BookingCard';

export default function BookingsHistoryLoading() {
  return (
    <div className="bg-gray-50 pb-12 sm:pb-16">
      <section className="app-container py-6 sm:py-8">
        {/* Breadcrumb skeleton */}
        <div className="mb-5 flex items-center gap-1.5">
          <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
          <div className="size-3.5 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
        </div>

        {/* Heading skeleton */}
        <div className="mb-6 sm:mb-8">
          <div className="h-7 w-48 animate-pulse rounded bg-gray-200 sm:h-9 sm:w-60" />
          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-gray-100 sm:w-80" />
        </div>

        {/* Stats skeletons */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:mb-8 sm:grid-cols-4 sm:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-white p-3 sm:rounded-2xl sm:p-5">
              <div className="h-3.5 w-20 animate-pulse rounded bg-gray-100 sm:h-4 sm:w-24" />
              <div className="mt-1.5 h-5 w-12 animate-pulse rounded bg-gray-200 sm:mt-2 sm:h-7 sm:w-16" />
            </div>
          ))}
        </div>

        {/* Filter bar skeleton */}
        <div className="mb-5 flex flex-col gap-3 rounded-xl border bg-white p-3 sm:mb-6 sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl sm:p-4">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-20 animate-pulse rounded-lg bg-gray-100 sm:h-9 sm:w-24"
              />
            ))}
          </div>
          <div className="h-9 w-full animate-pulse rounded-lg bg-gray-100 sm:h-10 sm:max-w-xs" />
        </div>

        {/* Booking card skeletons */}
        <div className="space-y-4 sm:space-y-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <BookingCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
