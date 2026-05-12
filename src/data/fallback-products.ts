/**
 * Fallback Products Data
 * 
 * This file provides sample product data when Shopify is not configured.
 * This ensures the site remains functional and visually complete even
 * without a Shopify connection.
 */

export interface FallbackProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  images: string[];
  variants: Array<{
    id: string;
    title: string;
    price: number;
    available: boolean;
  }>;
  productType: string;
  tags: string[];
  vendor: string;
  availableForSale: boolean;
  minPrice: number;
  maxPrice: number;
  currency: string;
}

// Sample products for display cases
export const fallbackProducts: FallbackProduct[] = [
  {
    id: 'fallback-48-led',
    title: '48" LED Retail Display Counter (RGB)',
    handle: '48-led-retail-display-counter-rgb',
    description: 'Premium LED display counter with RGB lighting, perfect for showcasing high-value products. Features tempered glass, secure locking system, and customizable lighting modes.',
    price: 1299,
    compareAtPrice: 1599,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600&fit=crop',
    ],
    variants: [
      { id: 'var-1', title: 'Black Frame', price: 1299, available: true },
      { id: 'var-2', title: 'White Frame', price: 1349, available: true },
      { id: 'var-3', title: 'Chrome Frame', price: 1399, available: false },
    ],
    productType: 'Display Case',
    tags: ['LED', 'RGB', 'Countertop', 'Retail'],
    vendor: 'Master Display Cases',
    availableForSale: true,
    minPrice: 1299,
    maxPrice: 1399,
    currency: 'USD',
  },
  {
    id: 'fallback-72-led',
    title: '72" LED Retail Display Counter (RGB)',
    handle: '72-led-retail-display-counter-rgb',
    description: 'Large LED display counter with RGB lighting, ideal for high-traffic retail environments. Features premium tempered glass and secure locking mechanisms.',
    price: 1799,
    compareAtPrice: 2199,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
    ],
    variants: [
      { id: 'var-1', title: 'Black Frame', price: 1799, available: true },
      { id: 'var-2', title: 'White Frame', price: 1849, available: true },
    ],
    productType: 'Display Case',
    tags: ['LED', 'RGB', 'Countertop', 'Retail'],
    vendor: 'Master Display Cases',
    availableForSale: true,
    minPrice: 1799,
    maxPrice: 1849,
    currency: 'USD',
  },
  {
    id: 'fallback-floor-display',
    title: 'Floor Standing Display Case (LED)',
    handle: 'floor-standing-display-case-led',
    description: 'Professional floor standing display case with integrated LED lighting. Perfect for showcasing premium products in retail environments.',
    price: 2299,
    compareAtPrice: 2699,
    image: 'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=600&fit=crop',
    ],
    variants: [
      { id: 'var-1', title: 'Standard', price: 2299, available: true },
    ],
    productType: 'Display Case',
    tags: ['LED', 'Floor Standing', 'Retail'],
    vendor: 'Master Display Cases',
    availableForSale: true,
    minPrice: 2299,
    maxPrice: 2299,
    currency: 'USD',
  },
];

// Fallback collections
export const fallbackCollections = [
  {
    id: 'rgb-displays',
    title: 'RGB Display Cases',
    handle: 'rgb-displays',
    description: 'Premium LED display cases with customizable RGB lighting for maximum product visibility.',
  },
  {
    id: 'counter-displays',
    title: 'Counter Displays',
    handle: 'counter-displays',
    description: 'Compact display cases perfect for countertop placement in retail environments.',
  },
  {
    id: 'floor-displays',
    title: 'Floor Displays',
    handle: 'floor-displays',
    description: 'Large floor-standing display cases for high-traffic retail locations.',
  },
];

// Convert fallback product to the format expected by the app
export function normalizeFallbackProduct(product: FallbackProduct) {
  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    image: product.image,
    images: product.images.map((url, index) => ({
      url,
      altText: `${product.title} - Image ${index + 1}`,
    })),
    price: product.price,
    priceFormatted: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: product.currency,
    }).format(product.price),
    compareAtPrice: product.compareAtPrice || null,
    currency: product.currency,
    variantId: product.variants[0]?.id,
    variants: product.variants.map((v) => ({
      id: v.id,
      title: v.title,
      price: v.price,
      available: v.available,
    })),
    minPrice: product.minPrice,
    maxPrice: product.maxPrice,
    tags: product.tags,
    productType: product.productType,
    vendor: product.vendor,
    availableForSale: product.availableForSale,
  };
}

// Get all fallback products in normalized format
export function getFallbackProducts() {
  return fallbackProducts.map(normalizeFallbackProduct);
}

// Get a single fallback product by handle
export function getFallbackProduct(handle: string) {
  const product = fallbackProducts.find((p) => p.handle === handle);
  return product ? normalizeFallbackProduct(product) : null;
}

// Get fallback products by collection
export function getFallbackCollectionProducts(collectionHandle: string) {
  // For now, return all products for any collection
  // In a real implementation, you'd filter by collection
  return fallbackProducts.map(normalizeFallbackProduct);
}

// Get a fallback collection by handle
export function getFallbackCollection(handle: string) {
  const collection = fallbackCollections.find((c) => c.handle === handle);
  return collection || null;
}

// Get all fallback collections
export function getFallbackCollections() {
  return fallbackCollections;
}
