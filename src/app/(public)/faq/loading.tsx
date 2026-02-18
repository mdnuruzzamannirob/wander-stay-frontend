export default function FaqLoading() {
  return (
    <div>
      {/* Hero skeleton */}
      <div className="relative min-h-70 sm:min-h-80">
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
        <div className="absolute inset-0 bg-linear-to-b from-gray-900/80 via-gray-900/70 to-gray-950/90" />
        <div className="app-container relative flex min-h-70 flex-col items-center justify-center gap-4 sm:min-h-80">
          <div className="h-9 w-56 animate-pulse rounded-lg bg-white/20 sm:h-11 sm:w-72" />
          <div className="flex items-center gap-2">
            <div className="h-4 w-12 animate-pulse rounded bg-white/10" />
            <div className="size-4 animate-pulse rounded bg-white/10" />
            <div className="h-4 w-8 animate-pulse rounded bg-white/10" />
          </div>
        </div>
      </div>

      {/* FAQ content skeleton */}
      <section className="app-container py-14 sm:py-20">
        <div className="mx-auto max-w-4xl">
          {/* Title area */}
          <div className="mb-10 flex flex-col items-center gap-3">
            <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
            <div className="h-8 w-72 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-96 animate-pulse rounded bg-gray-100" />
          </div>

          {/* Category blocks */}
          {Array.from({ length: 3 }).map((_, catIdx) => (
            <div key={catIdx} className="mb-10">
              <div className="mb-4 flex items-center gap-2">
                <div className="size-5 animate-pulse rounded bg-gray-200" />
                <div className="h-5 w-44 animate-pulse rounded bg-gray-200" />
              </div>
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-14 w-full animate-pulse rounded-2xl border bg-white" />
                ))}
              </div>
            </div>
          ))}

          {/* Still have questions skeleton */}
          <div className="mt-16 flex animate-pulse flex-col items-center gap-4 rounded-2xl border bg-gray-50 p-8 sm:p-12">
            <div className="size-16 rounded-full bg-gray-200" />
            <div className="h-7 w-56 rounded bg-gray-200" />
            <div className="h-4 w-72 rounded bg-gray-100" />
            <div className="h-12 w-44 rounded-full bg-gray-200" />
          </div>
        </div>
      </section>
    </div>
  );
}
