import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Shield, ChevronRight } from "lucide-react";
import { getBrandDetails } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy Policy | Agrawal Cycles",
  description: "Read the Privacy Policy of Agrawal Cycles Mathura. Learn how we handle your inquiry information, WhatsApp communication, and protect your data."
};

export default function PrivacyPage() {
  const brand = getBrandDetails();

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Header Banner */}
      <section className="relative pt-40 pb-24 text-white text-center px-6 overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={brand.shop_images.landscapes["5"]}
            alt="Privacy Policy Background"
            fill
            priority
            className="object-cover opacity-45"
          />
        </div>
        {/* Dark overlay for extra readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/75 z-5" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="mb-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <Shield className="w-5 h-5 text-zinc-300" />
          </div>
          <span className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">
            Legal & Security
          </span>
          <h1 className="text-4xl sm:text-6xl font-sans font-black uppercase tracking-tight leading-tight mb-4">
            Privacy <span className="text-zinc-400 font-light italic">Policy</span>
          </h1>
          <p className="text-zinc-200 text-base sm:text-lg max-w-xl font-light leading-relaxed">
            How we protect, process, and respect your details when browsing our products.
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
          <span className="text-zinc-950 font-medium">Privacy Policy</span>
        </div>

        <div className="space-y-10 text-zinc-600 font-light text-sm sm:text-base leading-relaxed">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 mb-3 font-sans">
              1. Information We Collect
            </h2>
            <p className="mb-4">
              At <strong>{brand.name}</strong>, we run a brand-first showcasing platform. Unlike typical e-commerce storefronts, we do not require you to register an account, store payment methods, or conduct online financial transactions directly on our website.
            </p>
            <p>
              However, we may collect the following details when you interact with our services:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-2 text-zinc-600">
              <li>
                <strong>Inquiry Form Data:</strong> If you choose to contact us using our contact form, we collect your name, mobile phone number, inquiry type, and message content to address your request.
              </li>
              <li>
                <strong>WhatsApp Redirect Metadata:</strong> When you click the WhatsApp CTA button on our products or floating button, we generate a text template redirecting to our messaging hotlines. We do not store these conversations on our server; they occur directly between your device and our WhatsApp Business account.
              </li>
              <li>
                <strong>Usage Information:</strong> We may collect passive browsing details (IP address, browser type, device indicators) using anonymous analytic tokens to measure sitemap speed and enhance showroom visualization performance.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 mb-3 font-sans">
              2. How We Use Your Information
            </h2>
            <p className="mb-3">
              We strictly utilize any gathered details for the following objectives:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-600">
              <li>To answer questions regarding bicycle catalog availability, specifications, custom build sizing, or test ride bookings.</li>
              <li>To connect you with certified workshop mechanics for electronic shifting diagnostics, frame assembly, or maintenance scheduling.</li>
              <li>To improve our showroom gallery features and overall website layout configuration.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 mb-3 font-sans">
              3. Data Security & Storage
            </h2>
            <p className="mb-4">
              We enforce appropriate physical and digital security controls to protect our databases from unauthorized access, modification, or exposure. Product catalog records are stored securely in a local database and managed strictly through authorized administrative channels.
            </p>
            <p>
              Our staff will never ask for your passwords, bank credentials, or secure pins. All order fulfillments and custom frameset transactions are negotiated directly via authenticated WhatsApp chats or completed in person at our physical showrooms in Mathura.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 mb-3 font-sans">
              4. Cookies and Web Storage
            </h2>
            <p className="mb-3">
              This site utilizes basic client-side storage configurations to ensure a premium user experience:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-zinc-650">
              <li>
                <strong>Authentication Tokens:</strong> For the administrative console, we utilize secure local storage configurations to persist passcode verification status, preventing unwanted admin logouts during updates.
              </li>
              <li>
                <strong>Functional Storage:</strong> Web storage helps maintain active tabs (e.g., active location maps or gallery lightboxes) to preserve layout status during your visit.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 mb-3 font-sans">
              5. Third-Party Links & Services
            </h2>
            <p className="mb-4">
              Our website contains links to external services such as Google Maps, Instagram, Facebook, and WhatsApp. Additionally, product gallery media may be stored and delivered using third-party content distribution systems (ImageKit).
            </p>
            <p>
              These third-party platforms follow their own distinct privacy policies. We do not have control over their cookies or scripts, and we recommend reading their terms when leaving our platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 mb-3 font-sans">
              6. Updates to This Policy
            </h2>
            <p>
              We reserve the right to modify this Privacy Policy as our physical catalog operations grow. Any updates will be updated directly on this page with an adjusted revision timestamp.
            </p>
          </div>

          <div className="border-t border-zinc-150 pt-8 mt-12 bg-zinc-50 p-6 rounded-2xl border border-zinc-200">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-zinc-900 mb-2">
              Contact & Inquiry Hotline
            </h4>
            <p className="text-sm text-zinc-500 mb-4 font-light leading-relaxed">
              If you have any questions about this Privacy Policy or wish to modify any inquiry details, please contact us directly:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-zinc-950 uppercase tracking-wider">
              <div>
                <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-0.5">Store Phone</span>
                +91 {brand.store}
              </div>
              <div>
                <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-0.5">WhatsApp Orders</span>
                +91 {brand["online orders"]}
              </div>
              <div className="sm:col-span-2">
                <span className="block text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-0.5">Primary Showroom</span>
                <span className="normal-case font-normal text-zinc-600">{brand.address1}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
