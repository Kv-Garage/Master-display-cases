'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { convertToNumericId } from '@/lib/cart-utils';

interface AddToCartButtonProps {
  variantId: string | number;
  productId?: string;
  title: string;
  productHandle?: string;
  variantTitle?: string;
  price: number;
  image?: {
    url: string;
    altText?: string;
  };
  quantity?: number;
  className?: string;
  disabled?: boolean;
  showAddedFeedback?: boolean;
}

export default function AddToCartButton({
  variantId,
  productId,
  title,
  productHandle,
  variantTitle,
  price,
  image,
  quantity = 1,
  className = '',
  disabled = false,
  showAddedFeedback = true,
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled || isAdding) return;

    setIsAdding(true);

    try {
      // Convert variantId to numeric ID
      const numericId = convertToNumericId(variantId);

      addItem({
        variantId: numericId,
        productId,
        title,
        productHandle,
        variantTitle,
        price,
        image,
      });

      if (showAddedFeedback) {
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
      }
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isAdding}
      className={`btn-primary w-full ${className} ${
        added ? 'bg-green-600 hover:bg-green-700' : ''
      }`}
      aria-label={`Add ${title} to cart`}
    >
      {isAdding ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Adding...
        </span>
      ) : added ? (
        <span className="flex items-center justify-center gap-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Added to Cart!
        </span>
      ) : (
        'Add to Cart'
      )}
    </button>
  );
}

// Simple text-only version for inline use
export function AddToCartTextButton({
  variantId,
  title,
  className = '',
}: {
  variantId: string | number;
  title: string;
  className?: string;
}) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAdding) return;
    setIsAdding(true);

    try {
      const numericId = convertToNumericId(variantId);
      addItem({
        variantId: numericId,
        title,
        price: 0,
      });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }

    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <button
      onClick={handleClick}
      disabled={isAdding}
      className={`text-sm font-medium hover:underline ${className} ${
        isAdding ? 'opacity-50' : ''
      }`}
    >
      {isAdding ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}