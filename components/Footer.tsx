import Link from "next/link";
import { MapPin, Phone, MessageSquare } from "lucide-react";
import { getBrandDetails } from "@/lib/brand";
import { getNormalizedPhoneNumber } from "@/lib/utils";

export default function Footer() {
  const brand = getBrandDetails();
  const phone = getNormalizedPhoneNumber();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Store", href: "/store" },
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ];

  const bikeCategories = [
    { name: "Road Bicycles", href: "/store?category=Road" },
    { name: "Mountain Bicycles", href: "/store?category=Mountain" },
    { name: "Gravel Bicycles", href: "/store?category=Gravel" },
    { name: "Electric Bicycles", href: "/store?category=Electric" },
  ];

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200/50 dark:border-zinc-900/50 pt-20 pb-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Col */}
          <div className="flex flex-col space-y-6">
            <Link href="/" className="font-sans font-bold tracking-widest text-xl uppercase text-zinc-900 dark:text-white">
              {brand.name.split(" ")[0]}
              <span className="font-light text-zinc-500 ml-1">
                {brand.name.split(" ").slice(1).join(" ")}
              </span>
            </Link>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed max-w-xs">
              A premium, curated cycling experience in Mathura. Offering hand-picked high-end performance bicycles and professional rider service.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href={brand.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-200/50 dark:bg-zinc-900 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black flex items-center justify-center text-zinc-600 dark:text-zinc-400 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4.5 h-4.5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href={brand.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-zinc-200/50 dark:bg-zinc-900 hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black flex items-center justify-center text-zinc-600 dark:text-zinc-400 transition-all duration-300"
                aria-label="Facebook"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4.5 h-4.5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans font-semibold tracking-wider text-xs uppercase text-zinc-900 dark:text-white mb-6">
              Navigation
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-sans font-semibold tracking-wider text-xs uppercase text-zinc-900 dark:text-white mb-6">
              Collections
            </h3>
            <ul className="space-y-4">
              {bikeCategories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    href={cat.href}
                    className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white text-sm transition-colors duration-200"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-sans font-semibold tracking-wider text-xs uppercase text-zinc-900 dark:text-white mb-6">
              Contact & Store
            </h3>
            <ul className="space-y-4 text-sm text-zinc-500 dark:text-zinc-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-zinc-900 dark:text-white shrink-0 mt-1" />
                <div className="flex flex-col gap-3">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-550 mb-0.5">Showroom 1 (Masani)</span>
                    <a
                      href={brand.google_maps_address1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 leading-relaxed block"
                    >
                      {brand.address1}
                    </a>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-550 mb-0.5">Showroom 2 (Tilak Dwar)</span>
                    <a
                      href={brand.google_maps_address2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 leading-relaxed block"
                    >
                      {brand.address2}
                    </a>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4.5 h-4.5 text-zinc-900 dark:text-white shrink-0 mt-1" />
                <div className="flex flex-col gap-2.5">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-550 mb-0.5">Store Call</span>
                    <a
                      href={`tel:${brand.store}`}
                      className="hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 block"
                    >
                      {brand.store}
                    </a>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-550 mb-0.5">Online Orders</span>
                    <a
                      href={`tel:${brand["online orders"]}`}
                      className="hover:text-zinc-950 dark:hover:text-white transition-colors duration-200 block"
                    >
                      {brand["online orders"]}
                    </a>
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare className="w-4.5 h-4.5 text-zinc-900 dark:text-white shrink-0" />
                <a
                  href={`https://wa.me/${phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-950 dark:hover:text-white transition-colors duration-200"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-zinc-200/50 dark:border-zinc-900/50 pt-8 pb-24 md:pb-0 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <div className="flex space-x-6 md:pr-24">
            <Link href="/privacy" className="hover:text-zinc-600 dark:hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-600 dark:hover:text-white transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="/admin" className="hover:text-zinc-600 dark:hover:text-white transition-colors duration-200">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
