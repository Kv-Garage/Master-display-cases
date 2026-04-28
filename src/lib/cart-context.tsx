'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  getCartWithDetails,
  addToCartWithDetails,
  removeFromCartWithDetails,
  updateCartQuantity,
  clearCartWithDetails,
  buildCheckoutUrl,
  goToCheckout as goToCheckoutUtil,
  buyNow as buyNowUtil,
  convertToNumericId,
  CartItemWithDetails,
} from '@/lib/cart-utils';

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
  checkoutUrl: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  // New utility functions
  goToCheckout: () => void;
  buyNow: (variantId: string | number, quantity?: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItemWithDetails[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = getCartWithDetails();
    setItems(savedCart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    // We don't need to manually save here because the utility functions handle it
    // This effect is just to keep state in sync if needed
  }, [items]);

  const addItem = useCallback((item: Omit<CartItemWithDetails, 'quantity'>) => {
    try {
      // Convert variantId to numeric if needed
      const numericId = convertToNumericId(item.variantId);

      // Add to cart with details
      addToCartWithDetails(numericId, 1, {
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
          (i) => i.variantId === numericId
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
        return [...prevItems, { ...item, variantId: numericId, quantity: 1 }];
      });

      setIsOpen(true);
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  }, []);

  const removeItem = useCallback((variantId: string) => {
    try {
      const numericId = convertToNumericId(variantId);
      removeFromCartWithDetails(numericId);
      setItems((prevItems) => prevItems.filter((i) => i.variantId !== numericId));
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    try {
      const numericId = convertToNumericId(variantId);
      updateCartQuantity(numericId, quantity);

      setItems((prevItems) =>
        prevItems
          .map((i) =>
            i.variantId === numericId ? { ...i, quantity: Math.max(0, quantity) } : i
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

  // Generate checkout URL using utility function
  const checkoutUrl = React.useMemo(() => {
    const url = buildCheckoutUrl();
    return url || '#';
  }, [items]);

  // Wrapper for goToCheckout utility
  const goToCheckout = useCallback(() => {
    goToCheckoutUtil();
  }, []);

  // Wrapper for buyNow utility
  const buyNow = useCallback((variantId: string | number, quantity: number = 1) => {
    buyNowUtil(variantId, quantity);
  }, []);

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
        checkoutUrl,
        isOpen,
        setIsOpen,
        goToCheckout,
        buyNow,
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