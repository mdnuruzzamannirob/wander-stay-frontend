'use client';

import { useState } from 'react';
import { Settings2, Shield, BarChart3, Megaphone, Sparkles, X } from 'lucide-react';
import { type CookieChoice, type CookiePreferences } from '@/hooks/useCookiePreference';

const COOKIE_CATEGORIES: {
  key: keyof CookiePreferences;
  label: string;
  description: string;
  icon: React.ReactNode;
  disabled?: boolean;
}[] = [
  {
    key: 'essential',
    label: 'Essential',
    description:
      'These cookies are strictly necessary for the website to function and cannot be turned off.',
    icon: <Shield className="size-4 text-emerald-600" />,
    disabled: true,
  },
  {
    key: 'analytics',
    label: 'Analytics',
    description:
      'Help us understand how visitors interact with our site so we can improve performance and content.',
    icon: <BarChart3 className="size-4 text-blue-600" />,
  },
  {
    key: 'marketing',
    label: 'Marketing',
    description: 'Used to deliver relevant ads and measure the effectiveness of our campaigns.',
    icon: <Megaphone className="size-4 text-orange-600" />,
  },
  {
    key: 'personalization',
    label: 'Personalization',
    description:
      'Allow us to remember your preferences and tailor your experience to your interests.',
    icon: <Sparkles className="size-4 text-purple-600" />,
  },
];

const CookieBar = ({
  showCookieBar,
  set,
  setCustomPreferences,
}: {
  showCookieBar: boolean;
  set: (choice: CookieChoice) => void;
  setCustomPreferences: (prefs: CookiePreferences) => void;
}) => {
  const [showCustomize, setShowCustomize] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    personalization: false,
  });

  if (!showCookieBar) return null;

  const handleToggle = (key: keyof CookiePreferences) => {
    if (key === 'essential') return;
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSavePreferences = () => {
    setCustomPreferences(prefs);
    setShowCustomize(false);
  };

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-live="polite" aria-modal="true">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" />

      {/* ─── Customize Popup ─── */}
      {showCustomize && (
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl sm:p-7">
            <button
              onClick={() => setShowCustomize(false)}
              className="absolute top-3 right-3 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="size-4" />
            </button>

            <div className="mb-5 flex items-center gap-2.5">
              <div className="bg-primary/10 rounded-lg p-2">
                <Settings2 className="text-primary size-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-800">Cookie Preferences</h3>
                <p className="text-xs text-slate-500">
                  Manage which cookies you&apos;d like to allow.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {COOKIE_CATEGORIES.map((cat) => (
                <div
                  key={cat.key}
                  className={`flex items-start gap-3 rounded-xl border p-3.5 transition ${
                    prefs[cat.key]
                      ? 'border-emerald-200 bg-emerald-50/50'
                      : 'border-slate-100 bg-slate-50/50'
                  }`}
                >
                  <div className="mt-0.5 shrink-0 rounded-lg bg-white p-1.5 shadow-sm">
                    {cat.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-slate-800">{cat.label}</p>
                      <button
                        onClick={() => handleToggle(cat.key)}
                        disabled={cat.disabled}
                        className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
                          prefs[cat.key] ? 'bg-emerald-500' : 'bg-slate-300'
                        } ${cat.disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                      >
                        <span
                          className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${
                            prefs[cat.key] ? 'translate-x-4.5' : 'translate-x-0.75'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">
                      {cat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowCustomize(false)}
                className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePreferences}
                className="bg-primary hover:bg-primary/90 flex-1 rounded-full px-4 py-2 text-xs font-semibold text-white shadow transition"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Bottom Bar ─── */}
      {!showCustomize && (
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

            <div className="grid w-full grid-cols-3 justify-end gap-2 sm:flex sm:w-auto sm:gap-3">
              <button
                onClick={() => set('reject')}
                className="border-primary/50 text-primary hover:bg-primary/10 rounded-full border px-3 py-2 text-[11px] font-semibold whitespace-nowrap transition sm:px-4 sm:text-xs"
              >
                Reject All
              </button>

              <button
                onClick={() => setShowCustomize(true)}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-300 px-3 py-2 text-[11px] font-semibold whitespace-nowrap text-slate-700 transition hover:bg-slate-100 sm:px-4 sm:text-xs"
              >
                <Settings2 className="size-3 shrink-0 sm:size-3.5" />
                Customize
              </button>

              <button
                onClick={() => set('accept')}
                className="bg-primary hover:bg-primary/90 rounded-full px-3 py-2 text-[11px] font-semibold whitespace-nowrap text-white shadow transition sm:px-4 sm:text-xs"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CookieBar;
