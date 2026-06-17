"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare, ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { formatPrice, getBuyNowWhatsAppLink } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [productUrl, setProductUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setProductUrl(`${window.location.origin}/product/${product.slug}`);
    }
  }, [product.slug]);

  const waLink = getBuyNowWhatsAppLink(product.name, productUrl);

  return (
    <div className="group bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl overflow-hidden hover:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-500 flex flex-col h-full">
      {/* Product Image */}
      <Link href={`/product/${product.slug}`} className="relative block aspect-video sm:aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-950">
        <img
          src={product.images[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Category badge */}
        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-white/90 dark:bg-black/90 text-zinc-900 dark:text-white shadow-sm">
          {product.category}
        </span>
      </Link>

      {/* Product Info */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-2">
          <span className="text-xs font-semibold tracking-wider text-zinc-400 dark:text-zinc-500 uppercase">
            {product.brand}
          </span>
        </div>
        
        <Link href={`/product/${product.slug}`} className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors duration-200">
          <h3 className="font-sans font-bold text-lg tracking-tight text-zinc-900 dark:text-white mb-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Price and CTAs */}
        <div className="mt-auto">
          <div className="flex items-baseline justify-between mb-5 border-t border-zinc-100 dark:border-zinc-800/80 pt-4">
            <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              Price
            </span>
            <span className="text-xl font-bold text-zinc-900 dark:text-white">
              {formatPrice(product.price)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href={`/product/${product.slug}`}
              className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-semibold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors duration-300"
            >
              Details
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-current" />
              Buy Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
