/**
 * Runtime guard to block wrong Shopify domain for checkout
 * This file ensures checkout URLs ALWAYS use mraze2-ra.myshopify.com
 * 
 * CRITICAL: Checkout ONLY works on .myshopify.com domain
 * Using custom domain (masterdisplaycases.com) for checkout will cause 404 errors
 * because the custom domain is hosted on Netlify, not Shopify.
 */
export function enforceCorrectDomain(url: string): string {
  // Block wrong myshopify.com domain (there's no masterdisplaycases.myshopify.com)
  if (url.includes("masterdisplaycases.myshopify.com")) {
    console.error("🚨 BLOCKED WRONG DOMAIN:", url);
    throw new Error("Wrong Shopify domain still in bundle");
  }
  
  // Block custom domain for checkout URLs (should use myshopify.com)
  // The custom domain is hosted on Netlify, so /cart URLs return 404
  if (url.includes("/cart/") && url.includes("masterdisplaycases.com")) {
    console.error("🚨 BLOCKED CUSTOM DOMAIN FOR CHECKOUT:", url);
    console.error("💡 FIX: Shopify must NOT redirect myshopify.com to custom domain");
    console.error("💡 Go to Shopify Admin → Settings → Domains");
    console.error("💡 Ensure mraze2-ra.myshopify.com does NOT redirect to masterdisplaycases.com");
    throw new Error("Checkout must use mraze2-ra.myshopify.com, not custom domain");
  }
  
  return url;
}

/**
 * Get the correct checkout domain
 * HARDCODED - no environment variables, no fallbacks
 */
export const CHECKOUT_DOMAIN = "mraze2-ra.myshopify.com";
