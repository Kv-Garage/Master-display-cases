'use client';

import Link from 'next/link';
import Image from 'next/image';
import { formatPrice } from '@/lib/shopify';
import { useCart } from '@/lib/cart-context';
import { useState } from 'react';

// Accept partial product data from Shopify (supports both raw and normalized formats)
interface PartialProduct {
  id: string;
  title: string;
  handle: string;
  description?: string;
  // Normalized format
  price?: number;
  minPrice?: number;
  maxPrice?: number;
  compareAtPrice?: number | null;
  variantId?: string; // Real Shopify variant ID for checkout
  image?: string;
  images?: Array<{
    url?: string;
    altText?: string;
    width?: number;
    height?: number;
  }>;
  // Raw Shopify format (backwards compatibility)
  featuredImage?: {
    url?: string;
    altText?: string;
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
  const { id, title, handle, tags } = product;
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Get image - support both normalized (image, images[]) and raw (featuredImage, images.edges[].node) formats
  const mainImageUrl = product.image || 
                       product.featuredImage?.url || 
                       product.images?.[0]?.url || 
                       (product.images as any)?.edges?.[0]?.node?.url;
  const mainImageAlt = product.featuredImage?.altText || 
                       product.images?.[0]?.altText || 
                       (product.images as any)?.edges?.[0]?.node?.altText || 
                       title;
  
  // Get price - prioritize minPrice from priceRange, then price, then parse from priceRange
  const price = product.minPrice || product.price || 
                (product.priceRange?.minVariantPrice?.amount ? parseFloat(product.priceRange.minVariantPrice.amount) : 0);
  const maxPrice = product.maxPrice || product.price || 0;
  const hasPriceRange = maxPrice > price && maxPrice > 0;
  
  // Check for discount
  const compareAtPrice = product.compareAtPrice;
  const hasDiscount = compareAtPrice && compareAtPrice > price;

  const handleAddToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get real Shopify variant ID - prefer direct variantId, then variants array
    const realVariantId = product.variantId || product.variants?.[0]?.id;
    if (!realVariantId) {
      console.warn('No variant ID available for product:', title);
      return;
    }
    
    const variantTitle = product.variants?.[0]?.title || 'Default';
    
    addItem({
      variantId: realVariantId,
      productId: id,
      title,
      productHandle: handle,
      variantTitle: variantTitle,
      price,
      image: mainImageUrl ? {
        url: mainImageUrl,
        altText: mainImageAlt,
      } : undefined,
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const realVariantId = product.variantId || product.variants?.[0]?.id;
    if (!realVariantId) {
      console.warn('No variant ID available for Buy Now:', title);
      return;
    }
    
    // Use the new buyNow function from buy-now.ts
    import('@/lib/buy-now').then(({ buyNow }) => {
      buyNow(realVariantId);
    });
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

      {/* Action Buttons */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          onClick={handleAddToQuote}
          className={`py-2 px-3 text-xs font-medium transition-colors rounded ${
            isAdded
              ? 'bg-green-600 text-white'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          {isAdded ? 'Added' : 'Add to Quote'}
        </button>
        <button
          onClick={handleBuyNow}
          className="py-2 px-3 text-xs font-medium transition-colors bg-green-600 text-white hover:bg-green-700 rounded"
        >
          Buy Now
        </button>
      </div>
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