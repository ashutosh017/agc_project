import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import { getBrandDetails } from "@/lib/brand";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export function generateMetadata(): Metadata {
  const brand = getBrandDetails();
  return {
    metadataBase: new URL("https://agrawalcycles.com"),
    title: {
      default: `${brand.name} | Premium Bicycle Shop in Mathura`,
      template: `%s | ${brand.name}`,
    },
    description: `Welcome to ${brand.name}. Discover a premium, curated collection of high-performance road, mountain, gravel, and electric bicycles. Located at ${brand.address1}.`,
    keywords: ["bicycles", "cycles", "road bikes", "mountain bikes", "electric bikes", "Mathura", "Agrawal Cycles", "premium cycling"],
    openGraph: {
      title: `${brand.name} | Premium Bicycles`,
      description: `Experience the joy of cycling with ${brand.name}'s premium collection of bicycles.`,
      url: "https://agrawalcycles.com",
      siteName: brand.name,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: "/opengraph_image.png",
          width: 1200,
          height: 630,
          alt: `${brand.name} - Premium Bicycle Showroom in Mathura`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${brand.name} | Premium Bicycles`,
      description: `Experience the joy of cycling with ${brand.name}'s premium collection of bicycles.`,
      images: ["/opengraph_image.png"],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900 dark:bg-black dark:text-zinc-50 transition-colors duration-300 font-sans">
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}
