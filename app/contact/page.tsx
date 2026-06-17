import { Metadata } from "next";
import ContactClient from "@/components/ContactClient";
import { getBrandDetails } from "@/lib/brand";

export function generateMetadata(): Metadata {
  const brand = getBrandDetails();
  return {
    title: "Contact Us",
    description: `Get in touch with ${brand.name} Mathura. Visit our showrooms at Masani or Tilak Dwar, or contact us at ${brand.store} for support and orders.`,
  };
}

export default function ContactPage() {
  const brand = getBrandDetails();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": `Contact ${brand.name}`,
    "description": `Contact details, hotlines, addresses, and map coordinates for ${brand.name} showrooms in Mathura.`,
    "mainEntity": {
      "@type": "BicycleStore",
      "name": brand.name,
      "telephone": brand.store,
      "address": [
        {
          "@type": "PostalAddress",
          "streetAddress": brand.address1,
          "addressLocality": "Mathura",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "281001",
          "addressCountry": "IN"
        },
        {
          "@type": "PostalAddress",
          "streetAddress": brand.address2,
          "addressLocality": "Mathura",
          "addressRegion": "Uttar Pradesh",
          "postalCode": "281001",
          "addressCountry": "IN"
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient />
    </>
  );
}
