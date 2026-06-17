import { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { getBrandDetails } from "@/lib/data";

export function generateMetadata(): Metadata {
  const brand = getBrandDetails();
  return {
    title: `${brand.name} | Premium Bicycle Shop in Mathura`,
    description: `Welcome to ${brand.name} since 1970s. Discover premium road, mountain, gravel, and electric cycles in Mathura. Visit us or order via WhatsApp!`,
  };
}

export default function HomePage() {
  const brand = getBrandDetails();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BicycleStore",
    "name": brand.name,
    "image": brand.shop_images.landscapes["1"],
    "@id": "https://agrawalcycles.com/#store",
    "url": "https://agrawalcycles.com",
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
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 27.5154512,
      "longitude": 77.6689246
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "10:00",
      "closes": "20:30"
    },
    "sameAs": [
      brand.socials.instagram,
      brand.socials.facebook
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}
