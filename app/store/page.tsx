import { Metadata } from "next";
import StoreClient from "@/components/StoreClient";
import { getBrandDetails } from "@/lib/data";

export function generateMetadata(): Metadata {
  const brand = getBrandDetails();
  return {
    title: "Premium Bicycle Collection",
    description: `Explore the premier bike collection at ${brand.name}. Shop high-performance road, mountain, electric, gravel, and hybrid cycles in Mathura.`,
  };
}

export default function StorePage() {
  const brand = getBrandDetails();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Bicycle Collection",
    "description": `Curated collection of high-performance road, mountain, gravel, hybrid, and electric bicycles at ${brand.name} Mathura.`,
    "publisher": {
      "@type": "BicycleStore",
      "name": brand.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": brand.address1,
        "addressLocality": "Mathura",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "281001",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <StoreClient />
    </>
  );
}
