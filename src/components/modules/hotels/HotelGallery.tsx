import Image from 'next/image';
import { Camera } from 'lucide-react';

type HotelGalleryProps = {
  images: string[];
  hotelName: string;
};

export default function HotelGallery({ images, hotelName }: HotelGalleryProps) {
  /* Ensure we always have 5 images for the grid — repeat if needed */
  const filled = Array.from({ length: 5 }, (_, i) => images[i % images.length]);

  return (
    <div className="grid h-65 grid-cols-2 gap-2 sm:h-85 md:h-105 md:grid-cols-4 md:grid-rows-2">
      {/* Hero — spans 2 rows on md */}
      <div className="group relative col-span-2 row-span-1 overflow-hidden rounded-l-2xl rounded-r-2xl md:row-span-2 md:rounded-r-none">
        <Image
          src={filled[0]}
          alt={`${hotelName} - Main`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Secondary tiles — hidden on mobile, visible on md+ */}
      {filled.slice(1, 5).map((src, i) => {
        const isTopRight = i === 1;
        const isBottomRight = i === 3;

        return (
          <div
            key={i}
            className={`group relative hidden overflow-hidden md:block ${
              isTopRight ? 'rounded-tr-2xl' : ''
            } ${isBottomRight ? 'rounded-br-2xl' : ''}`}
          >
            <Image
              src={src}
              alt={`${hotelName} - Photo ${i + 2}`}
              fill
              sizes="25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* "Show all" overlay on the last tile */}
            {isBottomRight && images.length > 5 && (
              <button className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 text-sm font-semibold text-white backdrop-blur-[2px] transition-all hover:bg-black/50">
                <Camera className="size-4" />
                Show all {images.length} photos
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
