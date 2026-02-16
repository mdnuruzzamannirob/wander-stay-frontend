import { BadgeCheck, BookOpen, Clock, DollarSign, Headphones, Shield, Users } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import TitleSection from '@/components/shared/TitleSection';
import Image from 'next/image';

export const metadata = {
  title: 'About Us - WanderStay',
  description: 'Learn more about WanderStay and our commitment to transparent, flexible booking.',
};

const features = [
  {
    icon: Users,
    title: '300,000+ Experiences',
    description:
      'Discover 300,000+ hotels and travel experiences worldwide, all curated with transparent pricing and trusted service.',
  },
  {
    icon: DollarSign,
    title: 'Competitive Pricing',
    description:
      'Get the best hotel deals with competitive pricing designed to save you more on every booking, wherever you travel.',
  },
  {
    icon: BookOpen,
    title: 'Fast Booking',
    description:
      'Book your hotel just a few clicks with a fast, streamlined reservation process and instant confirmation.',
  },
  {
    icon: Shield,
    title: 'Guest Service',
    description:
      'Experience personalized guest service designed to make every stay memorable, comfortable, and stress-free.',
  },
  {
    icon: Clock,
    title: 'Best Support 24/7',
    description:
      'Get 24/7/365 support from our dedicated team, ready to assist you anytime, anywhere, during your booking or travel.',
  },
  {
    icon: Headphones,
    title: 'Ultimate Flexibility',
    description:
      'Travel with confidence knowing you can modify or cancel your booking with flexible options for last-minute changes.',
  },
];

export default function AboutUsPage() {
  return (
    <>
      <PageHero
        title="About Us"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about-us' },
        ]}
      />

      <section className="app-container py-16 sm:py-20">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-5">
          <div className="space-y-6 lg:col-span-3">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">Smart Hotel Booking.</h2>
              <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                Comfortable Stays. Everywhere.
              </h2>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
              Welcome to WanderStay, We&apos;re here to empower every traveler with fair service the
              globe from budget-friendly stays to luxury accommodations, we offer transparent
              pricing, secure payments, and instant confirmations so you always know what
              you&apos;re paying.
            </p>

            <ul className="space-y-3">
              {[
                'Trusted Partnerships',
                'Secure & Protected Payments',
                'Clear & Transparent Policies',
                '24/7 Customer Support',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <div className="flex size-8 items-center justify-center rounded-full border border-green-100 bg-green-50">
                    <BadgeCheck className="size-5 text-green-600" />
                  </div>
                  <span className="text-sm font-medium sm:text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:col-span-2">
            <div className="absolute -inset-4 bg-linear-to-br from-rose-100 to-amber-100 opacity-30 blur-2xl" />
            <Image
              src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
              alt="Luxury hotel pool"
              width={1280}
              height={400}
              className="relative h-80 w-full rounded-3xl object-cover sm:h-100"
            />
          </div>
        </div>
      </section>

      <section className="bg-linear-to-b from-gray-50 to-white py-16 sm:py-20">
        <div className="app-container">
          <TitleSection
            title="Why WanderStay is Best"
            description="Favorite destinations based on customer reviews"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article
                  key={feature.title}
                  className="group flex flex-col items-center gap-4 rounded-2xl border bg-white p-6 text-center transition hover:border-gray-300"
                >
                  <div className="bg-primary/10 flex size-14 items-center justify-center rounded-2xl transition group-hover:scale-110">
                    <Icon className="text-primary size-7" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
