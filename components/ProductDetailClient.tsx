"use client";

import { useState, useEffect, useRef } from "react";

import Link from "next/link";
import { MessageSquare, ArrowLeft, Heart, Check, ChevronRight, CornerDownRight } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, getProductDetailWhatsAppLink } from "@/lib/utils";
import ProductCard from "./ProductCard";
import Breadcrumbs from "./Breadcrumbs";

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: ProductDetailClientProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.variants?.Sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.variants?.Colors?.[0] || "");
  const [isLiked, setIsLiked] = useState(false);
  const [productUrl, setProductUrl] = useState("");
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  
  const mainCtaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setProductUrl(`${window.location.origin}/product/${product.slug}`);
    }

    // Scroll tracker for mobile sticky CTA
    const handleScroll = () => {
      if (!mainCtaRef.current) return;
      
      const ctaPosition = mainCtaRef.current.getBoundingClientRect().bottom;
      // Show sticky CTA once the main CTA goes above the viewport bottom (hidden)
      if (ctaPosition < 0) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [product.slug]);

  const waLink = getProductDetailWhatsAppLink(product.name, productUrl);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-12">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: "Store", href: "/store" },
          { label: product.name }
        ]}
      />

      {/* Back Button */}
      <div className="my-6">
        <Link
          href="/store"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors duration-250"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Store
        </Link>
      </div>

      {/* Product Content Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
        
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative aspect-video sm:aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-900">
            <img
              src={product.images[activeImage]}
              alt={`${product.name} Main Image`}
              className="absolute inset-0 w-full h-full object-contain p-4 sm:p-6"
              loading="lazy"
            />
          </div>
          
          {/* Thumbnails strip */}
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((imgUrl, index) => {
              const isActive = index === activeImage;
              return (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`relative aspect-video sm:aspect-[4/3] rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-950 border transition-all duration-300 focus:outline-none ${
                    isActive
                      ? "border-zinc-950 dark:border-white ring-2 ring-zinc-950/10 dark:ring-white/10"
                      : "border-zinc-200 dark:border-zinc-800 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} view ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-contain p-2"
                    loading="lazy"
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Information & Options */}
        <div className="lg:col-span-5 flex flex-col">
          {/* Collection tag and like */}
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-zinc-100 dark:bg-zinc-900 text-zinc-650 dark:text-zinc-400">
              {product.category} Collection
            </span>
            <button
              onClick={() => setIsLiked(!isLiked)}
              className="w-9 h-9 rounded-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-850 flex items-center justify-center text-zinc-650 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400 transition-colors"
              aria-label="Wishlist product"
            >
              <Heart className={`w-4.5 h-4.5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </button>
          </div>

          {/* Title and brand */}
          <span className="text-sm font-semibold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase mb-2">
            {product.brand}
          </span>
          <h1 className="text-3xl sm:text-4xl font-sans font-black uppercase tracking-tight text-zinc-900 dark:text-white mb-4 leading-tight">
            {product.name}
          </h1>

          {/* Pricing */}
          <div className="mb-6 pb-6 border-b border-zinc-200/50 dark:border-zinc-900">
            <span className="text-3xl font-black text-zinc-950 dark:text-white">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
              Overview
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed font-light">
              {product.description}
            </p>
          </div>

          {/* Variants selectors if available */}
          {product.variants && (
            <div className="space-y-6 mb-8 py-6 border-t border-b border-zinc-100 dark:border-zinc-900/60">
              
              {/* Size Select */}
              {product.variants.Sizes && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
                    Available Frame Sizes
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {product.variants.Sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 text-xs font-bold rounded-lg border uppercase transition-all duration-300 ${
                          selectedSize === size
                            ? "bg-zinc-950 border-zinc-950 text-white dark:bg-white dark:border-white dark:text-black shadow-sm"
                            : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Select */}
              {product.variants.Colors && (
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3">
                    Colorways
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {product.variants.Colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 text-xs font-medium rounded-lg border transition-all duration-300 ${
                          selectedColor === color
                            ? "bg-zinc-950 border-zinc-950 text-white dark:bg-white dark:border-white dark:text-black shadow-sm"
                            : "bg-white border-zinc-200 text-zinc-600 hover:border-zinc-400 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400"
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* Primary CTA Block */}
          <div ref={mainCtaRef} className="space-y-4">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-4.5 px-6 rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-black hover:bg-zinc-850 dark:hover:bg-zinc-150 text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-md"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              Order on WhatsApp
            </a>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 text-center leading-relaxed">
              No immediate checkout required. Click to discuss custom fitting, parts selection, shipping, and finalize purchase over a secure chat.
            </p>
          </div>

        </div>
      </div>

      {/* Specifications & Features Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 border-t border-zinc-200/60 dark:border-zinc-900/60 pt-16 mb-24">
        
        {/* Specifications Table */}
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
            <CornerDownRight className="w-5 h-5 text-zinc-450" />
            Build Specifications
          </h2>
          <div className="border border-zinc-200/80 dark:border-zinc-850 rounded-2xl overflow-hidden shadow-sm bg-white dark:bg-zinc-950">
            <table className="w-full text-sm text-left">
              <tbody>
                {Object.entries(product.specs).map(([label, value], index) => (
                  <tr
                    key={label}
                    className={`border-b border-zinc-200/40 dark:border-zinc-900/40 last:border-0 ${
                      index % 2 === 0 ? "bg-zinc-50/50 dark:bg-zinc-900/20" : "bg-transparent"
                    }`}
                  >
                    <td className="px-5 py-4 font-bold text-xs uppercase tracking-wider text-zinc-400 dark:text-zinc-500 w-1/3">
                      {label}
                    </td>
                    <td className="px-5 py-4 text-zinc-700 dark:text-zinc-300 font-light">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Features List */}
        <div>
          <h2 className="text-xl font-bold uppercase tracking-wider text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
            <CornerDownRight className="w-5 h-5 text-zinc-450" />
            Key Technologies
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {product.features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-5 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-200/40 dark:border-zinc-800/40"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-zinc-900 dark:text-white mb-1">
                    {feature.split(" with ")[0]}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                    {feature}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Related Bicycles Grid */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-zinc-200/60 dark:border-zinc-900/60 pt-16 mb-12">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-zinc-450 dark:text-zinc-500 text-xs font-bold uppercase tracking-widest">
                More Collections
              </span>
              <h2 className="text-2xl sm:text-3xl font-sans font-black uppercase tracking-tight text-zinc-900 dark:text-white mt-2">
                Related <span className="text-zinc-400 font-light italic">Bicycles</span>
              </h2>
            </div>
            
            <Link
              href="/store"
              className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white hover:opacity-70 transition-opacity inline-flex items-center gap-1"
            >
              Explore all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedProducts.slice(0, 3).map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}

      {/* Mobile Sticky CTA Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-900 p-4 z-40 flex items-center justify-between md:hidden shadow-lg transition-transform duration-300 ease-in-out ${
          showStickyCTA ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-3 w-3/5">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900 shrink-0">
            <img
              src={product.images[0]}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-xs uppercase text-zinc-900 dark:text-white truncate">
              {product.name}
            </h4>
            <span className="font-bold text-xs text-zinc-500 dark:text-zinc-400">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
        
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 py-3.5 px-4 rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-black text-[10px] font-bold uppercase tracking-widest shadow-sm"
        >
          <MessageSquare className="w-3.5 h-3.5 fill-current" />
          Buy Now
        </a>
      </div>
    </div>
  );
}
