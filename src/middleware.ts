/**
 * Middleware for Security Headers and Product URL Fixes
 * 
 * This middleware runs on every request and:
 * 1. Adds security headers
 * 2. Redirects product URLs missing the 'products-' prefix to the correct format
 * 
 * NOTE: Product links to Shopify are now direct and should NOT be intercepted.
 * Product links like https://mraze2-ra.myshopify.com/products/{handle}
 * should pass through directly to Shopify without any interception.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Main middleware function - adds security headers and fixes product URLs
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Fix product URLs that are missing the 'products-' prefix
  // e.g., /products/70-led-retail-display-showcase-rgb -> /products/products-70-led-retail-display-showcase-rgb
  if (pathname.startsWith('/products/') && pathname !== '/products/') {
    const slug = pathname.replace('/products/', '');
    
    // Check if slug is missing the 'products-' prefix
    if (!slug.startsWith('products-') && slug !== 'led-retail-display-showcase') {
      // Redirect to the correct URL with 'products-' prefix
      const correctPath = `/products/products-${slug}`;
      return NextResponse.redirect(new URL(correctPath, request.url));
    }
  }
  
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}

/**
 * Configure which paths the middleware should run on
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};