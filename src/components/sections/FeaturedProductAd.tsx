'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface FeaturedProductAdProps {
  variant?: 'default' | 'large' | 'compact';
  className?: string;
}

/**
 * FeaturedProductAd - Reusable component for promoting the 48" LED Retail Wrap Counter (RGB)
 * 
 * This component creates a clickable product ad with hover effects:
 * - Scale: 1.03 on hover
 * - Soft shadow glow effect
 * - Fully responsive
 * - Lazy loaded image
 * - Links to /products/products-48-led-retail-wrap-counter-rgb
 */
export default function FeaturedProductAd({ variant = 'default', className = '' }: FeaturedProductAdProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Product link - the primary conversion target
  const productHref = '/products/products-48-led-retail-wrap-counter-rgb';
  
  // Image path - using the actual Shopify product image for the 48" LED Retail Wrap Counter (RGB)
  // This is the premium product image from Shopify CDN
  const imagePath = 'https://cdn.shopify.com/s/files/1/0779/5893/8724/files/48_WrapCounterwithRGBChasingLights_b0d51023-cc67-4097-9759-a0e80afc8c81.jpg?v=1777059107';

  // Size configurations based on variant
  const sizeConfig = {
    default: {
      container: 'max-w-4xl mx-auto',
      image: { width: 800, height: 450 },
    },
    large: {
      container: 'max-w-5xl mx-auto',
      image: { width: 1000, height: 560 },
    },
    compact: {
      container: 'max-w-2xl mx-auto',
      image: { width: 600, height: 340 },
    },
  };

  const config = sizeConfig[variant];

  return (
    <div className={`featured-product-ad-wrapper ${config.container} ${className}`}>
      <Link 
        href={productHref}
        className="block group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div 
          className="relative overflow-hidden rounded-xl transition-all duration-500 ease-out"
          style={{
            transform: isHovered ? 'scale(1.03)' : 'scale(1)',
            boxShadow: isHovered 
              ? '0 20px 40px -10px rgba(0, 0, 0, 0.15), 0 0 30px rgba(67, 160, 71, 0.1)' 
              : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
          }}
        >
          {/* Image container with aspect ratio */}
          <div className="relative" style={{ aspectRatio: '16/9' }}>
            <Image
              src={imagePath}
              alt="48 inch LED Retail Wrap Counter with RGB Lighting - Premium Display Case for Retail Stores"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              className="object-cover"
              priority={variant === 'large'}
              loading={variant === 'large' ? 'eager' : 'lazy'}
            />
          </div>

          {/* Subtle overlay gradient at bottom for depth */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
      </Link>

      {/* Inline styles for the hover animation */}
      <style jsx>{`
        .featured-product-ad-wrapper {
          padding: 0;
        }
      `}</style>
    </div>
  );
}