/**
 * Shopify Storefront API Integration
 * Strict mode: Hard fails on API errors, no silent failures
 * Hybrid approach: Fetch from Shopify, local cart management, direct checkout
 */

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN || 'masterdisplaycases.myshopify.com';
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

  const endpoint = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

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
 * Get products from Shopify (STRICT query)
 */
export async function getProducts() {
  const data = await shopifyFetch(`{
    products(first: 20) {
      edges {
        node {
          id
          title
          handle
          description
          images(first: 1) {
            edges { node { url } }
          }
          variants(first: 1) {
            edges {
              node {
                id
                price { amount }
              }
            }
          }
        }
      }
    }
  }`);

  return data.products.edges.map((edge: any) => edge.node);
}

/**
 * Get a single product by handle (CRITICAL)
 */
export async function getProduct(handle: string) {
  const data = await shopifyFetch(`
    query ($handle: String!) {
      product(handle: $handle) {
        id
        title
        description
        handle
        images(first: 5) {
          edges { node { url } }
        }
        variants(first: 5) {
          edges {
            node {
              id
              price { amount }
            }
          }
        }
      }
    }
  `, { handle });

  return data.product;
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
 * Get collection products (FIXED)
 */
export async function getCollectionProducts(handle: string) {
  const data = await shopifyFetch(`
    query ($handle: String!) {
      collection(handle: $handle) {
        products(first: 20) {
          edges {
            node {
              id
              title
              handle
              description
              images(first: 1) {
                edges { node { url } }
              }
              variants(first: 1) {
                edges {
                  node {
                    id
                    price { amount }
                  }
                }
              }
            }
          }
        }
      }
    }
  `, { handle });

  return data.collection.products.edges.map((edge: any) => edge.node);
}

/**
 * Extract numeric ID from Shopify GID
 * Example: "gid://shopify/ProductVariant/123456789" -> "123456789"
 */
export function getNumericId(gid: string): string {
  return gid.split("/").pop() || "";
}

/**
 * Buy Now - Direct checkout (no cart)
 */
export function buyNow(variantId: string) {
  const id = getNumericId(variantId);
  window.location.href = `https://${SHOPIFY_DOMAIN}/cart/${id}:1`;
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
 * Checkout - Redirect to Shopify with cart items
 */
export function checkout() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  if (!cart.length) {
    alert("Cart is empty");
    return;
  }

  const items = cart.map((i: any) => `${i.id}:${i.quantity}`).join(",");

  window.location.href = `https://${SHOPIFY_DOMAIN}/cart/${items}`;
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

/**
 * Normalize Shopify product for consistent data structure
 */
export function normalizeProduct(product: any) {
  const firstVariant = product.variants?.edges?.[0]?.node;
  const firstImage = product.images?.edges?.[0]?.node;
  
  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
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
    variantId: firstVariant?.id,
    variants: product.variants?.edges?.map(({ node }: any) => ({
      id: node.id,
      title: node.title,
      price: parseFloat(node.price?.amount || 0),
      available: node.availableForSale,
      compareAtPrice: node.compareAtPrice?.amount ? parseFloat(node.compareAtPrice.amount) : null,
    })) || [],
    minPrice: parseFloat(product.priceRange?.minVariantPrice?.amount || 0),
    tags: product.tags || [],
    productType: product.productType,
    vendor: product.vendor,
    availableForSale: product.variants?.edges?.some(({ node }: any) => node.availableForSale) || false,
  };
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