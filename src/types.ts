export type Language = 'en' | 'es';

export interface TireProduct {
  id: string;
  brand: string;
  model: string;
  size: string; // e.g. "205/55R16"
  width: number; // e.g. 205
  ratio: number; // e.g. 55
  rim: number; // e.g. 16
  category: 'passenger' | 'suv' | 'truck' | 'performance';
  season: 'all-season' | 'summer' | 'winter';
  speedRating: string; // e.g. "91H"
  warrantyMiles: number; // e.g. 65000
  price: number;
  originalPrice?: number;
  condition: 'new' | 'used';
  treadDepth?: string; // e.g. "9/32 (~85%)" for used tires
  stock: number;
  rating: number;
  reviewsCount: number;
  description: string;
  features: string[];
}

export interface ServiceItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  priceStart: number;
  estimatedTime: string;
  icon: string;
  features: string[];
  recommendedInterval?: string;
}

export interface LocationInfo {
  id: string;
  name: string;
  city: string;
  state: string;
  zip: string;
  address: string;
  phone: string;
  phoneDisplay: string;
  tollFree: string;
  hoursWeekday: string;
  hoursSaturday: string;
  hoursSunday: string;
  manager: string;
  googleMapsUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  features: string[];
}

export interface Coupon {
  id: string;
  title: string;
  badge: string;
  discount: string;
  code: string;
  description: string;
  eligibility: string;
  expiry: string;
  colorTheme: 'green' | 'amber' | 'blue';
}

export interface CartItem {
  tire: TireProduct;
  quantity: number;
  includeInstallation: boolean;
}

export interface ServiceBooking {
  locationId: string;
  serviceId: string;
  date: string;
  time: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  tireSize?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  notes?: string;
}

export interface GoogleReviewItem {
  id: string;
  author: string;
  avatarText?: string;
  isLocalGuide?: boolean;
  reviewsCount?: number;
  photosCount?: number;
  rating: number;
  date: string;
  text: string;
  ownerResponse?: {
    author: string;
    date: string;
    text: string;
  };
  highlightService?: string;
}
