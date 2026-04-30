'use client';

import { useState } from 'react';
import { buyNow } from '@/lib/buy-now';

interface BuyNowButtonProps {
  variantId: string; // Must be full GID format: gid://shopify/ProductVariant/123456789
  quantity?: number;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

export default function BuyNowButton({
  variantId,
  quantity = 1,
  className = '',
  disabled = false,
  children = 'Buy Now',
}: BuyNowButtonProps) {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled || isRedirecting) return;

    // Validate variant ID format
    if (!variantId || typeof variantId !== 'string') {
      console.error('[BuyNowButton] Invalid variant ID:', variantId);
      alert('Unable to process purchase. Please try again.');
      return;
    }

    try {
      setIsRedirecting(true);
      
      // Small delay to show loading state before redirect
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Use the new buyNow function that uses Shopify Storefront API
      await buyNow(variantId);
    } catch (error) {
      console.error('Failed to buy now:', error);
      setIsRedirecting(false);
      alert('Checkout failed. Please try again.');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isRedirecting}
      className={`btn-secondary w-full ${className} ${
        isRedirecting ? 'opacity-50 cursor-wait' : ''
      }`}
      aria-label="Buy now and go to checkout"
    >
      {isRedirecting ? (
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
          Redirecting...
        </span>
      ) : (
        children
      )}
    </button>
  );
}

// Express checkout button variant (e.g., for product pages)
export function ExpressCheckoutButton({
  variantId,
  quantity = 1,
  className = '',
  disabled = false,
}: BuyNowButtonProps) {
  return (
    <BuyNowButton
      variantId={variantId}
      quantity={quantity}
      className={`bg-green-600 hover:bg-green-700 text-white ${className}`}
      disabled={disabled}
    >
      Express Checkout
    </BuyNowButton>
  );
}

// Note: BuyNowLink has been removed as it used manual URL building
// All buy now functionality now uses the Shopify Storefront API