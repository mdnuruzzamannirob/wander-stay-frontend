import { useEffect, useState } from 'react';

/**
 * Debounces a value by the given delay (ms).
 * Returns the debounced value that only updates after the caller
 * stops changing the input for `delay` milliseconds.
 *
 * @example
 * const debouncedFilters = useDebounce(filters, 400);
 */
export function useDebounce<T>(value: T, delay = 400): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
