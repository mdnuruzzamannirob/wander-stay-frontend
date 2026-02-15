'use client';

import { FormEvent, useMemo, useState } from 'react';
import { CalendarRange, MapPin, Minus, Plus, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils/cn';

type SearchBarProps = {
  variant?: 'hero' | 'compact';
  onSearch?: (payload: {
    destination: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    rooms: number;
  }) => void;
};

const SearchBar = ({ variant = 'hero', onSearch }: SearchBarProps) => {
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const guestLabel = useMemo(() => {
    const guestCount = adults + children;
    return `${guestCount} Guest${guestCount === 1 ? '' : 's'}, ${rooms} Room${
      rooms === 1 ? '' : 's'
    }`;
  }, [adults, children, rooms]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch?.({ destination, checkIn, checkOut, adults, children, rooms });
  };

  const wrapperClasses = variant === 'hero' ? 'mt-8 w-full max-w-7xl' : 'w-full max-w-7xl';

  const innerClasses = variant === 'hero' ? 'bg-white/95' : 'bg-white';

  return (
    <div className={wrapperClasses}>
      <div className="rounded-3xl bg-linear-to-r from-white/60 via-white/90 to-white/60 p-px shadow-[0_25px_70px_-45px_rgba(15,23,42,0.8)]">
        <form
          className={cn(
            'flex flex-col gap-3 rounded-3xl p-4 text-slate-900 backdrop-blur sm:flex-row sm:flex-wrap sm:items-end',
            innerClasses,
          )}
          onSubmit={handleSubmit}
        >
          <div className="focus-within:border-primary/60 focus-within:ring-primary/20 flex flex-1 basis-60 flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm transition focus-within:ring-2">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-slate-500 uppercase">
              Destination
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <MapPin className="h-4 w-4" />
              </span>
              <input
                type="text"
                name="destination"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                placeholder="City, landmark, or hotel"
                className="h-10 border-0 bg-transparent px-0 text-sm font-semibold text-slate-800 shadow-none focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="focus-within:border-primary/60 focus-within:ring-primary/20 flex flex-1 basis-50 flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm transition focus-within:ring-2">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-slate-500 uppercase">
              Check-in
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <CalendarRange className="h-4 w-4" />
              </span>
              <input
                type="date"
                name="checkIn"
                value={checkIn}
                onChange={(event) => setCheckIn(event.target.value)}
                className="h-10 border-0 bg-transparent px-0 text-sm font-semibold text-slate-800 shadow-none focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="focus-within:border-primary/60 focus-within:ring-primary/20 flex flex-1 basis-50 flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm transition focus-within:ring-2">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-slate-500 uppercase">
              Check-out
            </span>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <CalendarRange className="h-4 w-4" />
              </span>
              <input
                type="date"
                name="checkOut"
                value={checkOut}
                onChange={(event) => setCheckOut(event.target.value)}
                className="h-10 border-0 bg-transparent px-0 text-sm font-semibold text-slate-800 shadow-none focus-visible:ring-0"
              />
            </div>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <button
                type="button"
                className="hover:border-primary/60 focus-visible:ring-primary/20 flex flex-1 basis-55 flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-left shadow-sm transition focus-visible:ring-2 focus-visible:outline-none"
              >
                <span className="text-[11px] font-semibold tracking-[0.2em] text-slate-500 uppercase">
                  Guests
                </span>
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                    <Users className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-semibold text-slate-800">{guestLabel}</span>
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-80 p-4">
              <div className="space-y-4">
                <GuestRow
                  label="Adults"
                  description="Ages 13+"
                  value={adults}
                  onDecrease={() => setAdults(Math.max(1, adults - 1))}
                  onIncrease={() => setAdults(adults + 1)}
                />
                <Separator />
                <GuestRow
                  label="Children"
                  description="Ages 0-12"
                  value={children}
                  onDecrease={() => setChildren(Math.max(0, children - 1))}
                  onIncrease={() => setChildren(children + 1)}
                />
                <Separator />
                <GuestRow
                  label="Rooms"
                  description="Select rooms"
                  value={rooms}
                  onDecrease={() => setRooms(Math.max(1, rooms - 1))}
                  onIncrease={() => setRooms(rooms + 1)}
                />
              </div>
            </PopoverContent>
          </Popover>

          <Button
            type="submit"
            size="lg"
            className="h-14 w-full gap-2 rounded-2xl text-sm sm:w-auto"
          >
            <Search className="h-4 w-4" />
            Search
          </Button>
        </form>
      </div>
    </div>
  );
};

type GuestRowProps = {
  label: string;
  description: string;
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

const GuestRow = ({ label, description, value, onDecrease, onIncrease }: GuestRowProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-900">{label}</p>
        <p className="text-xs text-slate-500">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={onDecrease}
          className="h-8 w-8"
        >
          <Minus className="h-3 w-3" />
        </Button>
        <span className="w-6 text-center text-sm font-semibold text-slate-800">{value}</span>
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={onIncrease}
          className="h-8 w-8"
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
