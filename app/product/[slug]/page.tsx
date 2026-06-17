import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts, getBrandDetails } from "@/lib/data";
import ProductDetailClient from "@/components/ProductDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static paths for all products at build time for extreme performance
 */
export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

/**
 * Generate dynamic SEO metadata for each individual product page
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  const brand = getBrandDetails();
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | ${brand.name}`,
      description: product.shortDescription,
      url: `https://agrawalcycles.com/product/${product.slug}`,
      siteName: brand.name,
      type: "website",
      images: [
        {
          url: product.images[0],
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const allProducts = getProducts();
  const brand = getBrandDetails();
  const productUrl = `https://agrawalcycles.com/product/${product.slug}`;

  // Fetch related products (same category, excluding current product)
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // If not enough related products in the same category, fill with others
  if (relatedProducts.length < 3) {
    const fillers = allProducts
      .filter((p) => p.category !== product.category && p.id !== product.id)
      .slice(0, 3 - relatedProducts.length);
    relatedProducts.push(...fillers);
  }

  // JSON-LD Product Schema Markup for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.images,
    "description": product.shortDescription,
    "sku": `AC-${product.id}-${product.slug.toUpperCase()}`,
    "brand": {
      "@type": "Brand",
      "name": product.brand
    },
    "offers": {
      "@type": "Offer",
      "url": productUrl,
      "priceCurrency": "INR",
      "price": product.price,
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Store",
        "name": brand.name,
        "address": brand.address1
      }
    }
  };

  return (
    <>
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <ProductDetailClient
        product={product}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
