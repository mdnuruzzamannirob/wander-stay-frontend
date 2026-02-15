'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin, Minus, Plus, Search, Users } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils/cn';
import { Button, buttonVariants } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

function CustomCalendar({ selected, onSelect }: any) {
  return (
    <Calendar
      initialFocus
      mode="range"
      defaultMonth={selected?.from}
      selected={selected}
      onSelect={onSelect}
      numberOfMonths={2}
      // FIX: Overriding internal styles to remove outlines and customize colors
      className="p-3"
      classNames={{
        day_selected:
          'bg-rose-500 text-white hover:bg-rose-600 focus:bg-rose-600 focus:text-white rounded-full',
        day_today: 'bg-slate-100 text-slate-900 rounded-full',
        day_range_middle: 'aria-selected:bg-rose-100 aria-selected:text-rose-900',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-slate-100 focus:bg-slate-100 focus:text-slate-900 focus:ring-0 focus:outline-none rounded-full',
          // ^^^ focus:ring-0 and focus:outline-none removes the inner outline
        ),
      }}
    />
  );
}

export default function SearchBar() {
  const [date, setDate] = React.useState<DateRange | undefined>();
  const [adults, setAdults] = React.useState(2);
  const [children, setChildren] = React.useState(0);
  const [rooms, setRooms] = React.useState(1);

  // CustomCalendar moved to file scope above SearchBar to avoid creating components during render

  return (
    <div className="mx-auto w-full max-w-7xl p-4">
      {/* Main Container: Using items-center for vertical alignment */}
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200/80 bg-white p-2 md:flex-row md:gap-0 md:rounded-full">
        {/* 1. Destination */}
        <div className="group flex w-full flex-[1.5] cursor-text items-center gap-3 rounded-full px-5 py-3 transition-all hover:bg-slate-50 md:w-auto">
          <MapPin className="h-5 w-5 shrink-0 text-slate-400 transition-colors group-hover:text-rose-500" />
          <div className="flex flex-1 flex-col overflow-hidden">
            <label className="text-left text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              Where
            </label>
            <input
              type="text"
              placeholder="Search destinations"
              className="w-full truncate border-none bg-transparent p-0 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:ring-0 focus:outline-none"
            />
          </div>
        </div>

        {/* Separator with self-center to fix height alignment */}
        <Separator
          orientation="vertical"
          className="mx-2 hidden h-8 w-[1px] self-center bg-slate-200 md:block"
        />

        {/* 2. Check-in */}
        <div className="w-full flex-1 md:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <div className="group flex cursor-pointer items-center gap-3 rounded-full px-5 py-3 transition-all hover:bg-slate-50">
                <CalendarIcon className="h-5 w-5 shrink-0 text-slate-400 group-hover:text-rose-500" />
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                    Check in
                  </span>
                  <span className="truncate text-sm font-bold whitespace-nowrap text-slate-900">
                    {date?.from ? format(date.from, 'MMM dd') : 'Add date'}
                  </span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto rounded-3xl border-none p-0 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)]"
              align="center"
            >
              <CustomCalendar selected={date} onSelect={setDate} />
            </PopoverContent>
          </Popover>
        </div>

        <Separator
          orientation="vertical"
          className="mx-2 hidden h-8 w-[1px] self-center bg-slate-200 md:block"
        />

        {/* 3. Check-out */}
        <div className="w-full flex-1 md:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <div className="group flex cursor-pointer items-center gap-3 rounded-full px-5 py-3 transition-all hover:bg-slate-50">
                <CalendarIcon className="h-5 w-5 flex-shrink-0 text-slate-400 group-hover:text-rose-500" />
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                    Check out
                  </span>
                  <span className="truncate text-sm font-bold whitespace-nowrap text-slate-900">
                    {date?.to ? format(date.to, 'MMM dd') : 'Add date'}
                  </span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto rounded-3xl border-none p-0 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)]"
              align="center"
            >
              <CustomCalendar selected={date} onSelect={setDate} />
            </PopoverContent>
          </Popover>
        </div>

        <Separator
          orientation="vertical"
          className="mx-2 hidden h-8 w-[1px] self-center bg-slate-200 md:block"
        />

        {/* 4. Guests */}
        <div className="w-full flex-1 md:w-auto">
          <Popover>
            <PopoverTrigger asChild>
              <div className="group flex cursor-pointer items-center gap-3 rounded-full px-5 py-3 transition-all hover:bg-slate-50">
                <Users className="h-5 w-5 flex-shrink-0 text-slate-400 group-hover:text-rose-500" />
                <div className="flex flex-col overflow-hidden">
                  <span className="truncate text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                    Who
                  </span>
                  <span className="truncate text-sm font-bold text-slate-900">
                    {adults + children} Guests
                  </span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="w-80 rounded-3xl border-none bg-white p-6 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.2)]"
              align="end"
            >
              <div className="space-y-6">
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
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* 5. Search Button */}
        <Button className="h-12 w-full rounded-full bg-rose-500 px-8 text-base font-bold text-white shadow-lg shadow-rose-200/50 transition-all hover:bg-rose-600 active:scale-95 md:ml-2 md:h-14 md:w-auto">
          <Search className="h-5 w-5 stroke-[2.5px] md:mr-2" />
          <span className="inline">Search</span>
        </Button>
      </div>
    </div>
  );
}

function GuestRow({ label, sub, val, setVal, min }: any) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-sm font-bold text-slate-900">{label}</span>
        <span className="text-xs text-slate-500">{sub}</span>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-full border-slate-200 bg-transparent transition-colors hover:border-rose-500 hover:text-rose-500 focus:ring-0"
          onClick={() => setVal(Math.max(min, val - 1))}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="w-5 text-center text-sm font-bold text-slate-900">{val}</span>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-full border-slate-200 bg-transparent transition-colors hover:border-rose-500 hover:text-rose-500 focus:ring-0"
          onClick={() => setVal(val + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
