'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  MapPin,
  SlidersHorizontal,
  Star,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import SearchBar from '@/components/shared/searchbar/SearchBar';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const hotels = [
  {
    id: 'h1',
    name: 'Grand Luxury Palace',
    city: 'Miami',
    country: 'United States',
    rating: 4.9,
    reviews: 1482,
    price: 450,
    tag: '5-Star Hotel',
    image:
      'https://images.unsplash.com/photo-1729188430325-eb540fcdd941?auto=format&fit=crop&w=1200&q=80',
    amenities: ['Private beach', 'Infinity pool', 'Butler service', 'Spa'],
    propertyType: 'Resort',
    distanceKm: 1.2,
    freeCancellation: true,
    payLater: true,
  },
  {
    id: 'h2',
    name: 'Amber Cove Resort',
    city: 'Male',
    country: 'Maldives',
    rating: 4.8,
    reviews: 962,
    price: 520,
    tag: 'Couple Favorite',
    image:
      'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80',
    amenities: ['Overwater villas', 'Floating breakfast', 'Sunset cruise', 'Spa'],
    propertyType: 'Villa',
    distanceKm: 0.6,
    freeCancellation: false,
    payLater: true,
  },
  {
    id: 'h3',
    name: 'Sunset Marina Retreat',
    city: 'Phuket',
    country: 'Thailand',
    rating: 4.7,
    reviews: 1231,
    price: 390,
    tag: 'Top Rated',
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    amenities: ['Lagoon pool', 'Family suites', 'Gym', 'Free breakfast'],
    propertyType: 'Resort',
    distanceKm: 3.4,
    freeCancellation: true,
    payLater: false,
  },
  {
    id: 'h4',
    name: 'Emerald Hills Hideaway',
    city: 'Ubud',
    country: 'Indonesia',
    rating: 4.8,
    reviews: 856,
    price: 410,
    tag: 'Wellness',
    image:
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80',
    amenities: ['Yoga pavilion', 'Ayurveda menu', 'Spa', 'Free breakfast'],
    propertyType: 'Boutique',
    distanceKm: 2.1,
    freeCancellation: true,
    payLater: true,
  },
  {
    id: 'h5',
    name: 'Pearl Bay Residence',
    city: 'Dubai',
    country: 'United Arab Emirates',
    rating: 4.9,
    reviews: 1763,
    price: 610,
    tag: 'Skyline Views',
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    amenities: ['Sky pool', 'Concierge', 'Gym', 'Spa'],
    propertyType: 'Hotel',
    distanceKm: 1.8,
    freeCancellation: true,
    payLater: true,
  },
  {
    id: 'h6',
    name: 'Seabreeze Vista',
    city: 'Santorini',
    country: 'Greece',
    rating: 4.8,
    reviews: 1140,
    price: 470,
    tag: 'Best Seller',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    amenities: ['Cliff suites', 'Sunset terraces', 'Spa', 'Airport pickup'],
    propertyType: 'Boutique',
    distanceKm: 0.9,
    freeCancellation: false,
    payLater: true,
  },
  {
    id: 'h7',
    name: 'Harborlight Suites',
    city: 'Singapore',
    country: 'Singapore',
    rating: 4.6,
    reviews: 684,
    price: 360,
    tag: 'City Escape',
    image:
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80',
    amenities: ['Sky lounge', 'Gym', 'Free breakfast', 'Airport pickup'],
    propertyType: 'Hotel',
    distanceKm: 0.5,
    freeCancellation: true,
    payLater: true,
  },
  {
    id: 'h8',
    name: 'Azure Dunes Lodge',
    city: 'Doha',
    country: 'Qatar',
    rating: 4.5,
    reviews: 492,
    price: 330,
    tag: 'Desert Chic',
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    amenities: ['Desert tours', 'Spa', 'Rooftop bar', 'Gym'],
    propertyType: 'Resort',
    distanceKm: 4.2,
    freeCancellation: true,
    payLater: false,
  },
  {
    id: 'h9',
    name: 'Willow Creek Chalet',
    city: 'Aspen',
    country: 'United States',
    rating: 4.7,
    reviews: 578,
    price: 540,
    tag: 'Ski-In',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80',
    amenities: ['Ski storage', 'Fireplace', 'Spa', 'Breakfast'],
    propertyType: 'Chalet',
    distanceKm: 2.9,
    freeCancellation: false,
    payLater: true,
  },
  {
    id: 'h10',
    name: 'Lagoon Pearl Retreat',
    city: 'Bali',
    country: 'Indonesia',
    rating: 4.6,
    reviews: 1088,
    price: 280,
    tag: 'Family Favorite',
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    amenities: ['Kids club', 'Pool', 'Gym', 'Free breakfast'],
    propertyType: 'Resort',
    distanceKm: 3.1,
    freeCancellation: true,
    payLater: true,
  },
  {
    id: 'h11',
    name: 'Aster Court Boutique',
    city: 'Paris',
    country: 'France',
    rating: 4.7,
    reviews: 915,
    price: 490,
    tag: 'Romantic',
    image:
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
    amenities: ['Champagne bar', 'Airport pickup', 'Concierge', 'Spa'],
    propertyType: 'Boutique',
    distanceKm: 0.7,
    freeCancellation: true,
    payLater: false,
  },
  {
    id: 'h12',
    name: 'Nordic Harbor Hotel',
    city: 'Copenhagen',
    country: 'Denmark',
    rating: 4.4,
    reviews: 402,
    price: 310,
    tag: 'Harbor View',
    image:
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80',
    amenities: ['Sauna', 'Gym', 'Breakfast', 'Bike rental'],
    propertyType: 'Hotel',
    distanceKm: 1.1,
    freeCancellation: true,
    payLater: true,
  },
  {
    id: 'h13',
    name: 'Sapphire Dusk Villas',
    city: 'Mykonos',
    country: 'Greece',
    rating: 4.9,
    reviews: 621,
    price: 690,
    tag: 'Ultra Luxury',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    amenities: ['Private pool', 'Butler service', 'Spa', 'Airport pickup'],
    propertyType: 'Villa',
    distanceKm: 2.4,
    freeCancellation: false,
    payLater: true,
  },
  {
    id: 'h14',
    name: 'Coral Bay Garden',
    city: 'Sydney',
    country: 'Australia',
    rating: 4.5,
    reviews: 734,
    price: 340,
    tag: 'Garden Escape',
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    amenities: ['Garden suites', 'Pool', 'Gym', 'Breakfast'],
    propertyType: 'Hotel',
    distanceKm: 5.1,
    freeCancellation: true,
    payLater: true,
  },
];

