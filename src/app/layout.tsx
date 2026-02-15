import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import Provider from './provider';
import { cn } from '@/lib/utils/cn';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'WanderStay - Your Ultimate Travel Companion',
  description:
    "WanderStay is your ultimate travel companion, offering a seamless platform to discover and book unique accommodations worldwide. Whether you're seeking a cozy cabin, a luxurious villa, or a trendy apartment, WanderStay connects you with unforgettable stays that make every trip extraordinary.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={cn('antialiased', poppins.className)}>
        <Provider>
          <Header />
          <main className="min-h-[calc(100vh-83.38px)]">{children}</main>
          <Footer />
          <Toaster
            position="top-center"
            richColors
            theme="light"
            duration={3000}
            expand
            swipeDirections={['bottom', 'top', 'left', 'right']}
          />
        </Provider>
      </body>
    </html>
  );
}
