'use client';

import { useEffect, useState } from 'react';

/**
 * RobotsMeta Component
 * 
 * Conditionally adds robots meta tags based on the current domain.
 * - myshopify.com domains: noindex, nofollow (to prevent duplicate indexing)
 * - Main domain (masterdisplaycases.com): index, follow (default from layout metadata)
 * 
 * This ensures only the primary domain gets indexed by Google,
 * preventing SEO issues from duplicate content on the Shopify subdomain.
 */
export default function RobotsMeta() {
  const [isShopifyDomain, setIsShopifyDomain] = useState(false);

  useEffect(() => {
    // Check if we're on a myshopify.com domain
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      const isShopify = hostname.includes('myshopify.com');
      setIsShopifyDomain(isShopify);
    }
  }, []);

  // If on Shopify domain, inject noindex meta tag
  if (isShopifyDomain) {
    return (
      <>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex, nofollow" />
      </>
    );
  }

  // Main domain - no additional meta needed (handled by layout.tsx metadata)
  return null;
}