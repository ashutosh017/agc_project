import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Wrench, BadgeAlert, Clock, Bike, ChevronRight } from "lucide-react";
import { getBrandDetails } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the legacy of Agrawal Cycles in Mathura, serving cyclists with premium bikes, expert sizing, custom builds, and certified mechanics since 1970."
};

export default function AboutPage() {
  const brand = getBrandDetails();

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": `About ${brand.name}`,
    "description": brand.about,
    "publisher": {
      "@type": "BicycleStore",
      "name": brand.name,
      "image": brand.shop_images.landscapes["1"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": brand.address1,
        "addressLocality": "Mathura",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "281001",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="flex flex-col w-full overflow-hidden bg-white">
      {/* Hero Header Banner */}
      <section className="relative pt-40 pb-24 text-white text-center px-6 overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={brand.shop_images.landscapes["3"]}
            alt="About Agrawal Cycles Background"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        {/* Dark overlay for extra readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/65 z-5" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="mb-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <Bike className="w-6 h-6" />
          </div>
          <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">
            Discover Our Legacy
          </span>
          <h1 className="text-4xl sm:text-6xl font-sans font-black uppercase tracking-tight leading-tight mb-4">
            About <span className="text-zinc-400 font-light italic">Agrawal Cycles</span>
          </h1>
          <p className="text-zinc-200 text-base sm:text-lg max-w-xl font-light leading-relaxed">
            Delivering high-performance machines, professional mechanics, and an unmatched riding lifestyle since inception.
          </p>
        </div>
      </section>

      {/* 1. STORY & PHOTOS SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div className="flex flex-col space-y-6">
            <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-5xl font-sans font-black uppercase tracking-tight text-zinc-900 leading-tight">
              Designed for those who <span className="text-zinc-400 font-light italic">ride beyond limits</span>.
            </h2>
            <p className="text-zinc-650 text-base leading-relaxed font-light">
              For years, {brand.name} has been the cornerstone of the premium cycling community in Mathura. We believe a bicycle is more than just gears and wheels—it's a gateway to exploration, wellness, and self-discovery.
            </p>
            <p className="text-zinc-650 text-base leading-relaxed font-light">
              We hand-pick and import only the finest road racers, cross-country mountain bikes, versatile gravel tourers, and smart city e-bikes. Each machine is fitted and detailed to match its rider perfectly.
            </p>
            <p className="text-zinc-900 text-sm font-semibold tracking-wide border-l-2 border-zinc-950 pl-4 py-1 italic">
              "{brand.about}"
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-zinc-100">
              <div>
                <h4 className="text-3xl font-bold text-zinc-900">100%</h4>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">
                  Premium Selection
                </p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-zinc-900">48-Point</h4>
                <p className="text-xs text-zinc-500 uppercase tracking-wider mt-1">
                  Certified Assembly
                </p>
              </div>
            </div>
          </div>

          {/* Shop image grid */}
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8 relative aspect-video sm:aspect-square rounded-2xl overflow-hidden shadow-md bg-zinc-50">
              <Image
                src={brand.shop_images.landscapes["1"]}
                alt="Agrawal Cycles store front"
                fill
                className="object-cover hover:scale-103 transition-transform duration-500"
              />
            </div>
            <div className="col-span-4 relative aspect-[3/4] sm:aspect-square rounded-2xl overflow-hidden shadow-md bg-zinc-50">
              <Image
                src={brand.shop_images.portraits["1"]}
                alt="Agrawal Cycles workshop"
                fill
                className="object-cover hover:scale-103 transition-transform duration-500"
              />
            </div>
            <div className="col-span-4 relative aspect-[3/4] sm:aspect-square rounded-2xl overflow-hidden shadow-md bg-zinc-50">
              <Image
                src={brand.shop_images.portraits["2"]}
                alt="Agrawal Cycles display"
                fill
                className="object-cover hover:scale-103 transition-transform duration-500"
              />
            </div>
            <div className="col-span-8 relative aspect-video sm:aspect-square rounded-2xl overflow-hidden shadow-md bg-zinc-50">
              <Image
                src={brand.shop_images.landscapes["2"]}
                alt="Agrawal Cycles showroom"
                fill
                className="object-cover hover:scale-103 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROMISE / BENEFITS */}
      <section className="py-24 bg-zinc-50 border-t border-b border-zinc-150">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
            The Agrawal Promise
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-black uppercase tracking-tight text-zinc-900 mt-3 mb-16 leading-tight">
            Why Choose <span className="text-zinc-400 font-light italic">Agrawal Cycles</span>?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col items-center p-8 bg-white border border-zinc-200/50 rounded-2xl hover:border-zinc-300 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-2xl bg-zinc-950 text-white flex items-center justify-center mb-6 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-sans font-bold text-base uppercase tracking-wider text-zinc-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed font-light">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. TESTIMONIALS */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
            Rider Community
          </span>
          <h2 className="text-3xl sm:text-5xl font-sans font-black uppercase tracking-tight text-zinc-900 mt-3 mb-16 leading-tight">
            What Our <span className="text-zinc-400 font-light italic">Riders Say</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="bg-white border border-zinc-200 p-8 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <p className="text-zinc-650 text-sm leading-relaxed mb-6 italic">
                  "{t.quote}"
                </p>
                <div>
                  <h4 className="font-sans font-bold text-sm uppercase tracking-wider text-zinc-900">
                    {t.author}
                  </h4>
                  <p className="text-xs text-zinc-450 mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <Link
              href="/store"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-zinc-950 text-white hover:bg-zinc-800 rounded-full font-semibold uppercase tracking-wider text-xs transition-all duration-300 shadow-md group"
            >
              Browse Fleet Collection
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
