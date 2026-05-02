'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  getCartWithDetails,
  addToCartWithDetails,
  removeFromCartWithDetails,
  updateCartQuantity,
  clearCartWithDetails,
  getCartItemsForApi,
  CartItemWithDetails,
} from '@/lib/cart-utils';
import { createCart, addToCart as apiAddToCart } from '@/lib/cart';
import { buyNow } from '@/lib/buy-now';
import { getCheckoutUrl, STOREFRONT_URL, interceptShopifyRedirect } from '@/lib/checkout';

// Re-export types for compatibility
export type { CartItemWithDetails as CartItem };

interface CartContextType {
  items: CartItemWithDetails[];
  addItem: (item: Omit<CartItemWithDetails, 'quantity'>) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  // Checkout functions
  goToCheckout: () => Promise<void>;
  buyNowItem: (variantId: string) => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItemWithDetails[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = getCartWithDetails();
    setItems(savedCart);
  }, []);

  const addItem = useCallback((item: Omit<CartItemWithDetails, 'quantity'>) => {
    try {
      // Ensure variantId is a string (full GID format)
      const variantId = String(item.variantId);

      // Add to local cart with details
      addToCartWithDetails(variantId, 1, {
        title: item.title,
        variantTitle: item.variantTitle,
        price: item.price,
        image: item.image,
        productHandle: item.productHandle,
        productId: item.productId,
      });

      // Update local state
      setItems((prevItems) => {
        const existingIndex = prevItems.findIndex(
          (i) => i.variantId === variantId
        );

        if (existingIndex !== -1) {
          // Update existing item with new details and increased quantity
          const updatedItems = [...prevItems];
          updatedItems[existingIndex] = {
            ...updatedItems[existingIndex],
            ...item,
            quantity: updatedItems[existingIndex].quantity + 1,
          };
          return updatedItems;
        }

        // Add new item
        return [...prevItems, { ...item, variantId, quantity: 1 }];
      });

      setIsOpen(true);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  }, []);

  const removeItem = useCallback((variantId: string) => {
    try {
      const id = String(variantId);
      removeFromCartWithDetails(id);
      setItems((prevItems) => prevItems.filter((i) => i.variantId !== id));
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    try {
      const id = String(variantId);
      updateCartQuantity(id, quantity);

      setItems((prevItems) =>
        prevItems
          .map((i) =>
            i.variantId === id ? { ...i, quantity: Math.max(0, quantity) } : i
          )
          .filter((i) => i.quantity > 0)
      );
    } catch (error) {
      console.error('Failed to update quantity:', error);
    }
  }, []);

  const clearCart = useCallback(() => {
    clearCartWithDetails();
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  /**
   * Go to checkout using Shopify Storefront API
   * Creates a cart, adds all items, and redirects to checkoutUrl ONLY
   * NO /cart/ URLs - uses Shopify's checkoutUrl from API response
   * 
   * IMPORTANT: After checkout completion, user will be redirected back to
   * masterdisplaycases.com/thank-you via the checkout redirect parameter
   */
  const goToCheckout = useCallback(async () => {
    const cartItems = getCartItemsForApi();
    
    if (cartItems.length === 0) {
      console.error('[Checkout] Cart is empty');
      alert('Your cart is empty.');
      return;
    }

    if (isCheckingOut) {
      console.log('[Checkout] Already processing checkout');
      return;
    }

    try {
      setIsCheckingOut(true);
      console.log('🛒 Creating Shopify cart...');

      // Create a new cart via Shopify API
      const shopifyCart = await createCart();

      if (!shopifyCart?.id) {
        console.error('❌ Cart creation failed:', shopifyCart);
        alert('Unable to create cart. Please try again.');
        setIsCheckingOut(false);
        return;
      }

      console.log('✅ Cart created:', shopifyCart.id);

      // Validate and add all items to the cart
      for (const item of cartItems) {
        // Validate variant ID format before adding
        if (!item.variantId || !item.variantId.includes('ProductVariant')) {
          console.error('❌ Invalid variant ID:', item.variantId);
          console.error('   Expected: gid://shopify/ProductVariant/XXXX');
          console.error('   Item:', item);
          continue;
        }
        console.log(`➕ Adding ${item.quantity}x variant ${item.variantId}`);
        await apiAddToCart(shopifyCart.id, item.variantId, item.quantity);
      }

      console.log('✅ All items added to cart');

      // Get the updated cart with checkoutUrl
      const updatedCart = shopifyCart;
      
      if (!updatedCart?.checkoutUrl) {
        console.error('❌ Checkout URL missing');
        console.error('   Cart:', updatedCart);
        alert('Unable to proceed to checkout. Please try again.');
        setIsCheckingOut(false);
        return;
      }

      // Get the properly configured checkout URL with redirect parameters
      const checkoutUrl = getCheckoutUrl(updatedCart.checkoutUrl);
      console.log('🚀 CHECKOUT URL:', checkoutUrl);

      // Store cart items in localStorage for post-checkout reference
      // This helps us show order details on the thank you page
      try {
        localStorage.setItem('last_order', JSON.stringify({
          items: items, // Use the full items array with details
          timestamp: Date.now(),
          total: totalPrice, // Use the already calculated totalPrice
        }));
      } catch (e) {
        console.warn('Could not store order details:', e);
      }

      // Clear local cart since we've moved to Shopify
      clearCart();

      // Redirect to Shopify checkout
      // The URL includes redirect parameters to return to masterdisplaycases.com/thank-you
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('❌ Checkout failed:', error);
      alert('Checkout failed. Please try again.');
      setIsCheckingOut(false);
    }
  }, [isCheckingOut, clearCart]);

  /**
   * Buy now - creates cart with single item and redirects to checkout
   * Uses the same redirect logic as goToCheckout to ensure user returns
   * to masterdisplaycases.com after checkout
   */
  const buyNowItem = useCallback(async (variantId: string) => {
    // Validate variant ID format
    if (!variantId || !variantId.includes('ProductVariant')) {
      console.error('❌ INVALID VARIANT ID:', variantId);
      console.error('   Expected format: gid://shopify/ProductVariant/XXXX');
      alert('Invalid product variant. Please try again.');
      return;
    }

    if (isCheckingOut) {
      console.log('[Buy Now] Already processing checkout');
      return;
    }

    try {
      setIsCheckingOut(true);
      console.log('🚀 Buy Now initiated for variant:', variantId);

      // Create a new cart
      const cart = await createCart();

      if (!cart?.id) {
        console.error('❌ Cart creation failed');
        alert('Unable to create cart. Please try again.');
        setIsCheckingOut(false);
        return;
      }

      console.log('✅ Cart created:', cart.id);

      // Add item to cart
      const updated = await apiAddToCart(cart.id, variantId, 1);

      if (!updated?.checkoutUrl) {
        console.error('❌ Checkout URL missing');
        alert('Unable to proceed to checkout. Please try again.');
        setIsCheckingOut(false);
        return;
      }

      // Get the properly configured checkout URL with redirect parameters
      const checkoutUrl = getCheckoutUrl(updated.checkoutUrl);
      console.log('🚀 REDIRECTING:', checkoutUrl);

      // Store item details for post-checkout reference
      try {
        localStorage.setItem('last_order', JSON.stringify({
          items: [{ variantId, quantity: 1 }],
          timestamp: Date.now(),
          isBuyNow: true,
        }));
      } catch (e) {
        console.warn('Could not store order details:', e);
      }

      // Clear local cart
      clearCart();

      // Redirect to Shopify checkout
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error('❌ Buy Now failed:', err);
      alert('Checkout failed. Please try again.');
      setIsCheckingOut(false);
    }
  }, [isCheckingOut, clearCart, apiAddToCart]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        setIsOpen,
        goToCheckout,
        buyNowItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}