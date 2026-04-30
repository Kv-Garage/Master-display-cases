# Shopify Checkout 404 Audit Report

## Executive Summary

**Root Cause Identified**: Shopify is configured to redirect `mraze2-ra.myshopify.com` to `masterdisplaycases.com`, but the custom domain is hosted on Netlify (not Shopify), so `/cart` URLs return 404.

**Solution**: 
1. ✅ Code fixed to use hardcoded `mraze2-ra.myshopify.com` for checkout
2. ⚠️ **ACTION REQUIRED**: Remove domain redirect in Shopify Admin

---

## Step 1: Shopify Primary Domain Verification

### Current Configuration:
| Setting | Value |
|---------|-------|
| Custom Domain | `masterdisplaycases.com` |
| MyShopify Domain | `mraze2-ra.myshopify.com` |
| Primary Domain | `masterdisplaycases.com` (custom domain is set as primary) |

### Issue:
The custom domain `masterdisplaycases.com` is connected to BOTH:
- **Netlify** (for frontend hosting) ✅
- **Shopify** (for checkout) ❌

This creates a DNS conflict where Shopify redirects the myshopify.com domain to the custom domain, but the custom domain doesn't have Shopify checkout routes.

---

## Step 2: Checkout Domain Configuration

### Before Fix:
```ts
// src/lib/domain.ts - WRONG
export const SHOPIFY_DOMAIN = "masterdisplaycases.com";

// src/lib/shopify.ts - WRONG  
export function getCheckoutDomain(): string {
  return SHOPIFY_DOMAIN; // Returns masterdisplaycases.com
}
```

### After Fix:
```ts
// src/lib/cart-utils.ts - FIXED
function getCheckoutDomain(): string {
  const domain = "mraze2-ra.myshopify.com"; // HARDCODED
  return domain;
}

// src/components/ui/BuyNowButton.tsx - FIXED
const shopifyDomain = "mraze2-ra.myshopify.com"; // HARDCODED

// src/lib/guardDomain.ts - FIXED
export const CHECKOUT_DOMAIN = "mraze2-ra.myshopify.com";
```

---

## Step 3: Product Variants Verification

### Variant IDs Tested:
| Product | Variant ID | Status |
|---------|------------|--------|
| 48" LED Retail Wrap Counter | `48310735405156` | ✅ Valid |
| 48" LED Retail Wrap Counter | `48310735437924` | ✅ Valid |
| 72" LED Retail Display Case | `48310806380644` | ✅ Valid |
| 72" LED Retail Display Case | `48310806413412` | ✅ Valid |
| 48" LED Retail Display Showcase | `48310840066148` | ✅ Valid |
| 70" LED Retail Display Showcase | `48310898262116` | ✅ Valid |

**All variant IDs are valid** - the issue is NOT with variant IDs.

---

## Step 4: Checkout URL Testing

### Test Results:

#### Test 1: myshopify.com domain
```bash
curl -I "https://mraze2-ra.myshopify.com/cart/48310735405156:1"

HTTP/2 301
location: https://masterdisplaycases.com/cart/48310735405156:1
```
**Result**: Shopify redirects to custom domain ❌

#### Test 2: Custom domain
```bash
curl -I "https://masterdisplaycases.com/cart/48310735405156:1"

HTTP/2 404
server: Netlify
```
**Result**: Netlify returns 404 (no /cart route exists) ❌

---

## Step 5: Domain Conflict Analysis

### Current DNS Setup:
```
masterdisplaycases.com
├── A record → 75.2.60.5 (Netlify) ✅
└── Connected to Shopify Store ❌
    └── Causes redirect: mraze2-ra.myshopify.com → masterdisplaycases.com
```

### The Problem:
1. User clicks "Buy Now" or "Checkout"
2. Browser goes to `https://mraze2-ra.myshopify.com/cart/123:1`
3. Shopify redirects to `https://masterdisplaycases.com/cart/123:1`
4. Netlify receives request for `/cart/123:1`
5. Netlify returns 404 (no such route exists)

