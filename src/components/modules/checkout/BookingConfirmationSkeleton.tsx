export default function BookingConfirmationSkeleton() {
  return (
    <div className="app-container py-8 md:py-12">
      {/* ---- Success Header ---- */}
      <div className="mx-auto max-w-2xl text-center">
        <div className="mx-auto mb-5 flex size-20 animate-pulse items-center justify-center rounded-full bg-emerald-50">
          <div className="size-10 rounded-full bg-emerald-100" />
        </div>
        <div className="mx-auto h-8 w-56 animate-pulse rounded bg-gray-200" />
        <div className="mx-auto mt-2 h-4 w-80 animate-pulse rounded bg-gray-100" />
        {/* Booking ID pill */}
        <div className="mx-auto mt-5 inline-flex h-10 w-60 animate-pulse items-center rounded-full border bg-gray-50" />
      </div>

      {/* ---- Booking Details Card ---- */}
      <div className="mx-auto mt-10 max-w-3xl">
        <div className="animate-pulse overflow-hidden rounded-2xl border bg-white">
          {/* Hotel image header */}
          <div className="relative h-48 w-full bg-gray-200 sm:h-56">
            <div className="absolute right-5 bottom-5 left-5 space-y-2">
              <div className="h-5 w-20 rounded-full bg-gray-300/50" />
              <div className="h-6 w-48 rounded bg-gray-300/50" />
              <div className="h-3 w-32 rounded bg-gray-300/30" />
            </div>
          </div>

          <div className="space-y-6 p-5 sm:p-7">
            {/* Room & Guest Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <div className="h-3 w-24 rounded bg-gray-100" />
                  <div className="space-y-2 rounded-xl border bg-gray-50/60 p-4">
                    <div className="h-4 w-28 rounded bg-gray-200" />
                    <div className="h-3 w-20 rounded bg-gray-100" />
                    <div className="h-3 w-24 rounded bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px w-full bg-gray-100" />

            {/* Dates & Duration */}
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-16 rounded bg-gray-100" />
                  <div className="h-4 w-20 rounded bg-gray-200" />
                  {i < 2 && <div className="h-3 w-14 rounded bg-gray-50" />}
                </div>
              ))}
            </div>

            <div className="h-px w-full bg-gray-100" />

            {/* Payment Summary */}
            <div className="space-y-3">
              <div className="h-3 w-28 rounded bg-gray-100" />
              <div className="space-y-2.5 rounded-xl border bg-gray-50/60 p-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="h-3.5 w-28 rounded bg-gray-100" />
                    <div className="h-3.5 w-14 rounded bg-gray-100" />
                  </div>
                ))}
                <div className="h-px w-full bg-gray-100" />
                <div className="flex items-center justify-between">
                  <div className="h-5 w-16 rounded bg-gray-200" />
                  <div className="h-6 w-20 rounded bg-gray-200" />
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-gray-100" />

            {/* Confirmation meta */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="h-3 w-44 rounded bg-gray-100" />
              <div className="h-3 w-24 rounded bg-gray-100" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <div className="h-11 w-48 animate-pulse rounded-md bg-gray-200" />
          <div className="h-11 w-40 animate-pulse rounded-md bg-gray-200" />
        </div>

        {/* Help banner */}
        <div className="mt-8 mb-4 animate-pulse rounded-2xl border bg-gray-50/60 p-6 text-center">
          <div className="mx-auto h-5 w-48 rounded bg-gray-200" />
          <div className="mx-auto mt-2 h-4 w-64 rounded bg-gray-100" />
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <div className="h-9 w-32 rounded-md bg-gray-200" />
            <div className="h-9 w-24 rounded-md bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
