import { BadgeCheck, MapPin, Star } from 'lucide-react';
import TitleSection from '../../shared/TitleSection';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const hotels = [
  {
    name: 'Grand Luxury Palace',
    city: 'Miami',
    rating: 4.9,
    price: 450,
    tag: '5-Star Hotel',
    image:
      'https://images.unsplash.com/photo-1729188430325-eb540fcdd941?auto=format&fit=crop&w=1200&q=80',
    perks: ['Private beach access', 'Rooftop dining', 'Oceanfront suites'],
  },
  {
    name: 'Amber Cove Resort',
    city: 'Maldives',
    rating: 4.8,
    price: 520,
    tag: 'Couple Favorite',
    image:
      'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80',
    perks: ['Overwater villas', 'Floating breakfast', 'Sunset cruises'],
  },
  {
    name: 'Sunset Marina Retreat',
    city: 'Phuket',
    rating: 4.7,
    price: 390,
    tag: 'Top Rated',
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    perks: ['Lagoon pool', 'Family suites', 'Spa rituals'],
  },
  {
    name: 'Emerald Hills Hideaway',
    city: 'Bali',
    rating: 4.8,
    price: 410,
    tag: 'Wellness',
    image:
      'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=1200&q=80',
    perks: ['Jungle villas', 'Yoga pavilion', 'Ayurveda menu'],
  },
  {
    name: 'Pearl Bay Residence',
    city: 'Dubai',
    rating: 4.9,
    price: 610,
    tag: 'Skyline Views',
    image:
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    perks: ['Sky pool', 'Concierge lounge', 'Private limo'],
  },
  {
    name: 'Seabreeze Vista',
    city: 'Santorini',
    rating: 4.8,
    price: 470,
    tag: 'Best Seller',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    perks: ['Cliff suites', 'Sunset terraces', 'Aegean views'],
  },
];

export default function FeaturedHotels() {
  return (
    <section className="py-16 sm:py-20">
      <div className="app-container">
        <TitleSection
          eyebrow="Featured"
          title="Featured Luxury Hotels"
          description="Handpicked stays with transparent pricing, flexible policies, and standout guest reviews."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((hotel) => (
            <article
              key={hotel.name}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm"
            >
              <div className="relative">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  width={400}
                  height={300}
                  className="h-52 w-full cursor-pointer object-cover transition duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
                <span className="absolute top-4 right-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-gray-700">
                  {hotel.tag}
                </span>
              </div>

              <div className="flex-1 p-5">
                <div className="flex min-w-0 items-start justify-between gap-2">
                  <h3 title={hotel.name} className="cursor-pointer truncate text-lg font-semibold">
                    {hotel.name}
                  </h3>
                  <span className="flex items-center gap-1 text-sm font-semibold">
                    <Star className="size-4 text-amber-400" />
                    {hotel.rating}
                  </span>
                </div>

                <div className="text-muted-foreground mt-0.5 flex items-center gap-1 text-xs">
                  <MapPin className="size-4 shrink-0" />
                  {hotel.city}
                </div>

                <p className="text-muted-foreground my-3 text-sm">
                  Experience world-class service in a refined setting with curated amenities.
                </p>

                <Separator />

                <ul className="text-muted-foreground my-4 space-y-2 text-xs">
                  {hotel.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2">
                      <BadgeCheck className="size-4 text-emerald-500" />
                      {perk}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center justify-between gap-3">
                  <div>
                    <p className="text-muted-foreground text-xs">From</p>
                    <p className="text-xl font-semibold">
                      ${hotel.price}
                      <span className="text-muted-foreground text-xs font-medium">/night</span>
                    </p>
                  </div>
                  <Button className="rounded-full">Book Now</Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
