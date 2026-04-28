/**
 * Cart utilities for Shopify storefront using cart URL method
 * No Storefront API required - uses localStorage and direct Shopify checkout URLs
 */

const SHOPIFY_DOMAIN = 'masterdisplaycases.myshopify.com';
const CART_STORAGE_KEY = 'cart';

export interface CartItem {
  variantId: number; // Numeric ID only (not GID format)
  quantity: number;
}

/**
 * Convert GraphQL GID format to numeric ID
 * Examples:
 *   "gid://shopify/ProductVariant/12345" -> 12345
 *   "12345" -> 12345
 */
export function convertToNumericId(id: string | number): number {
  if (typeof id === 'number') {
    return id;
  }

  if (typeof id === 'string') {
    // Check if it's in GID format
    if (id.startsWith('gid://shopify/ProductVariant/')) {
      const numericPart = id.split('/').pop();
      const numericId = parseInt(numericPart || '', 10);
      if (isNaN(numericId)) {
        throw new Error(`Invalid variant ID format: ${id}`);
      }
      return numericId;
    }

    // Try to parse as number
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      throw new Error(`Invalid variant ID: ${id}`);
    }
    return numericId;
  }

  throw new Error(`Invalid variant ID type: ${typeof id}`);
}

/**
 * Get cart from localStorage
 * Returns empty array if cart doesn't exist or is invalid
 */
export function getCart(): CartItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const cartJson = localStorage.getItem(CART_STORAGE_KEY);
    if (!cartJson) {
      return [];
    }

    const cart = JSON.parse(cartJson);
    if (!Array.isArray(cart)) {
      return [];
    }

    // Validate cart items
    return cart.filter(
      (item) =>
        typeof item.variantId === 'number' &&
        typeof item.quantity === 'number' &&
        item.quantity > 0
    );
  } catch (error) {
    console.error('Failed to parse cart from localStorage:', error);
    return [];
  }
}

/**
 * Save cart to localStorage
 */
function saveCart(cart: CartItem[]): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

/**
 * Add item to cart
 * If item already exists, increases quantity
 */
export function addToCart(variantId: string | number, quantity: number = 1): CartItem[] {
  try {
    const numericId = convertToNumericId(variantId);
    const cart = getCart();

    // Check if item already exists
    const existingIndex = cart.findIndex((item) => item.variantId === numericId);

    if (existingIndex !== -1) {
      // Increase quantity
      cart[existingIndex].quantity += quantity;
    } else {
      // Add new item
      cart.push({ variantId: numericId, quantity });
    }

    saveCart(cart);
    return cart;
  } catch (error) {
    console.error('Failed to add item to cart:', error);
    throw error;
  }
}

/**
 * Remove item from cart
 */
export function removeFromCart(variantId: string | number): CartItem[] {
  const numericId = convertToNumericId(variantId);
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.variantId !== numericId);
  saveCart(updatedCart);
  return updatedCart;
}

/**
 * Update item quantity in cart
 */
export function updateCartQuantity(variantId: string | number, quantity: number): CartItem[] {
  const numericId = convertToNumericId(variantId);
  const cart = getCart();

  const updatedCart = cart
    .map((item) =>
      item.variantId === numericId ? { ...item, quantity: Math.max(0, quantity) } : item
    )
    .filter((item) => item.quantity > 0);

  saveCart(updatedCart);
  return updatedCart;
}

/**
 * Clear entire cart
 */
export function clearCart(): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(CART_STORAGE_KEY);
}

/**
 * Get total number of items in cart
 */
