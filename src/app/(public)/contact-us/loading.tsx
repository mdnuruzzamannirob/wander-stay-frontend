export default function ContactUsLoading() {
  return (
    <div>
      {/* Hero skeleton */}
      <div className="relative min-h-70 sm:min-h-80">
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
        <div className="absolute inset-0 bg-linear-to-b from-gray-900/80 via-gray-900/70 to-gray-950/90" />
        <div className="app-container relative flex min-h-70 flex-col items-center justify-center gap-4 sm:min-h-80">
          <div className="h-9 w-40 animate-pulse rounded-lg bg-white/20 sm:h-11 sm:w-52" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 animate-pulse rounded bg-white/10" />
            <div className="size-4 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-16 animate-pulse rounded bg-white/10" />
          </div>
        </div>
      </div>

      {/* Contact content skeleton */}
      <section className="app-container py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Contact info cards */}
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex animate-pulse items-start gap-4 rounded-2xl border bg-gray-50 p-5"
              >
                <div className="size-12 shrink-0 rounded-xl bg-gray-200" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-20 rounded bg-gray-200" />
                  <div className="h-3 w-40 rounded bg-gray-100" />
                  <div className="h-3 w-32 rounded bg-gray-100" />
                </div>
              </div>
            ))}
          </div>

          {/* Form skeleton */}
          <div className="animate-pulse rounded-2xl border bg-white p-5">
            <div className="space-y-5">
              <div>
                <div className="mb-1 h-4 w-20 rounded bg-gray-100" />
                <div className="h-11 w-full rounded-lg bg-gray-100" />
              </div>
              <div>
                <div className="mb-1 h-4 w-20 rounded bg-gray-100" />
                <div className="h-11 w-full rounded-lg bg-gray-100" />
              </div>
              <div>
                <div className="mb-1 h-4 w-16 rounded bg-gray-100" />
                <div className="h-36 w-full rounded-lg bg-gray-100" />
              </div>
              <div className="h-11 w-full rounded-lg bg-gray-200" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
