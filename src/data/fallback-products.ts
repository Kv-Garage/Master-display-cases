/**
 * Fallback product data for when Shopify API is unavailable
 * These products will be used when the Shopify Storefront API returns errors
 */

export interface FallbackProduct {
  id: string;
  title: string;
  handle: string;
  price: number;
  compareAtPrice?: number;
  description: string;
  image: string;
  images: string[];
  variantId: string;
  variants: Array<{
    id: string;
    title: string;
    price: number;
    available: boolean;
  }>;
  availableForSale: boolean;
}

export const FALLBACK_PRODUCTS: FallbackProduct[] = [
  {
    id: 'led-retail-display-showcase',
    title: 'LED Retail Display Showcase',
    handle: 'led-retail-display-showcase',
    price: 1999,
    description: 'Premium LED-lit retail display case perfect for showcasing high-value products. Features adjustable shelving and secure locking.',
    image: '/processed/In-store Shop Display-gallery.jpg',
    images: [
      '/processed/In-store Shop Display-gallery.jpg',
      '/processed/In-store Shop Display 2-gallery.jpg',
    ],
    variantId: 'gid://shopify/ProductVariant/12345', // This would be the real variant ID
    variants: [
      { id: 'var1', title: '48" Black – Knocked Down', price: 1999, available: true },
      { id: 'var2', title: '48" Black – Assembled', price: 2199, available: true },
      { id: 'var3', title: '72" Black – Knocked Down', price: 2499, available: true },
      { id: 'var4', title: '72" Black – Assembled', price: 2699, available: false },
    ],
    availableForSale: true,
  },
  {
    id: 'rgb-display-case-pro',
    title: 'RGB Display Case Pro',
    handle: 'rgb-display-case-pro',
    price: 2499,
    description: 'Professional-grade RGB display case with customizable color-changing LED system. Perfect for vape shops and modern retail.',
    image: '/processed/UGC content-gallery.jpg',
    images: [
      '/processed/UGC content-gallery.jpg',
    ],
    variantId: 'gid://shopify/ProductVariant/12346',
    variants: [
      { id: 'var1', title: '48" RGB – Knocked Down', price: 2499, available: true },
      { id: 'var2', title: '48" RGB – Assembled', price: 2699, available: true },
      { id: 'var3', title: '72" RGB – Knocked Down', price: 2999, available: true },
    ],
    availableForSale: true,
  },
  {
    id: 'counter-display-case',
    title: 'Counter Display Case',
    handle: 'counter-display-case',
    price: 899,
    description: 'Compact counter-top display case ideal for small retail spaces and checkout areas.',
    image: '/processed/Vape Shop Display UGC cotent-gallery.jpg',
    images: [
      '/processed/Vape Shop Display UGC cotent-gallery.jpg',
    ],
    variantId: 'gid://shopify/ProductVariant/12347',
    variants: [
      { id: 'var1', title: 'Standard – No Lock', price: 899, available: true },
      { id: 'var2', title: 'Standard – With Lock', price: 999, available: true },
    ],
    availableForSale: true,
  },
];

export const FALLBACK_COLLECTIONS = [
  {
    id: 'rgb-display-cases',
    title: 'RGB Display Cases',
    handle: 'rgb-display-cases',
    description: 'Color-changing LED display cases for modern retail',
    productsCount: 5,
  },
  {
    id: 'counter-displays',
    title: 'Counter Displays',
    handle: 'counter-displays',
    description: 'Compact display cases for countertops',
    productsCount: 3,
  },
  {
    id: 'floor-displays',
    title: 'Floor Displays',
    handle: 'floor-displays',
    description: 'Full-size floor-standing display cases',
    productsCount: 8,
  },
];

/**
 * Get a product by handle from fallback data
 */
export function getFallbackProductByHandle(handle: string): FallbackProduct | undefined {
  return FALLBACK_PRODUCTS.find(p => p.handle === handle);
}

/**
 * Get all fallback products
 */
export function getAllFallbackProducts(): FallbackProduct[] {
  return FALLBACK_PRODUCTS;
}

/**
 * Get fallback collection by handle
 */
export function getFallbackCollectionByHandle(handle: string) {
  return FALLBACK_COLLECTIONS.find(c => c.handle === handle);
}

/**
 * Get products by collection handle
 */
export function getFallbackProductsByCollection(handle: string): FallbackProduct[] {
  // For now, return all products. In a real implementation, you'd filter by collection.
  return FALLBACK_PRODUCTS;
}