export type Hotel = {
  id: string;
  name: string;
  city: string;
  country: string;
  rating: number;
  reviews: number;
  price: number;
  tag: string;
  image: string;
  amenities: string[];
  propertyType: string;
  distanceKm: number;
  freeCancellation: boolean;
  payLater: boolean;
};

export type HotelFiltersState = {
  query: string;
  city: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  selectedAmenities: string[];
  selectedTypes: string[];
  freeCancellation: boolean;
  payLater: boolean;
};

export type SortOption = 'recommended' | 'rating' | 'price-low' | 'price-high';
