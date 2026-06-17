"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Wrench,
  BadgeAlert,
  Clock,
  Bike,
  MapPin,
  Phone,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
  X
} from "lucide-react";
import { getBrandDetails, getProducts } from "@/lib/data";
import { formatPrice, getNormalizedPhoneNumber, generateWhatsAppLink } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";

export default function HomeClient() {
  const brand = getBrandDetails();
  const allProducts = getProducts();
  const featuredProducts = allProducts.filter((p) => p.featured);
  const phone = getNormalizedPhoneNumber();

  // Background Slideshow State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Gallery Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Active Map Tab
  const [activeMapTab, setActiveMapTab] = useState<"masani" | "tilak">("masani");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 10000); // Transition slide every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const landscapes = Object.values(brand.shop_images.landscapes);
  const portraits = Object.values(brand.shop_images.portraits);

  const allGalleryImages = [
    ...landscapes.map((url, i) => ({ url, label: `Shop Image ${i + 1}` })),
    ...portraits.map((url, i) => ({ url, label: `Shop Image ${landscapes.length + i + 1}` }))
  ];

  const handlePrevLightbox = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? allGalleryImages.length - 1 : prev - 1;
    });
  };

  const handleNextLightbox = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === allGalleryImages.length - 1 ? 0 : prev + 1;
    });
  };

  useEffect(() => {
    if (lightboxIndex === null) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => {
          if (prev === null) return null;
          return prev === 0 ? allGalleryImages.length - 1 : prev - 1;
        });
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => {
          if (prev === null) return null;
          return prev === allGalleryImages.length - 1 ? 0 : prev + 1;
        });
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, allGalleryImages.length]);

  const contactMessage = `Hello, I would like to get in touch with Agrawal Cycles to discuss bicycles. Thank you.`;
  const contactWhatsApp = generateWhatsAppLink(contactMessage);

  // Benefits list
  const benefits = [
    {
      icon: ShieldCheck,
      title: "Quality Assurance",
      description: "Every bicycle undergoes a comprehensive 48-point assembly and safety check by our certified mechanics.",
    },
    {
      icon: Wrench,
      title: "Expert Support",
      description: "Personalized bike fitting and custom setup recommendations to ensure comfort, speed, and safety.",
    },
    {
      icon: BadgeAlert,
      title: "Warranty Protection",
      description: "Genuine manufacturer warranties on frames and components, backed directly by our dealership.",
    },
    {
      icon: Clock,
      title: "Service & Maintenance",
      description: "A state-of-the-art service workshop offering precision tuning, wheel building, and custom upgrades.",
    },
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "Agrawal Cycles completely changed my cycling experience. Their fitting service helped me find the perfect gravel bike, and the comfort is unmatched.",
      author: "Rahul Sharma",
      role: "Endurance Rider",
    },
    {
      quote: "The only shop in the region that truly understands performance premium bikes. Excellent electronic shifting diagnostics and suspension tuning.",
      author: "Priya Patel",
      role: "Triathlete",
    },
    {
      quote: "Amazing customer support! Bought my electric commuter over WhatsApp and they delivered it fully assembled to my doorstep the same evening.",
      author: "Amit Verma",
      role: "Daily Commuter",
    },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center bg-black pt-20">
        {/* Responsive Background Slideshows */}
        <div className="absolute inset-0 z-0">
          
          {/* Mobile View: Portrait Slideshow */}
          <div className="block md:hidden absolute inset-0 bg-black">
            {portraits.map((src, index) => {
              const isActive = index === (currentSlide % portraits.length);
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-[4000ms] ease-in-out ${
                    isActive ? "opacity-60 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Agrawal Cycles Mobile Slide ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>

          {/* Desktop View: Landscape Slideshow */}
          <div className="hidden md:block absolute inset-0 bg-black">
            {landscapes.map((src, index) => {
              const isActive = index === (currentSlide % landscapes.length);
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-[4000ms] ease-in-out ${
                    isActive ? "opacity-80 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Agrawal Cycles Desktop Slide ${index + 1}`}
                    fill
                    priority={index === 0}
                    className="object-cover"
                  />
                </div>
              );
            })}
          </div>

        </div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/25 md:bg-gradient-to-t md:from-black md:via-black/30 md:to-black/20 z-10" />

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          {/* Brand Emblem */}
          <div className="mb-6 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 animate-fade-in">
            <Bike className="w-7 h-7" />
          </div>

          <span className="text-white/70 text-xs font-bold uppercase tracking-widest mb-3 block">
            Welcome to {brand.name}
          </span>
          
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black tracking-tight text-white mb-6 uppercase leading-tight">
            Crafting the <br />
            <span className="text-zinc-400 font-light italic">Future of Cycling</span>
          </h1>
          
          <p className="text-zinc-200 text-base sm:text-xl max-w-3xl mb-10 leading-relaxed font-light">
            {brand.about}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Link
              href="/store"
              className="px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-full font-semibold uppercase tracking-wider text-xs transition-all duration-300 shadow-lg flex items-center justify-center gap-2 group"
            >
              Explore Bicycles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#contact"
              className="px-8 py-4 border border-white/30 text-white hover:bg-white/10 rounded-full font-semibold uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50 animate-bounce">
          <span className="text-[9px] tracking-widest uppercase">Scroll</span>
          <ChevronRight className="w-4 h-4 rotate-95" />
        </div>
      </section>

      {/* 2. ABOUT BRAND SECTION */}
      <section id="about" className="py-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Text */}
            <div className="flex flex-col space-y-6">
              <span className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-widest">
                Our Story
              </span>
              <h2 className="text-3xl sm:text-5xl font-sans font-black uppercase tracking-tight text-zinc-900 dark:text-white leading-tight">
                Designed for those who <span className="text-zinc-400 font-light italic">ride beyond limits</span>.
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed font-light">
                For years, {brand.name} has been the cornerstone of the premium cycling community. We don't just sell bicycles; we foster a lifestyle of exploration, fitness, and environmental mindfulness.
              </p>
              <p className="text-zinc-900 dark:text-white text-sm font-semibold tracking-wide border-l-2 border-zinc-950 dark:border-white pl-4 py-1 italic">
                "{brand.about}"
              </p>
              
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-zinc-100 dark:border-zinc-900">
                <div>
                  <h4 className="text-2xl font-bold text-zinc-900 dark:text-white">100%</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-1">
                    Premium Curation
                  </p>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-zinc-900 dark:text-white">48-Point</h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-1">
                    Mechanic Inspection
                  </p>
                </div>
              </div>
              
              <div className="pt-4">
                <Link
                  href="/store"
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-white hover:opacity-75 transition-opacity"
                >
                  View our collection <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Right Column: Dynamic Shop Image Grid */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-8 relative aspect-video sm:aspect-square rounded-2xl overflow-hidden shadow-md bg-zinc-100">
                <Image
                  src={brand.shop_images.landscapes["1"]}
                  alt="Agrawal Cycles store front"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="col-span-4 relative aspect-[3/4] sm:aspect-square rounded-2xl overflow-hidden shadow-md bg-zinc-100">
                <Image
                  src={brand.shop_images.portraits["1"]}
                  alt="Agrawal Cycles workshop"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="col-span-4 relative aspect-[3/4] sm:aspect-square rounded-2xl overflow-hidden shadow-md bg-zinc-100">
                <Image
                  src={brand.shop_images.portraits["2"]}
                  alt="Agrawal Cycles display"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="col-span-8 relative aspect-video sm:aspect-square rounded-2xl overflow-hidden shadow-md bg-zinc-100">
                <Image
                  src={brand.shop_images.landscapes["2"]}
                  alt="Agrawal Cycles showroom"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FEATURED BICYCLES SECTION */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/40 border-y border-zinc-200/40 dark:border-zinc-900/40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-widest">
                Our Fleet
              </span>
              <h2 className="text-3xl sm:text-5xl font-sans font-black uppercase tracking-tight text-zinc-900 dark:text-white mt-3 leading-tight">
                Featured <span className="text-zinc-400 font-light italic">Bicycles</span>
              </h2>
            </div>
            
            <Link
              href="/store"
              className="px-6 py-3 rounded-full border border-zinc-300 dark:border-zinc-700 text-xs font-semibold uppercase tracking-widest text-zinc-900 dark:text-white hover:bg-zinc-950 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 inline-flex items-center gap-1.5 self-start md:self-auto"
            >
              View All Bicycles
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. BENEFITS SECTION */}
      <section id="why-choose-us" className="py-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-widest">
            The Agrawal Promise
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-black uppercase tracking-tight text-zinc-900 dark:text-white mt-3 mb-16 leading-tight">
            Why Choose <span className="text-zinc-400 font-light italic">Agrawal Cycles</span>?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex flex-col items-center p-6 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/40 dark:border-zinc-800/40 rounded-2xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-black flex items-center justify-center mb-6 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans font-bold text-base uppercase tracking-wider text-zinc-900 dark:text-white mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-light">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS SECTION */}
      <section className="py-24 bg-zinc-50 dark:bg-zinc-900/30 border-t border-zinc-200/50 dark:border-zinc-900/50 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-widest">
            Rider Community
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-black uppercase tracking-tight text-zinc-900 dark:text-white mt-3 mb-16 leading-tight">
            What Our <span className="text-zinc-400 font-light italic">Riders Say</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-white dark:bg-zinc-900 border border-zinc-250/60 dark:border-zinc-800/60 p-8 rounded-2xl flex flex-col justify-between shadow-sm"
              >
                <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
                <div>
                  <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-zinc-900 dark:text-white">
                    {t.author}
                  </h4>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. GALLERY SECTION */}
      <section id="gallery" className="py-24 bg-white dark:bg-zinc-950 transition-colors duration-300 border-t border-zinc-200/50 dark:border-zinc-900/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-widest">
              Showroom Tour
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-black uppercase tracking-tight text-zinc-900 dark:text-white mt-3 leading-tight">
              Our <span className="text-zinc-400 font-light italic">Gallery</span>
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mt-4 font-light">
              Explore Agrawal Cycles. Take a visual tour of our display showroom, professional service workshop, and premium performance bicycle setups.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {allGalleryImages.map((image, idx) => (
              <button
                key={image.url}
                onClick={() => setLightboxIndex(idx)}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 transition-all duration-300 hover:shadow-md focus:outline-none cursor-zoom-in"
              >
                <Image
                  src={image.url}
                  alt={image.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Bike className="w-5 h-5" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONTACT SECTION */}
      <section id="contact" className="py-24 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Details */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <span className="text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-widest">
                  Get in Touch
                </span>
                <h2 className="text-3xl sm:text-5xl font-sans font-black uppercase tracking-tight text-zinc-900 dark:text-white mt-3 leading-tight">
                  Start your <span className="text-zinc-400 font-light italic">cycling journey</span>.
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mt-4 font-light max-w-md">
                  Have questions about framesets, sizing, components, or electric models? Drop us a message on WhatsApp or visit our showroom.
                </p>
              </div>

              <div className="space-y-6">
                {/* Dual Showroom Addresses */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-900 dark:text-white shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="space-y-4 w-full">
                    <div>
                      <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-zinc-950 dark:text-white mb-1">
                        Showroom 1 (Masani)
                      </h4>
                      <p className="text-sm text-zinc-550 dark:text-zinc-400 leading-relaxed max-w-sm">
                        {brand.address1}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-zinc-950 dark:text-white mb-1">
                        Showroom 2 (Tilak Dwar)
                      </h4>
                      <p className="text-sm text-zinc-550 dark:text-zinc-400 leading-relaxed max-w-sm">
                        {brand.address2}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dual Phone Numbers */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-900 dark:text-white shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div>
                      <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-zinc-950 dark:text-white mb-1">
                        Store Hotline
                      </h4>
                      <p className="text-sm text-zinc-550 dark:text-zinc-400">
                        {brand.store}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-zinc-950 dark:text-white mb-1">
                        Online Orders
                      </h4>
                      <p className="text-sm text-zinc-550 dark:text-zinc-400">
                        {brand["online orders"]}
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Help */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-900 dark:text-white shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-zinc-950 dark:text-white mb-1">
                      Instant WhatsApp
                    </h4>
                    <p className="text-sm text-zinc-550 dark:text-zinc-400">
                      Chat with a cycle advisor in minutes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={contactWhatsApp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-semibold uppercase tracking-wider text-xs transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  Chat on WhatsApp
                </a>
                <a
                  href={activeMapTab === "masani" ? brand.google_maps_address1 : brand.google_maps_address2}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 rounded-full font-semibold uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Get Directions
                </a>
              </div>
            </div>

            {/* Right Column: Google Map with Switcher Tabs */}
            <div className="flex flex-col w-full h-[350px] sm:h-[450px] lg:h-full lg:min-h-[480px] rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 shadow-sm">
              <div className="flex bg-zinc-100 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 p-1">
                <button
                  type="button"
                  onClick={() => setActiveMapTab("masani")}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeMapTab === "masani"
                      ? "bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white shadow-xs animate-fade-in"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                  }`}
                >
                  Masani Showroom Map
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMapTab("tilak")}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    activeMapTab === "tilak"
                      ? "bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white shadow-xs animate-fade-in"
                      : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                  }`}
                >
                  Tilak Dwar Showroom Map
                </button>
              </div>
              <div className="relative flex-1 w-full bg-zinc-50">
                {activeMapTab === "masani" ? (
                  <iframe
                    title="Agrawal Cycles Store Location - Masani"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.1187426176587!2d77.6663496763435!3d27.515455976292218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39737118c495ed3f%3A0xdd2e46241b44c3a3!2sAgrawal%20Cycles%20%7C%20Best%20Cycle%20Shop%20in%20Mathura!5e0!3m2!1sen!2sin!4v1718501234567!5m2!1sen!2sin"
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <iframe
                    title="Agrawal Cycle Store Location - Tilak Dwar"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3549.9822646698656!2d77.68393527634127!3d27.498639976299955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39737110c638af59%3A0x1f08feaeb695b388!2sAgrawal%20Cycle%20Store!5e0!3m2!1sen!2sin!4v1718502345678!5m2!1sen!2sin"
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && allGalleryImages[lightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300">
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            onClick={handlePrevLightbox}
            className="absolute left-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={handleNextLightbox}
            className="absolute right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Container */}
          <div className="relative max-w-5xl max-h-[85vh] w-full px-12 flex flex-col items-center justify-center select-none">
            <div className="relative w-full h-[65vh] flex items-center justify-center">
              <img
                src={allGalleryImages[lightboxIndex].url}
                alt={allGalleryImages[lightboxIndex].label}
                className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-2xl"
              />
            </div>
            <div className="mt-4 text-center">
              <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                Agrawal Cycles Showcase
              </span>
              <p className="text-xs text-white/60 font-light mt-1">
                Image {lightboxIndex + 1} of {allGalleryImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
