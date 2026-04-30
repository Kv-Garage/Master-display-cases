// Central routing configuration for Master Display Cases
// All product and collection links should use these routes

export const ROUTES = {
  // Main collection - the ONLY valid collection for display cases
  COLLECTION: '/collections/rgb-displays',
  
  // Product routes - using actual Shopify product handles
  PRODUCTS: {
    // 48" Counter Display with RGB
    DISPLAY_48: '/products/products-48-led-retail-wrap-counter-rgb',
    // 70" Floor Display with RGB
    DISPLAY_70: '/products/products-70-led-retail-display-showcase-rgb',
  },
  
  // Other important routes
  CONTACT: '/contact',
  BUYING_GUIDE: '/buying-guide',
  ASSEMBLY_OPTIONS: '/assembly-options',
  LOCK_SECURITY: '/lock-security-upgrade',
  
  // Industry landing pages
  INDUSTRY: {
    SMOKE_SHOPS: '/display-cases-for-smoke-shops',
    JEWELRY_STORES: '/display-cases-for-jewelry-stores',
    CONVENIENCE_STORES: '/display-cases-for-convenience-stores',
    BOUTIQUES: '/display-cases-for-boutiques',
  },
  
  // Legacy routes that should redirect (for reference only)
  // These should NOT be used - they're here for redirect mapping
  LEGACY: {
    LED_SHOWCASE: '/products/led-retail-display-showcase',
    SMOKE_SHOP_COLLECTION: '/collections/smoke-shop-displays',
  },
} as const;

// Helper function to get product URL by handle
export function getProductUrl(handle: string): string {
  const productRoutes: Record<string, string> = {
    'products-48-led-retail-wrap-counter-rgb': ROUTES.PRODUCTS.DISPLAY_48,
    'products-70-led-retail-display-showcase-rgb': ROUTES.PRODUCTS.DISPLAY_70,
  };
  
  return productRoutes[handle] || `/products/${handle}`;
}

// Helper function to get collection URL
export function getCollectionUrl(): string {
  return ROUTES.COLLECTION;
}

export default ROUTES;