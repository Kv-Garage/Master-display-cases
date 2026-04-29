/**
 * Shopify Storefront API Integration
 * Strict mode: Hard fails on API errors, no silent failures
 * Hybrid approach: Fetch from Shopify, local cart management, direct checkout
 */

import { debugRedirect } from './debugRedirect';
import { SHOPIFY_DOMAIN } from './config';

const SHOPIFY_STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

/**
 * Check if Shopify API is configured
 */
export function isShopifyConfigured(): boolean {
  return !!SHOPIFY_STOREFRONT_TOKEN;
}

/**
 * Fetch data from Shopify Storefront API
 * HARD FAIL on any error - no silent failures
 */
export async function shopifyFetch(query: string, variables = {}) {
  if (!SHOPIFY_STOREFRONT_TOKEN) {
    throw new Error('Shopify Storefront Token is missing. Set NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN in .env.local');
  }

  const domain = getCheckoutDomain();
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const text = await res.text();

  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON response: " + text);
  }

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${text}`);
  }

  if (json.errors) {
    throw new Error("Shopify GraphQL Error: " + JSON.stringify(json.errors));
  }

  return json.data;
}

/**
 * Test Shopify connection
 */
export async function testShopifyConnection() {
  return await shopifyFetch(`{ shop { name } }`);
}

/**
 * Normalize product data for consistent UI rendering
 */
export function normalizeProduct(product: any) {
  const firstVariant = product.variants?.edges?.[0]?.node;
  const firstImage = product.images?.edges?.[0]?.node;
  
  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    image: firstImage?.url || '/placeholder.jpg',
    images: product.images?.edges?.map(({ node }: any) => ({
      url: node.url,
      altText: node.altText,
      width: node.width,
      height: node.height,
    })) || [],
    price: parseFloat(firstVariant?.price?.amount || 0),
    priceFormatted: formatPrice(parseFloat(firstVariant?.price?.amount || 0)),
    compareAtPrice: firstVariant?.compareAtPrice?.amount ? parseFloat(firstVariant.compareAtPrice.amount) : null,
    currency: firstVariant?.price?.currencyCode || 'USD',
    variantId: firstVariant?.id,
    variants: product.variants?.edges?.map(({ node }: any) => ({
      id: node.id,
      title: node.title,
      price: parseFloat(node.price?.amount || 0),
      available: node.availableForSale,
      compareAtPrice: node.compareAtPrice?.amount ? parseFloat(node.compareAtPrice.amount) : null,
    })) || [],
    minPrice: parseFloat(product.priceRange?.minVariantPrice?.amount || 0),
    maxPrice: parseFloat(product.priceRange?.maxVariantPrice?.amount || 0),
    tags: product.tags || [],
    productType: product.productType,
    vendor: product.vendor,
    availableForSale: product.variants?.edges?.some(({ node }: any) => node.availableForSale) || false,
  };
}

/**
 * Get products from Shopify (with normalization)
 */
export async function getProducts() {
  const data = await shopifyFetch(`query {
    products(first: 20) {
      edges {
        node {
          id
          handle
          title
          description
          productType
          vendor
          tags
          images(first: 5) {
            edges {
              node {
                url
                altText
                width
                height
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                }
                availableForSale
              }
            }
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
            maxVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }`);

  return data.products.edges.map(({ node }: any) => normalizeProduct(node));
}

/**
 * Get a single product by handle (CRITICAL - with full data for checkout)
 */
export async function getProduct(handle: string) {
  const data = await shopifyFetch(`query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      handle
      title
      description
      productType
      vendor
      tags
      createdAt
      images(first: 10) {
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
            }
            availableForSale
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
    }
  }`, { handle });

  if (!data.product) {
    return null;
  }

  return normalizeProduct(data.product);
}

/**
 * Get collections
 */
export async function getCollections() {
  const data = await shopifyFetch(`{
    collections(first: 20) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }`);

  return data.collections.edges.map((edge: any) => edge.node);
}

/**
 * Get a single collection by handle (FIXED)
 */
export async function getCollection(handle: string) {
  const data = await shopifyFetch(`
    query ($handle: String!) {
      collection(handle: $handle) {
        id
        title
        handle
      }
    }
  `, { handle });

  return data.collection;
}

/**
 * Get collection products (with normalization)
 */
export async function getCollectionProducts(handle: string) {
  const data = await shopifyFetch(`query getCollectionProducts($handle: String!) {
    collection(handle: $handle) {
      products(first: 20) {
        edges {
          node {
            id
            handle
            title
            description
            productType
            vendor
            tags
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  compareAtPrice {
                    amount
                  }
                  availableForSale
                }
              }
            }
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
              maxVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }`, { handle });

  if (!data.collection || !data.collection.products) {
    return [];
  }

  return data.collection.products.edges.map(({ node }: any) => normalizeProduct(node));
}

/**
 * Extract numeric ID from Shopify GID
 * Example: "gid://shopify/ProductVariant/123456789" -> "123456789"
 * 
 * SAFE VERSION: Validates that the result is ONLY numbers
 */
export function getNumericId(gid: string | number): string | null {
  if (!gid) {
    console.error('[getNumericId] Input is null or undefined');
    return null;
  }
  
  // If already a number, convert to string
  if (typeof gid === 'number') {
    return gid.toString();
  }
  
  // If it's already a numeric string, return it
  if (/^\d+$/.test(gid)) {
    return gid;
  }
  
  // Extract from GID format
  const parts = gid.split('/');
  const id = parts[parts.length - 1];
  
  // Validate: must be ONLY numbers
  if (!/^\d+$/.test(id)) {
    console.error('[getNumericId] Invalid GID format:', gid);
    console.error('[getNumericId] Extracted ID:', id);
    return null;
  }
  
  return id;
}

/**
 * Get the checkout domain - MUST be set via environment variable
 * NO fallbacks - will throw error if not configured
 */
export function getCheckoutDomain(): string {
  return SHOPIFY_DOMAIN;
}

/**
 * Buy Now - Direct checkout (no cart)
 * Redirects directly to Shopify checkout with SINGLE item only
 * 
 * Uses window.location.assign() for reliable redirect (not Next.js router)
 */
export function buyNow(variantId: string) {
  const id = getNumericId(variantId);
  const domain = getCheckoutDomain();

  if (!id) {
    console.error('[Shopify Buy Now] Invalid variant ID:', variantId);
    return;
  }

  const url = `https://${domain}/cart/${id}:1`;

  console.log('[Shopify Buy Now]');
  console.log('  - Variant ID:', variantId);
  console.log('  - Numeric ID:', id);
  console.log('  - Domain:', domain);
  console.log('  - CHECKOUT URL:', url);

  // Use debug redirect to trace the URL
  debugRedirect(url);
}

/**
 * Add to Cart - Local storage based cart
 */
export function addToCart(variantId: string) {
  const id = getNumericId(variantId);
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const existing = cart.find((i: any) => i.id === id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ id, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  // Dispatch custom event for cart updates
  window.dispatchEvent(new Event('cart-updated'));
}

/**
 * Get Cart
 */
export function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

/**
 * Remove from Cart
 */
export function removeFromCart(variantId: string) {
  const id = getNumericId(variantId);
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const filtered = cart.filter((item: any) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(filtered));
  window.dispatchEvent(new Event('cart-updated'));
  return filtered;
}

/**
 * Clear Cart
 */
export function clearCart() {
  localStorage.removeItem("cart");
  window.dispatchEvent(new Event('cart-updated'));
}

/**
 * Checkout - Redirect to Shopify with ALL cart items
 * Uses window.location.assign() for reliable redirect (not Next.js router)
 */
export function checkout() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (!cart.length) return;

  const domain = getCheckoutDomain();

  const items = cart.map((i: any) => `${i.id}:${i.quantity}`).join(",");

  const url = `https://${domain}/cart/${items}`;

  console.log('[Shopify Checkout]');
  console.log('  - Cart items:', cart);
  console.log('  - Domain:', domain);
  console.log('  - CHECKOUT URL:', url);

  // Use debug redirect to trace the URL
  debugRedirect(url);
}

/**
 * Get cart item count
 */
export function getCartItemCount() {
  const cart = getCart();
  return cart.reduce((total: number, item: any) => total + item.quantity, 0);
}

/**
 * Format price
 */
export function formatPrice(price: number, currencyCode: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(price);
}

// Default export for convenience
export default {
  shopifyFetch,
  testShopifyConnection,
  getProducts,
  getProduct,
  getCollections,
  getCollection,
  getCollectionProducts,
  getNumericId,
  buyNow,
  addToCart,
  getCart,
  removeFromCart,
  clearCart,
  checkout,
  getCartItemCount,
  formatPrice,
  normalizeProduct,
  isShopifyConfigured,
};