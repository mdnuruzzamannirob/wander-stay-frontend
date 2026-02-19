import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

type PageHeroProps = {
  title: string;
  breadcrumbs: { label: string; href?: string }[];
};

export default function PageHero({ title, breadcrumbs }: PageHeroProps) {
  return (
    <div className="relative min-h-70 sm:min-h-80">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("/page-hero.png")',
        }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-gray-900/80 via-gray-900/70 to-gray-950/90" />

      <div className="app-container relative flex min-h-70 flex-col items-center justify-center gap-4 sm:min-h-80">
        <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{title}</h1>

        <div className="flex items-center gap-2 text-sm text-white/90">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;

            return (
              <div key={item.label} className="flex items-center gap-2">
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-primary transition">
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'text-primary font-medium' : ''}>{item.label}</span>
                )}
                {!isLast && <ChevronRight className="size-4" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
