'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logo from '../../shared/Logo';
import { usePathname } from 'next/navigation';
import { nav } from '@/lib/constants/nav-links';
import { useHasHydrated } from '@/hooks/useHasHydrated';
import { cn } from '@/lib/utils/cn';
import MobileMenu from './MobileMenu';
import UserMenu from './UserMenu';
import NotificationBell from './NotificationBell';
import { RightAuthSkeleton } from '@/components/layout/header/RightAuthSkeleton';

export default function Navbar() {
  const pathname = usePathname();
  const hasHydrated = useHasHydrated();

  // TODO:  real auth/getMe state
  const isAuthenticated = true;
  const isLoading = false; // getMe loading (only meaningful if isAuthenticated)

  const showRightAuthPlaceholder = isAuthenticated && (!hasHydrated || isLoading);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="app-container relative flex items-center justify-between gap-3 py-3 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center">
        {/* Left */}
        <div className="flex items-center lg:justify-self-start">
          <MobileMenu />

          <Logo className="hidden lg:block" />
        </div>

        <Logo className="lg:hidden" />

        {/* Middle  */}
        <nav className="hidden items-center gap-8 lg:flex lg:justify-self-center">
          {nav.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`) ||
              (item.slug && pathname === '/product');

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'group relative flex h-full items-center text-sm font-medium transition',
                  {
                    'bg-brand-50 text-primary': isActive,
                    'hover:text-primary text-muted-foreground': !isActive,
                  },
                )}
              >
                {item.label}

                <span
                  className={`absolute -bottom-1 left-0 h-0.5 w-full transition-transform duration-300 ${
                    isActive
                      ? 'bg-primary scale-x-100'
                      : 'bg-primary scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-2 lg:justify-self-end">
          {showRightAuthPlaceholder && <RightAuthSkeleton />}

          {!showRightAuthPlaceholder && isAuthenticated && (
            <div className="flex items-center gap-3">
              <NotificationBell />
              <UserMenu />
            </div>
          )}

          {!isAuthenticated && (
            <div className="flex items-center gap-2">
              <Link href="/login" className="lg:hidden">
                <Button>Login</Button>
              </Link>

              <Link href="/login" className="hidden lg:block">
                <Button variant="ghost" className="text-muted-foreground">
                  Login
                </Button>
              </Link>

              <Link href="/register" className="hidden lg:block">
                <Button>Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
