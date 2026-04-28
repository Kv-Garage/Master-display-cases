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
  compareAtPrice?: number | null;
  price: number;
  description?: string;
  productType?: string;
  variants?: Array<{ title: string; price: number }>;
}

const BENEFIT_BULLETS = [
  'Increases perceived value 25–40%',
  'Drives impulse purchases',
  'Built for high-traffic retail',
  'Commercial-grade tempered glass',
];

// Extract specifications from description or use defaults
function extractSpecifications(description: string, productType?: string) {
  const specs: { label: string; value: string }[] = [];
  
  // Try to extract from description (strip HTML tags first)
  const plainText = description?.replace(/<[^>]+>/g, '') || '';
  
  const dimensionMatch = plainText.match(/(\d+)\s*[xX×]\s*(\d+)\s*[xX×]\s*(\d+)/);
  if (dimensionMatch) {
    specs.push({ label: 'Dimensions', value: `${dimensionMatch[1]}" W × ${dimensionMatch[2]}" H × ${dimensionMatch[3]}" D` });
  }
  
  // Add material info if found
  if (plainText.toLowerCase().includes('tempered glass')) {
    specs.push({ label: 'Material', value: 'Tempered glass, aluminum frame' });
  }
  
  // Add lighting info if found
  if (plainText.toLowerCase().includes('rgb') || plainText.toLowerCase().includes('led')) {
    specs.push({ label: 'Lighting', value: 'Integrated RGB LED system' });
  }
  
  // Add assembly info if found
  if (plainText.toLowerCase().includes('knockdown') || plainText.toLowerCase().includes('kd')) {
    specs.push({ label: 'Assembly', value: 'Knockdown (KD) - easy assembly' });
  } else if (plainText.toLowerCase().includes('pre-assembled') || plainText.toLowerCase().includes('preassembled')) {
    specs.push({ label: 'Assembly', value: 'Pre-assembled' });
  }
  
  // Default specs based on product type
  if (specs.length === 0) {
    if (productType?.toLowerCase().includes('counter') || productType?.toLowerCase().includes('showcase')) {
      specs.push(
        { label: 'Type', value: 'Countertop Display Case' },
        { label: 'Material', value: 'Tempered glass, aluminum frame' },
        { label: 'Lighting', value: 'Integrated LED system' },
        { label: 'Lock', value: 'Keyed lock with 2 keys' },
        { label: 'Assembly', value: 'Knockdown (KD) - easy assembly' }
      );
    } else if (productType?.toLowerCase().includes('floor') || productType?.toLowerCase().includes('tower')) {
      specs.push(
        { label: 'Type', value: 'Floor Standing Display' },
        { label: 'Material', value: 'Tempered glass, steel frame' },
        { label: 'Lighting', value: 'RGB LED with remote' },
        { label: 'Shelves', value: 'Adjustable glass shelves' },
        { label: 'Assembly', value: 'Knockdown (KD) - easy assembly' }
      );
    } else {
      specs.push(
        { label: 'Material', value: 'Commercial-grade tempered glass' },
        { label: 'Frame', value: 'Aluminum with black finish' },
        { label: 'Lighting', value: 'LED illumination' },
        { label: 'Security', value: 'Lockable doors with keys' },
        { label: 'Assembly', value: 'Knockdown (KD) - hardware included' }
      );
    }
  }
  
  return specs;
}

// Component to safely render HTML description from Shopify
function ProductDescription({ html }: { html: string }) {
  return (
    <div 
      className="product-description text-sm text-gray-600 leading-relaxed"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function ProductGallery({
  images,
  title,
  hasDiscount,
  compareAtPrice,
  price,
  description,
  productType,
  variants,
}: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Extract specifications
  const specifications = extractSpecifications(description || '', productType);

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
    <div className="space-y-5">
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

      {/* Thumbnail Grid */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={image.id || `img-${index}`}
              onClick={() => setActiveImage(index)}
              className={`relative aspect-square bg-gray-100 rounded-md overflow-hidden transition-all duration-200 ${
                activeImage === index
                  ? 'ring-2 ring-black ring-offset-1'
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

      {/* Benefit Bullets */}
      <div className="pt-2">
        <h3 className="text-sm font-semibold text-black mb-3">Key Benefits</h3>
        <ul className="space-y-2">
          {BENEFIT_BULLETS.map((benefit, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
              <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Product Description - Render full HTML from Shopify */}
      {description && (
        <div className="pt-3 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-black mb-2">Description</h3>
          <ProductDescription html={description} />
        </div>
      )}

      {/* Specifications */}
      <div className="pt-3 border-t border-gray-100">
        <h3 className="text-sm font-semibold text-black mb-3">Specifications</h3>
        <div className="grid grid-cols-2 gap-2">
          {specifications.map((spec, i) => (
            <div key={i} className="flex flex-col p-2 bg-gray-50 rounded-md">
              <span className="text-[10px] text-gray-500 uppercase tracking-wide">{spec.label}</span>
              <span className="text-sm text-black font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Variant Options */}
      {variants && variants.length > 1 && (
        <div className="pt-3 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-black mb-2">Available Options</h3>
          <div className="flex flex-wrap gap-2">
            {variants.map((variant, i) => (
              <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                {variant.title} - ${variant.price.toLocaleString()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Money-Making Line */}
      <div className="pt-2">
        <div className="bg-green-50 rounded-md p-3 border border-green-100">
          <p className="text-sm font-medium text-black">
            💰 Most stores recover this investment in <strong>30–60 days</strong> through increased visibility and impulse sales.
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Designed for smoke shops, boutiques, electronics stores, and high-traffic retail environments.
          </p>
        </div>
      </div>

      {/* Zoom Modal - Full screen display */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setIsZoomed(false)}
        >
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-all duration-200 p-2 rounded-full hover:bg-white/10 z-10"
            onClick={() => setIsZoomed(false)}
            aria-label="Close zoom"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all duration-200 p-3 rounded-full hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage((prev) => (prev > 0 ? prev - 1 : images.length - 1));
                }}
                aria-label="Previous image"
              >
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all duration-200 p-3 rounded-full hover:bg-white/10"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage((prev) => (prev < images.length - 1 ? prev + 1 : 0));
                }}
                aria-label="Next image"
              >
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Image container - Full screen display */}
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={images[activeImage].url}
              alt={images[activeImage].altText || title}
              fill
              className="object-contain"
              style={{
                objectPosition: 'center',
              }}
              priority
              sizes="100vw"
              quality={95}
            />
            {images.length > 1 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                {activeImage + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}