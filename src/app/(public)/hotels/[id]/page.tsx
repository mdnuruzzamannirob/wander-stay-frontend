import { notFound } from 'next/navigation';
import {
  BadgeCheck,
  ChevronRight,
  Clock,
  Heart,
  Info,
  Landmark,
  MapPin,
  PawPrint,
  Phone,
  Share2,
  Cigarette,
  CreditCard,
  Star,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import HotelGallery from '@/components/modules/hotels/HotelGallery';
import RoomCard from '@/components/modules/hotels/RoomCard';
import ReviewSection from '@/components/modules/hotels/ReviewSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getHotelById } from '@/lib/utils/getHotelById';
import { getAmenityIcon } from '@/lib/utils/amenityIcons';
import {
  DEFAULT_GALLERY,
  HOTEL_GALLERY,
  HOTEL_POLICIES,
  NEARBY_ATTRACTIONS,
  getDemoReviews,
  getDemoRooms,
} from '@/lib/constants/hotel-details-data';

/* ---------- Rating label helper ---------- */
function getRatingStatus(rating: number) {
  if (rating >= 4.8) return 'Exceptional';
  if (rating >= 4.5) return 'Excellent';
  if (rating >= 4.2) return 'Very Good';
  if (rating >= 3.8) return 'Good';
  if (rating >= 3.5) return 'Pleasant';
  return 'Recommended';
}

/* ============================================================
   PAGE COMPONENT
   ============================================================ */

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function HotelDetailsPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const sp = await searchParams;
  const hotel = getHotelById(id);

  if (!hotel) notFound();

  // Read search context from URL params
  const checkIn = (sp.checkIn as string) || '';
  const checkOut = (sp.checkOut as string) || '';
  const guests = parseInt((sp.guests as string) || '2', 10);

  // Build checkout URL helper
  const buildCheckoutUrl = (roomId: string) => {
    const params = new URLSearchParams();
    params.set('hotelId', hotel.id);
    params.set('roomId', roomId);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    params.set('guests', String(guests));
    return `/checkout?${params.toString()}`;
  };

  if (!hotel) notFound();

  const gallery = HOTEL_GALLERY[hotel.id] ?? [hotel.image, ...DEFAULT_GALLERY];
  const rooms = getDemoRooms(hotel.id, hotel.price);
  const reviews = getDemoReviews();
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="app-container py-8 md:py-10">
      {/* ---- Breadcrumbs ---- */}
      <nav className="mb-5 flex items-center gap-1.5 text-sm">
        <Link href="/" className="text-muted-foreground hover:text-primary transition">
          Home
        </Link>
        <ChevronRight className="text-muted-foreground size-3.5" />
        <Link href="/hotels" className="text-muted-foreground hover:text-primary transition">
          Hotels
        </Link>
        <ChevronRight className="text-muted-foreground size-3.5" />
        <span className="text-foreground font-medium">{hotel.name}</span>
      </nav>

      {/* ---- Gallery Grid ---- */}
      <HotelGallery images={gallery} hotelName={hotel.name} />

      {/* ---- Overview ---- */}
      <section className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Left Column — 2/3 */}
        <div className="space-y-10 lg:col-span-2">
          {/* Hotel Header */}
          <div className="flex flex-col gap-4">
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="default" className="px-3 py-1 font-semibold">
                {hotel.propertyType}
              </Badge>
              {hotel.tag && (
                <Badge className="bg-foreground px-3 py-1 font-semibold">{hotel.tag}</Badge>
              )}
            </div>

            {/* Title + Rating */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{hotel.name}</h1>
                <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="text-primary size-4" />
                    {hotel.city}, {hotel.country}
                  </span>
                  <span className="text-muted-foreground/50">|</span>
                  <span>{hotel.distanceKm} km from center</span>
                </div>
              </div>

              {/* Rating Chip */}
              <div className="flex shrink-0 items-center gap-3 rounded-xl border bg-white px-4 py-2.5">
                <div className="flex items-center gap-1 rounded-md bg-amber-400 px-2.5 py-1 text-xs font-bold text-white">
                  <Star className="size-3 fill-current" /> {hotel.rating}
                </div>
                <div className="text-left">
                  <p className="text-xs font-semibold">{getRatingStatus(hotel.rating)}</p>
                  <p className="text-muted-foreground text-[10px]">
                    {hotel.reviews.toLocaleString()} reviews
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap gap-2 pt-1">
              {/* <Button variant="outline" size="sm" className="gap-2 rounded-full">
                <Heart className="size-4" /> Save
              </Button> */}
              <Button variant="outline" size="sm" className="gap-2 rounded-full">
                <Share2 className="size-4" /> Share
              </Button>
              <Button variant="outline" size="sm" className="gap-2 rounded-full">
                <Phone className="size-4" /> Contact
              </Button>
            </div>
          </div>

          <Separator />

          {/* About */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-tight">About this property</h2>
            <div className="text-muted-foreground space-y-3 text-[15px] leading-relaxed">
              <p>
                Welcome to <span className="font-semibold text-gray-800">{hotel.name}</span>, a
                premier {hotel.propertyType.toLowerCase()} located in the heart of {hotel.city},{' '}
                {hotel.country}. With its stunning architecture and world-class service, this
                property offers an unforgettable experience for every guest. Whether you&apos;re
                visiting for business or leisure, enjoy premium amenities including{' '}
                {hotel.amenities.slice(0, 3).join(', ')} and much more.
              </p>
              <p>
                Just {hotel.distanceKm} km from the city center, it&apos;s an ideal base for
                exploring everything {hotel.city} has to offer. Each room is thoughtfully designed
                with modern furnishings and floor-to-ceiling windows offering breathtaking views.
                Our dedicated staff is available around the clock to ensure your stay is nothing
                short of perfect.
              </p>
            </div>
          </div>

          <Separator />

          {/* Amenities & Facilities */}
          <div>
            <h2 className="mb-5 text-lg font-bold tracking-tight">Amenities & Facilities</h2>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
              {hotel.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-3 rounded-xl border bg-gray-50 px-4 py-3 text-sm font-medium"
                >
                  <span className="text-primary shrink-0">{getAmenityIcon(amenity)}</span>
                  <span className="truncate">{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Why Guests Love It */}
          <div>
            <h2 className="mb-5 text-lg font-bold tracking-tight">Why guests love it</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {hotel.freeCancellation && (
                <div className="flex items-start gap-3.5 rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
                  <div className="mt-0.5 rounded-lg bg-emerald-100 p-2">
                    <Clock className="size-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-800">Free Cancellation</p>
                    <p className="mt-0.5 text-xs text-emerald-600/80">
                      Cancel up to 24h before check-in
                    </p>
                  </div>
                </div>
              )}
              {hotel.payLater && (
                <div className="flex items-start gap-3.5 rounded-xl border border-blue-100 bg-blue-50/40 p-4">
                  <div className="mt-0.5 rounded-lg bg-blue-100 p-2">
                    <BadgeCheck className="size-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-blue-800">Pay at Property</p>
                    <p className="mt-0.5 text-xs text-blue-600/80">No upfront payment required</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3.5 rounded-xl border border-amber-100 bg-amber-50/40 p-4">
                <div className="mt-0.5 rounded-lg bg-amber-100 p-2">
                  <Star className="size-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-amber-800">Top Rated</p>
                  <p className="mt-0.5 text-xs text-amber-600/80">
                    {hotel.rating}/5 from {hotel.reviews.toLocaleString()} reviews
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3.5 rounded-xl border border-violet-100 bg-violet-50/40 p-4">
                <div className="mt-0.5 rounded-lg bg-violet-100 p-2">
                  <Users className="size-4 text-violet-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-violet-800">
                    {hotel.reviews.toLocaleString()}+ happy guests
                  </p>
                  <p className="mt-0.5 text-xs text-violet-600/80">Consistently highly rated</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Sticky Sidebar — 1/3 ---- */}
        <aside className="lg:sticky lg:top-25 lg:self-start">
          {/* Booking Card */}
          <div className="flex flex-col gap-5 rounded-2xl border bg-white p-6">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-[11px] font-semibold tracking-widest uppercase">
                Starting from
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl font-extrabold tracking-tight">${hotel.price}</span>
                <span className="text-muted-foreground text-sm font-medium">/ night</span>
              </div>
              <span className="text-muted-foreground text-xs">Taxes & fees included</span>
            </div>

            <Separator />

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Clock className="size-3.5" /> Check-in
                </span>
                <span className="font-semibold">{HOTEL_POLICIES.checkIn}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Clock className="size-3.5" /> Check-out
                </span>
                <span className="font-semibold">{HOTEL_POLICIES.checkOut}</span>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-2.5">
              <Link href={buildCheckoutUrl(rooms[0].id)}>
                <Button size="lg" className="w-full text-base font-semibold">
                  Reserve Now
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full font-semibold" asChild>
                <a href="#available-rooms">Check Availability</a>
              </Button>
            </div>

            <p className="text-muted-foreground text-center text-xs">
              {hotel.freeCancellation ? '✓ Free cancellation available' : 'Non-refundable rate'}
            </p>
          </div>

          {/* Nearby Places Card */}
          <div className="mt-4 rounded-2xl border bg-white p-6">
            <h4 className="mb-4 flex items-center gap-2 font-semibold">
              <Landmark className="text-primary size-4" /> Nearby Places
            </h4>
            <ul className="space-y-3">
              {NEARBY_ATTRACTIONS.map((place) => (
                <li key={place.name} className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{place.name}</span>
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold">
                    {place.distance}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {/* ---- Available Rooms ---- */}
      <section id="available-rooms" className="mt-14 scroll-mt-24">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight">Available Rooms</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {rooms.length} room types available
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} checkoutHref={buildCheckoutUrl(room.id)} />
          ))}
        </div>
      </section>

      {/* ---- Guest Reviews (interactive — client component) ---- */}
      <ReviewSection initialReviews={reviews} avgRating={avgRating} />

      {/* ---- Hotel Policies ---- */}
      <section className="mt-14">
        <h2 className="mb-6 text-xl font-bold tracking-tight">Hotel Policies</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: <Clock className="size-4" />,
              label: 'Check-in',
              value: HOTEL_POLICIES.checkIn,
            },
            {
              icon: <Clock className="size-4" />,
              label: 'Check-out',
              value: HOTEL_POLICIES.checkOut,
            },
            {
              icon: <Info className="size-4" />,
              label: 'Cancellation',
              value: HOTEL_POLICIES.cancellation,
            },
            {
              icon: <Users className="size-4" />,
              label: 'Children',
              value: HOTEL_POLICIES.children,
            },
            { icon: <PawPrint className="size-4" />, label: 'Pets', value: HOTEL_POLICIES.pets },
            {
              icon: <Cigarette className="size-4" />,
              label: 'Smoking',
              value: HOTEL_POLICIES.smoking,
            },
            {
              icon: <CreditCard className="size-4" />,
              label: 'Payment',
              value: HOTEL_POLICIES.payment,
            },
          ].map((policy) => (
            <div
              key={policy.label}
              className="rounded-xl border border-gray-100 bg-gray-50/60 p-4 transition-colors hover:border-gray-200 hover:bg-gray-50"
            >
              <div className="text-primary mb-2 flex items-center gap-2">
                {policy.icon}
                <span className="text-sm font-semibold">{policy.label}</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">{policy.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- CTA Banner ---- */}
      <section className="mt-14 mb-4 overflow-hidden rounded-2xl bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 p-8 text-center text-white md:p-12">
        <h3 className="text-2xl font-bold md:text-3xl">Ready to book your stay?</h3>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/60">
          Lock in the best rate for {hotel.name}. Prices may increase — secure your room today!
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href={buildCheckoutUrl(rooms[0].id)}>
            <Button className="h-12 px-6">Book Now — from ${hotel.price}/night</Button>
          </Link>
          <Link href="/hotels">
            <Button variant="secondary" className="h-12 px-6">
              Browse More Hotels
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