const propertyTypes = ['Hotel', 'Resort', 'Boutique', 'Villa', 'Chalet'];
const amenityOptions = [
  'Spa',
  'Gym',
  'Free breakfast',
  'Airport pickup',
  'Pool',
  'Private beach',
  'Concierge',
  'Butler service',
];

const priceBounds = hotels.reduce(
  (acc, hotel) => {
    return {
      min: Math.min(acc.min, hotel.price),
      max: Math.max(acc.max, hotel.price),
    };
  },
  { min: hotels[0].price, max: hotels[0].price },
);

const cities = Array.from(new Set(hotels.map((hotel) => hotel.city)));

const perPage = 4;

export default function HotelsPage() {
  const [query, setQuery] = useState('');
  const [city, setCity] = useState('All');
  const [maxPrice, setMaxPrice] = useState(priceBounds.max);
  const [minRating, setMinRating] = useState(0);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [freeCancellation, setFreeCancellation] = useState(false);
  const [payLater, setPayLater] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const filteredHotels = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = hotels.filter((hotel) => {
      const matchesQuery = normalizedQuery
        ? `${hotel.name} ${hotel.city} ${hotel.country}`.toLowerCase().includes(normalizedQuery)
        : true;
      const matchesCity = city === 'All' ? true : hotel.city === city;
      const matchesPrice = hotel.price <= maxPrice;
      const matchesRating = minRating ? hotel.rating >= minRating : true;
      const matchesFreeCancellation = freeCancellation ? hotel.freeCancellation : true;
      const matchesPayLater = payLater ? hotel.payLater : true;
      const matchesTypes =
        selectedTypes.length > 0 ? selectedTypes.includes(hotel.propertyType) : true;
      const matchesAmenities =
        selectedAmenities.length > 0
          ? selectedAmenities.every((amenity) => hotel.amenities.includes(amenity))
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

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;

      const scoreA = a.rating * Math.log(a.reviews + 1);
      const scoreB = b.rating * Math.log(b.reviews + 1);
      return scoreB - scoreA;
    });

    return sorted;
  }, [
    city,
    freeCancellation,
    maxPrice,
    minRating,
    payLater,
    query,
    selectedAmenities,
    selectedTypes,
    sortBy,
  ]);

  const totalPages = Math.max(1, Math.ceil(filteredHotels.length / perPage));
  const safePage = Math.min(page, totalPages);
  const pageHotels = filteredHotels.slice((safePage - 1) * perPage, safePage * perPage);

  const hasActiveFilters = useMemo(() => {
    return (
      query.trim().length > 0 ||
      city !== 'All' ||
      maxPrice !== priceBounds.max ||
      minRating > 0 ||
      selectedAmenities.length > 0 ||
      selectedTypes.length > 0 ||
      freeCancellation ||
      payLater
    );
  }, [
    city,
    freeCancellation,
    maxPrice,
    minRating,
    payLater,
    query,
    selectedAmenities,
    selectedTypes,
  ]);

  const activeChips = useMemo(() => {
    const chips: string[] = [];

    if (query.trim().length > 0) chips.push(`Search: ${query.trim()}`);
    if (city !== 'All') chips.push(`City: ${city}`);
    if (maxPrice !== priceBounds.max) chips.push(`Up to $${maxPrice}`);
    if (minRating > 0) chips.push(`${minRating}+ rating`);
    if (selectedTypes.length > 0) chips.push(`Type: ${selectedTypes.length}`);
    if (selectedAmenities.length > 0) chips.push(`Amenities: ${selectedAmenities.length}`);
    if (freeCancellation) chips.push('Free cancellation');
    if (payLater) chips.push('Pay later');

    return chips;
  }, [
    city,
    freeCancellation,
    maxPrice,
    minRating,
    payLater,
    query,
    selectedAmenities.length,
    selectedTypes.length,
  ]);

  useEffect(() => {
    setPage(1);
  }, [
    city,
    freeCancellation,
    maxPrice,
    minRating,
    payLater,
    query,
    selectedAmenities,
    selectedTypes,
    sortBy,
  ]);

  useEffect(() => {
    if (page !== safePage) setPage(safePage);
  }, [page, safePage]);

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => setIsLoading(false), 450);
    return () => clearTimeout(timeout);
  }, [
    city,
    freeCancellation,
    maxPrice,
    minRating,
    page,
    payLater,
    query,
    selectedAmenities,
    selectedTypes,
    sortBy,
  ]);

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((item) => item !== amenity) : [...prev, amenity],
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((item) => item !== type) : [...prev, type],
    );
  };

  const clearFilters = () => {
    setQuery('');
    setCity('All');
    setMaxPrice(priceBounds.max);
    setMinRating(0);
    setSelectedAmenities([]);
    setSelectedTypes([]);
    setFreeCancellation(false);
    setPayLater(false);
    setSortBy('recommended');
  };

  const priceSpan = priceBounds.max - priceBounds.min;
  const maxPercent = ((maxPrice - priceBounds.min) / priceSpan) * 100;

  const filtersPanel = (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <SlidersHorizontal className="size-4" />
          Filters
        </div>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-primary inline-flex items-center gap-1 text-xs font-semibold"
          >
            <X className="size-3" />
            Clear all
          </button>
        )}
      </div>

      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeChips.map((chip) => (
            <span
              key={chip}
              className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600"
            >
              {chip}
            </span>
          ))}
        </div>
      )}

      <div className="space-y-2 border-b border-slate-100 pb-4">
        <label className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
          Search
        </label>
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Hotel, city, country"
        />
      </div>

      <div className="space-y-2 border-b border-slate-100 pb-4">
        <label className="text-xs font-semibold tracking-wide text-slate-500 uppercase">City</label>
        <Select value={city} onValueChange={setCity}>
          <SelectTrigger>
            <SelectValue placeholder="All cities" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectGroup>
              <SelectLabel>City</SelectLabel>
              <SelectSeparator />
              <SelectItem value="All">All cities</SelectItem>
              {cities.map((cityItem) => (
                <SelectItem key={cityItem} value={cityItem}>
                  {cityItem}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3 border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            Price range
          </label>
          <span className="text-xs font-semibold text-slate-700">Up to ${maxPrice}</span>
        </div>
        <input
          type="range"
          min={priceBounds.min}
          max={priceBounds.max}
          value={maxPrice}
          onChange={(event) => setMaxPrice(Number(event.target.value))}
          className="accent-primary h-2 w-full cursor-pointer"
        />
        <div className="relative h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div className="bg-primary absolute inset-y-0" style={{ width: `${maxPercent}%` }} />
        </div>
      </div>

      <div className="space-y-2 border-b border-slate-100 pb-4">
        <label className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
          Star rating
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[5, 4.5, 4, 3.5].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => setMinRating(rating)}
              className={`flex items-center justify-center gap-1 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                minRating === rating
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'hover:border-primary/40 border-slate-200 text-slate-600'
              }`}
            >
              <Star className="size-3 text-amber-400" />
              {rating}+
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setMinRating(0)}
          className="hover:text-primary text-xs font-medium text-slate-500"
        >
          Clear rating
        </button>
      </div>

      <div className="space-y-2 border-b border-slate-100 pb-4">
        <label className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
          Property type
        </label>
        <div className="space-y-2">
          {propertyTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 text-sm text-slate-600">
              <Checkbox
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => toggleType(type)}
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2 border-b border-slate-100 pb-4">
        <label className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
          Amenities
        </label>
        <div className="space-y-2">
          {amenityOptions.map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 text-sm text-slate-600">
              <Checkbox
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
          Booking perks
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <Checkbox
              checked={freeCancellation}
              onCheckedChange={() => setFreeCancellation((prev) => !prev)}
            />
            Free cancellation
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <Checkbox checked={payLater} onCheckedChange={() => setPayLater((prev) => !prev)} />
            Reserve now, pay later
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50">
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

      <section className="app-container py-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">{filtersPanel}</div>
          </aside>

          <div className="space-y-6">
            <div className="flex items-center justify-between gap-3 lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <SlidersHorizontal className="size-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full max-w-none border-l-0 p-0 sm:max-w-sm">
                  <SheetHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <SheetTitle className="text-base">Filters</SheetTitle>
                      <SheetClose asChild>
                        <button type="button" className="rounded-full p-2 hover:bg-slate-100">
                          <X className="size-4" />
                        </button>
                      </SheetClose>
                    </div>
                  </SheetHeader>
                  <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto p-5">
                    {filtersPanel}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-white px-4 py-3 shadow-sm">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  {filteredHotels.length} properties found
                </p>
                <p className="text-xs text-slate-500">
                  Showing {pageHotels.length} of {filteredHotels.length} results
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                  Sort by
                </span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-9 w-47.5">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectGroup>
                      <SelectLabel>Sort by</SelectLabel>
                      <SelectSeparator />
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="rating">Highest rated</SelectItem>
                      <SelectItem value="price-low">Price: low to high</SelectItem>
                      <SelectItem value="price-high">Price: high to low</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-5">
              {isLoading &&
                Array.from({ length: perPage }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm md:flex-row"
                  >
                    <div className="h-56 w-full animate-pulse bg-slate-200 md:h-auto md:w-60" />
                    <div className="flex flex-1 flex-col p-5">
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
                      <div className="mt-4 h-px w-full bg-slate-200" />
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
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
                ))}

              {!isLoading &&
                pageHotels.map((hotel) => (
                  <article
                    key={hotel.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md md:flex-row"
                  >
                    <div className="relative md:w-60">
                      <Image
                        src={hotel.image}
                        alt={hotel.name}
                        width={420}
                        height={320}
                        className="h-56 w-full object-cover md:h-full"
                        loading="lazy"
                      />
                      <span className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700">
                        {hotel.tag}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-lg font-semibold text-slate-900">{hotel.name}</h3>
                            <Badge variant="outline" className="text-xs">
                              {hotel.propertyType}
                            </Badge>
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                            <MapPin className="size-4" />
                            {hotel.city}, {hotel.country}
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-sm font-semibold text-slate-900">
                          <Star className="size-4 text-amber-400" />
                          {hotel.rating}
                        </div>
                      </div>

                      <p className="mt-3 text-sm text-slate-500">
                        Experience world-class service at {hotel.name} with curated amenities and
                        effortless check-in.
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {hotel.amenities.slice(0, 4).map((amenity) => (
                          <Badge key={amenity} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        {hotel.freeCancellation && (
                          <Badge variant="secondary" className="bg-emerald-50 text-emerald-600">
                            Free cancellation
                          </Badge>
                        )}
                        <span className="flex items-center gap-2">
                          <BadgeCheck className="size-4 text-emerald-500" />
                          {hotel.payLater ? 'Reserve now, pay later' : 'Instant confirmation'}
                        </span>
                        <span className="text-slate-300">|</span>
                        {hotel.distanceKm} km to center
                      </div>

                      <div className="my-4 h-px w-full bg-slate-200" />

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                          {['Stripe', 'Visa', 'Apple Pay', 'GPay'].map((label) => (
                            <span
                              key={label}
                              className="rounded-md border border-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-500"
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="text-xs text-slate-500">From</p>
                            <p className="text-primary text-lg font-semibold">
                              ${hotel.price}
                              <span className="text-xs font-medium text-slate-500"> / night</span>
                            </p>
                          </div>
                          <Button className="rounded-full">Book Now</Button>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
            </div>

            {!isLoading && filteredHotels.length === 0 && (
              <div className="rounded-2xl border bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
                No hotels matched your filters. Try adjusting your price range or amenities.
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border bg-white px-4 py-3 shadow-sm">
              <p className="text-xs font-medium text-slate-500">
                Page {safePage} of {totalPages}
              </p>
              <div className="flex items-center gap-2 rounded-full bg-slate-50 px-2 py-1">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={safePage === 1}
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                >
                  <ChevronLeft className="size-4" />
                  Prev
                </Button>
                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;
                  const active = pageNumber === safePage;
                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setPage(pageNumber)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition ${
                        active ? 'bg-primary text-white' : 'text-slate-600 hover:bg-white'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={safePage === totalPages}
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                >
                  Next
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