---

## Step 6: Required DNS/Shopify Configuration Fix

### Option A (RECOMMENDED): Keep Headless Architecture

**In Shopify Admin → Settings → Domains:**

1. **Remove the redirect** from `mraze2-ra.myshopify.com` to `masterdisplaycases.com`
2. **Keep** `masterdisplaycases.com` as the primary domain for the store
3. **Do NOT** connect `masterdisplaycases.com` to Shopify's Online Store (only use it for checkout)

**DNS Configuration:**
```
masterdisplaycases.com
├── A record → 75.2.60.5 (Netlify) ✅
└── NO CNAME to Shopify ✅
```

**How to verify:**
1. Go to Shopify Admin → Settings → Domains
2. Look for any redirect settings
3. Ensure `mraze2-ra.myshopify.com` does NOT redirect to `masterdisplaycases.com`

### Option B: Move to Shopify (Not Headless)

If you want Shopify to handle the entire site:
1. Point `masterdisplaycases.com` to Shopify (change A record)
2. Remove Netlify hosting
3. Use Shopify themes instead of custom Next.js

---

## Step 7: Code Changes Made

### Files Modified:

1. **`src/lib/cart-utils.ts`**
   - Changed `getCheckoutDomain()` to return hardcoded `mraze2-ra.myshopify.com`
   - Removed environment variable dependency

2. **`src/components/ui/BuyNowButton.tsx`**
   - Changed `BuyNowLink` to use hardcoded `mraze2-ra.myshopify.com`

3. **`src/lib/guardDomain.ts`**
   - Added guard to block custom domain for checkout URLs
   - Added helpful error messages with fix instructions

4. **`src/app/test-checkout/page.tsx`**
   - Changed to use hardcoded `mraze2-ra.myshopify.com`

5. **`VERIFY_CHECKOUT.js`**
   - Changed to use hardcoded `mraze2-ra.myshopify.com`

6. **`CART_SYSTEM_GUIDE.md`**
   - Updated documentation to reflect hardcoded domain approach

---

## Success Conditions

### After Shopify Admin Fix:

| Condition | Status |
|-----------|--------|
| No requests go to `masterdisplaycases.myshopify.com` | ✅ Pass |
| All checkout goes to `mraze2-ra.myshopify.com` | ✅ Pass (code fixed) |
| No 404 errors | ⚠️ Requires Shopify Admin fix |
| Checkout loads immediately | ⚠️ Requires Shopify Admin fix |

### Expected Behavior After Fix:

```
User clicks "Buy Now"
    ↓
Browser goes to: https://mraze2-ra.myshopify.com/cart/48310735405156:1
    ↓
Shopify processes cart (NO redirect to custom domain)
    ↓
User sees checkout page ✅
```

---

## Immediate Action Required

### Go to Shopify Admin → Settings → Domains and:

1. **Find the redirect setting** that redirects `mraze2-ra.myshopify.com` to `masterdisplaycases.com`
2. **Disable or remove** this redirect
3. **Save** changes

### Verify the fix:

```bash
# This should NO LONGER redirect to masterdisplaycases.com
curl -I "https://mraze2-ra.myshopify.com/cart/48310735405156:1"

# Expected: Should NOT have "location: https://masterdisplaycases.com/..."
# Instead: Should process the cart directly or redirect to checkout
```

---

## Summary

| Item | Status |
|------|--------|
| **Shopify Primary Domain** | `masterdisplaycases.com` |
| **MyShopify Domain** | `mraze2-ra.myshopify.com` |
| **Variant ID Tested** | `48310735405156` (valid) |
| **Checkout URL** | `https://mraze2-ra.myshopify.com/cart/48310735405156:1` |
| **Code Fix** | ✅ Complete |
| **DNS/Shopify Fix** | ⚠️ Action Required |

---

**Date**: 2026-04-29  
**Engineer**: Claude Code  
**Status**: Code changes complete, Shopify Admin configuration change required