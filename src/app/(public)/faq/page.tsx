'use client';

import PageHero from '@/components/shared/PageHero';
import TitleSection from '@/components/shared/TitleSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { HelpCircle, Mail } from 'lucide-react';
import Link from 'next/link';

const faqCategories = [
  {
    category: 'Booking & Reservations',
    faqs: [
      {
        question: 'How can I book a hotel on WanderStay?',
        answer:
          'Simply search for your destination, select check-in and check-out dates, choose the number of guests, and browse through available hotels. Once you find the perfect stay, click "Book Now" and follow the checkout process.',
      },
      {
        question: 'Do I need to create an account to book?',
        answer:
          'While you can browse hotels without an account, creating one makes booking faster and lets you track your reservations, save favorite hotels, and access exclusive member deals.',
      },
      {
        question: 'Can I book for someone else?',
        answer:
          'Yes, you can book a hotel for another person. Just make sure to provide their correct contact information and let them know about the reservation details.',
      },
      {
        question: 'How do I know my booking is confirmed?',
        answer:
          'After completing payment, you will receive an instant confirmation email with your booking ID, hotel details, and itinerary. You can also view your booking in the "My Bookings" section of your account.',
      },
    ],
  },
  {
    category: 'Payments & Pricing',
    faqs: [
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit cards (Visa, Mastercard, American Express), debit cards, and digital wallets. All payments are processed securely through Stripe.',
      },
      {
        question: 'Are there any hidden fees?',
        answer:
          'No. We believe in transparent pricing. All taxes, fees, and charges are clearly displayed before you complete your booking. The price you see is the price you pay.',
      },
      {
        question: 'When will my card be charged?',
        answer:
          'Your card is typically charged at the time of booking. However, some hotels may offer pay-later options where you pay at the property. Check the payment terms during checkout.',
      },
      {
        question: 'Can I get a receipt for my booking?',
        answer:
          'Yes, a detailed receipt is included in your confirmation email. You can also download it anytime from your booking history in your account dashboard.',
      },
    ],
  },
  {
    category: 'Cancellations & Refunds',
    faqs: [
      {
        question: 'What is your cancellation policy?',
        answer:
          'Each hotel has its own cancellation policy, which is clearly displayed before booking. Many properties offer free cancellation up to 24-48 hours before check-in. Always review the specific policy for your booking.',
      },
      {
        question: 'How do I cancel my booking?',
        answer:
          'Log in to your account, go to "My Bookings," select the reservation you want to cancel, and click the "Cancel Booking" button. Follow the prompts to complete the cancellation.',
      },
      {
        question: 'When will I receive my refund?',
        answer:
          'If your booking is eligible for a refund, it typically processes within 5-10 business days. The refund will be credited to the original payment method used during booking.',
      },
      {
        question: 'Can I modify my booking instead of canceling?',
        answer:
          'Depending on the hotel policy, you may be able to modify your dates or room type. Contact our 24/7 support team, and we will work with the hotel to accommodate your request whenever possible.',
      },
    ],
  },
  {
    category: 'Travel Requirements',
    faqs: [
      {
        question: 'What documents do I need to travel internationally?',
        answer:
          'You typically need a valid passport (with at least 6 months validity), visa (if required by your destination), proof of accommodation, return or onward tickets, and travel insurance documentation.',
      },
      {
        question: 'Do I need travel insurance?',
        answer:
          'While not mandatory, we strongly recommend travel insurance to cover unexpected events like trip cancellations, medical emergencies, lost luggage, and flight delays.',
      },
      {
        question: 'What are the COVID-19 travel requirements?',
        answer:
          'Travel requirements vary by destination and change frequently. Always check the latest regulations for your destination, including vaccination requirements, testing protocols, and quarantine rules.',
      },
    ],
  },
  {
    category: 'Support & Assistance',
    faqs: [
      {
        question: 'How can I contact customer support?',
        answer:
          'Our 24/7 support team is available via email at support@wanderstay.com, phone at +1 (212) 123-4567, or through the live chat feature on our website.',
      },
      {
        question: 'What if I have an issue during my stay?',
        answer:
          'Contact our support team immediately. We work closely with our hotel partners to resolve any issues quickly and ensure you have a comfortable stay.',
      },
      {
        question: 'Do you offer travel assistance services?',
        answer:
          'Yes, our concierge team can help with travel planning, local recommendations, transportation arrangements, and activity bookings to make your trip unforgettable.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'FAQ', href: '/faq' },
        ]}
      />

      <section className="bg-white py-16 sm:py-20">
        <div className="app-container">
          <TitleSection
            title="How Can We Help You?"
            description="Find answers to commonly asked questions about bookings, payments, cancellations, and more."
          />

          <div className="mt-12 space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={category.category}>
                <div className="text-primary mb-6 flex items-center gap-3">
                  <HelpCircle className="size-6" />
                  <h2 className="text-lg font-semibold sm:text-xl">{category.category}</h2>
                </div>

                <Accordion
                  type="single"
                  collapsible
                  defaultValue={categoryIndex === 0 ? 'item-0' : undefined}
                  className="space-y-4"
                >
                  {category.faqs.map((faq, index) => (
                    <AccordionItem
                      key={faq.question}
                      value={`item-${index}`}
                      className="rounded-2xl border bg-white px-5"
                    >
                      <AccordionTrigger className="flex items-center justify-between gap-4 py-4 text-left text-sm font-semibold no-underline hover:no-underline sm:text-base">
                        {faq.question}
                      </AccordionTrigger>

                      <AccordionContent className="text-muted-foreground pb-4 text-sm leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* Still Have Questions Section */}
          <div className="mt-16 rounded-2xl border bg-gray-50 to-white p-8 text-center sm:p-12">
            <div className="mx-auto max-w-2xl space-y-4">
              <div className="bg-primary/10 mx-auto flex size-16 items-center justify-center rounded-full">
                <Mail className="text-primary size-8" />
              </div>
              <h3 className="text-2xl font-bold sm:text-3xl">Still Have Questions?</h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Can&apos;t find the answer you&apos;re looking for? Our friendly customer support
                team is here to help you 24/7.
              </p>
              <Link href="/contact-us">
                <Button size="lg" className="h-12 rounded-full">
                  <Mail className="size-5" />
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
