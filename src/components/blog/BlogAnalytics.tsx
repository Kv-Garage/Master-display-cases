'use client';

import { useEffect, useCallback } from 'react';
import {
  setupBlogScrollTracking,
  trackBlogEngagement,
  trackBlogProductClick,
  trackBlogCTAClick,
  trackBlogLeadCapture,
} from '@/components/analytics/AnalyticsProvider';

interface BlogAnalyticsProps {
  blogTitle: string;
  blogHandle: string;
  children: React.ReactNode;
}

// Create a context for blog analytics
import { createContext, useContext } from 'react';

const BlogAnalyticsContext = createContext<{
  trackProductClick: (url: string, name?: string) => void;
  trackCTAClick: (location: string, text: string, url: string) => void;
  trackLeadCapture: (source: 'newsletter' | 'popup' | 'inline', email?: string) => void;
} | null>(null);

export function useBlogAnalyticsContext() {
  const context = useContext(BlogAnalyticsContext);
  if (!context) {
    throw new Error('useBlogAnalyticsContext must be used within BlogAnalytics');
  }
  return context;
}

export default function BlogAnalytics({ blogTitle, blogHandle, children }: BlogAnalyticsProps) {
  // Setup scroll tracking
  useEffect(() => {
    const cleanup = setupBlogScrollTracking({ blogTitle, blogHandle });
    return cleanup;
  }, [blogTitle, blogHandle]);

  // Setup engagement/time tracking
  useEffect(() => {
    const cleanup = trackBlogEngagement({ blogTitle, blogHandle });
    return cleanup;
  }, [blogTitle, blogHandle]);

  // Track product clicks using event delegation
  const handleProductClick = useCallback((e: MouseEvent) => {
    const link = (e.target as Element).closest('a[href*="shopify.com/products"]');
    if (link) {
      const href = link.getAttribute('href') || '';
      const productName = link.textContent?.trim() || '';
      trackBlogProductClick({
        blogTitle,
        blogHandle,
        productUrl: href,
        productName: productName.substring(0, 50),
      });
    }
  }, [blogTitle, blogHandle]);

  // Track CTA clicks using event delegation
  const handleCTAClick = useCallback((e: MouseEvent) => {
    const ctaElement = (e.target as Element).closest('[data-cta-location]');
    if (ctaElement) {
      const location = ctaElement.getAttribute('data-cta-location') as 'top' | 'middle' | 'bottom' | 'inline';
      const text = ctaElement.textContent?.trim() || '';
      const url = (ctaElement as HTMLAnchorElement).href || '';
      
      trackBlogCTAClick({
        blogTitle,
        blogHandle,
        ctaLocation: location,
        ctaText: text.substring(0, 50),
        ctaUrl: url,
      });
    }
  }, [blogTitle, blogHandle]);

  // Attach event listeners for click tracking
  useEffect(() => {
    document.addEventListener('click', handleProductClick);
    document.addEventListener('click', handleCTAClick);
    
    return () => {
      document.removeEventListener('click', handleProductClick);
      document.removeEventListener('click', handleCTAClick);
    };
  }, [handleProductClick, handleCTAClick]);

  const contextValue = {
    trackProductClick: (url: string, name?: string) => 
      trackBlogProductClick({ blogTitle, blogHandle, productUrl: url, productName: name }),
    trackCTAClick: (location: string, text: string, url: string) => 
      trackBlogCTAClick({ 
        blogTitle, 
        blogHandle, 
        ctaLocation: location as 'top' | 'middle' | 'bottom' | 'inline', 
        ctaText: text, 
        ctaUrl: url 
      }),
    trackLeadCapture: (source: 'newsletter' | 'popup' | 'inline', email?: string) => 
      trackBlogLeadCapture({ blogTitle, blogHandle, source, email }),
  };

  return (
    <BlogAnalyticsContext.Provider value={contextValue}>
      {children}
    </BlogAnalyticsContext.Provider>
  );
}

// Helper component for tracked CTA buttons
export function TrackedCTA({
  href,
  children,
  location = 'inline',
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  location?: 'top' | 'middle' | 'bottom' | 'inline';
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta-location={location}
      className={className}
    >
      {children}
    </a>
  );
}