'use client';

import { useCallback, useSyncExternalStore } from 'react';

export type CookieChoice = 'accept' | 'reject' | 'custom';
export type CookiePreferences = {
  essential: boolean; // always true
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
};

const KEY = 'wanderstay_cookie_pref';
const PREFS_KEY = 'wanderstay_cookie_prefs';
const EVENT = 'wanderstay:cookie_change';

const DEFAULT_PREFERENCES: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
  personalization: false,
};

function subscribe(cb: () => void) {
  window.addEventListener('storage', cb);
  window.addEventListener(EVENT, cb as EventListener);
  return () => {
    window.removeEventListener('storage', cb);
    window.removeEventListener(EVENT, cb as EventListener);
  };
}

function getSnapshot(): CookieChoice | null {
  try {
    return localStorage.getItem(KEY) as CookieChoice | null;
  } catch {
    return null;
  }
}

function getServerSnapshot() {
  return null;
}

let _cachedPrefsRaw: string | null = null;
let _cachedPrefs: CookiePreferences = DEFAULT_PREFERENCES;

function getPrefsSnapshot(): CookiePreferences {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (raw !== _cachedPrefsRaw) {
      _cachedPrefsRaw = raw;
      _cachedPrefs = raw ? (JSON.parse(raw) as CookiePreferences) : DEFAULT_PREFERENCES;
    }
  } catch {}
  return _cachedPrefs;
}

function getPrefsServerSnapshot() {
  return DEFAULT_PREFERENCES;
}

export function useCookiePreference() {
  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const preferences = useSyncExternalStore(subscribe, getPrefsSnapshot, getPrefsServerSnapshot);

  const set = useCallback((choice: CookieChoice) => {
    try {
      localStorage.setItem(KEY, choice);
      if (choice === 'accept') {
        localStorage.setItem(
          PREFS_KEY,
          JSON.stringify({
            essential: true,
            analytics: true,
            marketing: true,
            personalization: true,
          }),
        );
      } else if (choice === 'reject') {
        localStorage.setItem(PREFS_KEY, JSON.stringify(DEFAULT_PREFERENCES));
      }
      window.dispatchEvent(new Event(EVENT));
    } catch {}
  }, []);

  const setCustomPreferences = useCallback((prefs: CookiePreferences) => {
    try {
      localStorage.setItem(KEY, 'custom');
      localStorage.setItem(PREFS_KEY, JSON.stringify({ ...prefs, essential: true }));
      window.dispatchEvent(new Event(EVENT));
    } catch {}
  }, []);

  return {
    value,
    hasChoice: value !== null,
    set,
    preferences,
    setCustomPreferences,
  };
}
