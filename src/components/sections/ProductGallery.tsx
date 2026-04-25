'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductImage {
  id: string;
  url: string;
  altText?: string | null;
  width: number;
  height: number;
}

// Format price helper (duplicated here to avoid passing function to client component)
function formatPrice(price: number, currencyCode = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

interface ProductGalleryProps {
  images: ProductImage[];
  title: string;
  hasDiscount: boolean;
  compareAtPrice?: number;
  price: number;
}

export default function ProductGallery({
  images,
  title,
  hasDiscount,
  compareAtPrice,
  price,
}: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const mainImage = images[0];

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <div className="flex items-center justify-center h-full text-gray-400">
          No images available
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-zoom-in" onClick={() => setIsZoomed(true)}>
        <Image
          src={images[activeImage].url}
          alt={images[activeImage].altText || title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
          priority
        />
        
        {/* Discount Badge */}
        {hasDiscount && activeImage === 0 && (
          <div className="absolute top-4 left-4 bg-black text-white text-xs font-semibold uppercase tracking-wider px-3 py-1">
            Save {formatPrice(compareAtPrice! - price)}
          </div>
        )}

        {/* Zoom indicator */}
        <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 text-xs rounded-full">
          Click to zoom
        </div>
      </div>

      {/* Thumbnail Grid - Show ALL images */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {images.map((image, index) => (
            <button
              key={image.id || `img-${index}`}
              onClick={() => setActiveImage(index)}
              className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden transition-all duration-200 ${
                activeImage === index
                  ? 'ring-2 ring-black ring-offset-2'
                  : 'hover:opacity-80'
              }`}
            >
              <Image
                src={image.url}
                alt={image.altText || `${title} view ${index + 1}`}
                fill
                sizes="25vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image Counter */}
      {images.length > 1 && (
        <div className="text-center text-sm text-gray-500">
          {activeImage + 1} of {images.length} images
        </div>
      )}

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            onClick={() => setIsZoomed(false)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation */}
          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
                }}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
                }}
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Zoomed Image */}
          <div className="relative max-w-5xl max-h-[90vh] w-full">
            <Image
              src={images[activeImage].url}
              alt={images[activeImage].altText || title}
              width={1200}
              height={1200}
              className="object-contain max-h-[90vh] mx-auto"
            />
            
            {/* Image counter in modal */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                {activeImage + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}