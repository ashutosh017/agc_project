"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MapPin, Phone, MessageSquare, Send, Bike, ChevronLeft, ChevronRight, X } from "lucide-react";
import { getBrandDetails } from "@/lib/brand";
import { generateWhatsAppLink } from "@/lib/utils";

export default function ContactClient() {
  const brand = getBrandDetails();

  // Form states
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [inquiryType, setInquiryType] = useState("New Bicycle Purchase");
  const [message, setMessage] = useState("");
  const [activeMapTab, setActiveMapTab] = useState<"masani" | "tilak">("masani");

  // Gallery & Lightbox states
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const [showroomShowcaseImages, setShowroomShowcaseImages] = useState<{ url: string; label: string }[]>([]);

  useEffect(() => {
    setHasMounted(true);
    const landscapes = Object.entries(brand.shop_images.landscapes).map(([key, url]) => ({
      url: url as string,
      label: `L${key}`
    }));
    const portraits = Object.entries(brand.shop_images.portraits).map(([key, url]) => ({
      url: url as string,
      label: `P${key}`
    }));

    const allImages = [...landscapes, ...portraits];
    // Shuffle
    const shuffled = [...allImages].sort(() => 0.5 - Math.random());
    
    // Pick exactly 4 random images
    const count = 4;
    const selected = shuffled.slice(0, count);

    const mapped = selected.map((img) => {
      const isLandscape = img.label.startsWith("L");
      const num = img.label.slice(1);
      return {
        url: img.url,
        label: isLandscape ? `Premium Showroom Floor #${num}` : `Expert Workshop View #${num}`
      };
    });

    setShowroomShowcaseImages(mapped);
  }, [brand.shop_images.landscapes, brand.shop_images.portraits]);

  const handlePrevLightbox = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === 0 ? showroomShowcaseImages.length - 1 : prev - 1;
    });
  };

  const handleNextLightbox = () => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev === showroomShowcaseImages.length - 1 ? 0 : prev + 1;
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
          return prev === 0 ? showroomShowcaseImages.length - 1 : prev - 1;
        });
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => {
          if (prev === null) return null;
          return prev === showroomShowcaseImages.length - 1 ? 0 : prev + 1;
        });
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, showroomShowcaseImages.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage = `Hello Agrawal Cycles, I would like to make an inquiry:
- *Name:* ${name}
- *Mobile:* ${mobile}
- *Inquiry:* ${inquiryType}
- *Message:* ${message}`;

    const link = generateWhatsAppLink(formattedMessage);
    window.open(link, "_blank");
  };

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Header Banner */}
      <section className="relative pt-40 pb-24 text-white text-center px-6 overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={brand.shop_images.landscapes["4"]}
            alt="Contact Agrawal Cycles Background"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        {/* Dark overlay for extra readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/65 z-5" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="mb-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <MessageSquare className="w-6 h-6" />
          </div>
          <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-6xl font-sans font-black uppercase tracking-tight leading-tight mb-4">
            Contact <span className="text-zinc-400 font-light italic">Us</span>
          </h1>
          <p className="text-zinc-200 text-base sm:text-lg max-w-xl font-light leading-relaxed">
            Have questions about framesets, sizing, components, or workshop services? Drop us a message or visit our showroom.
          </p>
        </div>
      </section>

      {/* 1. CONTACT INFO & FORM */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                Our Details
              </span>
              <h2 className="text-3xl sm:text-4xl font-sans font-black uppercase tracking-tight text-zinc-900 mt-2 leading-tight">
                Visit our <span className="text-zinc-400 font-light italic">showroom</span>.
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed mt-4 font-light">
                Agrawal Cycles is situated in Mathura. Visit us to test ride any bicycle or get professional diagnostic assistance from our expert mechanics.
              </p>
            </div>

            <div className="space-y-6">
              {/* Address card */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-zinc-50 border border-zinc-150">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-4 w-full">
                  <div>
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-zinc-950 mb-1">
                      Showroom 1 (Masani)
                    </h4>
                    <p className="text-sm text-zinc-550 leading-relaxed">
                      {brand.address1}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-zinc-950 mb-1">
                      Showroom 2 (Tilak Dwar)
                    </h4>
                    <p className="text-sm text-zinc-550 leading-relaxed">
                      {brand.address2}
                    </p>
                  </div>
                </div>
              </div>

              {/* Call card */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-zinc-50 border border-zinc-150">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col gap-3">
                  <div>
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-zinc-950 mb-1">
                      Store Hotline
                    </h4>
                    <p className="text-sm text-zinc-550">
                      {brand.store}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-zinc-950 mb-1">
                      Online Orders
                    </h4>
                    <p className="text-sm text-zinc-550">
                      {brand["online orders"]}
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp card */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-zinc-50 border border-zinc-150">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-zinc-950 mb-1">
                    Instant WhatsApp
                  </h4>
                  <p className="text-sm text-zinc-550 leading-relaxed">
                    Start a chat with a cycle advisor. Available Mon-Sun, 10:00 AM - 8:30 PM.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Form */}
          <div className="lg:col-span-7 bg-zinc-50 border border-zinc-200/80 p-8 sm:p-10 rounded-3xl shadow-xs">
            <h3 className="text-xl font-bold uppercase tracking-wider text-zinc-900 mb-6">
              Send an Inquiry
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950/10 focus:border-zinc-950 text-sm transition-all"
                />
              </div>

              {/* Mobile Input */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 99999 99999"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950/10 focus:border-zinc-950 text-sm transition-all"
                />
              </div>

              {/* Inquiry Type */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Inquiry Type
                </label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-950/10 focus:border-zinc-950 text-sm transition-all cursor-pointer"
                >
                  <option value="New Bicycle Purchase">New Bicycle Purchase</option>
                  <option value="Bicycle Repair & Tuning">Bicycle Repair & Tuning</option>
                  <option value="Custom Components & Upgrades">Custom Components & Upgrades</option>
                  <option value="Test Ride Request">Test Ride Request</option>
                  <option value="General Question">General Question</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what you are looking for..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-950/10 focus:border-zinc-950 text-sm transition-all resize-none"
                />
              </div>

              {/* Action Button */}
              <button
                type="submit"
                className="w-full py-4 bg-zinc-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Submit via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 2. GOOGLE MAP SECTION WITH SWITCHER */}
      <section className="w-full h-[480px] border-t border-zinc-200 bg-zinc-50 flex flex-col relative overflow-hidden">
        <div className="flex bg-zinc-50 border border-zinc-200 p-1 justify-center max-w-sm mx-auto rounded-full mt-4 absolute top-4 left-1/2 transform -translate-x-1/2 z-10 shadow-md">
          <button
            type="button"
            onClick={() => setActiveMapTab("masani")}
            className={`px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeMapTab === "masani"
                ? "bg-zinc-950 text-white shadow-xs"
                : "text-zinc-550 hover:text-zinc-900"
            }`}
          >
            Masani Showroom Map
          </button>
          <button
            type="button"
            onClick={() => setActiveMapTab("tilak")}
            className={`px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeMapTab === "tilak"
                ? "bg-zinc-950 text-white shadow-xs"
                : "text-zinc-550 hover:text-zinc-900"
            }`}
          >
            Tilak Dwar Showroom Map
          </button>
        </div>
        <div className="relative w-full h-full">
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
      </section>

      {/* 3. SHOWROOM GALLERY SECTION */}
      <section className="py-20 bg-white border-t border-zinc-200/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
              Showroom Showcase
            </span>
            <h2 className="text-2xl sm:text-4xl font-sans font-black uppercase tracking-tight text-zinc-900 mt-2">
              Inside Our <span className="text-zinc-400 font-light italic">Showrooms</span>
            </h2>
            <p className="text-zinc-550 text-sm leading-relaxed mt-3 font-light">
              Glimpses of our premium showroom displays and tuning workshop in Mathura.
            </p>
          </div>

          {/* 2x2 Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto py-8">
            {!hasMounted ? (
              [1, 2, 3, 4].map((n) => (
                <div key={n} className="aspect-[4/3] rounded-3xl bg-zinc-100 border border-zinc-200/40 animate-pulse" />
              ))
            ) : (
              showroomShowcaseImages.map((image, idx) => {
                // Apply a stylish subtle rotation to each card
                let rotationClass = "";
                if (idx === 0) rotationClass = "md:-rotate-1 hover:rotate-0";
                else if (idx === 1) rotationClass = "md:rotate-1 hover:rotate-0";
                else if (idx === 2) rotationClass = "md:rotate-1 hover:rotate-0";
                else if (idx === 3) rotationClass = "md:-rotate-1 hover:rotate-0";

                return (
                  <button
                    key={image.url}
                    onClick={() => setLightboxIndex(idx)}
                    className={`group relative aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-zinc-200 p-2.5 shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.015] cursor-zoom-in ${rotationClass}`}
                  >
                    <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-50">
                      <Image
                        src={image.url}
                        alt="Agrawal Cycles Showroom Gallery"
                        fill
                        className="object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white transform scale-90 group-hover:scale-100 transition-all duration-300">
                          <Bike className="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && showroomShowcaseImages[lightboxIndex] && (
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
                src={showroomShowcaseImages[lightboxIndex].url}
                alt="Agrawal Cycles Showroom Gallery Image"
                className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-2xl"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-xs text-white/70 font-semibold uppercase tracking-wider">
                Showroom Showcase — Image {lightboxIndex + 1} of {showroomShowcaseImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
