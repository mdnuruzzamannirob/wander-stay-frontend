import Image from 'next/image';
import TitleSection from '../../shared/TitleSection';

const destinations = [
  {
    name: 'Venice',
    tours: '306 Tours',
    image:
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Bali',
    tours: '256 Tours',
    image:
      'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'James Bond Island',
    tours: '258 Tours',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Phuket',
    tours: '256 Tours',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Chiang Mai',
    tours: '226 Tours',
    image:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Bana Hills',
    tours: '126 Tours',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
  },
];

export default function PopularDestinations() {
  return (
    <section className="bg-primary/5 py-16 sm:py-20">
      <div className="app-container">
        <TitleSection
          eyebrow="Explore"
          title="Explore Our Popular Destinations"
          description="Favorite destinations based on guest reviews and unforgettable moments."
        />

        <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {destinations.map((destination) => (
            <div key={destination.name} className="flex flex-col items-center text-center">
              <div className="relative">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  width={120}
                  height={200}
                  className="h-36 w-28 rounded-full object-cover sm:h-44 sm:w-32"
                  loading="lazy"
                />
              </div>
              <h3 className="mt-4 text-sm font-semibold sm:text-base">{destination.name}</h3>
              <p className="text-muted-foreground text-xs">{destination.tours}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
