'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { convertToNumericId } from '@/lib/cart-utils';

// Accept partial product data from Shopify (supports both raw and normalized formats)
interface PartialProduct {
  id: string;
  title: string;
  handle: string;
  price?: number;
  variantId?: string; // Real Shopify variant ID for checkout
  // Normalized format
  image?: string;
  // Raw Shopify format (backwards compatibility)
  featuredImage?: {
    url?: string;
    altText?: string;
  };
  images?: any[];
  variants?: Array<{
    id: string;
    title: string;
    price: number;
  }>;
}

interface AddToQuoteButtonProps {
  product: PartialProduct;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function AddToQuoteButton({ product, fullWidth = false, size = 'lg' }: AddToQuoteButtonProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToQuote = () => {
    if (isAdding) return;
    
    setIsAdding(true);
    
    // Get real Shopify variant ID or fall back to manual ID
    const realVariantId = product.variantId || product.variants?.[0]?.id || `manual-${product.id}`;
    const realPrice = product.variants?.[0]?.price || product.price || 0;
    const variantTitle = product.variants?.[0]?.title || 'Default';
    
    // Get image URL - support both normalized (image) and raw (featuredImage) formats
    const imageUrl = product.image || product.featuredImage?.url;
    
    addItem({
      variantId: convertToNumericId(realVariantId),
      productId: product.id,
      title: product.title,
      productHandle: product.handle,
      variantTitle: variantTitle,
      price: realPrice,
      image: imageUrl ? {
        url: imageUrl,
        altText: product.featuredImage?.altText,
      } : undefined,
    });
    
    setIsAdded(true);
    setIsAdding(false);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-base',
  };

  return (
    <button
      onClick={handleAddToQuote}
      disabled={isAdding}
      className={`
        w-full font-medium transition-all duration-200 rounded-lg
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        ${isAdded
          ? 'bg-green-600 text-white'
          : 'bg-black text-white hover:bg-gray-800 active:scale-[0.98]'
        }
        ${isAdding ? 'opacity-70 cursor-wait' : ''}
      `}
    >
      {isAdding ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Adding...
        </span>
      ) : isAdded ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Added to Quote Cart
        </span>
      ) : (
        <span className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add to Quote Cart
        </span>
      )}
    </button>
  );
}