export function getCartItemCount(): number {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Check if cart is empty
 */
export function isCartEmpty(): boolean {
  const cart = getCart();
  return cart.length === 0;
}

/**
 * Build Shopify checkout URL from cart items
 * Format: https://domain.com/cart/variantId1:qty,variantId2:qty
 */
export function buildCheckoutUrl(): string | null {
  const cart = getCart();

  if (cart.length === 0) {
    return null;
  }

  const variantLine = cart
    .map((item) => `${item.variantId}:${item.quantity}`)
    .join(',');

  return `https://${SHOPIFY_DOMAIN}/cart/${variantLine}`;
}

/**
 * Redirect to Shopify checkout
 */
export function goToCheckout(): void {
  const checkoutUrl = buildCheckoutUrl();

  if (!checkoutUrl) {
    console.warn('Cannot checkout: cart is empty');
    return;
  }

  window.location.href = checkoutUrl;
}

/**
 * Buy now - redirect directly to checkout with single item
 * Bypasses the cart and goes straight to checkout
 */
export function buyNow(variantId: string | number, quantity: number = 1): void {
  try {
    const numericId = convertToNumericId(variantId);
    const checkoutUrl = `https://${SHOPIFY_DOMAIN}/cart/${numericId}:${quantity}`;
    window.location.href = checkoutUrl;
  } catch (error) {
    console.error('Failed to buy now:', error);
    throw error;
  }
}

/**
 * Get cart items with full details (for display purposes)
 * This is a client-side only function that combines cart data with product information
 */
export interface CartItemWithDetails extends CartItem {
  title?: string;
  variantTitle?: string;
  price?: number;
  image?: {
    url: string;
    altText?: string;
  };
  productHandle?: string;
  productId?: string;
}

/**
 * Sync cart details from localStorage
 * This function helps maintain compatibility with the existing CartContext
 */
export function syncCartDetails(details: Map<number, Omit<CartItemWithDetails, 'variantId' | 'quantity'>>): CartItemWithDetails[] {
  const cart = getCart();

  return cart.map((item) => {
    const itemDetails = details.get(item.variantId) || {};
    return {
      ...item,
      ...itemDetails,
    };
  });
}

/**
 * Add item with details to cart
 * Stores both the basic cart item and optional details for display
 */
export function addToCartWithDetails(
  variantId: string | number,
  quantity: number = 1,
  details?: Partial<Omit<CartItemWithDetails, 'variantId' | 'quantity'>>
): CartItem[] {
  const numericId = convertToNumericId(variantId);
  const cart = addToCart(numericId, quantity);

  // Store details in a separate localStorage key if provided
  if (details && typeof window !== 'undefined') {
    try {
      const detailsKey = `${CART_STORAGE_KEY}_details`;
      let allDetails: Record<number, any> = {};

      const existingDetails = localStorage.getItem(detailsKey);
      if (existingDetails) {
        allDetails = JSON.parse(existingDetails);
      }

      allDetails[numericId] = {
        ...allDetails[numericId],
        ...details,
      };

      localStorage.setItem(detailsKey, JSON.stringify(allDetails));
    } catch (error) {
      console.error('Failed to store cart item details:', error);
    }
  }

  return cart;
}

/**
 * Get cart with details
 */
export function getCartWithDetails(): CartItemWithDetails[] {
  const cart = getCart();

  if (typeof window === 'undefined') {
    return cart;
  }

  try {
    const detailsKey = `${CART_STORAGE_KEY}_details`;
    const detailsJson = localStorage.getItem(detailsKey);
    const allDetails: Record<number, any> = detailsJson ? JSON.parse(detailsJson) : {};

    return cart.map((item) => ({
      ...item,
      ...(allDetails[item.variantId] || {}),
    }));
  } catch (error) {
    console.error('Failed to load cart details:', error);
    return cart;
  }
}

/**
 * Remove item details when removing from cart
 */
export function removeFromCartWithDetails(variantId: string | number): CartItem[] {
  const numericId = convertToNumericId(variantId);
  const cart = removeFromCart(numericId);

  // Remove details as well
  if (typeof window !== 'undefined') {
    try {
      const detailsKey = `${CART_STORAGE_KEY}_details`;
      const detailsJson = localStorage.getItem(detailsKey);

      if (detailsJson) {
        const allDetails: Record<number, any> = JSON.parse(detailsJson);
        delete allDetails[numericId];
        localStorage.setItem(detailsKey, JSON.stringify(allDetails));
      }
    } catch (error) {
      console.error('Failed to remove item details:', error);
    }
  }

  return cart;
}

/**
 * Clear cart and all details
 */
export function clearCartWithDetails(): void {
  clearCart();

  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(`${CART_STORAGE_KEY}_details`);
    } catch (error) {
      console.error('Failed to clear cart details:', error);
    }
  }
}