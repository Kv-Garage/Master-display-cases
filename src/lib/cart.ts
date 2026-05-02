/**
 * Shopify Cart Service using Storefront API
 * Uses GraphQL mutations for cart management
 * NO manual URL building - uses checkoutUrl from API
 * 
 * CRITICAL: Checkout URLs MUST use mraze2-ra.myshopify.com domain
 * Custom domain (masterdisplaycases.com) will cause 404 errors
 * because it's hosted on Netlify, not Shopify.
 * 
 * After checkout, users are redirected back to masterdisplaycases.com/thank-you
 * via the checkout redirect parameter (handled by src/lib/checkout.ts)
 */

import { shopifyFetch } from "./shopify-client";
import { normalizeCheckoutUrl } from "./checkout";

// The correct Shopify domain for checkout (re-exported for reference)
export { SHOPIFY_CHECKOUT_DOMAIN as SHOPIFY_DOMAIN } from "./checkout";

export interface Cart {
  id: string;
  checkoutUrl: string;
  lines?: CartLine[];
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      title: string;
    };
  };
}

/**
 * Create a new cart
 * Returns cart with id and checkoutUrl
 */
export async function createCart(): Promise<Cart> {
  const data = await shopifyFetch(`
    mutation {
      cartCreate {
        cart {
          id
          checkoutUrl
        }
      }
    }
  `);

  const cart = data.cartCreate.cart;
  
  // Normalize checkout URL to use correct myshopify.com domain
  if (cart?.checkoutUrl) {
    cart.checkoutUrl = normalizeCheckoutUrl(cart.checkoutUrl);
  }
  
  return cart;
}

/**
 * Validate that a variant ID is in the correct Shopify GID format
 */
function isValidVariantId(variantId: string): boolean {
  // Must be a string and contain "ProductVariant" in the GID format
  return typeof variantId === 'string' && variantId.includes('gid://shopify/ProductVariant/');
}

/**
 * Add item to cart
 * Returns updated cart with checkoutUrl
 */
export async function addToCart(
  cartId: string,
  variantId: string,
  quantity: number = 1
): Promise<Cart> {
  // TASK 4: Hard validation - ensure variantId is in correct format
  if (!isValidVariantId(variantId)) {
    console.error('❌ INVALID VARIANT ID:', variantId);
    console.error('   Expected format: gid://shopify/ProductVariant/XXXX');
    console.error('   Received:', variantId);
    throw new Error(`Invalid variant ID format: ${variantId}. Expected gid://shopify/ProductVariant/XXXX`);
  }

  // TASK 6: Debug output before mutation
  console.log('USING VARIANT ID:', variantId);

  const data = await shopifyFetch(
    `
    mutation ($cartId: ID!, $variantId: ID!, $quantity: Int!) {
      cartLinesAdd(
        cartId: $cartId,
        lines: [
          {
            merchandiseId: $variantId,
            quantity: $quantity
          }
        ]
      ) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `,
    { cartId, variantId, quantity }
  );

  // TASK 5: Fail-safe check - ensure cartLinesAdd succeeded
  const cart = data.cartLinesAdd?.cart;
  if (!cart) {
    console.error('❌ cartLinesAdd failed:', data);
    console.error('   Cart ID:', cartId);
    console.error('   Variant ID:', variantId);
    console.error('   Quantity:', quantity);
    throw new Error('Failed to add item to cart. Please try again.');
  }

  // Normalize checkout URL to use correct myshopify.com domain
  if (cart?.checkoutUrl) {
    cart.checkoutUrl = normalizeCheckoutUrl(cart.checkoutUrl);
  }

  // Flatten the lines edges structure
  if (cart.lines) {
    cart.lines = cart.lines.edges.map((edge: any) => edge.node);
  }
  return cart;
}

/**
 * Update cart item quantity
 */
export async function updateCartQuantity(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  const data = await shopifyFetch(
    `
    mutation ($cartId: ID!, $lineId: ID!, $quantity: Int!) {
      cartLinesUpdate(
        cartId: $cartId,
        lines: [
          {
            id: $lineId,
            quantity: $quantity
          }
        ]
      ) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
              }
            }
          }
        }
      }
    }
  `,
    { cartId, lineId, quantity }
  );

  const cart = data.cartLinesUpdate.cart;
  
  // Normalize checkout URL to use correct myshopify.com domain
  if (cart?.checkoutUrl) {
    cart.checkoutUrl = normalizeCheckoutUrl(cart.checkoutUrl);
  }
  
  if (cart.lines) {
    cart.lines = cart.lines.edges.map((edge: any) => edge.node);
  }
  return cart;
}

/**
 * Remove item from cart
 */
export async function removeFromCart(
  cartId: string,
  lineId: string
): Promise<Cart> {
  const data = await shopifyFetch(
    `
    mutation ($cartId: ID!, $lineId: ID!) {
      cartLinesRemove(
        cartId: $cartId,
        lineIds: [$lineId]
      ) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
              }
            }
          }
        }
      }
    }
  `,
    { cartId, lineId }
  );

  const cart = data.cartLinesRemove.cart;
  
  // Normalize checkout URL to use correct myshopify.com domain
  if (cart?.checkoutUrl) {
    cart.checkoutUrl = normalizeCheckoutUrl(cart.checkoutUrl);
  }
  
  if (cart.lines) {
    cart.lines = cart.lines.edges.map((edge: any) => edge.node);
  }
  return cart;
}

/**
 * Get cart by ID with full details
 */
export async function getCart(cartId: string): Promise<Cart | null> {
  try {
    const data = await shopifyFetch(
      `
      query ($cartId: ID!) {
        cart(id: $cartId) {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
      { cartId }
    );

    const cart = data.cart;
    if (!cart) return null;

    // Normalize checkout URL to use correct myshopify.com domain
    if (cart.checkoutUrl) {
      cart.checkoutUrl = normalizeCheckoutUrl(cart.checkoutUrl);
    }

    if (cart.lines) {
      cart.lines = cart.lines.edges.map((edge: any) => edge.node);
    }
    return cart;
  } catch (error) {
    console.error('Failed to fetch cart:', error);
    return null;
  }
}