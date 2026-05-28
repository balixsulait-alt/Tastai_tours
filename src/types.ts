export type Currency = 'USD' | 'UGX' | 'KES' | 'EUR' | 'GBP';

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  image: string;
}

export interface TourPackage {
  id: string;
  title: string;
  tagline: string;
  duration: string;
  countries: string[];
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  groupSize: string;
  priceUSD: number;
  rating: number;
  reviewsCount: number;
  heroImage: string;
  gallery: string[];
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
}

export interface EastAfricanLandmark {
  id: string;
  name: string;
  country: 'Uganda' | 'Tanzania' | 'Kenya' | 'Rwanda';
  coordinates: { x: number; y: number }; // Percentage coordinate on custom SVG East African Map
  description: string;
  image: string;
  highlight: string;
  bestTimeToVisit: string;
  elevationOrFeature: string;
}

export interface FlightAlert {
  id: string;
  timestamp: string;
  type: 'gate' | 'schedule' | 'guide' | 'weather';
  title: string;
  message: string;
  read: boolean;
}

export interface UserReview {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  packageName: string;
  reviewText: string;
  tags: string[];
  verified: boolean;
  likes: number;
}
