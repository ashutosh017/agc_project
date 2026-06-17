"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { getBrandDetails } from "@/lib/brand";
import { generateWhatsAppLink } from "@/lib/utils";

export default function WhatsAppFloatingButton() {
  const [isVisible, setIsVisible] = useState(false);
  const brand = getBrandDetails();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const message = `Hello, I am visiting the ${brand.name} website and have a few questions. Can you please help me?`;
  const waLink = generateWhatsAppLink(message);

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg transition-all duration-500 transform hover:scale-105 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-90 pointer-events-none"
      }`}
      aria-label="Chat with us on WhatsApp"
    >
      {/* Pulse rings */}
      <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-20 animate-ping group-hover:animate-none" />
      
      {/* Icon */}
      <MessageCircle className="w-7 h-7 relative z-10" />

      {/* Tooltip */}
      <span className="absolute right-16 scale-0 group-hover:scale-100 origin-right transition-all duration-300 bg-zinc-900 text-white text-[10px] font-bold tracking-widest uppercase py-2 px-3 rounded-lg whitespace-nowrap shadow-md">
        Chat With Us
      </span>
    </a>
  );
}
