export function RightAuthSkeleton() {
  return (
    <div className="flex items-center gap-3">
      {/* notification icon slot */}
      <div className="h-10 w-10 rounded-full bg-transparent" />
      {/* user menu slot */}
      <div className="h-10 w-10 rounded-full bg-transparent" />
    </div>
  );
}
