'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin, Search, Users } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils/cn';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import GuestRow from './GuestRow';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [destination, setDestination] = useState<string | null>(null);
  const [date, setDate] = useState<DateRange | undefined>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  return (
    <div className={cn('w-full', className)}>
      <div className="flex flex-col gap-2 rounded-2xl border bg-white p-2 lg:flex-row lg:rounded-full">
        {/* 1. Destination */}
        <div className="w-full min-w-0 flex-[1.3]">
          <Popover>
            <PopoverTrigger asChild>
              <div className="group flex cursor-pointer items-center gap-3 rounded-lg px-5 py-3 text-start transition-all hover:bg-gray-100 lg:rounded-full">
                <MapPin className="text-muted-foreground group-hover:text-primary size-5 shrink-0" />
                <div className="flex min-w-0 flex-col gap-1 overflow-hidden">
                  <span className="text-muted-foreground truncate text-[10px] font-bold tracking-wider uppercase">
                    Destination
                  </span>
                  <span
                    title={destination ?? ''}
                    className="text-foreground truncate text-sm font-medium"
                  >
                    {destination || (
                      <span className="text-muted-foreground">Search destinations</span>
                    )}
                  </span>
                </div>
              </div>
            </PopoverTrigger>

            <PopoverContent
              align="start"
              className="w-(--radix-popper-anchor-width) space-y-3 rounded-lg border bg-white p-3 shadow lg:w-80 lg:rounded-2xl"
            >
              {/* Search input */}
              <input
                type="text"
                placeholder="Search city, area or hotel"
                className="ring-primary w-full rounded-lg border px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:outline-none"
              />

              {/* Demo destination list */}
              <div className="custom-scrollbar h-full max-h-80 space-y-1 overflow-y-auto">
                {[
                  { city: "Cox's Bazar", country: 'Bangladesh' },
                  { city: 'Dhaka', country: 'Bangladesh' },
                  { city: 'Sylhet', country: 'Bangladesh' },
                  { city: 'Kuala Lumpur', country: 'Malaysia' },
                  { city: 'Bangkok', country: 'Thailand' },
                ].map((item) => {
                  const value = `${item.city}, ${item.country}`;
                  const active = destination === value;

                  return (
                    <button
                      key={item.city}
                      type="button"
                      onClick={() => setDestination(value)}
                      className={[
                        'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition',
                        active ? 'bg-gray-200' : 'hover:bg-gray-100',
                      ].join(' ')}
                    >
                      <MapPin className="size-4 text-slate-400" />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-slate-900">{item.city}</span>
                        <span className="text-xs text-slate-500">{item.country}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* 2. Check-in */}
        <div className="w-full flex-1">
          <Popover>
            <PopoverTrigger asChild>
              <div className="group flex cursor-pointer items-center gap-3 rounded-lg px-5 py-3 text-start transition-all hover:bg-gray-100 lg:rounded-full">
                <CalendarIcon className="text-muted-foreground group-hover:text-primary size-5 shrink-0" />
                <div className="flex flex-col gap-1 overflow-hidden">
                  <span className="text-muted-foreground truncate text-[10px] font-bold tracking-wider uppercase">
                    Check in
                  </span>
                  <span className="text-foreground truncate text-sm font-medium">
                    {date?.from ? (
                      format(date.from, 'MMM dd')
                    ) : (
                      <span className="text-muted-foreground">Add date</span>
                    )}
                  </span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-(--radix-popper-anchor-width) space-y-5 rounded-lg border bg-white p-5 shadow lg:w-auto lg:rounded-2xl"
              align="start"
            >
              <Calendar
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                className="p-0"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* 3. Check-out */}
        <div className="w-full flex-1">
          <Popover>
            <PopoverTrigger asChild>
              <div className="group flex cursor-pointer items-center gap-3 rounded-lg px-5 py-3 text-start transition-all hover:bg-gray-100 lg:rounded-full">
                <CalendarIcon className="text-muted-foreground group-hover:text-primary size-5 shrink-0" />
                <div className="flex flex-col gap-1 overflow-hidden">
                  <span className="text-muted-foreground truncate text-[10px] font-bold tracking-wider uppercase">
                    Check out
                  </span>
                  <span className="text-foreground truncate text-sm font-medium">
                    {date?.to ? (
                      format(date.to, 'MMM dd')
                    ) : (
                      <span className="text-muted-foreground">Add date</span>
                    )}
                  </span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-(--radix-popper-anchor-width) space-y-5 rounded-lg border bg-white p-5 shadow lg:w-auto lg:rounded-2xl"
              align="end"
            >
              <Calendar
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                className="p-0"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* 4. Guests */}
        <div className="w-full flex-[1.1]">
          <Popover>
            <PopoverTrigger asChild>
              <div className="group flex cursor-pointer items-center gap-3 rounded-lg px-5 py-3 text-start transition-all hover:bg-gray-100 lg:rounded-full">
                <Users className="text-muted-foreground group-hover:text-primary size-5 shrink-0" />
                <div className="flex flex-col gap-1 overflow-hidden">
                  <span className="text-muted-foreground truncate text-[10px] font-bold tracking-wider uppercase">
                    Guests & Room
                  </span>
                  <span className="text-foreground truncate text-sm font-medium">
                    {adults + children} {adults + children > 1 ? 'Guests' : 'Guest'}, {rooms}{' '}
                    {rooms > 1 ? 'Rooms' : 'Room'}
                  </span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-(--radix-popper-anchor-width) space-y-5 rounded-lg border bg-white p-5 shadow lg:w-64 lg:rounded-2xl"
              align="end"
            >
              <GuestRow label="Adults" sub="Ages 13+" val={adults} setVal={setAdults} min={1} />
              <Separator className="bg-slate-100" />
              <GuestRow
                label="Children"
                sub="Ages 2-12"
                val={children}
                setVal={setChildren}
                min={0}
              />
              <Separator className="bg-slate-100" />
              <GuestRow label="Rooms" sub="Total rooms" val={rooms} setVal={setRooms} min={1} />
            </PopoverContent>
          </Popover>
        </div>

        {/* 5. Search Button */}
        <button
          type="button"
          onClick={() => router.push('/hotels')}
          className="bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 rounded-lg px-6 py-3 transition lg:rounded-full"
        >
          <Search className="size-5 shrink-0 stroke-[2.5px]" />
          Search
        </button>
      </div>
    </div>
  );
}
