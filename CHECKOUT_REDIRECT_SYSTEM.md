# Checkout Redirect Control System

## Overview

This document explains how the headless Shopify storefront ensures all checkout and post-checkout behavior stays within the custom frontend domain (`masterdisplaycases.com`) and eliminates redirects to the default Shopify storefront.

## Architecture

### Domain Configuration

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DOMAIN ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  API Domain:        mraze2-ra.myshopify.com                         │
│  (Storefront API)   Used for: Product data, cart mutations          │
│                                                                      │
│  Checkout Domain:   mraze2-ra.myshopify.com                         │
│  (Shopify Hosted)   Used for: Payment processing                    │
│                                                                      │
│  Storefront Domain: masterdisplaycases.com                          │
│  (Custom Frontend)  Used for: Browsing, post-checkout return        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Key Files

| File | Purpose |
|------|---------|
| `src/lib/checkout.ts` | Core checkout URL management and redirect logic |
| `src/lib/guardDomain.ts` | Runtime domain validation and failsafe handling |
| `src/middleware.ts` | Server-side redirect interception |
| `src/lib/cart-context.tsx` | Cart provider with checkout redirect integration |
| `src/lib/buy-now.ts` | Buy Now functionality with redirect handling |
| `src/lib/cart.ts` | Shopify cart API with URL normalization |
| `src/app/thank-you/page.tsx` | Post-checkout thank you page |

## How It Works

### 1. Checkout URL Generation

When a user proceeds to checkout, the system:

1. Creates a cart via Shopify Storefront API
2. Adds all items to the cart
3. Receives a `checkoutUrl` from Shopify (e.g., `https://mraze2-ra.myshopify.com/checkouts/abc123`)
4. **Appends redirect parameters** to ensure post-checkout return to custom domain

