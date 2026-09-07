export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice: number; // For strikethrough discount
  rating: number;
  reviewsCount: number;
  image: string; // Primary image
  images: string[]; // Secondary images for detail gallery
  occasion: string;
  bestSeller: boolean;
  newArrival: boolean;
  specifications: Record<string, string>;
  engravingAvailable: boolean;
  sizeAvailable: boolean;
  colorAvailable: boolean;
  sizes?: string[];
  colors?: { name: string; hex: string }[];
  reviews: Review[];
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Personalization {
  engravingText?: string;
  selectedSize?: string;
  selectedColor?: string;
}

export interface CartItem {
  id: string; // unique combination of product ID and personalization selections
  product: Product;
  quantity: number;
  personalization: Personalization;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  date: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    personalizationText?: string;
  }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  address: Address;
  paymentMethod: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Returned';
  trackingNumber: string;
}

export type Page = 'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'account';

export type SortOption = 'popularity' | 'price-low' | 'price-high' | 'newest';

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  rating: number | null;
  occasions: string[];
  search: string;
}

declare global {
  interface Window {
    recaptchaVerifier: any;
    recaptchaWidgetId: any;
    grecaptcha: any;
  }
}

