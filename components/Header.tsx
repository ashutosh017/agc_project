"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bike } from "lucide-react";
import { getBrandDetails } from "@/lib/data";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const brand = getBrandDetails();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Store", href: "/store" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Transparent only at the top of the homepage, and only when mobile menu is closed
  const isTransparent = pathname === "/" && !isScrolled && !isOpen;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isOpen
          ? "bg-white border-b border-zinc-200/50 shadow-xs"
          : isTransparent
          ? "bg-transparent border-transparent shadow-none"
          : "bg-white/90 backdrop-blur-md border-b border-zinc-200/50 shadow-xs"
      } ${isScrolled ? "py-3.5" : "py-5"}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo / Name */}
        <Link
          href="/"
          className="flex items-center gap-2 group transition-opacity duration-300"
        >
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-350 group-hover:scale-105 ${
              isTransparent
                ? "bg-white/10 text-white border border-white/20"
                : "bg-zinc-900 text-white"
            }`}
          >
            <Bike className="w-5 h-5" />
          </div>
          <span
            className={`font-sans font-bold tracking-widest text-lg uppercase transition-colors duration-300 ${
              isTransparent ? "text-white" : "text-zinc-900"
            }`}
          >
            {brand.name.split(" ")[0]}
            <span
              className={`font-light ml-1 transition-colors duration-300 ${
                isTransparent ? "text-zinc-300" : "text-zinc-500"
              }`}
            >
              {brand.name.split(" ").slice(1).join(" ")}
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : link.href.startsWith("/#")
                ? false
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wider uppercase transition-all duration-300 relative py-1 group ${
                  isActive
                    ? isTransparent
                      ? "text-white"
                      : "text-zinc-900"
                    : isTransparent
                    ? "text-white/70 hover:text-white"
                    : "text-zinc-500 hover:text-zinc-900"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[1.5px] origin-left transition-transform duration-300 ${
                    isTransparent ? "bg-white" : "bg-zinc-950"
                  } ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
          
          <Link
            href="/store"
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow ${
              isTransparent
                ? "bg-white text-black hover:bg-zinc-200"
                : "bg-zinc-950 text-white hover:bg-zinc-800"
            }`}
          >
            Explore Bicycles
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 -mr-2 transition-colors duration-300 md:hidden focus:outline-none ${
            isTransparent ? "text-white/80 hover:text-white" : "text-zinc-650 hover:text-zinc-900"
          }`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar Navigation */}
      <div
        className={`absolute top-full left-0 right-0 bg-white border-b border-zinc-200/50 shadow-lg md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-6 space-y-4">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : link.href.startsWith("/#")
                ? false
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-sm font-semibold tracking-wider uppercase py-2 transition-colors duration-250 ${
                  isActive
                    ? "text-zinc-950 border-l-2 border-zinc-950 pl-3"
                    : "text-zinc-500 hover:text-zinc-900 pl-3"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/store"
            onClick={() => setIsOpen(false)}
            className="w-full py-3 text-center rounded-xl text-xs font-semibold tracking-widest uppercase bg-zinc-950 text-white hover:bg-zinc-800 transition-all duration-300 shadow-sm"
          >
            Explore Bicycles
          </Link>
        </div>
      </div>
    </header>
  );
}
