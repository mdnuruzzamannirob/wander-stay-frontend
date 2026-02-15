'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { LogOut, Loader2, LayoutDashboard, Home, Settings } from 'lucide-react';
import { getInitials } from '@/lib/utils/getInitials';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLogoutMutation } from '@/store/features/auth/authApi';
import { userNav } from '@/lib/constants/nav-links';

const UserMenu = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const user = {
    name: 'John Doe',
    email: 'john@gmail.com',
    profileImage: 'https://i.pravatar.cc/150?img=3',
  };

  const [logout, { isLoading: isLogoutLoading, isSuccess }] = useLogoutMutation();

  /* Redirect after logout */
  useEffect(() => {
    if (isSuccess) {
      router.push('/');
    }
  }, [isSuccess, router]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer" size="lg">
          <AvatarImage src={user?.profileImage} />

          <AvatarFallback className="bg-slate-100 text-xs font-semibold">
            {getInitials(user?.name)}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      {/* Popover Content */}
      <PopoverContent align="end" className="w-64 p-0">
        {/* User Info */}
        <div className="flex items-center gap-2 border-b p-3">
          <Avatar className="border-brand-100 size-10 border shadow-sm">
            <AvatarImage src={user?.profileImage} />

            <AvatarFallback className="bg-slate-100 text-xs font-semibold">
              {getInitials(user?.name)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{user?.name || 'User'}</p>

            <p className="text-muted-foreground truncate text-xs">{user?.email}</p>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-1 p-3">
          {userNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition ${
                pathname === item.href
                  ? 'text-primary bg-primary/5 border-primary/10 font-medium'
                  : 'hover:text-primary hover:bg-primary/5 text-muted-foreground border-transparent'
              }`}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </div>
        <div className="border-t p-3">
          {/* Logout */}
          <button
            onClick={() => logout()}
            disabled={isLogoutLoading}
            className="text-destructive flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition outline-none hover:bg-red-50 disabled:cursor-not-allowed"
          >
            {isLogoutLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Logging out...
              </>
            ) : (
              <>
                <LogOut className="size-4" />
                Logout
              </>
            )}
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserMenu;
