'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/shopify';
import { useCart } from '@/lib/cart-context';
import { useState } from 'react';

// Accept partial product data from Shopify
interface PartialProduct {
  id: string;
  title: string;
  handle: string;
  description?: string;
  price?: number;
  compareAtPrice?: number;
  featuredImage?: {
    url?: string;
    altText?: string;
  };
  images?: {
    edges?: Array<{
      node?: {
        url?: string;
        altText?: string;
      };
    }>;
  };
  priceRange?: {
    minVariantPrice?: {
      amount?: string;
      currencyCode?: string;
    };
  };
  tags?: string[];
  variants?: any[];
}

interface ProductCardProps {
  product: PartialProduct;
  variant?: 'default' | 'featured';
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { id, title, handle, featuredImage, images, priceRange, tags } = product;
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Get image from featuredImage or first image edge
  const mainImageUrl = featuredImage?.url || images?.edges?.[0]?.node?.url;
  const mainImageAlt = featuredImage?.altText || images?.edges?.[0]?.node?.altText || title;
  
  // Get price from priceRange
  const price = priceRange?.minVariantPrice?.amount ? parseFloat(priceRange.minVariantPrice.amount) : 0;
  
  const hasDiscount = false; // No discount info in simplified query

  const handleAddToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      variantId: `manual-${id}`,
      productId: id,
      title,
      productHandle: handle,
      variantTitle: 'Default',
      price,
      image: mainImageUrl ? {
        url: mainImageUrl,
        altText: mainImageAlt,
      } : undefined,
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div
      className={`group ${
        variant === 'featured'
          ? 'bg-gray-50'
          : ''
      }`}
    >
      <Link href={`/products/${handle}`} className="block">
        <div className={`relative overflow-hidden ${
          variant === 'featured' ? 'aspect-[4/3]' : 'aspect-square'
        }`}>
          {mainImageUrl ? (
            <Image
              src={mainImageUrl}
              alt={mainImageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={variant === 'featured'}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No image available</span>
            </div>
          )}

          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-4 left-4 bg-black text-white text-xs font-semibold uppercase tracking-wider px-3 py-1">
              Sale
            </div>
          )}

          {/* Quick Add Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Product Info */}
        <div className="mt-4 space-y-2">
          <h3 className="text-base font-medium text-black group-hover:text-gray-600 transition-colors line-clamp-2">
            {title}
          </h3>

          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-black">
              {formatPrice(price)}
            </span>
          </div>

          {/* Product Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-xs text-gray-500 uppercase tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* Add to Quote Button */}
      <button
        onClick={handleAddToQuote}
        className={`mt-3 w-full py-2 px-4 text-sm font-medium transition-colors ${
          isAdded
            ? 'bg-green-600 text-white'
            : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        {isAdded ? 'Added to Quote' : 'Add to Quote'}
      </button>
    </div>
  );
}

// Skeleton loading state
export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="mt-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );
}