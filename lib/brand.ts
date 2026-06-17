import { BrandDetails } from "@/types";
import brandDetailsData from "@/data/brand_details.json";

export function getBrandDetails(): BrandDetails {
  return (brandDetailsData as unknown) as BrandDetails;
}
