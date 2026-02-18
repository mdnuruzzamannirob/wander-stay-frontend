import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export const footerLinks = {
  help: [
    { label: 'About Us', href: '/about-us' },
    { label: 'Contact Us', href: '/contact-us' },
    { label: 'FAQ', href: '/faq' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Condition', href: '/terms-condition' },
    { label: 'Cancellation Policy', href: '/cancellation-policy' },
  ],
};

export const contactLinks = [
  {
    label: '123 Hotel Avenue, Suite 100 Amsterdam, NL 10001',
    icon: MapPin,
  },
  {
    label: '+31 (0) 20 123 4567',
    icon: Phone,
  },
  {
    label: 'support@wanderstay.com',
    icon: Mail,
  },
];

export const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
];
