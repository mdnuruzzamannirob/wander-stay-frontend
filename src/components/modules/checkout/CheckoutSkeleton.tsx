export default function CheckoutSkeleton() {
  return (
    <div className="app-container py-8 md:py-10">
      {/* Breadcrumbs — matches: Home > Hotels > Hotel Name > Checkout */}
      <div className="mb-6 flex items-center gap-1.5">
        <div className="h-4 w-10 animate-pulse rounded bg-gray-200" />
        <div className="size-3.5 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-12 animate-pulse rounded bg-gray-200" />
        <div className="size-3.5 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
        <div className="size-3.5 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
      </div>

      {/* Header — title + subtitle */}
      <div className="mb-6">
        <div className="h-8 w-64 animate-pulse rounded bg-gray-200" />
        <div className="mt-1 h-4 w-80 animate-pulse rounded bg-gray-100" />
      </div>

      {/* Mobile: Booking card on top */}
      <div className="mb-6 lg:hidden">
        <div className="animate-pulse rounded-2xl border bg-white">
          <div className="h-44 w-full rounded-t-2xl bg-gray-200" />
          <div className="space-y-4 p-5">
            <div className="space-y-2">
              <div className="h-3 w-16 rounded bg-gray-100" />
              <div className="h-4 w-32 rounded bg-gray-200" />
              <div className="h-3 w-24 rounded bg-gray-100" />
            </div>
            <div className="h-px w-full bg-gray-100" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-3 w-16 rounded bg-gray-100" />
                  <div className="h-4 w-20 rounded bg-gray-200" />
                </div>
              ))}
            </div>
            <div className="h-px w-full bg-gray-100" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="h-3.5 w-28 rounded bg-gray-100" />
                  <div className="h-3.5 w-12 rounded bg-gray-100" />
                </div>
              ))}
            </div>
            <div className="h-px w-full bg-gray-100" />
            <div className="flex items-center justify-between">
              <div className="h-5 w-12 rounded bg-gray-200" />
              <div className="h-6 w-20 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile steps skeleton */}
      <div className="mb-6 flex items-center justify-between gap-2 md:hidden">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
            <div className="flex w-full items-center">
              {i > 0 && <div className="h-0.5 flex-1 rounded-full bg-gray-200" />}
              <div className="size-8 shrink-0 animate-pulse rounded-full bg-gray-200" />
              {i < 2 && <div className="h-0.5 flex-1 rounded-full bg-gray-200" />}
            </div>
            <div className="h-3 w-14 animate-pulse rounded bg-gray-100" />
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,340px)]">
        {/* ---- Left Column ---- */}
        <div className="min-w-0 space-y-6">
          {/* Desktop steps skeleton — inside left column, matches justify-between layout */}
          <div className="mb-8 hidden md:block">
            <div className="relative flex items-start justify-between">
              {/* Connector lines */}
              <div className="absolute top-5 right-5 left-5 flex -translate-y-1/2">
                <div className="h-0.5 flex-1 rounded-full bg-gray-200" />
                <div className="h-0.5 flex-1 rounded-full bg-gray-200" />
              </div>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center gap-1.5">
                  <div className="size-10 animate-pulse rounded-full bg-gray-200" />
                  <div className="h-3 w-16 animate-pulse rounded bg-gray-100" />
                  <div className="h-2.5 w-12 animate-pulse rounded bg-gray-50" />
                </div>
              ))}
            </div>
          </div>

          {/* Guest details card — only step 0 shown initially */}
          <div className="animate-pulse rounded-2xl border bg-white p-6">
            <div className="mb-5 flex items-center gap-2">
              <div className="size-5 rounded bg-gray-200" />
              <div className="h-5 w-28 rounded bg-gray-200" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <div className="h-3.5 w-20 rounded bg-gray-100" />
                  <div className="h-11 w-full rounded-md bg-gray-100" />
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-1">
              <div className="h-3.5 w-28 rounded bg-gray-100" />
              <div className="h-20 w-full rounded-md bg-gray-100" />
            </div>
          </div>

          {/* Navigation button — "Continue" aligned right */}
          <div className="flex items-center justify-end">
            <div className="h-10 w-28 animate-pulse rounded-md bg-gray-200" />
          </div>
        </div>

        {/* ---- Right Sidebar (desktop only) ---- */}
        <aside className="hidden lg:block">
          <div className="animate-pulse rounded-2xl border bg-white">
            <div className="h-44 w-full rounded-t-2xl bg-gray-200" />
            <div className="space-y-4 p-5">
              <div className="space-y-2">
                <div className="h-3 w-16 rounded bg-gray-100" />
                <div className="h-4 w-32 rounded bg-gray-200" />
                <div className="h-3 w-24 rounded bg-gray-100" />
              </div>
              <div className="h-px w-full bg-gray-100" />
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-3 w-16 rounded bg-gray-100" />
                    <div className="h-4 w-20 rounded bg-gray-200" />
                    <div className="h-3 w-12 rounded bg-gray-100" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-3 w-14 rounded bg-gray-100" />
                    <div className="h-4 w-16 rounded bg-gray-200" />
                  </div>
                ))}
              </div>
              <div className="h-px w-full bg-gray-100" />
              <div className="space-y-2.5">
                <div className="h-3 w-20 rounded bg-gray-100" />
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="h-3.5 w-28 rounded bg-gray-100" />
                    <div className="h-3.5 w-12 rounded bg-gray-100" />
                  </div>
                ))}
              </div>
              <div className="h-px w-full bg-gray-100" />
              <div className="flex items-center justify-between">
                <div className="h-5 w-12 rounded bg-gray-200" />
                <div className="h-6 w-20 rounded bg-gray-200" />
              </div>
              {/* Trust badges */}
              <div className="space-y-2 rounded-xl border border-gray-100 bg-gray-50/40 p-3">
                <div className="flex items-center gap-2">
                  <div className="size-3.5 rounded bg-gray-200" />
                  <div className="h-3 w-40 rounded bg-gray-100" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3.5 rounded bg-gray-200" />
                  <div className="h-3 w-36 rounded bg-gray-100" />
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
