'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import SearchBar from '@/components/shared/searchbar/SearchBar';
import {
  HotelCard,
  HotelCardSkeleton,
  HotelFilters,
  HotelPagination,
  HotelSortBar,
} from '@/components/modules/hotels';
import { HOTELS, HOTELS_PER_PAGE, PRICE_BOUNDS } from '@/lib/constants/hotels-data';
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
  const [filters, setFilters] = useState<HotelFiltersState>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  /* ─── Derived ─────────────────────────────────────────── */

  const filteredHotels = useMemo(() => {
    const normalizedQuery = filters.query.trim().toLowerCase();

    const filtered = HOTELS.filter((hotel) => {
      const matchesQuery = normalizedQuery
        ? `${hotel.name} ${hotel.city} ${hotel.country}`.toLowerCase().includes(normalizedQuery)
        : true;
      const matchesCity = filters.city === 'All' || hotel.city === filters.city;
      const matchesPrice = hotel.price >= filters.minPrice && hotel.price <= filters.maxPrice;
      const matchesRating = filters.minRating ? hotel.rating >= filters.minRating : true;
      const matchesFreeCancellation = filters.freeCancellation ? hotel.freeCancellation : true;
      const matchesPayLater = filters.payLater ? hotel.payLater : true;
      const matchesTypes =
        filters.selectedTypes.length > 0
          ? filters.selectedTypes.includes(hotel.propertyType)
          : true;
      const matchesAmenities =
        filters.selectedAmenities.length > 0
          ? filters.selectedAmenities.every((a) => hotel.amenities.includes(a))
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
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.rating * Math.log(b.reviews + 1) - a.rating * Math.log(a.reviews + 1);
    });
  }, [filters, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredHotels.length / HOTELS_PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pageHotels = filteredHotels.slice(
    (safePage - 1) * HOTELS_PER_PAGE,
    safePage * HOTELS_PER_PAGE,
  );

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
    },
    [],
  );

  const handleClearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSortBy('recommended');
  }, []);

  /* ─── Effects ─────────────────────────────────────────── */

  useEffect(() => setPage(1), [filters, sortBy]);
  useEffect(() => {
    if (page !== safePage) setPage(safePage);
  }, [page, safePage]);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timeout);
  }, [filters, sortBy, page]);

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
      <section className="relative overflow-hidden">
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

        <div className="app-container relative py-12 text-white sm:py-16">
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">Search Hotels</h1>
            <p className="max-w-2xl text-sm text-white/80 sm:text-base">
              Find stays that match your budget, location, and travel style.
            </p>
          </div>
          <div className="mt-8 flex justify-center">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="app-container py-8 sm:py-10">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Desktop sidebar */}
          <aside className="hidden lg:sticky lg:top-25 lg:block lg:self-start">
            <div className="rounded-2xl border bg-white p-5">{filtersPanel}</div>
          </aside>

          {/* Listings */}
          <div className="min-w-0 space-y-6">
            {/* Sort bar (includes mobile filter sheet) */}
            <HotelSortBar
              totalResults={filteredHotels.length}
              visibleCount={pageHotels.length}
              sortBy={sortBy}
              onSortChange={setSortBy}
              filtersPanel={filtersPanel}
            />

            {/* Cards */}
            <div className="space-y-5">
              {isLoading &&
                Array.from({ length: HOTELS_PER_PAGE }).map((_, i) => (
                  <HotelCardSkeleton key={`skeleton-${i}`} />
                ))}

              {!isLoading && pageHotels.map((hotel) => <HotelCard key={hotel.id} hotel={hotel} />)}
            </div>

            {/* Empty state */}
            {!isLoading && filteredHotels.length === 0 && (
              <div className="rounded-2xl border bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
                No hotels matched your filters. Try adjusting your price range or amenities.
              </div>
            )}

            {/* Pagination */}
            {filteredHotels.length > 0 && (
              <HotelPagination
                currentPage={safePage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
