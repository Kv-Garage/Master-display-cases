/**
 * Runtime guard to ensure checkout URLs use the correct Shopify domain
 * and that all post-checkout navigation returns to the custom storefront
 * 
 * This module works in conjunction with src/lib/checkout.ts to:
 * 1. Ensure checkout URLs always use mraze2-ra.myshopify.com
 * 2. Redirect any stray Shopify domain navigation back to masterdisplaycases.com
 * 3. Provide failsafe handling for edge cases
 */

import { 
  SHOPIFY_CHECKOUT_DOMAIN, 
  STOREFRONT_DOMAIN, 
  STOREFRONT_URL,
  isShopifyDomain,
  isCheckoutUrl,
  interceptShopifyRedirect,
} from './checkout';

/**
 * Enforce that checkout URLs use the correct myshopify.com domain
 * This is a runtime check to prevent any wrong domains from being used
 */
export function enforceCorrectDomain(url: string): string {
  // Block wrong myshopify.com domain (there's no masterdisplaycases.myshopify.com)
  if (url.includes("masterdisplaycases.myshopify.com")) {
    console.error("🚨 BLOCKED WRONG DOMAIN:", url);
    throw new Error("Wrong Shopify domain still in bundle");
  }
  
  // For checkout URLs, they MUST use the myshopify.com domain
  // The custom domain is hosted on Netlify, so /cart URLs return 404
  if (isCheckoutUrl(url) && url.includes(STOREFRONT_DOMAIN)) {
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
 * This is hardcoded to prevent any configuration issues
 */
export const CHECKOUT_DOMAIN = SHOPIFY_CHECKOUT_DOMAIN;

/**
 * Get the storefront domain (where users should return after checkout)
 */
export const FRONTEND_DOMAIN = STOREFRONT_DOMAIN;

/**
 * Get the full storefront URL
 */
export const FRONTEND_URL = STOREFRONT_URL;

/**
 * Intercept any navigation that would take the user to a Shopify domain
 * (except for checkout/cart paths which are allowed)
 * Returns the URL to redirect to instead
 */
export function interceptRedirect(url: string): string {
  return interceptShopifyRedirect(url);
}

/**
 * Check if a URL is a valid checkout URL
 */
export function isValidCheckoutUrl(url: string): boolean {
  if (!url) return false;
  
  // Must be a checkout URL
  if (!isCheckoutUrl(url)) return false;
  
  // Must use the correct myshopify.com domain
  if (!url.includes(SHOPIFY_CHECKOUT_DOMAIN)) return false;
  
  return true;
}

/**
 * Validate and normalize a checkout URL
 * Returns the normalized URL or throws an error if invalid
 */
export function validateCheckoutUrl(url: string): string {
  if (!url) {
    throw new Error("Checkout URL is required");
  }
  
  // Enforce correct domain
  enforceCorrectDomain(url);
  
  // Extract checkout token and rebuild URL
  const match = url.match(/checkouts\/([a-zA-Z0-9]+)/);
  if (match) {
    return `https://${SHOPIFY_CHECKOUT_DOMAIN}/checkouts/${match[1]}`;
  }
  
  // If URL is already valid, return as-is
  if (isValidCheckoutUrl(url)) {
    return url;
  }
  
  throw new Error(`Invalid checkout URL: ${url}`);
}

/**
 * Add post-checkout redirect parameters to a checkout URL
 * This ensures users are redirected back to masterdisplaycases.com after checkout
 */
export function addPostCheckoutRedirect(checkoutUrl: string, orderId?: string): string {
  const redirectUrl = orderId 
    ? `${STOREFRONT_URL}/thank-you?order_id=${orderId}`
    : `${STOREFRONT_URL}/thank-you`;
  
  const separator = checkoutUrl.includes('?') ? '&' : '?';
  return `${checkoutUrl}${separator}checkout%5Bredirect_to%5D%5Bsuccess%5D=${encodeURIComponent(redirectUrl)}`;
}

/**
 * Complete checkout URL preparation:
 * 1. Validate the URL
 * 2. Normalize to correct domain
 * 3. Add post-checkout redirect parameters
 */
export function prepareCheckoutUrl(url: string, orderId?: string): string {
  // Validate and normalize
  const normalized = validateCheckoutUrl(url);
  
  // Add redirect parameters
  return addPostCheckoutRedirect(normalized, orderId);
}

export default {
  enforceCorrectDomain,
  CHECKOUT_DOMAIN,
  FRONTEND_DOMAIN,
  FRONTEND_URL,
  interceptRedirect,
  isValidCheckoutUrl,
  validateCheckoutUrl,
  addPostCheckoutRedirect,
  prepareCheckoutUrl,
};