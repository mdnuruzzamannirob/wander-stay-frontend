export default function SettingsLoading() {
  return (
    <div className="bg-gray-50 pb-12 sm:pb-16">
      {/* Hero skeleton */}
      <div className="relative min-h-70 sm:min-h-80">
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
        <div className="absolute inset-0 bg-linear-to-b from-gray-900/80 via-gray-900/70 to-gray-950/90" />
        <div className="app-container relative flex min-h-70 flex-col items-center justify-center gap-4 sm:min-h-80">
          <div className="h-9 w-52 animate-pulse rounded-lg bg-white/20 sm:h-11 sm:w-64" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 animate-pulse rounded bg-white/10" />
            <div className="size-4 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-16 animate-pulse rounded bg-white/10" />
          </div>
        </div>
      </div>

      <section className="app-container -mt-8 sm:-mt-10">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Profile card skeleton */}
          <div className="animate-pulse rounded-2xl border bg-white p-5 sm:p-7">
            <div className="mb-5 flex items-center gap-3 sm:mb-6">
              <div className="size-10 rounded-xl bg-gray-200" />
              <div className="space-y-1.5">
                <div className="h-5 w-36 rounded bg-gray-200" />
                <div className="h-3.5 w-44 rounded bg-gray-100" />
              </div>
            </div>
            <div className="space-y-4 sm:space-y-5">
              <div className="flex items-center gap-4">
                <div className="size-16 rounded-full bg-gray-200 sm:size-20" />
                <div className="h-9 w-32 rounded-lg bg-gray-200" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i}>
                    <div className="mb-1.5 h-4 w-24 rounded bg-gray-100" />
                    <div className="h-10 w-full rounded-lg bg-gray-100 sm:h-11" />
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <div className="h-10 w-32 rounded-lg bg-gray-200" />
              </div>
            </div>
          </div>

          {/* Password card skeleton */}
          <div className="animate-pulse rounded-2xl border bg-white p-5 sm:p-7">
            <div className="mb-5 flex items-center gap-3 sm:mb-6">
              <div className="size-10 rounded-xl bg-gray-200" />
              <div className="space-y-1.5">
                <div className="h-5 w-36 rounded bg-gray-200" />
                <div className="h-3.5 w-48 rounded bg-gray-100" />
              </div>
            </div>
            <div className="space-y-4 sm:space-y-5">
              <div>
                <div className="mb-1.5 h-4 w-32 rounded bg-gray-100" />
                <div className="h-10 w-full rounded-lg bg-gray-100 sm:h-11" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i}>
                    <div className="mb-1.5 h-4 w-28 rounded bg-gray-100" />
                    <div className="h-10 w-full rounded-lg bg-gray-100 sm:h-11" />
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <div className="h-10 w-40 rounded-lg bg-gray-200" />
              </div>
            </div>
          </div>

          {/* Notification card skeleton */}
          <div className="animate-pulse rounded-2xl border bg-white p-5 sm:p-7">
            <div className="mb-5 flex items-center gap-3 sm:mb-6">
              <div className="size-10 rounded-xl bg-gray-200" />
              <div className="space-y-1.5">
                <div className="h-5 w-40 rounded bg-gray-200" />
                <div className="h-3.5 w-48 rounded bg-gray-100" />
              </div>
            </div>
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-4 rounded-xl border bg-gray-50 p-4 sm:p-5"
                >
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-36 rounded bg-gray-200" />
                    <div className="h-3 w-64 rounded bg-gray-100" />
                  </div>
                  <div className="h-6 w-11 rounded-full bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
