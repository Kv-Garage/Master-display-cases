// Shopify domain configuration
export const SHOPIFY_DOMAIN = "https://mraze2-ra.myshopify.com";

/**
 * Get UTM parameters from current URL or use defaults
 * This ensures traffic source is tracked in Shopify analytics
 */
export function getUtmParams(): string {
  if (typeof window === 'undefined') return '';
  
  const params = new URLSearchParams();
  
  // Check for existing UTM parameters in the current URL
  const currentParams = new URLSearchParams(window.location.search);
  
  // Pass through any existing UTM params (from ads)
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  let hasUtmParams = false;
  
  for (const key of utmKeys) {
    const value = currentParams.get(key);
    if (value) {
      params.set(key, value);
      hasUtmParams = true;
    }
  }
  
  // If no UTM params found, add default source
  if (!hasUtmParams) {
    params.set('utm_source', 'masterdisplaycases.com');
    params.set('utm_medium', 'referral');
  }
  
  // Always add referrer info
  if (document.referrer) {
    try {
      const referrerUrl = new URL(document.referrer);
      params.set('referrer', referrerUrl.pathname + referrerUrl.search);
    } catch {
      // Invalid referrer URL, skip
    }
  }
  
  const paramString = params.toString();
  return paramString ? `?${paramString}` : '';
}

/**
 * Generate a direct Shopify product URL with tracking parameters
 * @param slug - The product handle/slug
 * @returns Full Shopify product URL with UTM tracking
 */
export function getShopifyProductUrl(slug: string): string {
  const utmParams = getUtmParams();
  return `${SHOPIFY_DOMAIN}/products/${slug}${utmParams}`;
}

/**
 * Convert internal product links to direct Shopify URLs with tracking
 * This function processes HTML content and replaces /products/{slug} links
 * with direct Shopify URLs that include UTM tracking parameters
 */
export function processProductLinks(html: string): string {
  // Replace href="/products/{slug}" with direct Shopify URLs with tracking
  return html.replace(
    /href="\/products\/([^"]+)"/g,
    (match, slug) => `href="${getShopifyProductUrl(slug)}"`
  );
}

/**
 * Add click tracking to external Shopify links
 * This ensures that when users click on Shopify links, we track the event
 * and pass the referrer data to Shopify
 */
export function trackShopifyClick(productHandle: string, productName?: string) {
  // Track with Google Analytics if available
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'shopify_redirect', {
      event_category: 'Navigation',
      event_label: productHandle,
      product_name: productName,
      destination: `${SHOPIFY_DOMAIN}/products/${productHandle}`
    });
  }
  
  // Store the referrer info in sessionStorage for Shopify to pick up
  if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
    sessionStorage.setItem('shopify_referrer', window.location.href);
    sessionStorage.setItem('shopify_referrer_source', document.referrer || 'direct');
  }
}