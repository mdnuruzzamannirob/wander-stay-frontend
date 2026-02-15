'use client';

import { useCallback, useSyncExternalStore } from 'react';

export type CookieChoice = 'accept' | 'reject';
const KEY = 'wanderstay_cookie_pref';
const EVENT = 'wanderstay:cookie_change';

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

export function useCookiePreference() {
  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const set = useCallback((choice: CookieChoice) => {
    try {
      localStorage.setItem(KEY, choice);
      window.dispatchEvent(new Event(EVENT));
    } catch {}
  }, []);

  return {
    value,
    hasChoice: value !== null,
    set,
  };
}
