export default function RoomCardSkeleton() {
  return (
    <div className="flex h-auto animate-pulse flex-col overflow-hidden rounded-2xl border bg-white sm:h-57.5 sm:flex-row">
      {/* Image placeholder */}
      <div className="h-48 w-full shrink-0 bg-gray-200 sm:h-full sm:w-52 md:w-60" />

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:py-4 sm:pr-5 sm:pl-4">
        {/* Title */}
        <div className="flex items-start justify-between gap-3">
          <div className="h-5 w-36 rounded bg-gray-200" />
          <div className="h-5 w-20 rounded-full bg-gray-100" />
        </div>

        {/* Specs */}
        <div className="mt-2.5 flex gap-4">
          <div className="h-3.5 w-14 rounded bg-gray-100" />
          <div className="h-3.5 w-14 rounded bg-gray-100" />
          <div className="h-3.5 w-20 rounded bg-gray-100" />
        </div>

        {/* Amenities */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-5 w-16 rounded-full bg-gray-100" />
          ))}
        </div>

        {/* Features */}
        <div className="mt-2.5 flex gap-3">
          <div className="h-3.5 w-24 rounded bg-gray-100" />
          <div className="h-3.5 w-24 rounded bg-gray-100" />
        </div>

        {/* Footer */}
        <div className="mt-3 flex items-end justify-between border-t border-dashed border-gray-200 pt-3 sm:mt-auto">
          <div className="flex flex-col gap-1.5">
            <div className="h-3 w-12 rounded bg-gray-100" />
            <div className="h-6 w-20 rounded bg-gray-200" />
          </div>
          <div className="h-9 w-24 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
