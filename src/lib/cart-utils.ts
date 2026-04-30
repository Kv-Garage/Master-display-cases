/**
 * Cart utilities for local storage based cart management
 * 
 * NOTE: Checkout functionality has been moved to:
 * - src/lib/cart.ts (Shopify Storefront API cart mutations)
 * - src/lib/buy-now.ts (checkout redirect using API)
 * 
 * This file now only handles local cart state management for UI purposes.
 * Actual checkout uses Shopify Storefront API.
 */

const CART_STORAGE_KEY = 'cart';

export interface CartItem {
  variantId: string; // Full GID format: gid://shopify/ProductVariant/123456789
  quantity: number;
}

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
        typeof item.variantId === 'string' &&
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
export function addToCart(variantId: string, quantity: number = 1): CartItem[] {
  try {
    const cart = getCart();

    // Check if item already exists
    const existingIndex = cart.findIndex((item) => item.variantId === variantId);

    if (existingIndex !== -1) {
      // Increase quantity
      cart[existingIndex].quantity += quantity;
    } else {
      // Add new item
      cart.push({ variantId, quantity });
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
export function removeFromCart(variantId: string): CartItem[] {
  const cart = getCart();
  const updatedCart = cart.filter((item) => item.variantId !== variantId);
  saveCart(updatedCart);
  return updatedCart;
}

/**
 * Update item quantity in cart
 */
export function updateCartQuantity(variantId: string, quantity: number): CartItem[] {
  const cart = getCart();

  const updatedCart = cart
    .map((item) =>
      item.variantId === variantId ? { ...item, quantity: Math.max(0, quantity) } : item
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
 * Get cart with details from localStorage
 */
export function getCartWithDetails(): CartItemWithDetails[] {
  const cart = getCart();

  if (typeof window === 'undefined') {
    return cart;
  }

  try {
    const detailsKey = `${CART_STORAGE_KEY}_details`;
    const detailsJson = localStorage.getItem(detailsKey);
    const allDetails: Record<string, any> = detailsJson ? JSON.parse(detailsJson) : {};

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
 * Add item with details to cart
 * Stores both the basic cart item and optional details for display
 */
export function addToCartWithDetails(
  variantId: string,
  quantity: number = 1,
  details?: Partial<Omit<CartItemWithDetails, 'variantId' | 'quantity'>>
): CartItem[] {
  const cart = addToCart(variantId, quantity);

  // Store details in a separate localStorage key if provided
  if (details && typeof window !== 'undefined') {
    try {
      const detailsKey = `${CART_STORAGE_KEY}_details`;
      let allDetails: Record<string, any> = {};

      const existingDetails = localStorage.getItem(detailsKey);
      if (existingDetails) {
        allDetails = JSON.parse(existingDetails);
      }

      allDetails[variantId] = {
        ...allDetails[variantId],
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
 * Remove item from cart and its details
 */
export function removeFromCartWithDetails(variantId: string): CartItem[] {
  const cart = removeFromCart(variantId);

  // Remove details as well
  if (typeof window !== 'undefined') {
    try {
      const detailsKey = `${CART_STORAGE_KEY}_details`;
      const detailsJson = localStorage.getItem(detailsKey);

      if (detailsJson) {
        const allDetails: Record<string, any> = JSON.parse(detailsJson);
        delete allDetails[variantId];
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

/**
 * Get all cart items with their details for syncing with Shopify API
 */
export function getCartItemsForApi(): { variantId: string; quantity: number }[] {
  return getCart().map(item => ({
    variantId: item.variantId,
    quantity: item.quantity
  }));
}