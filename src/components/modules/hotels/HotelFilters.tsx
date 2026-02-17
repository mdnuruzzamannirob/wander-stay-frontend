'use client';

import { Search, SlidersHorizontal, Star, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DualRangeSlider from './DualRangeSlider';
import { AMENITY_OPTIONS, CITIES, PRICE_BOUNDS, PROPERTY_TYPES } from '@/lib/constants/hotels-data';
import type { HotelFiltersState } from '@/types/hotel';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/shared/Label';

type HotelFiltersProps = {
  filters: HotelFiltersState;
  onChange: <K extends keyof HotelFiltersState>(key: K, value: HotelFiltersState[K]) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
  activeChips: string[];
};

export default function HotelFilters({
  filters,
  onChange,
  onClear,
  hasActiveFilters,
  activeChips,
}: HotelFiltersProps) {
  const toggleAmenity = (amenity: string) => {
    const next = filters.selectedAmenities.includes(amenity)
      ? filters.selectedAmenities.filter((a) => a !== amenity)
      : [...filters.selectedAmenities, amenity];
    onChange('selectedAmenities', next);
  };

  const toggleType = (type: string) => {
    const next = filters.selectedTypes.includes(type)
      ? filters.selectedTypes.filter((t) => t !== type)
      : [...filters.selectedTypes, type];
    onChange('selectedTypes', next);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
          <SlidersHorizontal className="size-4 shrink-0" />
          Filters
        </div>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
            className="text-destructive hover:text-destructive border-destructive/15 hover:bg-destructive/5 text-xs font-semibold"
          >
            <X className="size-3.5 shrink-0" />
            Clear all
          </Button>
        )}
      </div>

      {/* Active chips */}
      {activeChips.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {activeChips.map((chip) => (
            <span
              key={chip}
              className="text-muted-foreground rounded-full bg-gray-100 px-3 py-1 text-[11px] font-semibold"
            >
              {chip}
            </span>
          ))}
        </div>
      )}

      {/* Search — style matches SearchBar destination input */}
      <div className="space-y-2 border-b pb-5">
        <Label>Search</Label>
        <div className="relative">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <input
            type="text"
            value={filters.query}
            onChange={(e) => onChange('query', e.target.value)}
            placeholder="Search city, area or hotel"
            className="ring-primary w-full rounded-md border px-3 py-2 pl-9 text-sm focus:border-transparent focus:ring-2 focus:outline-none"
          />
        </div>
      </div>

      {/* City — dropdown with scrollbar */}
      <div className="space-y-2 border-b pb-5">
        <Label>City</Label>
        <Select value={filters.city} onValueChange={(v) => onChange('city', v)}>
          <SelectTrigger className="h-9.5!">
            <SelectValue placeholder="All cities" />
          </SelectTrigger>
          <SelectContent
            position="popper"
            className="max-h-80 w-(--radix-popper-anchor-width) overflow-y-auto"
          >
            <SelectItem value="All">All cities</SelectItem>
            {CITIES.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price range — dual slider */}
      <div className="space-y-2 border-b pb-5">
        <Label>Price Range</Label>
        <DualRangeSlider
          min={PRICE_BOUNDS.min}
          max={PRICE_BOUNDS.max}
          minValue={filters.minPrice}
          maxValue={filters.maxPrice}
          onMinChange={(v) => onChange('minPrice', v)}
          onMaxChange={(v) => onChange('maxPrice', v)}
        />
      </div>

      {/* Star rating — 1 to 5 */}
      <div className="space-y-2 border-b pb-5">
        <Label>Star Rating</Label>
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => onChange('minRating', filters.minRating === rating ? 0 : rating)}
              className={`flex items-center justify-center gap-1 rounded-md border px-2 py-2 text-xs font-semibold transition ${
                filters.minRating === rating
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'hover:border-primary/50 text-muted-foreground'
              }`}
            >
              <Star className="size-4 text-amber-400" />
              {rating}
            </button>
          ))}
        </div>
      </div>

      {/* Property type */}
      <div className="space-y-2 border-b pb-5">
        <Label>Property Type</Label>
        <div className="space-y-2">
          {PROPERTY_TYPES.map((type) => (
            <label
              key={type}
              className="group text-muted-foreground flex w-fit cursor-pointer items-center gap-2 text-sm select-none"
            >
              <Checkbox
                checked={filters.selectedTypes.includes(type)}
                onCheckedChange={() => toggleType(type)}
                className="group-hover:border-primary/50 transition-all duration-100"
              />
              {type}
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-2 border-b pb-5">
        <Label>Amenities</Label>
        <div className="space-y-2">
          {AMENITY_OPTIONS.map((amenity) => (
            <label
              key={amenity}
              className="group text-muted-foreground flex w-fit cursor-pointer items-center gap-2 text-sm select-none"
            >
              <Checkbox
                checked={filters.selectedAmenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
                className="group-hover:border-primary/50 transition-all duration-100"
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>

      {/* Booking perks */}
      <div className="space-y-2">
        <Label>Booking Perks</Label>
        <div className="space-y-2">
          <label className="group text-muted-foreground flex w-fit cursor-pointer items-center gap-2 text-sm select-none">
            <Checkbox
              checked={filters.freeCancellation}
              onCheckedChange={() => onChange('freeCancellation', !filters.freeCancellation)}
              className="group-hover:border-primary/50 transition-all duration-100"
            />
            Free cancellation
          </label>
          <label className="group text-muted-foreground flex w-fit cursor-pointer items-center gap-2 text-sm select-none">
            <Checkbox
              checked={filters.payLater}
              onCheckedChange={() => onChange('payLater', !filters.payLater)}
              className="group-hover:border-primary/50 transition-all duration-100"
            />
            Reserve now, pay later
          </label>
        </div>
      </div>
    </div>
  );
}
