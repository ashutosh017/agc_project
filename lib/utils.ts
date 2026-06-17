import { getBrandDetails } from "./brand";

/**
 * Formats a number as INR Currency (e.g. ₹1,45,000)
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Normalizes a phone number to standard international format (no spaces/dashes, begins with country code)
 */
export function getNormalizedPhoneNumber(type: "store" | "online" = "online"): string {
  const brand = getBrandDetails();
  const rawContact = type === "online" ? brand["online orders"] : brand.store;
  
  // Clean all non-digit characters
  const cleaned = rawContact.replace(/\D/g, "");
  
  // If it's 10 digits (common in India), prepend country code 91
  if (cleaned.length === 10) {
    return `91${cleaned}`;
  }
  
  return cleaned;
}

/**
 * Generates a WhatsApp link with a pre-filled message
 */
export function generateWhatsAppLink(message: string, type: "store" | "online" = "online"): string {
  const phone = getNormalizedPhoneNumber(type);
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates WhatsApp link for "Buy Now" on the Store page
 */
export function getBuyNowWhatsAppLink(productName: string, productUrl: string): string {
  const message = `Hello, I liked this bicycle:

Product: ${productName}
Link: ${productUrl}

I would like to discuss more details about it.

Thank you.`;
  return generateWhatsAppLink(message);
}

/**
 * Generates WhatsApp link for "Inquiry" on the Product Detail page
 */
export function getProductDetailWhatsAppLink(productName: string, productUrl: string): string {
  const message = `Hello, I am interested in this bicycle:

Product: ${productName}
Link: ${productUrl}

Can you provide more information?`;
  return generateWhatsAppLink(message);
}
