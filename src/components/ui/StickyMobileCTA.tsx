'use client';

import { useEffect, useState } from 'react';
import { formatPrice } from '@/lib/shopify';

interface StickyMobileCTAProps {
  price: number;
  compareAtPrice?: number;
  productTitle: string;
  productHandle: string;
  variantId?: string;
  productId?: string;
  onBuyNow?: () => void;
}

export default function StickyMobileCTA({
  price,
  compareAtPrice,
  productTitle,
  productHandle,
  variantId,
  productId,
  onBuyNow,
}: StickyMobileCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // Show sticky CTA after scrolling past the main product info
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Show after scrolling 60% of viewport
      setIsVisible(scrollPosition > viewportHeight * 0.6);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleBuyNow = async () => {
    if (onBuyNow) {
      setIsAdding(true);
      await onBuyNow();
      setIsAdding(false);
    } else {
      // Fallback: scroll to configurator
      const configurator = document.getElementById('product-configurator');
      if (configurator) {
        configurator.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  if (!isVisible) return null;

  const hasDiscount = compareAtPrice && compareAtPrice > price;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Gradient fade effect */}
      <div className="absolute -top-8 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      
      {/* CTA Bar */}
      <div className="bg-white border-t border-gray-200 shadow-lg px-4 py-3 safe-area-bottom">
        <div className="flex items-center justify-between gap-3">
          {/* Price Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-black">
                {formatPrice(price)}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(compareAtPrice)}
                  </span>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                    Save {formatPrice(compareAtPrice - price)}
                  </span>
                </>
              )}
            </div>
            <p className="text-xs text-gray-500 truncate mt-0.5">
              {productTitle}
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleBuyNow}
            disabled={isAdding}
            className="flex-shrink-0 bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 active:scale-95 transition-all duration-150 min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAdding ? 'Adding...' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  );
}