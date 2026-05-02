# Shopify Analytics Tracking Implementation

## Problem
When users clicked product links from the main site (masterdisplaycases.com) to Shopify (mraze2-ra.myshopify.com), the traffic data wasn't being recorded in Shopify Analytics. This was because:

1. Direct links to Shopify didn't include UTM tracking parameters
2. No referrer data was being passed to Shopify
3. Cross-domain tracking wasn't configured

## Solution

### 1. Enhanced URL Helper (`src/lib/shopify-urls.ts`)

Updated to automatically append UTM parameters to all Shopify product URLs:

```typescript
export function getShopifyProductUrl(slug: string): string {
  const utmParams = getUtmParams();
  return `${SHOPIFY_DOMAIN}/products/${slug}${utmParams}`;
}
```

**Features:**
- Preserves existing UTM params from ad clicks (utm_source, utm_medium, utm_campaign, etc.)
- Adds default tracking if no UTM params present (`utm_source=masterdisplaycases.com&utm_medium=referral`)
- Includes referrer information

### 2. Analytics Bridge Script (`src/app/layout.tsx`)

Added a client-side script that:

1. **Stores UTM params in sessionStorage** - Preserves tracking data for cross-domain navigation
2. **Intercepts Shopify link clicks** - Dynamically adds tracking parameters to all Shopify links
3. **Tracks clicks with GA4** - Records `shopify_redirect` events in Google Analytics

```javascript
// Intercept clicks on Shopify links
document.addEventListener('click', function(e) {
  var link = e.target.closest('a[href*="mraze2-ra.myshopify.com"]');
  if (link) {
    var url = new URL(link.href);
    
    // Add UTM params if not present
    if (!url.searchParams.has('utm_source')) {
      url.searchParams.set('utm_source', 'masterdisplaycases.com');
    }
    if (!url.searchParams.has('utm_medium')) {
      url.searchParams.set('utm_medium', 'referral');
    }
    
    // Add referrer info
    url.searchParams.set('referrer', window.location.href);
    
    // Update link with tracking params
    link.href = url.toString();
    
    // Track with GA4
    gtag('event', 'shopify_redirect', {
      event_category: 'Navigation',
      event_label: url.pathname,
      destination: link.href
    });
  }
});
```

## How It Works

### User Journey with Tracking

1. **User clicks ad** → Lands on masterdisplaycases.com with UTM params
   - Example: `?utm_source=google&utm_medium=cpc&utm_campaign=summer_sale`

2. **User browses site** → UTM params preserved in URL and sessionStorage

3. **User clicks product link** → Script intercepts click and adds tracking:
   - Preserves original UTM params from ad
   - Adds `utm_source=masterdisplaycases.com` if not present
   - Adds `utm_medium=referral`
   - Adds `referrer` parameter with current page URL

4. **User arrives at Shopify** → URL includes all tracking data:
   - Example: `https://mraze2-ra.myshopify.com/products/product-handle?utm_source=google&utm_medium=cpc&utm_campaign=summer_sale&referrer=https://masterdisplaycases.com/blog/post`

5. **Shopify Analytics records session** with:
   - Traffic source (utm_source)
   - Medium (utm_medium)
   - Campaign (utm_campaign)
   - Referrer page

## Verifying Tracking

### In Shopify Admin

1. Go to **Analytics > Reports**
2. Check **Sessions by traffic source** - Should show `masterdisplaycases.com` as a source
3. Check **Sessions by referrer** - Should show specific pages from masterdisplaycases.com
4. Check **Sales by traffic source** - Attributed sales from the main site

### In Google Analytics

1. Check **Events** report for `shopify_redirect` events
2. View event parameters: `event_label` (product path), `destination` (full Shopify URL)

### Manual Testing

1. Open browser DevTools → Network tab
2. Click a product link to Shopify
3. Check the request URL - should include UTM parameters
4. Verify GA4 `shopify_redirect` event in Network tab (look for `/g/collect` requests)

## Files Modified

- `src/lib/shopify-urls.ts` - Enhanced with UTM parameter handling
- `src/app/layout.tsx` - Added Shopify Analytics Bridge script

## Deployment Notes

After deploying:
1. Test a few product links to verify UTM params are added
2. Check Shopify Analytics after 24 hours for traffic data
3. Verify GA4 is recording `shopify_redirect` events