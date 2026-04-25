'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { formatPrice } from '@/lib/shopify';
import { useCart } from '@/lib/cart-context';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'featured';
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const { id, title, handle, price, compareAtPrice, images, variants } = product;
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const mainImage = images[0];
  const hasDiscount = compareAtPrice && compareAtPrice > price;
  const discountPercentage = hasDiscount
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  const handleAddToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Get the first available variant or use product defaults
    const firstVariant = variants.length > 0 ? variants[0] : null;
    
    addItem({
      variantId: firstVariant?.id || `manual-${id}`,
      productId: id,
      title,
      productHandle: handle,
      variantTitle: firstVariant?.title || 'Default',
      price,
      image: mainImage,
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
          {mainImage ? (
            <Image
              src={mainImage.url}
              alt={mainImage.altText || title}
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
          {hasDiscount && discountPercentage > 0 && (
            <div className="absolute top-4 left-4 bg-black text-white text-xs font-semibold uppercase tracking-wider px-3 py-1">
              {discountPercentage}% Off
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
            {hasDiscount && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(compareAtPrice!)}
                </span>
                <span className="text-xs font-medium text-black bg-gray-100 px-2 py-0.5">
                  Save {formatPrice(compareAtPrice! - price)}
                </span>
              </>
            )}
          </div>

          {/* Product Tags */}
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {product.tags.slice(0, 3).map((tag) => (
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