import Image from 'next/image';
import { BadgeCheck, MapPin, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Hotel } from '@/types/hotel';

type HotelCardProps = {
  hotel: Hotel;
};

export default function HotelCard({ hotel }: HotelCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border bg-white">
      {/* Layout wrapper */}
      <div className="flex h-full flex-col md:h-85 md:flex-row">
        {/* Media */}
        <div className="relative md:w-64 md:shrink-0">
          <Image
            src={hotel.image}
            alt={hotel.name}
            width={640}
            height={480}
            className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] md:h-full"
            loading="lazy"
          />

          {/* Top overlays */}
          <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/0 to-black/0" />

          {/* Tag pill */}
          {hotel.tag ? (
            <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur">
              {hotel.tag}
            </span>
          ) : null}

          {/* Rating chip (mobile-friendly) */}
          <div className="absolute bottom-4 left-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur">
            <Star className="size-4 text-amber-400" />
            <span>{hotel.rating}</span>
          </div>
        </div>

        {/* Body */}
        <div className="flex min-w-0 flex-1 flex-col p-5">
          {/* Top */}
          <div className="min-w-0">
            <div className="flex w-full items-center gap-2">
              <h3 className="truncate text-lg font-semibold md:text-xl">{hotel.name}</h3>

              {hotel.propertyType ? (
                <Badge variant="outline" className="text-[11px]">
                  {hotel.propertyType}
                </Badge>
              ) : null}
            </div>

            <div className="text-muted-foreground mt-1 flex items-center gap-1 text-sm">
              <MapPin className="text-primary size-4 shrink-0" />
              <span title={hotel.city + ', ' + hotel.country} className="truncate">
                {hotel.city}, {hotel.country}
              </span>

              {hotel.distanceKm && (
                <>
                  <span className="text-muted-foreground inline">•</span>
                  <span className="inline whitespace-nowrap">{hotel.distanceKm} km to center</span>
                </>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mt-3 line-clamp-3 text-sm">
            Experience world-class service at{' '}
            <span className="font-medium text-gray-800">{hotel.name}</span> with curated amenities
            and effortless check-in. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Doloribus vel sit nulla possimus architecto eaque, veritatis debitis culpa atque officia
            nam. Iste sequi minima doloribus aliquam dicta beatae. Quae, recusandae!
          </p>

          {/* Amenities */}
          <div className="mt-3 flex flex-wrap gap-2">
            {hotel.amenities.slice(0, 6).map((amenity) => (
              <Badge
                key={amenity}
                variant="secondary"
                className="bg-slate-50 text-xs text-slate-700"
              >
                {amenity}
              </Badge>
            ))}
            {hotel.amenities.length > 6 ? (
              <span className="text-muted-foreground text-xs font-medium">
                +{hotel.amenities.length - 6} more
              </span>
            ) : null}
          </div>

          {/* Meta row */}
          <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
            {hotel.freeCancellation ? (
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
                Free cancellation
              </Badge>
            ) : null}

            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="size-4 text-emerald-600" />
              <span className="font-medium text-slate-700">
                {hotel.payLater ? 'Reserve now, pay later' : 'Instant confirmation'}
              </span>
            </span>
          </div>

          {/* Bottom (sticky to bottom) */}
          <div className="mt-auto pt-5">
            <div className="h-px w-full bg-slate-200" />

            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Payment pills */}
              <div className="flex items-center gap-2">
                {['Stripe', 'Visa', 'Apple Pay', 'GPay'].map((label) => (
                  <span
                    key={label}
                    className="text-muted-foreground rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold"
                  >
                    {label}
                  </span>
                ))}
              </div>

              {/* Price + CTA */}
              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <div className="">
                  <p className="text-muted-foreground text-xs">From</p>
                  <p className="text-primary text-lg leading-none font-semibold whitespace-nowrap">
                    ${hotel.price}
                    <span className="text-muted-foreground text-xs font-medium"> / night</span>
                  </p>
                </div>

                <Button className="h-10 rounded-full px-5">Book Now</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
