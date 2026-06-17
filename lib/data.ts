import { BrandDetails, Product } from "@/types";
import brandDetailsData from "@/data/brand_details.json";
import productsData from "@/data/products.json";

export function getBrandDetails(): BrandDetails {
  return (brandDetailsData as unknown) as BrandDetails;
}

export function getProducts(): Product[] {
  return (productsData as unknown) as Product[];
}

export function getProductBySlug(slug: string): Product | undefined {
  return ((productsData as unknown) as Product[]).find((p) => p.slug === slug);
}