```typescript
// src/lib/checkout.ts
export function getCheckoutUrl(checkoutUrl: string): string {
  // Normalize the URL first
  let url = normalizeCheckoutUrl(checkoutUrl);
  
  // Append our custom redirect for post-checkout
  url = appendCheckoutRedirect(url);
  
  return url;
}

export function appendCheckoutRedirect(url: string, orderId?: string): string {
  const redirectUrl = getPostCheckoutRedirectUrl(orderId);
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}checkout%5Bredirect_to%5D%5Bsuccess%5D=${encodeURIComponent(redirectUrl)}`;
}
```

### 2. Post-Checkout Redirect

Shopify supports the `checkout[redirect_to][success]` parameter, which redirects users back to your site after successful payment:

```
https://mraze2-ra.myshopify.com/checkouts/abc123?checkout%5Bredirect_to%5D%5Bsuccess%5D=https%3A%2F%2Fmasterdisplaycases.com%2Fthank-you
```

After payment, Shopify redirects to:
```
https://masterdisplaycases.com/thank-you?order_id={orderId}
```

### 3. Middleware Interception

The Next.js middleware intercepts any requests that might redirect to Shopify domains (except checkout paths):

```typescript
// src/middleware.ts
function shouldInterceptRedirect(url: string): boolean {
  const isShopifyDomain = SHOPIFY_DOMAINS.some(d => urlObj.hostname.includes(d));
  
  // Don't intercept if it's an allowed path (checkout/cart)
  if (isAllowedShopifyRedirect(url)) return false;
  
  return isShopifyDomain;
}
```

### 4. Client-Side Interception

For client-side navigation, the `interceptShopifyRedirect` function ensures any Shopify domain links (like logo clicks during checkout) redirect back to the storefront:

```typescript
// src/lib/checkout.ts
export function interceptShopifyRedirect(url: string): string {
  if (isShopifyDomain(url) && !isCheckoutUrl(url)) {
    console.log('🔄 Intercepting Shopify redirect:', url, '->', STOREFRONT_URL);
    return STOREFRONT_URL;
  }
  return url;
}
```

## User Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                           USER FLOW                                  │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. Browse Products                                                  │
│     └─> masterdisplaycases.com/products/xxx                        │
│                                                                      │
│  2. Add to Cart                                                      │
│     └─> Local storage + state management                            │
│                                                                      │
│  3. View Cart                                                        │
│     └─> masterdisplaycases.com/cart                                │
│                                                                      │
│  4. Click "Proceed to Checkout"                                      │
│     └─> Creates Shopify cart via API                                │
│     └─> Adds redirect parameter to checkout URL                     │
│     └─> window.location.href = checkoutUrl (to myshopify.com)       │
│                                                                      │
│  5. Complete Payment                                                 │
│     └─> Shopify processes payment on myshopify.com                  │
│     └─> Shopify redirects to masterdisplaycases.com/thank-you       │
│                                                                      │
│  6. Thank You Page                                                   │
│     └─> masterdisplaycases.com/thank-you?order_id=xxx              │
│     └─> Displays order confirmation                                 │
│     └─> All links point back to masterdisplaycases.com              │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## Failsafe Handling

### Runtime Domain Validation

```typescript
// src/lib/guardDomain.ts
export function enforceCorrectDomain(url: string): string {
  // Block wrong myshopify.com domain
  if (url.includes("masterdisplaycases.myshopify.com")) {
    throw new Error("Wrong Shopify domain still in bundle");
  }
  
  // Block custom domain for checkout URLs
  if (isCheckoutUrl(url) && url.includes(STOREFRONT_DOMAIN)) {
    throw new Error("Checkout must use mraze2-ra.myshopify.com");
  }
  
  return url;
}
```

### URL Normalization

All checkout URLs are normalized to ensure they use the correct domain:

```typescript
// src/lib/checkout.ts
export function normalizeCheckoutUrl(url: string): string {
  // Extract the checkout token from any URL format
  const match = url.match(/checkouts\/([a-zA-Z0-9]+)/);
  if (match) {
    return buildCheckoutUrl(match[1]);
  }
  return url;
}
```

## Testing the Flow

### Manual Test Steps

1. **Browse Products**: Navigate to any product page
2. **Add to Cart**: Click "Add to Cart" on a product
3. **View Cart**: Click the cart icon or navigate to `/cart`
4. **Proceed to Checkout**: Click "Proceed to Checkout"
   - Verify redirect goes to `mraze2-ra.myshopify.com/checkouts/...`
   - Verify the URL includes `checkout%5Bredirect_to%5D%5Bsuccess%5D` parameter
5. **Complete Test Order**: Use Shopify's Bogus Gateway or test payment
6. **Verify Redirect**: After payment, verify redirect to `masterdisplaycases.com/thank-you`
7. **Check Thank You Page**: Verify order details are displayed

### Automated Testing

```bash
# Build the project
npm run build

# Start the production server
npm start

# Test checkout flow (manual or with automated tools)
```

## Shopify Admin Configuration

### Required Settings

1. **Domains**: Ensure `mraze2-ra.myshopify.com` does NOT redirect to `masterdisplaycases.com`
   - Go to Shopify Admin → Settings → Domains
   - The myshopify.com domain should remain separate for checkout

2. **Checkout Settings**: No special configuration needed
   - The redirect parameter is handled via URL parameters

3. **Storefront API**: Ensure the Storefront API access token is configured
   - Go to Shopify Admin → Settings → Apps and sales channels
   - Develop apps → Create app with Storefront API access

## Troubleshooting

### Issue: Users not redirected back to custom domain

**Solution**: Check that the redirect parameter is being appended correctly:
```typescript
console.log('Checkout URL:', checkoutUrl);
// Should include: checkout%5Bredirect_to%5D%5Bsuccess%5D=
```

### Issue: Checkout returns 404

**Solution**: Verify the checkout URL uses `mraze2-ra.myshopify.com`, not `masterdisplaycases.com`:
```typescript
console.log('Checkout domain:', new URL(checkoutUrl).hostname);
// Should be: mraze2-ra.myshopify.com
```

### Issue: TypeScript errors

**Solution**: Run the build to check for errors:
```bash
npm run build
```

## Summary

This system ensures:

1. ✅ All checkout happens on Shopify's secure domain (`mraze2-ra.myshopify.com`)
2. ✅ Post-checkout redirects return users to `masterdisplaycases.com/thank-you`
3. ✅ Any stray Shopify domain navigation is intercepted and redirected
4. ✅ No user ever lands on the Shopify storefront domain during browsing or post-checkout
5. ✅ Complete domain consistency throughout the user journey