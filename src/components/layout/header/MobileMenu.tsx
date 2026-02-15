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
      <SheetTrigger asChild className="lg:hidden">
        <Button variant="ghost" size="icon-lg">
          <Menu className="text-muted-foreground size-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-72">
        <SheetHeader className="border-b p-3">
          <SheetTitle className="flex items-center justify-between">
            <Logo />

            <SheetClose className="text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-md hover:bg-gray-100">
              <X className="size-5.5" />
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        {/* Mobile Nav */}
        <nav className="flex flex-col gap-1 px-3">
          {nav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition ${
                  isActive
                    ? 'text-primary bg-primary/5 border-primary/10 font-medium'
                    : 'hover:text-primary hover:bg-primary/5 text-muted-foreground border-transparent'
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
