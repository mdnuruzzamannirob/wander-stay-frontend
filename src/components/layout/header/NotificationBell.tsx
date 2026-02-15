'use client';

import * as React from 'react';
import {
  Bell,
  CheckCheck,
  Trash2,
  Dot,
  Receipt,
  CalendarCheck2,
  CreditCard,
  BadgePercent,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils/cn';

type NotificationKind = 'booking' | 'payment' | 'promo' | 'system';

type Notification = {
  id: string;
  title: string;
  message: string;
  createdAtISO: string;
  kind: NotificationKind;
  isRead: boolean;
};

const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: 'n_001',
    title: 'Booking confirmed',
    message: 'Reservation BK-12943 is confirmed for Feb 20–22.',
    createdAtISO: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    kind: 'booking',
    isRead: false,
  },
  {
    id: 'n_002',
    title: 'Payment received',
    message: 'Your payment for BK-12943 was received. Invoice is ready.',
    createdAtISO: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    kind: 'payment',
    isRead: false,
  },
  {
    id: 'n_003',
    title: 'Limited-time offer',
    message: 'Save 15% on weekend stays. Limited rooms available.',
    createdAtISO: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
    kind: 'promo',
    isRead: true,
  },
  {
    id: 'n_004',
    title: 'Policy update',
    message: 'Cancellation policy updated for peak-season bookings.',
    createdAtISO: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    kind: 'system',
    isRead: true,
  },
];

function formatTime(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

function kindBadge(kind: NotificationKind) {
  switch (kind) {
    case 'booking':
      return {
        label: 'Booking',
        Icon: CalendarCheck2,
        badgeClass: 'border-blue-600/20 bg-blue-600/10 text-blue-700',
        iconClass: 'border-blue-100 bg-blue-50 text-blue-600',
      };

    case 'payment':
      return {
        label: 'Payment',
        Icon: CreditCard,
        badgeClass: 'border-emerald-600/20 bg-emerald-600/10 text-emerald-700',
        iconClass: 'border-emerald-100 bg-emerald-50 text-emerald-600',
      };

    case 'promo':
      return {
        label: 'Offer',
        Icon: BadgePercent,
        badgeClass: 'border-amber-600/20 bg-amber-600/10 text-amber-700',
        iconClass: 'border-amber-100 bg-amber-50 text-amber-600',
      };

    default:
      return {
        label: 'System',
        Icon: Bell,
        badgeClass: 'border-slate-600/20 bg-slate-600/10 text-slate-700',
        iconClass: 'border-slate-100 bg-slate-50 text-slate-600',
      };
  }
}

export default function NotificationBell() {
  const [items, setItems] = React.useState<Notification[]>(DUMMY_NOTIFICATIONS);

  const unreadCount = React.useMemo(
    () => items.reduce((acc, n) => acc + (n.isRead ? 0 : 1), 0),
    [items],
  );

  const markAllRead = React.useCallback(() => {
    setItems((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const clearAll = React.useCallback(() => {
    setItems([]);
  }, []);

  const markOneRead = React.useCallback((id: string) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  }, []);

  // Accessibility: single concise label; do NOT duplicate "unread" wording.
  const triggerAriaLabel = unreadCount > 0 ? `Notifications, ${unreadCount}` : 'Notifications';

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon-lg"
          className="relative rounded-full"
          aria-label={triggerAriaLabel}
        >
          <Bell className="size-5 shrink-0" />
          {unreadCount > 0 ? (
            <span className="bg-primary absolute -top-1 -right-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] leading-none font-semibold text-white shadow">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-95 overflow-hidden p-0 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">Notifications</p>
            {unreadCount > 0 ? (
              <Badge variant="outline" className="h-6 rounded-full px-2 text-xs">
                {unreadCount}
              </Badge>
            ) : null}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={markAllRead}
              disabled={unreadCount === 0}
              aria-label="Mark all as read"
              title="Mark all as read"
            >
              <CheckCheck className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={clearAll}
              disabled={items.length === 0}
              aria-label="Clear notifications"
              title="Clear"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator />

        {/* Body */}
        {items.length === 0 ? (
          <div className="mx-auto flex max-w-[320px] flex-col items-center px-3 py-10 text-center">
            <div className="bg-muted/40 mb-3 flex h-11 w-11 items-center justify-center rounded-full border">
              <Bell className="text-muted-foreground h-5 w-5" aria-hidden />
            </div>

            <p className="text-muted-foreground text-sm font-medium">No notifications</p>
          </div>
        ) : (
          <ScrollArea className="flex h-95 flex-col">
            {items.map((n) => {
              const { Icon, iconClass } = kindBadge(n.kind);

              return (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => (!n.isRead ? markOneRead(n.id) : undefined)}
                  className={cn(
                    'group bg-background relative w-full min-w-0 gap-3 border-b text-left transition',
                    'hover:bg-accent/40 flex p-3',
                  )}
                  aria-label={`${n.title}. ${n.message}`}
                >
                  <div
                    className={cn(
                      'flex size-9 shrink-0 items-center justify-center rounded-full border border-orange-100',
                      iconClass,
                    )}
                  >
                    <Icon size={22} />
                  </div>

                  <div className="min-w-0 flex-1">
                    {/* Title row */}
                    <div className="flex min-w-0 gap-2">
                      <h4 className="min-w-0 flex-1 text-sm font-semibold">{n.title}</h4>

                      {!n.isRead && (
                        <span
                          className="bg-primary mt-1.5 size-2 shrink-0 rounded-full"
                          aria-label="Unread"
                        />
                      )}
                    </div>

                    {/* Message */}
                    <p className="text-muted-foreground mt-1.5 line-clamp-2 text-xs leading-relaxed">
                      {n.message}
                    </p>

                    {/* Meta row */}
                    <div className="text-muted-foreground mt-2 flex items-center gap-2 text-[11px]">
                      <span>{formatTime(n.createdAtISO)}</span>
                      <span>•</span>
                      <span
                        className={cn(
                          'opacity-80',
                          n.isRead ? 'text-muted-foreground' : 'text-primary',
                        )}
                      >
                        {n.isRead ? 'Read' : 'Tap to mark read'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  );
}
