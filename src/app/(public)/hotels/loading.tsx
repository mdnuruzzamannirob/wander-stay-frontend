import { HotelCardSkeleton } from '@/components/modules/hotels';

export default function HotelsLoading() {
  return (
    <div className="bg-gray-50">
      {/* Hero skeleton */}
      <section className="relative min-h-80 overflow-hidden">
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/70 via-slate-950/60 to-slate-950/90" />
        <div className="app-container relative flex min-h-70 flex-col items-center justify-center gap-4 py-10 sm:min-h-80 sm:py-12">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-60 animate-pulse rounded bg-white/20" />
            <div className="h-5 w-80 animate-pulse rounded bg-white/10" />
          </div>
          <div className="mt-6 h-16 w-full max-w-4xl animate-pulse rounded-2xl bg-white/10" />
        </div>
      </section>

      {/* Content skeleton */}
      <section className="app-container py-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar skeleton */}
          <aside className="hidden lg:block">
            <div className="animate-pulse space-y-4 rounded-2xl border bg-white p-5">
              <div className="h-5 w-24 rounded bg-gray-200" />
              <div className="h-10 w-full rounded-md bg-gray-200" />
              <div className="h-px bg-gray-200" />
              <div className="h-5 w-16 rounded bg-gray-200" />
              <div className="h-10 w-full rounded-md bg-gray-200" />
              <div className="h-px bg-gray-200" />
              <div className="h-5 w-28 rounded bg-gray-200" />
              <div className="h-12 w-full rounded-md bg-gray-200" />
              <div className="h-px bg-gray-200" />
              <div className="h-5 w-20 rounded bg-gray-200" />
              <div className="flex gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-8 w-8 rounded bg-gray-200" />
                ))}
              </div>
              <div className="h-px bg-gray-200" />
              <div className="h-5 w-28 rounded bg-gray-200" />
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-5 w-full rounded bg-gray-200" />
                ))}
              </div>
            </div>
          </aside>

          {/* Cards skeleton */}
          <div className="min-w-0 space-y-6">
            {/* Sort bar skeleton */}
            <div className="flex animate-pulse items-center justify-between rounded-xl border bg-white p-4">
              <div className="h-4 w-36 rounded bg-gray-200" />
              <div className="h-9 w-40 rounded-md bg-gray-200" />
            </div>

            <div className="space-y-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <HotelCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
