import Image from 'next/image';
import Link from 'next/link';
import { BadgeCheck, MapPin, Star, Heart, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Hotel } from '@/types/hotel';

type HotelCardProps = {
  hotel: Hotel;
  searchContext?: string;
};

export default function HotelCard({ hotel, searchContext }: HotelCardProps) {
  const getRatingStatus = (rating: number) => {
    if (rating >= 4.8) return 'Exceptional';
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 4.2) return 'Very Good';
    if (rating >= 3.8) return 'Good';
    if (rating >= 3.5) return 'Pleasant';
    return 'Recommended';
  };

  return (
    <Link href={`/hotels/${hotel.id}${searchContext ? `?${searchContext}` : ''}`} className="block">
      <article className="group relative flex flex-col overflow-hidden rounded-2xl border bg-white md:h-90 md:flex-row">
        {/* --- Media Section --- */}
        <div className="relative h-70 w-full shrink-0 overflow-hidden md:h-full md:w-80">
          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Floating Badges  */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-start justify-between p-3">
            <div className="flex w-full items-start justify-between">
              {hotel.tag && (
                <span className="pointer-events-auto rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-md">
                  {hotel.tag}
                </span>
              )}
              <button
                onClick={(e) => e.preventDefault()}
                className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-slate-900 backdrop-blur-md transition-all hover:bg-white hover:text-red-500"
              >
                <Heart className="size-5" />
              </button>
            </div>

            <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white bg-white/95 px-1.5 py-1 shadow backdrop-blur-md">
              <div className="flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-[10px] font-semibold text-white">
                <Star className="size-2.5 fill-current leading-0" /> {hotel.rating}
              </div>
              <span className="text-foreground text-[10px] font-semibold tracking-tight uppercase">
                {getRatingStatus(hotel.rating)}
              </span>
            </div>
          </div>
        </div>

        {/* --- Content Body --- */}
        <div className="flex min-w-0 flex-1 flex-col p-5">
          {/* Header */}
          <div className="flex flex-col gap-1">
            <div className="flex items-start justify-between gap-4">
              <h3 className="truncate text-lg leading-tight font-semibold tracking-tight md:text-xl">
                {hotel.name}
              </h3>
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary shrink-0 font-semibold"
              >
                {hotel.propertyType}
              </Badge>
            </div>

            <div className="text-muted-foreground flex items-center gap-1 text-sm font-medium">
              <MapPin className="text-primary size-4 shrink-0" />
              <span className="truncate">
                {hotel.city}, {hotel.country}
              </span>
              <span className="ml-1 shrink-0 font-normal">• {hotel.distanceKm}km to center</span>
            </div>
          </div>

          {/* Dynamic Description */}
          <p className="text-muted-foreground mt-3 line-clamp-2 text-sm leading-relaxed md:line-clamp-3">
            Experience world-class hospitality at{' '}
            <span className="font-semibold text-slate-800">{hotel.name}</span>. Enjoy premium access
            to {hotel.amenities.join(', ')} and more, making it an ideal choice for your stay in{' '}
            {hotel.city}.
          </p>

          {/* Amenities (Max 3 Show logic) */}
          <div className="mt-3 flex flex-wrap items-center gap-1">
            {hotel.amenities.slice(0, 3).map((amenity) => (
              <div
                key={amenity}
                className="text-muted-foreground flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[10px] font-semibold uppercase"
              >
                <div className="bg-primary size-1.5 rounded-full" />
                {amenity}
              </div>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="text-muted-foreground ml-1 text-[10px] font-semibold">
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>

          {/* Features Row */}
          <div className="mt-3 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <BadgeCheck className="size-4" />
              <span>{hotel.payLater ? 'Pay at Property' : 'Instant Confirmation'}</span>
            </div>
            {hotel.freeCancellation && (
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600">
                <Clock className="size-4" />
                <span>Free Cancellation</span>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-between gap-4 border-t border-gray-200 pt-5 md:mt-auto">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs font-medium tracking-wider">From</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">${hotel.price}</span>
                <span className="text-muted-foreground text-xs font-medium">/ night</span>
              </div>
            </div>

            <Button size="lg" className="font-semibold">
              Book Now
            </Button>
          </div>
        </div>
      </article>
    </Link>
  );
}
