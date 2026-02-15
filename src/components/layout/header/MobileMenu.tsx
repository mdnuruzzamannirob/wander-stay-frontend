'use client';

import Logo from '@/components/shared/Logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { nav } from '@/lib/constants/nav-links';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileMenu = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon-lg">
          <Menu className="size-6 text-slate-500" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72">
        <SheetHeader className="border-b">
          <SheetTitle className="flex items-center justify-between">
            <Logo />

            <SheetClose className="hover:bg-brand-50 flex size-9 min-w-9 items-center justify-center rounded-md text-slate-500">
              <X className="size-5.5" />
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        {/* Mobile Nav */}
        <nav className="flex flex-col gap-1 px-4">
          {nav.map((item) => {
            const isActive =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`) ||
              (item.slug && pathname === '/product');

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`rounded-md p-3 text-sm transition ${
                  isActive
                    ? 'bg-brand-50 text-primary font-medium'
                    : 'hover:bg-brand-50 text-muted-foreground'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
