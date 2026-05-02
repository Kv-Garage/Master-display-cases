/**
 * Checkout Domain Management
 * 
 * This module handles the critical distinction between:
 * 1. API Domain (mraze2-ra.myshopify.com) - Used for Storefront API calls
 * 2. Checkout Domain (mraze2-ra.myshopify.com) - Where Shopify hosts checkout
 * 3. Storefront Domain (masterdisplaycases.com) - Where users browse and return after checkout
 * 
 * STRATEGY:
 * - Checkout MUST use myshopify.com domain (Shopify hosts checkout)
 * - After checkout, redirect back to masterdisplaycases.com
 * - Intercept any stray redirects to keep users on custom domain
 */

/** The Shopify store's myshopify.com domain (for API and checkout) */
export const SHOPIFY_CHECKOUT_DOMAIN = 'mraze2-ra.myshopify.com';

/** The custom storefront domain where users browse */
export const STOREFRONT_DOMAIN = 'masterdisplaycases.com';

/** Base URL for the custom storefront */
export const STOREFRONT_URL = `https://${STOREFRONT_DOMAIN}`;

/**
 * Build a complete checkout URL from a checkout token
 * Shopify checkout URLs follow the pattern:
 * https://{shop}.myshopify.com/{domain}/checkouts/{token}
 * or
 * https://{shop}.myshopify.com/checkouts/{token}
 */
export function buildCheckoutUrl(token: string): string {
  if (!token) {
    throw new Error('Checkout token is required');
  }
  
  // Clean the token - remove any existing URL parts
  const cleanToken = token.replace(/^https?:\/\//, '').split('/').pop() || token;
  
  return `https://${SHOPIFY_CHECKOUT_DOMAIN}/checkouts/${cleanToken}`;
}

/**
 * Normalize any checkout URL to ensure it uses the correct domain
 * This handles cases where Shopify might return URLs with different formats
 */
export function normalizeCheckoutUrl(url: string): string {
  if (!url) return url;
  
  // Extract the checkout token from any URL format
  const match = url.match(/checkouts\/([a-zA-Z0-9]+)/);
  if (match) {
    return buildCheckoutUrl(match[1]);
  }
  
  // If no token found, return as-is (might already be correct)
  return url;
}

/**
 * Get the URL to redirect to after successful checkout
 * This is passed to Shopify as the "order status URL" redirect
 */
export function getPostCheckoutRedirectUrl(orderId?: string): string {
  if (orderId) {
    return `${STOREFRONT_URL}/thank-you?order_id=${orderId}`;
  }
  return `${STOREFRONT_URL}/thank-you`;
}

/**
 * Append redirect parameters to checkout URL
 * Shopify supports 'checkout[redirect_to][success]' parameter
 * to redirect after successful checkout
 */
export function appendCheckoutRedirect(url: string, orderId?: string): string {
  const redirectUrl = getPostCheckoutRedirectUrl(orderId);
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}checkout%5Bredirect_to%5D%5Bsuccess%5D=${encodeURIComponent(redirectUrl)}`;
}

/**
 * Check if a URL is a Shopify checkout URL
 */
export function isCheckoutUrl(url: string): boolean {
  return url.includes('checkouts/') || url.includes('/cart/');
}

/**
 * Check if a URL points to a Shopify domain
 */
export function isShopifyDomain(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.includes('myshopify.com') || 
           urlObj.hostname.includes('shopify.com');
  } catch {
    return false;
  }
}

/**
 * Check if a URL is on our custom storefront domain
 */
export function isStorefrontUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === STOREFRONT_DOMAIN || 
           urlObj.hostname === `www.${STOREFRONT_DOMAIN}`;
  } catch {
    return false;
  }
}

/**
 * Intercept and redirect any Shopify domain URLs back to storefront
 * Used for logo clicks, "continue shopping" links, etc. during checkout
 */
export function interceptShopifyRedirect(url: string): string {
  if (isShopifyDomain(url) && !isCheckoutUrl(url)) {
    console.log('🔄 Intercepting Shopify redirect:', url, '->', STOREFRONT_URL);
    return STOREFRONT_URL;
  }
  return url;
}

/**
 * Get checkout URL with proper redirect configuration
 * This is the main function to use when redirecting to checkout
 */
export function getCheckoutUrl(checkoutUrl: string): string {
  // Normalize the URL first
  let url = normalizeCheckoutUrl(checkoutUrl);
  
  // Append our custom redirect for post-checkout
  url = appendCheckoutRedirect(url);
  
  console.log('🛒 Checkout URL:', url);
  return url;
}

export default {
  SHOPIFY_CHECKOUT_DOMAIN,
  STOREFRONT_DOMAIN,
  STOREFRONT_URL,
  buildCheckoutUrl,
  normalizeCheckoutUrl,
  getPostCheckoutRedirectUrl,
  appendCheckoutRedirect,
  isCheckoutUrl,
  isShopifyDomain,
  isStorefrontUrl,
  interceptShopifyRedirect,
  getCheckoutUrl,
};