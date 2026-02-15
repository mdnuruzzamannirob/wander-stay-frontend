'use client';

import { useSyncExternalStore } from 'react';

export function useDelayedFlag(enabled: boolean, delayMs: number) {
  function subscribe(cb: () => void) {
    if (!enabled) return () => {};

    const t = setTimeout(cb, delayMs);
    return () => clearTimeout(t);
  }

  function getSnapshot() {
    return enabled;
  }

  function getServerSnapshot() {
    return false;
  }

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
