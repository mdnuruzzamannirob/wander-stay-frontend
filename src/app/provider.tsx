'use client';

import { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store/store';
import { setUser, setIsLoading } from '@/store/features/auth/authSlice';
// import AuthInitializer from '@/components/layout/AuthInitializer';

/**
 * Demo AuthInitializer — checks localStorage for demo user on mount.
 * Replace with real getMe API call when backend is ready:
 *   const { data, isLoading } = useGetMeQuery();
 */
function DemoAuthInitializer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(setIsLoading(true));
    try {
      const token = localStorage.getItem('authToken');
      const stored = localStorage.getItem('userData');
      if (token && stored) {
        const user = JSON.parse(stored);
        store.dispatch(setUser(user));
      }
    } catch {
      // Corrupt data — ignore
    } finally {
      store.dispatch(setIsLoading(false));
    }
  }, []);

  return <>{children}</>;
}

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <DemoAuthInitializer>{children}</DemoAuthInitializer>
    </ReduxProvider>
  );
};

export default Provider;
