import { CalendarCheck, History, Home, Settings } from 'lucide-react';

export const nav = [
  {
    label: 'Home',
    href: '/',
    slug: 'home',
  },
  {
    label: 'About Us',
    href: '/about-us',
    slug: 'about',
  },
  {
    label: 'Contact Us',
    href: '/contact-us',
    slug: 'contact',
  },

  {
    label: 'FAQs',
    href: '/faqs',
    slug: 'faqs',
  },
];

export const userNav = [
  {
    label: 'Home',
    href: '/',
    icon: Home,
  },
  {
    label: 'My Bookings',
    href: '/my-bookings',
    icon: CalendarCheck,
  },
  {
    label: 'Bookings History',
    href: '/bookings-history',
    icon: History,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];
