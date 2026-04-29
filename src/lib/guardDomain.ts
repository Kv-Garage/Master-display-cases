/**
 * Runtime guard to block wrong Shopify domain
 * This file ensures the wrong domain can never be used in production
 */
export function enforceCorrectDomain(url: string): string {
  if (url.includes("masterdisplaycases.myshopify.com")) {
    console.error("🚨 BLOCKED WRONG DOMAIN:", url);
    throw new Error("Wrong Shopify domain still in bundle");
  }
  return url;
}