'use client';

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import SearchBar from '@/components/shared/searchbar/SearchBar';
import {
  HotelCard,
  HotelCardSkeleton,
  HotelFilters,
  HotelSortBar,
} from '@/components/modules/hotels';
import { HOTELS, HOTELS_PER_PAGE, PRICE_BOUNDS } from '@/lib/constants/hotels-data';
import { useDebounce } from '@/hooks/useDebounce';
import type { HotelFiltersState, SortOption } from '@/types/hotel';

const DEFAULT_FILTERS: HotelFiltersState = {
  query: '',
  city: 'All',
  minPrice: PRICE_BOUNDS.min,
  maxPrice: PRICE_BOUNDS.max,
  minRating: 0,
  selectedAmenities: [],
  selectedTypes: [],
  freeCancellation: false,
  payLater: false,
};

export default function HotelsPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-gray-50">
          <section className="relative min-h-80 overflow-hidden">
            <div className="absolute inset-0 animate-pulse bg-gray-200" />
          </section>
          <section className="app-container py-8 sm:py-10">
            <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
              <aside className="hidden lg:block">
                <div className="h-150 animate-pulse rounded-2xl bg-gray-200" />
              </aside>
              <div className="space-y-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <HotelCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </section>
        </div>
      }
    >
      <HotelsContent />
    </Suspense>
  );
}

