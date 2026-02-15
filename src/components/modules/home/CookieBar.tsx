'use client';

import { CookieChoice } from '@/hooks/useCookiePreference';

const CookieBar = ({
  showCookieBar,
  set,
}: {
  showCookieBar: boolean;
  set: (choice: CookieChoice) => void;
}) => {
  if (!showCookieBar) return null;
  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-live="polite" aria-modal="true">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />

      <div className="absolute inset-x-0 bottom-0 w-full bg-white px-4 py-5 text-slate-800 shadow-2xl">
        <div className="app-container flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="border-primary mt-1 h-3 w-3 rounded-full border-4" />
            <div>
              <p className="text-sm font-semibold">We value your privacy</p>
              <p className="text-xs text-slate-600">
                We use cookies to enhance your browsing experience, serve personalized ads or
                content, and analyze our traffic. Read our Privacy Policy for details.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 md:justify-end">
            <button
              onClick={() => set('reject')}
              className="border-primary/50 text-primary hover:bg-primary/10 rounded-full border px-4 py-2 text-xs font-semibold transition"
            >
              Reject All
            </button>

            <button
              onClick={() => set('accept')}
              className="bg-primary hover:bg-primary/90 rounded-full px-4 py-2 text-xs font-semibold text-white shadow transition"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBar;
