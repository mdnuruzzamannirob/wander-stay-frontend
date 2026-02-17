export type HotelRoom = {
  id: string;
  name: string;
  size: number;
  maxGuests: number;
  bedType: string;
  price: number;
  originalPrice: number;
  image: string;
  amenities: string[];
  freeCancellation: boolean;
  breakfastIncluded: boolean;
};

export type HotelReview = {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  stayType: string;
};

/** Demo gallery images keyed by hotel ID */
export const HOTEL_GALLERY: Record<string, string[]> = {
  h1: [
    'https://images.unsplash.com/photo-1729188430325-eb540fcdd941?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
  ],
};

/** Default gallery for hotels without specific images */
export const DEFAULT_GALLERY = [
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
];

/** Generates demo rooms for any hotel */
export function getDemoRooms(hotelId: string, basePrice: number): HotelRoom[] {
  return [
    {
      id: `${hotelId}-r1`,
      name: 'Standard Room',
      size: 28,
      maxGuests: 2,
      bedType: '1 Queen Bed',
      price: basePrice,
      originalPrice: Math.round(basePrice * 1.2),
      image:
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&w=600&q=80',
      amenities: ['Free Wi-Fi', 'Air conditioning', 'Flat-screen TV', 'Mini bar'],
      freeCancellation: true,
      breakfastIncluded: false,
    },
    {
      id: `${hotelId}-r2`,
      name: 'Deluxe Room',
      size: 38,
      maxGuests: 2,
      bedType: '1 King Bed',
      price: Math.round(basePrice * 1.35),
      originalPrice: Math.round(basePrice * 1.6),
      image:
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      amenities: [
        'Free Wi-Fi',
        'Air conditioning',
        'Flat-screen TV',
        'Mini bar',
        'City view',
        'Bathtub',
      ],
      freeCancellation: true,
      breakfastIncluded: true,
    },
    {
      id: `${hotelId}-r3`,
      name: 'Premium Suite',
      size: 55,
      maxGuests: 3,
      bedType: '1 King Bed + 1 Sofa Bed',
      price: Math.round(basePrice * 1.8),
      originalPrice: Math.round(basePrice * 2.2),
      image:
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
      amenities: [
        'Free Wi-Fi',
        'Air conditioning',
        'Flat-screen TV',
        'Mini bar',
        'Ocean view',
        'Bathtub',
        'Living area',
        'Butler service',
      ],
      freeCancellation: true,
      breakfastIncluded: true,
    },
    {
      id: `${hotelId}-r4`,
      name: 'Presidential Suite',
      size: 85,
      maxGuests: 4,
      bedType: '2 King Beds',
      price: Math.round(basePrice * 2.5),
      originalPrice: Math.round(basePrice * 3),
      image:
        'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=80',
      amenities: [
        'Free Wi-Fi',
        'Air conditioning',
        'Flat-screen TV',
        'Mini bar',
        'Panoramic view',
        'Jacuzzi',
        'Living area',
        'Dining area',
        'Butler service',
        'Private terrace',
      ],
      freeCancellation: false,
      breakfastIncluded: true,
    },
  ];
}

/** Generates demo reviews */
export function getDemoReviews(): HotelReview[] {
  return [
    {
      id: 'rev1',
      author: 'Sarah Johnson',
      avatar: 'SJ',
      rating: 5,
      date: '2026-01-15',
      title: 'Absolutely stunning property!',
      comment:
        'From the moment we arrived, the staff made us feel incredibly welcome. The room was spotless, the amenities were top-notch, and the views were breathtaking. Would definitely come back!',
      stayType: 'Couple',
    },
    {
      id: 'rev2',
      author: 'Michael Chen',
      avatar: 'MC',
      rating: 4,
      date: '2026-01-08',
      title: 'Great stay with minor issues',
      comment:
        'Overall a wonderful experience. The room was comfortable and the breakfast buffet had a great selection. Only minor complaint was the check-in process was a bit slow during peak hours.',
      stayType: 'Business',
    },
    {
      id: 'rev3',
      author: 'Emily Williams',
      avatar: 'EW',
      rating: 5,
      date: '2025-12-28',
      title: 'Perfect family vacation',
      comment:
        'We stayed here with our two kids and it was perfect. The kids club kept them entertained while we enjoyed the spa. The pool area is gorgeous and the rooms were spacious enough for our family.',
      stayType: 'Family',
    },
    {
      id: 'rev4',
      author: 'David Park',
      avatar: 'DP',
      rating: 4,
      date: '2025-12-20',
      title: 'Luxury at its finest',
      comment:
        'The attention to detail here is remarkable. Every staff member goes above and beyond. The restaurant serves exceptional cuisine and the spa treatments were world-class.',
      stayType: 'Couple',
    },
    {
      id: 'rev5',
      author: 'Amina Rahman',
      avatar: 'AR',
      rating: 5,
      date: '2025-12-10',
      title: 'Exceeded all expectations',
      comment:
        'This was our anniversary trip and the hotel made it so special. They upgraded our room, left a beautiful cake, and the concierge arranged an amazing sunset dinner. Truly unforgettable.',
      stayType: 'Couple',
    },
  ];
}

/** Hotel policies */
export const HOTEL_POLICIES = {
  checkIn: '3:00 PM',
  checkOut: '11:00 AM',
  cancellation:
    'Free cancellation up to 24 hours before check-in. After that, one night charge applies.',
  children:
    'Children of all ages are welcome. One child under 6 years stays free when using existing beds.',
  pets: 'Pets are not allowed.',
  smoking: 'Smoking is not permitted anywhere inside the hotel.',
  payment:
    'We accept all major credit cards (Visa, Mastercard, American Express) and mobile payments.',
};

/** Nearby attractions */
export const NEARBY_ATTRACTIONS = [
  { name: 'City Center', distance: '1.2 km' },
  { name: 'International Airport', distance: '18 km' },
  { name: 'Beach / Waterfront', distance: '0.5 km' },
  { name: 'Shopping Mall', distance: '2.3 km' },
  { name: 'Museum District', distance: '3.1 km' },
  { name: 'Train Station', distance: '4.5 km' },
];
