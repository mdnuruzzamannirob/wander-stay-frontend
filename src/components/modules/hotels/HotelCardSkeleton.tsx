export default function HotelCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-white md:h-85 md:flex-row">
      <div className="h-56 w-full shrink-0 animate-pulse bg-slate-200 md:h-auto md:w-60" />

      <div className="flex flex-1 flex-col p-5">
        {/* Top section */}
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-2">
              <div className="h-4 w-48 animate-pulse rounded bg-slate-200" />
              <div className="h-3 w-28 animate-pulse rounded bg-slate-200" />
            </div>
            <div className="h-4 w-12 animate-pulse rounded bg-slate-200" />
          </div>
          <div className="mt-3 space-y-2">
            <div className="h-3 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-3 w-4/5 animate-pulse rounded bg-slate-200" />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
            <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
            <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-auto pt-3">
          <div className="mb-3 h-px w-full bg-slate-200" />
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              <div className="h-5 w-12 animate-pulse rounded bg-slate-200" />
              <div className="h-5 w-12 animate-pulse rounded bg-slate-200" />
              <div className="h-5 w-12 animate-pulse rounded bg-slate-200" />
            </div>
            <div className="flex items-center gap-3">
              <div className="h-6 w-20 animate-pulse rounded bg-slate-200" />
              <div className="h-9 w-24 animate-pulse rounded-full bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
