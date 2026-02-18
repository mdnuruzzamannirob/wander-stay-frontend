export default function AboutUsLoading() {
  return (
    <div>
      {/* Hero skeleton */}
      <div className="relative min-h-70 sm:min-h-80">
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
        <div className="absolute inset-0 bg-linear-to-b from-gray-900/80 via-gray-900/70 to-gray-950/90" />
        <div className="app-container relative flex min-h-70 flex-col items-center justify-center gap-4 sm:min-h-80">
          <div className="h-9 w-36 animate-pulse rounded-lg bg-white/20 sm:h-11 sm:w-44" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 animate-pulse rounded bg-white/10" />
            <div className="size-4 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-14 animate-pulse rounded bg-white/10" />
          </div>
        </div>
      </div>

      {/* About section skeleton */}
      <section className="app-container py-16 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-5">
          <div className="animate-pulse space-y-6 lg:col-span-3">
            <div className="space-y-2">
              <div className="h-8 w-72 rounded bg-gray-200" />
              <div className="h-8 w-64 rounded bg-gray-200" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-gray-100" />
              <div className="h-4 w-full rounded bg-gray-100" />
              <div className="h-4 w-3/4 rounded bg-gray-100" />
            </div>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="size-8 rounded-full bg-gray-200" />
                  <div className="h-4 w-44 rounded bg-gray-100" />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="h-80 w-full animate-pulse rounded-3xl bg-gray-200 sm:h-100" />
          </div>
        </div>
      </section>

      {/* Features skeleton */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="app-container">
          <div className="mb-12 flex flex-col items-center gap-3">
            <div className="h-8 w-60 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-72 animate-pulse rounded bg-gray-100" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="flex animate-pulse flex-col items-center gap-4 rounded-2xl border bg-white p-6"
              >
                <div className="size-14 rounded-2xl bg-gray-200" />
                <div className="h-5 w-36 rounded bg-gray-200" />
                <div className="w-full space-y-2">
                  <div className="h-3 w-full rounded bg-gray-100" />
                  <div className="h-3 w-5/6 rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
