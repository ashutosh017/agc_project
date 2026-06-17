"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, RotateCcw, AlertTriangle } from "lucide-react";
import { getProducts } from "@/lib/data";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import Breadcrumbs from "@/components/Breadcrumbs";

function StoreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const allProducts = getProducts();

  // Get initial states from URL query params
  const categoryParam = searchParams.get("category") || "All";
  const searchParam = searchParams.get("search") || "";
  const sortParam = searchParams.get("sort") || "default";

  // Component states
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState(sortParam);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);

  // Sync category state with URL if it changes (e.g., from footer links)
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...allProducts];

    // 1. Search Query Filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.shortDescription.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      );
    }

    // 2. Category Filter
    if (selectedCategory !== "All") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 3. Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);

    // Update query parameters in the URL without page reload
    const params = new URLSearchParams();
    if (selectedCategory !== "All") params.set("category", selectedCategory);
    if (searchQuery.trim() !== "") params.set("search", searchQuery);
    if (sortBy !== "default") params.set("sort", sortBy);
    
    const newQueryString = params.toString();
    const newPath = newQueryString ? `/store?${newQueryString}` : "/store";
    router.replace(newPath, { scroll: false });
  }, [searchQuery, selectedCategory, sortBy]);

  // Categories present in products
  const categories = ["All", ...Array.from(new Set(allProducts.map((p) => p.category)))];

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSortBy("default");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-12 flex flex-col flex-1">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: "Store" }]} />

      {/* Header */}
      <div className="my-8">
        <h1 className="text-3xl sm:text-5xl font-sans font-black uppercase tracking-tight text-zinc-900 dark:text-white mb-4">
          The <span className="text-zinc-400 font-light italic">Collection</span>
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm sm:text-base font-light max-w-2xl leading-relaxed">
          Explore our range of premium bicycles designed for absolute performance, daily speed, and weekend escape. Hand-fitted to your specifications.
        </p>
      </div>

      {/* Filters & Search Controls */}
      <div className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-6 mb-12 flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          {/* Search bar */}
          <div className="relative lg:col-span-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search bicycles by name, brand, spec..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-905 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-450 dark:focus:ring-zinc-700"
            />
          </div>

          {/* Sort Select */}
          <div className="relative lg:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-zinc-905 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm text-zinc-700 dark:text-zinc-300 focus:outline-none focus:ring-1 focus:ring-zinc-450 dark:focus:ring-zinc-700 appearance-none cursor-pointer"
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-500">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
          </div>

          {/* Clear Filters Button (Visible only when filters are active) */}
          {(searchQuery || selectedCategory !== "All" || sortBy !== "default") && (
            <div className="lg:col-span-3">
              <button
                onClick={handleClearFilters}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-450 hover:bg-zinc-950 hover:text-white hover:border-zinc-950 dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition-all duration-300"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Category Pill Filters */}
        <div className="border-t border-zinc-200/50 dark:border-zinc-800/80 pt-5">
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? "bg-zinc-950 text-white dark:bg-white dark:text-black shadow-sm"
                      : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  {cat === "All" ? "All Rides" : cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 animate-fade-in">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-20 flex flex-col items-center justify-center text-center max-w-md mx-auto border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 bg-zinc-50/50 dark:bg-zinc-900/10 mb-20">
          <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-400 dark:text-zinc-500 mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="font-sans font-bold text-lg text-zinc-900 dark:text-white mb-2">
            No Bicycles Found
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 font-light">
            We couldn't find any bikes matching your search keywords or filter settings. Try clearing your filters or testing other terms.
          </p>
          <button
            onClick={handleClearFilters}
            className="px-6 py-3 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-black text-xs font-semibold uppercase tracking-wider hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-sm"
          >
            Clear Search & Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function StoreClient() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20 flex items-center justify-center flex-1">
          <div className="flex flex-col items-center gap-4 text-zinc-400 dark:text-zinc-650">
            <div className="w-8 h-8 rounded-full border-2 border-t-zinc-950 dark:border-t-white border-zinc-200 dark:border-zinc-800 animate-spin" />
            <span className="text-xs uppercase tracking-widest font-semibold">Loading Collection...</span>
          </div>
        </div>
      }
    >
      <StoreContent />
    </Suspense>
  );
}
