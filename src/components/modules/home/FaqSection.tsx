'use client';

import { ChevronDown } from 'lucide-react';
import TitleSection from '../../shared/TitleSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'What documents do I need to travel internationally?',
    answer:
      'You usually need a valid passport, a visa if required by your destination, proof of accommodation, and a return or onward ticket.',
  },
  {
    question: 'How can I book a tour package?',
    answer:
      'Choose your destination, set dates and guests, and complete checkout. A confirmation email arrives instantly after payment.',
  },
  {
    question: 'What is included in the tour package price?',
    answer:
      'Packages typically include accommodation, selected activities, and local support. Each listing shows the exact inclusions.',
  },
  {
    question: 'What is your cancellation and refund policy?',
    answer:
      'Most stays offer flexible cancellation. The policy details are shown before booking and in your confirmation email.',
  },
  {
    question: 'How do I know if my booking is confirmed?',
    answer:
      'Once payment is complete, you receive an email with your booking ID and itinerary within minutes.',
  },
];

export default function FaqSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="app-container">
        <TitleSection
          eyebrow="FAQ"
          title="Frequently Asked Questions"
          description="Everything you need to know before planning your next stay."
        />

        <Accordion type="single" collapsible defaultValue="item-0" className="mt-10 space-y-5">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.question}
              value={`item-${index}`}
              className="rounded-2xl border px-5 last:mb-0"
            >
              <AccordionTrigger className="flex items-center justify-between gap-4 py-4 text-left text-sm font-semibold no-underline hover:no-underline sm:text-base">
                {faq.question}
              </AccordionTrigger>

              <AccordionContent className="data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up text-muted-foreground pb-4 text-sm">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
