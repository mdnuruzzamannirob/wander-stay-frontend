'use client';

import { Mail, MapPin, Phone, Send } from 'lucide-react';
import PageHero from '@/components/shared/PageHero';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import ButtonComp from '@/components/shared/ButtonComp';

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    title: 'Feel free to Call us 24/7',
    value: '+1 (212) 123-4567',
  },
  {
    icon: Mail,
    label: 'Email',
    title: 'Our team is here to help',
    value: 'info@wanderstay.com',
  },
  {
    icon: MapPin,
    label: 'Office',
    title: 'Visit our headquarters',
    value: '123 Hotel Avenue, Suite 100\nNew York, NY 10001',
  },
];

export default function ContactUsPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <PageHero
        title="Get in Touch"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact', href: '/contact-us' },
        ]}
      />

      <section className="app-container py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.label}
                  className="flex items-start gap-4 rounded-2xl border bg-gray-50 p-5"
                >
                  <div className="bg-primary/10 flex size-12 shrink-0 items-center justify-center rounded-xl">
                    <Icon className="text-primary size-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{info.label}</h3>
                    <p className="text-muted-foreground text-sm">{info.title}</p>
                    <p className="text-sm font-medium whitespace-pre-line">{info.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border bg-white p-5">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="text-muted-foreground mb-1 block text-sm font-medium"
                >
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="ring-primary h-11 w-full rounded-lg border px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-muted-foreground mb-1 block text-sm font-medium"
                >
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="ring-primary h-11 w-full rounded-lg border px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-muted-foreground mb-1 block text-sm font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="How can we help you?"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="ring-primary w-full rounded-lg border px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <ButtonComp
                type="submit"
                size="lg"
                loading={loading}
                loadingText="Sending..."
                className="w-full"
              >
                <Send className="size-4" />
                Send Message
              </ButtonComp>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
