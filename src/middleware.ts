/**
 * Middleware for Domain Redirect Interception
 * 
 * This middleware runs on every request and:
 * 1. Intercepts any redirects to Shopify domains (except checkout)
 * 2. Ensures all navigation stays on masterdisplaycases.com
 * 3. Handles post-checkout redirects back to the storefront
 * 
 * IMPORTANT: This middleware CANNOT intercept redirects that happen
 * client-side (e.g., window.location.href changes). For those,
 * see the client-side interceptors in src/lib/checkout.ts
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Domains to intercept and redirect back to storefront
const SHOPIFY_DOMAINS = [
  'mraze2-ra.myshopify.com',
  'masterdisplaycases.myshopify.com',
];

// Paths that are allowed to redirect to Shopify (checkout paths)
const ALLOWED_SHOPIFY_PATHS = [
  '/checkouts/',
  '/cart/',
];

// The custom storefront domain
const STOREFRONT_DOMAIN = 'masterdisplaycases.com';
const STOREFRONT_URL = `https://${STOREFRONT_DOMAIN}`;

/**
 * Check if a URL should be allowed to redirect to Shopify
 */
function isAllowedShopifyRedirect(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const isShopifyDomain = SHOPIFY_DOMAINS.some(d => urlObj.hostname.includes(d));
    
    if (!isShopifyDomain) return false;
    
    // Allow checkout and cart paths
    return ALLOWED_SHOPIFY_PATHS.some(path => urlObj.pathname.includes(path));
  } catch {
    return false;
  }
}

/**
 * Check if a URL is a Shopify domain that should be intercepted
 */
function shouldInterceptRedirect(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const isShopifyDomain = SHOPIFY_DOMAINS.some(d => urlObj.hostname.includes(d));
    
    // Don't intercept if it's an allowed path (checkout/cart)
    if (isAllowedShopifyRedirect(url)) return false;
    
    return isShopifyDomain;
  } catch {
    return false;
  }
}

/**
 * Main middleware function
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Check the Referer header for Shopify domains (indicates user came from checkout)
  const referer = request.headers.get('referer');
  if (referer && shouldInterceptRedirect(referer)) {
    // User is coming from a Shopify page that's not checkout
    // Redirect them to the storefront
    console.log('🔄 Middleware intercepting referer:', referer);
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // Check for Shopify redirect attempts in the request URL
  const url = request.url;
  if (shouldInterceptRedirect(url)) {
    console.log('🔄 Middleware intercepting URL:', url);
    return NextResponse.redirect(new URL('/', request.url));
  }
  
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