'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { generateCheckoutUrl } from '@/lib/shopify';

export interface CartItem {
  variantId: string;
  productId: string;
  title: string;
  productHandle: string;
  variantTitle: string;
  price: number;
  quantity: number;
  image?: {
    url: string;
    altText?: string;
  };
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  checkoutUrl: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to load cart from localStorage:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.variantId === item.variantId
      );

      if (existingItem) {
        return prevItems.map((i) =>
          i.variantId === item.variantId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prevItems, { ...item, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((variantId: string) => {
    setItems((prevItems) => prevItems.filter((i) => i.variantId !== variantId));
  }, []);

  const updateQuantity = useCallback((variantId: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems
        .map((i) =>
          i.variantId === variantId ? { ...i, quantity: Math.max(0, quantity) } : i
        )
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Generate Shopify checkout URL
  const checkoutUrl = React.useMemo(() => {
    if (items.length === 0) return '#';
    
    const variantLine = items
      .map((item) => `${item.variantId}:${item.quantity}`)
      .join(',');
    
    return `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/cart/${variantLine}`;
  }, [items]);

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