function HotelsContent() {
  const searchParams = useSearchParams();

  // Read search context from URL (passed from SearchBar)
  const urlDestination = searchParams.get('destination') ?? '';
  const urlCheckIn = searchParams.get('checkIn') ?? '';
  const urlCheckOut = searchParams.get('checkOut') ?? '';
  const urlAdults = searchParams.get('adults') ?? '';
  const urlChildren = searchParams.get('children') ?? '';
  const urlRooms = searchParams.get('rooms') ?? '';

  // Build search context to forward to hotel detail pages
  const searchContext = useMemo(() => {
    const params = new URLSearchParams();
    if (urlCheckIn) params.set('checkIn', urlCheckIn);
    if (urlCheckOut) params.set('checkOut', urlCheckOut);
    const totalGuests = parseInt(urlAdults || '2', 10) + parseInt(urlChildren || '0', 10);
    params.set('guests', String(totalGuests));
    if (urlRooms) params.set('rooms', urlRooms);
    return params.toString();
  }, [urlCheckIn, urlCheckOut, urlAdults, urlChildren, urlRooms]);

  // Extract city name from destination (e.g. "Miami, USA" → "Miami")
  const destinationCity = urlDestination ? urlDestination.split(',')[0].trim() : '';

  const [filters, setFilters] = useState<HotelFiltersState>({
    ...DEFAULT_FILTERS,
    query: destinationCity,
  });
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [visibleCount, setVisibleCount] = useState(HOTELS_PER_PAGE);

  // Ref for sentinel element observed for infinite scroll
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Debounce filters so the list doesn't re-render on every keystroke/slider drag
  const debouncedFilters = useDebounce(filters, 400);
  const debouncedSortBy = useDebounce(sortBy, 300);

  // Derive loading — true while user is still interacting (debounce pending)
  const isLoading = filters !== debouncedFilters || sortBy !== debouncedSortBy;

  /* ─── Derived ─────────────────────────────────────────── */

  const filteredHotels = useMemo(() => {
    const normalizedQuery = debouncedFilters.query.trim().toLowerCase();

    const filtered = HOTELS.filter((hotel) => {
      const matchesQuery = normalizedQuery
        ? `${hotel.name} ${hotel.city} ${hotel.country}`.toLowerCase().includes(normalizedQuery)
        : true;
      const matchesCity = debouncedFilters.city === 'All' || hotel.city === debouncedFilters.city;
      const matchesPrice =
        hotel.price >= debouncedFilters.minPrice && hotel.price <= debouncedFilters.maxPrice;
      const matchesRating = debouncedFilters.minRating
        ? hotel.rating >= debouncedFilters.minRating
        : true;
      const matchesFreeCancellation = debouncedFilters.freeCancellation
        ? hotel.freeCancellation
        : true;
      const matchesPayLater = debouncedFilters.payLater ? hotel.payLater : true;
      const matchesTypes =
        debouncedFilters.selectedTypes.length > 0
          ? debouncedFilters.selectedTypes.includes(hotel.propertyType)
          : true;
      const matchesAmenities =
        debouncedFilters.selectedAmenities.length > 0
          ? debouncedFilters.selectedAmenities.every((a) => hotel.amenities.includes(a))
          : true;

      return (
        matchesQuery &&
        matchesCity &&
        matchesPrice &&
        matchesRating &&
        matchesFreeCancellation &&
        matchesPayLater &&
        matchesTypes &&
        matchesAmenities
      );
    });

    return [...filtered].sort((a, b) => {
      if (debouncedSortBy === 'price-low') return a.price - b.price;
      if (debouncedSortBy === 'price-high') return b.price - a.price;
      if (debouncedSortBy === 'rating') return b.rating - a.rating;
      return b.rating * Math.log(b.reviews + 1) - a.rating * Math.log(a.reviews + 1);
    });
  }, [debouncedFilters, debouncedSortBy]);

  const displayedHotels = filteredHotels.slice(0, visibleCount);
  const hasMore = visibleCount < filteredHotels.length;

  const hasActiveFilters = useMemo(() => {
    return (
      filters.query.trim().length > 0 ||
      filters.city !== 'All' ||
      filters.minPrice !== PRICE_BOUNDS.min ||
      filters.maxPrice !== PRICE_BOUNDS.max ||
      filters.minRating > 0 ||
      filters.selectedAmenities.length > 0 ||
      filters.selectedTypes.length > 0 ||
      filters.freeCancellation ||
      filters.payLater
    );
  }, [filters]);

  const activeChips = useMemo(() => {
    const chips: string[] = [];
    if (filters.query.trim()) chips.push(`Search: ${filters.query.trim()}`);
    if (filters.city !== 'All') chips.push(`City: ${filters.city}`);
    if (filters.minPrice !== PRICE_BOUNDS.min || filters.maxPrice !== PRICE_BOUNDS.max)
      chips.push(`$${filters.minPrice} – $${filters.maxPrice}`);
    if (filters.minRating > 0) chips.push(`${filters.minRating}+ rating`);
    if (filters.selectedTypes.length > 0) chips.push(`Type: ${filters.selectedTypes.length}`);
    if (filters.selectedAmenities.length > 0)
      chips.push(`Amenities: ${filters.selectedAmenities.length}`);
    if (filters.freeCancellation) chips.push('Free cancellation');
    if (filters.payLater) chips.push('Pay later');
    return chips;
  }, [filters]);

  /* ─── Handlers ────────────────────────────────────────── */

  const handleFilterChange = useCallback(
    <K extends keyof HotelFiltersState>(key: K, value: HotelFiltersState[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setVisibleCount(HOTELS_PER_PAGE);
    },
    [],
  );

  const handleSortChange = useCallback((value: SortOption) => {
    setSortBy(value);
    setVisibleCount(HOTELS_PER_PAGE);
  }, []);

  const handleClearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSortBy('recommended');
    setVisibleCount(HOTELS_PER_PAGE);
  }, []);

  /* ─── Effects ─────────────────────────────────────────── */

  // Reset visible count when filtered results change
  useEffect(() => {
    setVisibleCount(HOTELS_PER_PAGE);
  }, [debouncedFilters, debouncedSortBy]);

  // Infinite scroll observer
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          setVisibleCount((prev) => prev + HOTELS_PER_PAGE);
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  /* ─── Filters panel (shared desktop sidebar & mobile sheet) */
  const filtersPanel = (
    <HotelFilters
      filters={filters}
      onChange={handleFilterChange}
      onClear={handleClearFilters}
      hasActiveFilters={hasActiveFilters}
      activeChips={activeChips}
    />
  );

  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section className="relative min-h-80 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-slate-950/70 via-slate-950/60 to-slate-950/90" />

        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-10 h-56 w-56 rounded-full bg-amber-200/20 blur-3xl" />

        <div className="app-container relative flex min-h-70 flex-col items-center justify-center gap-4 py-10 text-white sm:min-h-80 sm:py-12">
          <div className="flex flex-col items-center gap-3 text-center">
            <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">Search Hotels</h1>
            <p className="max-w-2xl text-sm text-white/80 sm:text-base">
              Find stays that match your budget, location, and travel style.
            </p>
          </div>

          <SearchBar className="mt-6" />
        </div>
      </section>

      {/* Main content */}
      <section className="app-container py-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Desktop sidebar — scrollable so all filters are accessible */}
          <aside className="hidden lg:sticky lg:top-25 lg:block lg:max-h-[calc(100vh-7rem)] lg:self-start">
            <div className="no-scrollbar flex max-h-[calc(100vh-7rem)] flex-col overflow-y-auto rounded-2xl border bg-white p-5">
              {filtersPanel}
            </div>
          </aside>

          {/* Listings */}
          <div className="min-w-0 space-y-6">
            {/* Sort bar (includes mobile filter sheet) */}
            <HotelSortBar
              totalResults={filteredHotels.length}
              visibleCount={displayedHotels.length}
              sortBy={sortBy}
              onSortChange={handleSortChange}
              filtersPanel={filtersPanel}
            />

            {/* Cards */}
            <div className="space-y-5">
              {isLoading &&
                Array.from({ length: HOTELS_PER_PAGE }).map((_, i) => (
                  <HotelCardSkeleton key={`skeleton-${i}`} />
                ))}

              {!isLoading &&
                displayedHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} searchContext={searchContext} />
                ))}
            </div>

            {/* Empty state */}
            {!isLoading && filteredHotels.length === 0 && (
              <div className="rounded-2xl border bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
                No hotels matched your filters. Try adjusting your price range or amenities.
              </div>
            )}

            {/* Infinite scroll sentinel */}
            {!isLoading && hasMore && (
              <div ref={sentinelRef} className="flex items-center justify-center py-8">
                <Loader2 className="text-primary size-6 animate-spin" />
                <span className="text-muted-foreground ml-2 text-sm">Loading more hotels...</span>
              </div>
            )}

            {/* End-of-list indicator */}
            {!isLoading &&
              filteredHotels.length > 0 &&
              !hasMore &&
              displayedHotels.length > HOTELS_PER_PAGE && (
                <div className="py-6 text-center text-xs text-slate-400">
                  You&apos;ve seen all {filteredHotels.length} hotels
                </div>
              )}
          </div>
        </div>
      </section>
    </div>
  );
}
