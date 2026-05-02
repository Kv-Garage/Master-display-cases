/**
 * Middleware for Security Headers Only
 * 
 * This middleware runs on every request and adds security headers.
 * 
 * NOTE: Product links to Shopify are now direct and should NOT be intercepted.
 * The previous middleware was incorrectly redirecting all Shopify URLs to homepage,
 * which broke product links in blog posts and other pages.
 * 
 * Product links like https://mraze2-ra.myshopify.com/products/{handle}
 * should pass through directly to Shopify without any interception.
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Main middleware function - only adds security headers
 */
export function middleware(request: NextRequest) {
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