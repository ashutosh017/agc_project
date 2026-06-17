import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";
import { getBrandDetails } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms of Service | Agrawal Cycles",
  description: "Review the Terms of Service for Agrawal Cycles Mathura. Understand catalog showcase policies, WhatsApp order booking procedures, and assembly terms."
};

export default function TermsPage() {
  const brand = getBrandDetails();

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Header Banner */}
      <section className="relative pt-40 pb-24 text-white text-center px-6 overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={brand.shop_images.landscapes["6"]}
            alt="Terms of Service Background"
            fill
            priority
            className="object-cover opacity-45"
          />
        </div>
        {/* Dark overlay for extra readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/75 z-5" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="mb-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <FileText className="w-5 h-5 text-zinc-300" />
          </div>
          <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">
            Agreement & Policies
          </span>
          <h1 className="text-4xl sm:text-6xl font-sans font-black uppercase tracking-tight leading-tight mb-4">
            Terms <span className="text-zinc-400 font-light italic">of Service</span>
          </h1>
          <p className="text-zinc-200 text-base sm:text-lg max-w-xl font-light leading-relaxed">
            Please read these terms carefully before exploring our premium bicycle showcases.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 max-w-4xl mx-auto px-6 w-full">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs text-zinc-400 mb-10 border-b border-zinc-100 pb-5">
          <Link href="/" className="hover:text-zinc-950 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-zinc-300" />
          <span className="text-zinc-950 font-medium">Terms of Service</span>
        </div>

        <div className="space-y-10 text-zinc-600 font-light text-sm sm:text-base leading-relaxed">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 mb-3 font-sans">
              1. Catalog Information & Product Descriptions
            </h2>
            <p className="mb-4">
              All details, specifications, weight constraints, and prices on our catalog pages are published for informational purposes. While we strive to maintain 100% correct inventory listing metrics, actual specifications (e.g. tires, saddles, groupsets) may occasionally vary due to manufacturer batch changes.
            </p>
            <p>
              We highly recommend booking an in-person test ride or coordinating dynamic sizing requirements with our certified showroom mechanics to ensure the perfect fit before completing your acquisition.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 mb-3 font-sans">
              2. Booking & Fulfilling Orders
            </h2>
            <p className="mb-4">
              <strong>{brand.name}</strong> operates on a non-transactional web showcase framework. All booking transactions, component selections, order customization, and deliveries are negotiated and finalized directly through:
            </p>
            <ul className="list-disc pl-5 mb-4 space-y-2 text-zinc-600">
              <li>Direct WhatsApp communication linked throughout our product pages.</li>
              <li>Physical showrooms located at Masani Link Road and Arya Samaj Road (Mathura).</li>
            </ul>
            <p>
              Any order confirmation generated through our contact form or WhatsApp is subject to final stock verification at the physical dealership counter.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 mb-3 font-sans">
              3. Assembly & Technical Services
            </h2>
            <p className="mb-4">
              Every premium bicycle purchased through our channel receives a complimentary professional build. Our mechanics perform a detailed safety diagnostic check before hand-over.
            </p>
            <p>
              Warranty protections on frames, forks, carbon components, and electronic drivetrains are backed directly by their respective manufacturers. Our certified workshop provides diagnostic service support to facilitate any warranty claims.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 mb-3 font-sans">
              4. Prohibited Uses of the Platform
            </h2>
            <p className="mb-3">
              You agree not to utilize this website or its resources to:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-600">
              <li>Submit fraudulent contact requests or mock inquiries with false phone coordinates.</li>
              <li>Attempt to execute unauthorized scripts, scrape catalog images, or bypass authentication panels.</li>
              <li>Impersonate brand administrative staff or mechanics.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 mb-3 font-sans">
              5. Intellectual Property
            </h2>
            <p>
              The names, logos, custom website layout styling, coding structures, and design aesthetics of this platform are protected under intellectual property laws. Product brand names (e.g. component manufacturers) belong strictly to their registered corporate entities.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 mb-3 font-sans">
              6. Limitation of Liability
            </h2>
            <p>
              <strong>{brand.name}</strong> is not liable for any direct or indirect damages resulting from server downtimes, transmission disruptions, or minor specification deviations on the catalog pages. Your use of this website is at your sole discretion.
            </p>
          </div>

          <div className="border-t border-zinc-150 pt-8 mt-12 bg-zinc-50 p-6 rounded-2xl border border-zinc-200">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-zinc-900 mb-2">
              Corporate Headquarters & Showrooms
            </h4>
            <p className="text-sm text-zinc-500 mb-4 font-light leading-relaxed">
              If you require a copy of physical order receipts, catalog distribution forms, or have any legal concerns, please contact our administrative counter:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-zinc-950 uppercase tracking-wider">
              <div>
                <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-0.5">Primary Showroom (Masani)</span>
                <span className="normal-case font-normal text-zinc-600">{brand.address1}</span>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-0.5">Secondary Showroom (Tilak Dwar)</span>
                <span className="normal-case font-normal text-zinc-600">{brand.address2}</span>
              </div>
              <div>
                <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-0.5">Inquiry Hotline</span>
                +91 {brand.store}
              </div>
              <div>
                <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-0.5">WhatsApp Orders</span>
                +91 {brand["online orders"]}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
