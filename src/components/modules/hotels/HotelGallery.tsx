'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Camera, ChevronLeft, ChevronRight, X } from 'lucide-react';

/* ================================================================== */
/*  Types                                                             */
/* ================================================================== */

type HotelGalleryProps = {
  images: string[];
  hotelName: string;
  /** Max visible tiles in the grid (default 5) */
  maxVisible?: number;
};

/* ================================================================== */
/*  Grid-layout helpers — adapts grid to how many images are passed   */
/* ================================================================== */

/** Outer grid container classes. */
function getGridClasses(count: number): string {
  const base = 'grid gap-1 sm:gap-1.5 rounded-xl overflow-hidden';
  switch (count) {
    case 1:
      return `${base} grid-cols-1`;
    case 2:
      return `${base} grid-cols-2`;
    case 3:
      // big left (col-span-1, row-span-2) + 2 stacked right
      return `${base} grid-cols-2 md:grid-rows-2`;
    case 4:
      // 2×2 square grid
      return `${base} grid-cols-2 grid-rows-2`;
    default:
      // 5-tile classic layout: hero (2 cols, 2 rows) + 4 tiles right
      return `${base} grid-cols-2 md:grid-cols-4 md:grid-rows-2`;
  }
}

/** Per-tile classes (spans + aspect ratio). */
function getTileClasses(count: number, index: number): string {
  const base = 'group relative cursor-pointer overflow-hidden';

  if (count === 1) return `${base} aspect-[2/1]`;
  if (count === 2) return `${base} aspect-[3/2]`;

  if (count === 3) {
    // Hero: left column, spans both rows on md+
    if (index === 0)
      return `${base} col-span-2 md:col-span-1 md:row-span-2 aspect-[16/10] md:aspect-auto md:h-full`;
    // Two small tiles stacked on the right
    return `${base} aspect-[4/3] md:aspect-auto md:h-full`;
  }

  if (count === 4) {
    // 2×2 grid — height controlled by container, tiles fill their cell
    return `${base} aspect-[3/2] md:aspect-auto md:h-full`;
  }

  // 5+ tiles → hero spans left half
  if (index === 0)
    return `${base} col-span-2 md:row-span-2 aspect-[16/10] md:aspect-auto md:h-full`;
  return `${base} aspect-[4/3] md:aspect-auto md:h-full`;
}

/** Container height based on tile count (reserves space, prevents layout shift). */
function getHeightClass(count: number): string {
  if (count <= 1) return '';
  if (count <= 2) return 'md:h-[300px]';
  if (count <= 3) return 'md:h-[420px]';
  if (count <= 4) return 'md:h-[420px]';
  return 'md:h-[420px]';
}

/* ================================================================== */
/*  Component                                                         */
/* ================================================================== */

export default function HotelGallery({ images, hotelName, maxVisible = 5 }: HotelGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbStripRef = useRef<HTMLDivElement>(null);

  const tileCount = Math.min(images.length, maxVisible);
  const visibleImages = images.slice(0, tileCount);
  const extraCount = images.length - tileCount;

  /* ---- Lightbox helpers ---- */
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const goTo = useCallback(
    (dir: 1 | -1) => {
      setActiveIndex((prev) => (prev + dir + images.length) % images.length);
    },
    [images.length],
  );

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  /* Body-scroll lock + keyboard navigation */
  useEffect(() => {
    if (!lightboxOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') goTo(1);
      else if (e.key === 'ArrowLeft') goTo(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxOpen, closeLightbox, goTo]);

  /* Auto-scroll thumbnail strip to active thumb */
  useEffect(() => {
    if (!lightboxOpen || !thumbStripRef.current) return;
    const active = thumbStripRef.current.children[activeIndex] as HTMLElement | undefined;
    active?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }, [activeIndex, lightboxOpen]);

  /* ================================================================ */
  /*  Grid                                                            */
  /* ================================================================ */
  return (
    <>
      <div className={`${getGridClasses(tileCount)} ${getHeightClass(tileCount)}`}>
        {visibleImages.map((src, i) => {
          const isLast = i === tileCount - 1 && extraCount > 0;

          return (
            <button
              key={i}
              onClick={() => openLightbox(i)}
              className={getTileClasses(tileCount, i)}
            >
              <Image
                src={src}
                alt={`${hotelName} — Photo ${i + 1}`}
                fill
                priority={i === 0}
                sizes={i === 0 ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* "+X more" overlay on last visible tile */}
              {isLast && (
                <span className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 text-sm font-semibold text-white backdrop-blur-[2px] transition-colors group-hover:bg-black/55">
                  <Camera className="size-4" />+{extraCount} more
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ================================================================ */}
      {/*  Fullscreen Lightbox (portal → document.body)                    */}
      {/* ================================================================ */}
      {lightboxOpen &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${hotelName} photo gallery`}
            className="fixed inset-0 z-100 flex flex-col bg-black/95"
            onClick={closeLightbox}
          >
            {/* Prevent clicks on inner content from closing */}
            <div
              className="relative flex h-full w-full flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ---- Top bar ---- */}
              <div className="flex shrink-0 items-center justify-between px-4 py-3 sm:px-6">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                  {activeIndex + 1} / {images.length}
                </span>
                <button
                  onClick={closeLightbox}
                  className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                  aria-label="Close gallery"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* ---- Main image area ---- */}
              <div className="relative flex min-h-0 flex-1 items-center justify-center px-14 sm:px-20">
                <div className="relative h-full w-full max-w-6xl">
                  <Image
                    key={activeIndex}
                    src={images[activeIndex]}
                    alt={`${hotelName} — Photo ${activeIndex + 1}`}
                    fill
                    sizes="100vw"
                    className="object-contain"
                    priority
                  />
                </div>

                {/* Prev */}
                <button
                  onClick={() => goTo(-1)}
                  className="absolute top-1/2 left-2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:left-4 sm:size-12"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="size-5 sm:size-6" />
                </button>

                {/* Next */}
                <button
                  onClick={() => goTo(1)}
                  className="absolute top-1/2 right-2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:right-4 sm:size-12"
                  aria-label="Next image"
                >
                  <ChevronRight className="size-5 sm:size-6" />
                </button>
              </div>

              {/* ---- Thumbnail strip ---- */}
              <div
                ref={thumbStripRef}
                className="no-scrollbar flex shrink-0 items-center justify-start gap-1.5 overflow-x-auto px-4 py-3 sm:justify-center sm:gap-2 sm:py-4"
              >
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`relative size-12 shrink-0 overflow-hidden rounded-lg border-2 transition-all sm:h-14 sm:w-20 ${
                      i === activeIndex
                        ? 'border-white ring-1 ring-white/40'
                        : 'border-transparent opacity-50 hover:opacity-80'
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`Thumbnail ${i + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
