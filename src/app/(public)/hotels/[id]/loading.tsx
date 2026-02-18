export default function HotelDetailsLoading() {
  return (
    <div className="app-container animate-pulse py-8 md:py-10">
      {/* Breadcrumbs skeleton */}
      <div className="mb-5 flex items-center gap-1.5">
        <div className="h-4 w-12 rounded bg-gray-200" />
        <div className="h-3 w-3 rounded bg-gray-200" />
        <div className="h-4 w-14 rounded bg-gray-200" />
        <div className="h-3 w-3 rounded bg-gray-200" />
        <div className="h-4 w-36 rounded bg-gray-200" />
      </div>

      {/* Gallery skeleton */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 overflow-hidden rounded-2xl">
        <div className="col-span-2 row-span-2 h-72 bg-gray-200 sm:h-96" />
        <div className="h-[calc(50%-0.25rem)] bg-gray-200" />
        <div className="h-[calc(50%-0.25rem)] bg-gray-200" />
        <div className="h-[calc(50%-0.25rem)] bg-gray-200" />
        <div className="h-[calc(50%-0.25rem)] bg-gray-200" />
      </div>

      {/* Overview skeleton */}
      <section className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Left Column */}
        <div className="space-y-10 lg:col-span-2">
          {/* Badges */}
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <div className="h-7 w-20 rounded-full bg-gray-200" />
              <div className="h-7 w-24 rounded-full bg-gray-200" />
            </div>
            {/* Title */}
            <div className="space-y-3">
              <div className="h-8 w-3/4 rounded bg-gray-200" />
              <div className="flex gap-3">
                <div className="h-4 w-40 rounded bg-gray-200" />
                <div className="h-4 w-28 rounded bg-gray-200" />
              </div>
            </div>
            {/* Action buttons */}
            <div className="flex gap-2 pt-1">
              <div className="h-9 w-20 rounded-full bg-gray-200" />
              <div className="h-9 w-20 rounded-full bg-gray-200" />
              <div className="h-9 w-24 rounded-full bg-gray-200" />
            </div>
          </div>

          <div className="h-px bg-gray-200" />

          {/* About skeleton */}
          <div>
            <div className="mb-4 h-6 w-48 rounded bg-gray-200" />
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-5/6 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-4/5 rounded bg-gray-200" />
            </div>
          </div>

          <div className="h-px bg-gray-200" />

          {/* Amenities skeleton */}
          <div>
            <div className="mb-5 h-6 w-44 rounded bg-gray-200" />
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-12 rounded-xl bg-gray-200" />
              ))}
            </div>
          </div>

          <div className="h-px bg-gray-200" />

          {/* Why guests love it skeleton */}
          <div>
            <div className="mb-5 h-6 w-44 rounded bg-gray-200" />
            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-20 rounded-xl bg-gray-200" />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar skeleton */}
        <aside className="lg:sticky lg:top-25 lg:self-start">
          <div className="flex flex-col gap-5 rounded-2xl border bg-white p-6">
            <div className="space-y-2">
              <div className="h-3 w-20 rounded bg-gray-200" />
              <div className="h-10 w-32 rounded bg-gray-200" />
              <div className="h-3 w-28 rounded bg-gray-200" />
            </div>
            <div className="h-px bg-gray-200" />
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="h-4 w-24 rounded bg-gray-200" />
              </div>
              <div className="flex items-center justify-between">
                <div className="h-4 w-20 rounded bg-gray-200" />
                <div className="h-4 w-24 rounded bg-gray-200" />
              </div>
            </div>
            <div className="h-px bg-gray-200" />
            <div className="space-y-2.5">
              <div className="h-11 w-full rounded-md bg-gray-200" />
              <div className="h-11 w-full rounded-md bg-gray-200" />
            </div>
          </div>

          {/* Nearby places skeleton */}
          <div className="mt-4 rounded-2xl border bg-white p-6">
            <div className="mb-4 h-5 w-32 rounded bg-gray-200" />
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="h-4 w-32 rounded bg-gray-200" />
                  <div className="h-5 w-14 rounded-full bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {/* Available Rooms skeleton */}
      <section className="mt-14">
        <div className="mb-6">
          <div className="h-6 w-44 rounded bg-gray-200" />
          <div className="mt-1 h-4 w-36 rounded bg-gray-200" />
        </div>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex h-auto flex-col overflow-hidden rounded-2xl border bg-white sm:h-57.5 sm:flex-row"
            >
              <div className="h-48 w-full shrink-0 bg-gray-200 sm:h-full sm:w-52 md:w-60" />
              <div className="flex flex-1 flex-col p-4 sm:py-4 sm:pr-5 sm:pl-4">
                <div className="h-5 w-2/3 rounded bg-gray-200" />
                <div className="mt-2 flex gap-4">
                  <div className="h-4 w-16 rounded bg-gray-200" />
                  <div className="h-4 w-20 rounded bg-gray-200" />
                  <div className="h-4 w-24 rounded bg-gray-200" />
                </div>
                <div className="mt-3 flex gap-1.5">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j} className="h-5 w-16 rounded-full bg-gray-200" />
                  ))}
                </div>
                <div className="mt-auto flex items-end justify-between border-t border-dashed border-gray-200 pt-3">
                  <div className="space-y-1">
                    <div className="h-4 w-16 rounded bg-gray-200" />
                    <div className="h-7 w-24 rounded bg-gray-200" />
                  </div>
                  <div className="h-9 w-24 rounded-md bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews section skeleton */}
      <section className="mt-14">
        <div className="mb-6 h-6 w-36 rounded bg-gray-200" />
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border bg-white p-5">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-gray-200" />
                <div className="space-y-1">
                  <div className="h-4 w-24 rounded bg-gray-200" />
                  <div className="h-3 w-16 rounded bg-gray-200" />
                </div>
              </div>
              <div className="mt-3 h-4 w-3/4 rounded bg-gray-200" />
              <div className="mt-2 space-y-1.5">
                <div className="h-3 w-full rounded bg-gray-200" />
                <div className="h-3 w-5/6 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Policies skeleton */}
      <section className="mt-14">
        <div className="mb-6 h-6 w-36 rounded bg-gray-200" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-100 bg-gray-50/60 p-4">
              <div className="mb-2 flex items-center gap-2">
                <div className="size-4 rounded bg-gray-200" />
                <div className="h-4 w-20 rounded bg-gray-200" />
              </div>
              <div className="h-3 w-full rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
