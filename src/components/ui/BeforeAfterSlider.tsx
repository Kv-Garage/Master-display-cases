'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  altText?: string;
  showCallout?: boolean;
  calloutText?: string;
  className?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'BEFORE',
  afterLabel = 'AFTER',
  altText = 'Before and after comparison',
  showCallout = true,
  calloutText = '+30% Avg Order Value Increase Potential',
  className = '',
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percentage);
      }
    },
    []
  );

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchStart = () => setIsDragging(true);
  const handleTouchEnd = () => setIsDragging(false);
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  // Add global event listeners for drag
  useEffect(() => {
    if (isDragging) {
      const handleGlobalMouseMove = (e: MouseEvent) => handleMove(e.clientX);
      const handleGlobalMouseUp = () => setIsDragging(false);
      window.addEventListener('mousemove', handleGlobalMouseMove);
      window.addEventListener('mouseup', handleGlobalMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleGlobalMouseMove);
        window.removeEventListener('mouseup', handleGlobalMouseUp);
      };
    }
  }, [isDragging, handleMove]);

  return (
    <div className={`relative select-none ${className}`}>
      {/* Main Container */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg cursor-ew-resize group"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
        style={{ aspectRatio: '16/9' }}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0">
          <Image
            src={afterImage}
            alt={`${altText} - After`}
            fill
            className="object-cover"
            priority
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Before Image (Clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={beforeImage}
            alt={`${altText} - Before`}
            fill
            className="object-cover"
            priority
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Slider Grip */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center cursor-ew-resize hover:scale-110 transition-transform"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l-3 3 3 3m8-6l3 3-3 3"
              />
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
          {beforeLabel}
        </div>
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider">
          {afterLabel}
        </div>

        {/* Subtitle overlays */}
        <div
          className="absolute bottom-16 left-4 text-white text-xs font-medium uppercase tracking-wider opacity-90"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          Standard Display
        </div>
        <div
          className="absolute bottom-16 right-4 text-white text-xs font-medium uppercase tracking-wider opacity-90"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          Revenue-Boosting RGB Display
        </div>

        {/* Value proposition overlays */}
        <div
          className="absolute bottom-4 left-4 right-1/2 pr-2"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-xs">
            <p className="font-medium">• Products lost on shelves</p>
          </div>
        </div>
        <div
          className="absolute bottom-4 left-1/2 right-4 pl-2"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <div className="bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-white text-xs space-y-1">
            <p className="font-medium">• Increase perceived value</p>
            <p className="font-medium">• Drive impulse purchases</p>
            <p className="font-medium">• Turn displays into profit centers</p>
          </div>
        </div>
      </div>

      {/* Center Callout */}
      {showCallout && calloutText && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <div className="bg-black/80 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-2xl whitespace-nowrap">
            {calloutText}
          </div>
        </div>
      )}

      {/* Progress indicator dots */}
      <div className="flex justify-center mt-4 space-x-2">
        <div
          className={`w-2 h-2 rounded-full transition-all ${
            sliderPosition < 33 ? 'bg-black w-6' : 'bg-gray-300'
          }`}
        />
        <div
          className={`w-2 h-2 rounded-full transition-all ${
            sliderPosition >= 33 && sliderPosition < 66 ? 'bg-black w-6' : 'bg-gray-300'
          }`}
        />
        <div
          className={`w-2 h-2 rounded-full transition-all ${
            sliderPosition >= 66 ? 'bg-black w-6' : 'bg-gray-300'
          }`}
        />
      </div>
    </div>
  );
}