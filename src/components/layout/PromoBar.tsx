'use client';

import Link from 'next/link';

/**
 * PromoBar - Thin promotional bar displayed under the header
 * 
 * This component promotes the primary product (48" LED Retail Wrap Counter RGB)
 * with a subtle, non-intrusive banner that drives traffic to the product page.
 * 
 * Design principles:
 * - Thin, minimal bar (not a large image)
 * - Clean text with subtle animation
 * - Clickable entire bar
 * - Premium feel with smooth transitions
 */
export default function PromoBar() {
  return (
    <Link 
      href="/products/products-48-led-retail-wrap-counter-rgb"
      className="block w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden group"
    >
      <div className="container-custom">
        <div className="flex items-center justify-center py-2.5 px-4">
          <div className="flex items-center gap-3">
            {/* Animated arrow icon */}
            <svg 
              className="w-4 h-4 text-green-400 animate-pulse" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 7l5 5m0 0l-5 5m5-5H6" 
              />
            </svg>
            
            {/* Promo text */}
            <span className="text-sm font-medium tracking-wide text-center">
              Upgrade Your Store Setup — View Our{' '}
              <span className="font-semibold text-green-400 group-hover:text-green-300 transition-colors">
                LED Display Counter
              </span>
            </span>

            {/* Right arrow */}
            <svg 
              className="w-4 h-4 text-green-400 group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}