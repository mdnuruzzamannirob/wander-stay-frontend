'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Logo from '../../shared/Logo';
import { usePathname, useSearchParams } from 'next/navigation';
import { nav } from '@/lib/constants/nav-links';
import { useHasHydrated } from '@/hooks/useHasHydrated';
import { cn } from '@/lib/utils/cn';
import MobileMenu from './MobileMenu';
import UserMenu from './UserMenu';
import NotificationBell from './NotificationBell';

/* Avatar Skeleton */
function AvatarSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-20 animate-pulse rounded-md bg-slate-200" />
      <div className="h-10 w-20 animate-pulse rounded-md bg-slate-200" />
      <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category');
  const hasHydrated = useHasHydrated();

  const isAuthenticated = true;
  const isLoading = false;

  const showAuthSkeleton = !hasHydrated || isLoading;

  /* Render */
  return (
    <header className="border-brand-100 sticky top-0 z-50 w-full border-b bg-white">
      <div className="app-container flex items-center justify-between gap-3 py-4">
        {/* Mobile Menu */}
        <div className="lg:hidden">
          <MobileMenu />
        </div>

        {/* Logo */}
        <Logo />

        {/* Middle Actions */}
        <div className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`) ||
              (item.slug && pathname === '/product' && activeCategory === item.slug);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn('relative flex h-full items-center text-sm font-medium transition', {
                  'bg-brand-50 text-primary': isActive,
                  'hover:text-primary text-muted-foreground': !isActive,
                })}
              >
                {item.label}

                <span
                  className={`absolute bottom-0 left-0 h-0.5 w-full transition-transform duration-300 ${
                    isActive
                      ? 'bg-primary scale-x-100'
                      : 'bg-primary scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Loading Skeleton */}
          {showAuthSkeleton && (
            <div className="flex items-center gap-3">
              <AvatarSkeleton />
            </div>
          )}

          {/* Authenticated */}
          {!showAuthSkeleton && isAuthenticated && (
            <div className="flex items-center gap-3">
              {/* Notification */}
              <NotificationBell />

              {/* Profile */}
              <UserMenu />
            </div>
          )}

          {/* Guest */}
          {!showAuthSkeleton && !isAuthenticated && (
            <div className="flex items-center gap-2">
              <Link href="/sign-in">
                <Button size="lg" variant="ghost">
                  Sign In
                </Button>
              </Link>

              <Link href="/sign-up">
                <Button size="lg">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
