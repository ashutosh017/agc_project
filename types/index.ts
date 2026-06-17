export interface BrandDetails {
  name: string;
  about: string;
  address1: string;
  address2: string;
  google_maps_address1: string;
  google_maps_address2: string;
  store: string;
  "online orders": string;
  socials: {
    instagram: string;
    facebook: string;
  };
  shop_images: {
    landscapes: Record<string, string>;
    portraits: Record<string, string>;
  };
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  featured: boolean;
  images: string[];
  shortDescription: string;
  description: string;
  specs: Record<string, string>;
  features: string[];
  variants?: {
    Sizes?: string[];
    Colors?: string[];
  };
}
