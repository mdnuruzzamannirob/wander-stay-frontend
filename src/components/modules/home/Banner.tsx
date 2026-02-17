'use client';

import { useEffect } from 'react';
import SearchBar from '@/components/shared/searchbar/SearchBar';
import { useCookiePreference } from '@/hooks/useCookiePreference';
import { useHasHydrated } from '@/hooks/useHasHydrated';
import { useDelayedFlag } from '@/hooks/useDelayedFlag';
import CookieBar from './CookieBar';

const SHOW_DELAY_MS = 500;

export default function Banner() {
  const hydrated = useHasHydrated();
  const { hasChoice, set } = useCookiePreference();
  const delayPassed = useDelayedFlag(hydrated && !hasChoice, SHOW_DELAY_MS);

  const showCookieBar = hydrated && !hasChoice && delayPassed;

  // Scroll lock (no setState)
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;

    if (showCookieBar) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = prevOverflow || '';

    return () => {
      document.body.style.overflow = prevOverflow || '';
    };
  }, [showCookieBar]);

  return (
    <div className="relative min-h-[calc(100vh-85px)] text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80)',
        }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-gray-900/80 via-gray-900/60 to-gray-950/90" />

      <div className="app-container relative flex flex-col items-center justify-center space-y-5 py-16 text-center">
        <div className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          Book now - no credit card needed, or use one if you prefer
        </div>

        <h1 className="text-3xl leading-tight font-semibold text-white sm:text-4xl md:text-5xl lg:text-6xl">
          Find Your Perfect
          <span className="text-primary block">Luxury Getaway</span>
        </h1>

        <p className="max-w-lg text-sm text-white/80 sm:text-base">
          Transparent prices, flexible cancellation, and secure payments without hidden fees or
          pressure tactics.
        </p>

        <SearchBar />

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/70">
          <span className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            Taxes and fees shown upfront
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            Free cancellation options clearly marked
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            Pay without sharing bank or card details{' '}
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            Secure payments via Stripe
          </span>
        </div>
      </div>

      <CookieBar showCookieBar={showCookieBar} set={set} />
    </div>
  );
}
