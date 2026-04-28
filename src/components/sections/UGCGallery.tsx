'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface UGCImage {
  src: string;
  alt: string;
  caption: string;
  scene: string;
  objectPosition?: string;
  scale?: number;
}

const UGC_IMAGES: UGCImage[] = [
  {
    src: '/processed/Vape store Display UGC -gallery.jpg',
    alt: 'Store owner behind counter with display case',
    caption: 'Real store setup',
    scene: 'Owner POV',
    // Crop top 8% to remove any AI watermark, natural perspective
    objectPosition: 'center 8%',
    scale: 0.92,
  },
  {
    src: '/processed/Vape Shop Display UGC cotent-gallery.jpg',
    alt: 'Customer viewing display case in store',
    caption: 'Customer engagement',
    scene: 'Customer POV',
    // Crop top 8% to remove any AI watermark, natural perspective
    objectPosition: 'center 8%',
    scale: 0.92,
  },
  {
    src: '/processed/In-store Shop Display 2-gallery.jpg',
    alt: 'Clean store display with product case',
    caption: 'Premium retail environment',
    scene: 'Store Shot',
    // Light crop to preserve full product context, remove top artifacts
    objectPosition: 'center 6%',
    scale: 0.94,
  },
  {
    src: '/processed/UGC content-gallery.jpg',
    alt: 'Close-up interaction with display case',
    caption: 'Detail view',
    scene: 'Close Interaction',
    // Crop top 10% to remove watermark, maintain natural framing
    objectPosition: 'center 10%',
    scale: 0.90,
  },
];

export default function UGCGallery() {
  const [activeImage, setActiveImage] = useState<number | null>(null);

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-black mb-2">
            Seen in Stores Like Yours
          </h2>
          <p className="text-sm text-gray-600 max-w-2xl mx-auto">
            Real retailers trust our display cases to elevate their products and drive sales.
          </p>
        </div>

        {/* Main Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {UGC_IMAGES.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              <div 
                className="absolute inset-0 overflow-hidden"
                style={{
                  transform: `scale(${image.scale || 1})`,
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  style={{
                    objectPosition: image.objectPosition || 'center',
                  }}
                />
              </div>
              
              {/* Scene Label */}
              <div className="absolute top-3 left-3 bg-black/80 text-white text-[10px] font-medium px-2 py-1 rounded uppercase tracking-wider">
                {image.scene}
              </div>
              
              {/* Caption on hover */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <p className="text-white text-xs font-medium">{image.caption}</p>
              </div>

              {/* Click to zoom indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="bg-white/90 rounded-full p-2">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-xs text-gray-600 font-medium">
              Trusted by 500+ retail stores nationwide
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeImage !== null && (
        <Lightbox
          images={UGC_IMAGES}
          activeIndex={activeImage}
          onClose={() => setActiveImage(null)}
          onPrevious={() => setActiveImage((prev) => (prev !== null && prev > 0 ? prev - 1 : UGC_IMAGES.length - 1))}
          onNext={() => setActiveImage((prev) => (prev !== null && prev < UGC_IMAGES.length - 1 ? prev + 1 : 0))}
        />
      )}
    </section>
  );
}

// Lightbox Component for premium image viewing experience
// Forces maximum viewport scaling - image takes up 90-95% of screen
function Lightbox({
  images,
  activeIndex,
  onClose,
  onPrevious,
  onNext,
}: {
  images: UGCImage[];
  activeIndex: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);

  // Fade-in animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Handle ESC key to close
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onPrevious();
      } else if (e.key === 'ArrowRight') {
        onNext();
      }
    },
    [onClose, onPrevious, onNext]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  // Handle click on overlay (not on image or controls)
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const currentImage = images[activeIndex];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${activeIndex + 1} of ${images.length}: ${currentImage.alt}`}
    >
      {/* Close button - minimal and modern */}
      <button
        className="absolute top-6 right-6 z-10 text-white/60 hover:text-white transition-all duration-200 p-2 rounded-full hover:bg-white/10"
        onClick={onClose}
        aria-label="Close lightbox"
        style={{ minWidth: '44px', minHeight: '44px' }}
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation arrows - subtle but visible */}
      {images.length > 1 && (
        <>
          <button
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 text-white/50 hover:text-white transition-all duration-200 p-3 rounded-full hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            aria-label="Previous image"
            style={{ minWidth: '48px', minHeight: '48px' }}
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 text-white/50 hover:text-white transition-all duration-200 p-3 rounded-full hover:bg-white/10"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next image"
            style={{ minWidth: '48px', minHeight: '48px' }}
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* 
        Image container - FULL SCREEN DISPLAY
        - Image fills the viewport while maintaining aspect ratio
        - Uses object-fit: contain for proper scaling
        - Minimal padding for clean presentation
      */}
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          fill
          className="object-contain"
          style={{
            objectPosition: 'center',
          }}
          priority
          sizes="100vw"
          quality={95}
        />
      </div>

      {/* Caption and info bar at bottom - minimal */}
      <div
        className={`absolute bottom-0 left-0 right-0 py-4 px-6 text-center transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)' }}
      >
        <p className="text-white text-base font-medium tracking-wide">{currentImage.caption}</p>
        <div className="flex items-center justify-center gap-3 mt-1.5">
          <span className="text-white/50 text-xs uppercase tracking-widest">{currentImage.scene}</span>
          <span className="text-white/30 text-xs">•</span>
          <span className="text-white/50 text-xs font-mono">
            {String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}
