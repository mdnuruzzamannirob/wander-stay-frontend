'use client';

import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import type { SortOption } from '@/types/hotel';
import { Label } from '@/components/shared/Label';

type HotelSortBarProps = {
  totalResults: number;
  visibleCount: number;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  filtersPanel: React.ReactNode;
};

export default function HotelSortBar({
  totalResults,
  visibleCount,
  sortBy,
  onSortChange,
  filtersPanel,
}: HotelSortBarProps) {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <div className="hidden lg:block">
        <p className="text-sm font-medium">{totalResults} results found</p>
        <p className="text-muted-foreground text-xs">
          Showing {visibleCount} of {totalResults} results
        </p>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2 lg:hidden">
            <SlidersHorizontal className="size-4" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full max-w-none border-r-0 p-0 sm:max-w-sm">
          <SheetHeader className="border-b">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-base">Filters</SheetTitle>
              <SheetClose asChild>
                <button type="button" className="rounded-full p-2 hover:bg-gray-100">
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

      <div className="flex items-center gap-2">
        <Label className="whitespace-nowrap max-sm:hidden">Sort by</Label>
        <Select value={sortBy} onValueChange={(v) => onSortChange(v as SortOption)}>
          <SelectTrigger className="gap-2 shadow-none">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent position="popper" align="end">
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="rating">Highest rated</SelectItem>
            <SelectItem value="price-low">Price: low to high</SelectItem>
            <SelectItem value="price-high">Price: high to low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
