export default function HotelCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-2xl border bg-white md:h-90 md:flex-row">
      {/* --- Media Section Skeleton --- */}
      <div className="relative h-70 w-full shrink-0 bg-slate-200 md:h-full md:w-80" />

      {/* --- Content Body Skeleton --- */}
      <div className="flex min-w-0 flex-1 flex-col p-5">
        {/* Header Skeleton */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <div className="h-7 w-2/3 rounded-lg bg-slate-200" /> {/* Title */}
            <div className="h-6 w-16 rounded-full bg-slate-100" /> {/* Badge */}
          </div>

          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full bg-slate-200" /> {/* Pin Icon */}
            <div className="h-4 w-1/3 rounded bg-slate-100" /> {/* Location text */}
          </div>
        </div>

        {/* Description Skeleton */}
        <div className="mt-5 space-y-2">
          <div className="h-3.5 w-full rounded bg-slate-100" />
          <div className="h-3.5 w-[90%] rounded bg-slate-100" />
          <div className="hidden h-3.5 w-[80%] rounded bg-slate-100 md:block" />
        </div>

        {/* Amenities Skeleton */}
        <div className="mt-5 flex flex-wrap gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-20 rounded-full border border-slate-100 bg-slate-50" />
          ))}
        </div>

        {/* Features Skeleton */}
        <div className="mt-5 flex gap-4">
          <div className="h-4 w-28 rounded bg-slate-100" />
          <div className="h-4 w-28 rounded bg-slate-100" />
        </div>

        {/* Footer Skeleton */}
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-slate-100 pt-5 md:mt-auto">
          <div className="space-y-2">
            <div className="h-3 w-10 rounded bg-slate-100" />
            <div className="h-8 w-24 rounded-lg bg-slate-200" />
          </div>

          <div className="h-12 w-32 rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
