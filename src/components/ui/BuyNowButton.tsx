'use client';

import { useState } from 'react';
import { buyNow, convertToNumericId } from '@/lib/cart-utils';

interface BuyNowButtonProps {
  variantId: string | number;
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

    try {
      // Validate variant ID
      convertToNumericId(variantId);
      
      setIsRedirecting(true);
      
      // Small delay to show loading state before redirect
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Use the buyNow function which redirects directly to Shopify checkout
      buyNow(variantId, quantity);
    } catch (error) {
      console.error('Failed to buy now:', error);
      setIsRedirecting(false);
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

// Direct link version (for non-JS environments or SEO)
export function BuyNowLink({
  variantId,
  quantity = 1,
  className = '',
  children = 'Buy Now',
}: BuyNowButtonProps) {
  const numericId = convertToNumericId(variantId);
  // Use the Shopify domain from environment variable - NO fallback
  const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
  if (!shopifyDomain) {
    console.error('NEXT_PUBLIC_SHOPIFY_DOMAIN environment variable is not set');
    return null;
  }
  const checkoutUrl = `https://${shopifyDomain}/cart/${numericId}:${quantity}`;

  return (
    <a
      href={checkoutUrl}
      className={`inline-block ${className}`}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
