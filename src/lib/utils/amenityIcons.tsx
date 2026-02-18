/**
 * Centralized amenity → icon mapping.
 * Works for any entity (hotel, tour, apartment, etc.).
 *
 * Usage:
 *   import { getAmenityIcon } from '@/lib/utils/amenityIcons';
 *   const icon = getAmenityIcon('Free Wi-Fi'); // returns JSX
 */

import {
  AirVent,
  Bath,
  BabyIcon,
  Beer,
  Bike,
  Cable,
  Car,
  CigaretteOff,
  Coffee,
  ConciergeBell,
  CookingPot,
  Dumbbell,
  Flame,
  Globe,
  Laptop,
  Landmark,
  Leaf,
  Martini,
  Mountain,
  PawPrint,
  Plane,
  Shell,
  Shirt,
  Snowflake,
  Sparkles,
  Sunrise,
  Tv,
  Umbrella,
  UtensilsCrossed,
  Waves,
  Wifi,
} from 'lucide-react';
import type { ReactNode } from 'react';

/* ------------------------------------------------------------------ */
/*  Master map — keys are case-insensitive matched via normalization  */
/* ------------------------------------------------------------------ */

const ICON_MAP: Record<string, (cls: string) => ReactNode> = {
  /* Connectivity */
  'free wi-fi': (c) => <Wifi className={c} />,
  wifi: (c) => <Wifi className={c} />,
  'wi-fi': (c) => <Wifi className={c} />,

  /* Wellness & Relaxation */
  spa: (c) => <Sparkles className={c} />,
  sauna: (c) => <Flame className={c} />,
  pool: (c) => <Waves className={c} />,
  'infinity pool': (c) => <Waves className={c} />,
  'lagoon pool': (c) => <Waves className={c} />,
  'private pool': (c) => <Waves className={c} />,
  'sky pool': (c) => <Waves className={c} />,

  /* Fitness & Activities */
  gym: (c) => <Dumbbell className={c} />,
  'yoga pavilion': (c) => <Leaf className={c} />,
  'bike rental': (c) => <Bike className={c} />,

  /* Dining & Drinks */
  restaurant: (c) => <UtensilsCrossed className={c} />,
  'room service': (c) => <ConciergeBell className={c} />,
  'free breakfast': (c) => <Coffee className={c} />,
  breakfast: (c) => <Coffee className={c} />,
  'floating breakfast': (c) => <Coffee className={c} />,
  'bar/lounge': (c) => <Martini className={c} />,
  'rooftop bar': (c) => <Martini className={c} />,
  'champagne bar': (c) => <Martini className={c} />,
  'sky lounge': (c) => <Beer className={c} />,
  'ayurveda menu': (c) => <Leaf className={c} />,
  minibar: (c) => <CookingPot className={c} />,
  'mini bar': (c) => <CookingPot className={c} />,

  /* Transport */
  parking: (c) => <Car className={c} />,
  'airport shuttle': (c) => <Car className={c} />,
  'airport pickup': (c) => <Plane className={c} />,

  /* Beach & Outdoors */
  'beach access': (c) => <Umbrella className={c} />,
  'private beach': (c) => <Umbrella className={c} />,
  'sunset terraces': (c) => <Sunrise className={c} />,
  'sunset cruise': (c) => <Shell className={c} />,
  'garden suites': (c) => <Leaf className={c} />,
  'cliff suites': (c) => <Mountain className={c} />,
  'desert tours': (c) => <Mountain className={c} />,

  /* Winter / Cold */
  'ski access': (c) => <Snowflake className={c} />,
  'ski storage': (c) => <Snowflake className={c} />,
  fireplace: (c) => <Flame className={c} />,

  /* Family & Pets */
  'kids club': (c) => <BabyIcon className={c} />,
  'pet friendly': (c) => <PawPrint className={c} />,

  /* Room features */
  'air conditioning': (c) => <AirVent className={c} />,
  ac: (c) => <AirVent className={c} />,
  'flat-screen tv': (c) => <Tv className={c} />,
  tv: (c) => <Tv className={c} />,
  bathtub: (c) => <Bath className={c} />,
  'city view': (c) => <Landmark className={c} />,
  'ocean view': (c) => <Waves className={c} />,
  'panoramic view': (c) => <Mountain className={c} />,
  'living area': (c) => <Laptop className={c} />,
  'dining area': (c) => <UtensilsCrossed className={c} />,
  jacuzzi: (c) => <Bath className={c} />,
  'private terrace': (c) => <Sunrise className={c} />,

  /* Services */
  concierge: (c) => <ConciergeBell className={c} />,
  'butler service': (c) => <ConciergeBell className={c} />,
  'overwater villas': (c) => <Waves className={c} />,
  'family suites': (c) => <BabyIcon className={c} />,
  laundry: (c) => <Shirt className={c} />,
  'no smoking': (c) => <CigaretteOff className={c} />,
  casino: (c) => <Cable className={c} />,
};

/* ------------------------------------------------------------------ */
/*  Public API                                                        */
/* ------------------------------------------------------------------ */

/**
 * Returns a Lucide icon for a given amenity name.
 * Falls back to a generic Globe icon for unknown amenities.
 *
 * @param amenity  - The amenity name (case-insensitive)
 * @param className - Tailwind classes applied to the icon (default: "size-4")
 */
export function getAmenityIcon(amenity: string, className = 'size-4'): ReactNode {
  const key = amenity.toLowerCase().trim();
  const factory = ICON_MAP[key];
  return factory ? factory(className) : <Globe className={className} />;
}
