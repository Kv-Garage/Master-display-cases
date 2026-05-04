# Google Customer Reviews Integration Guide

This document explains the Google Customer Reviews integration that was added to your site.

## Overview

Two components have been integrated:

1. **Google Customer Reviews Opt-In** (Post-Purchase) - Shows on the thank-you page after a successful order
2. **Footer Review CTA** - A visible "Leave a Google Review" button in the footer

---

## Part 1: Google Customer Reviews Opt-In (Thank-You Page)

### What It Does

After a customer completes a purchase, they will see a Google Customer Reviews survey opt-in badge. When clicked, customers can choose to receive a survey via email to review your business on Google.

### Implementation Details

- **Location**: `src/app/thank-you/page.tsx`
- **Merchant ID**: `5779505021` (configured)
- **Trigger**: Only fires when `order_id` and `email` are present (successful purchase)

### Dynamic Data Mapping

The following data is automatically populated:

| Variable | Source | Fallback |
|----------|--------|----------|
| `order_id` | Shopify `order_id` URL parameter | N/A |
| `email` | Shopify `email` URL parameter | N/A |
| `delivery_country` | Shopify `to_country` or `country` URL parameter | `US` |
| `estimated_delivery_date` | Calculated as 14 days from order date | Calculated dynamically |

### Badge Position

The Google survey badge appears as a fixed element in the bottom-right corner of the thank-you page (`z-index: 40`).

---

## Part 2: Footer Review CTA

### What It Does

A clean, centered section in the footer invites all visitors to leave a Google review, regardless of whether they've made a purchase.

### Location

- **File**: `src/components/layout/Footer.tsx`
- **Position**: Between the main footer content and the bottom copyright bar

### Design Specifications

- **Title**: "Loved Your Experience?"
- **Subtext**: "Help other store owners by leaving a quick review."
- **Button**: White background with Google logo, minimum height 48px
- **Spacing**: 24px padding-top (12pt), 32px padding-bottom (8pt section)

### ✅ Google Review URL (Configured)

The footer review button is configured with your official Google Business Profile review URL:

```typescript
const GOOGLE_REVIEW_URL = 'https://g.page/r/CXhIkxeS2TYIEBM/review';
```

This URL:
- Opens directly to your Google review modal
- Works reliably without 404 errors
- Is the official Google short link for your business
- Opens in a new tab (`target="_blank"`)

**Trust Microcopy Added:**
Below the button, users see: "Helps other store owners trust us • Takes 30 seconds"

---

## Verification Checklist

### After Deployment

1. **Test the Thank-You Page**:
   - Complete a test purchase
   - Verify the Google survey badge appears in the bottom-right corner
   - Click the badge to ensure the survey opt-in dialog appears

2. **Test the Footer CTA**:
   - Scroll to the bottom of any page
   - Verify the "Leave a Google Review" section is visible
   - Click the button to ensure it opens Google Reviews in a new tab

3. **Check for Conflicts**:
   - Ensure the survey badge doesn't overlap with the chat widget
   - Verify the footer CTA doesn't conflict with any other footer elements

### Troubleshooting

#### Survey Badge Not Showing

- Verify `order_id` and `email` are being passed in the URL after checkout
- Check browser console for any errors related to `gapi` or `gapi.surveyoptin`
- Ensure the Google Merchant Center account is properly configured

#### Footer Button Not Working

- Verify the `GOOGLE_REVIEW_URL` has been updated with a valid Place ID
- Check that the Place ID is correct using Google's Place ID Finder

---

## Files Modified

1. `src/app/thank-you/page.tsx` - Added Google Customer Reviews script
2. `src/components/layout/Footer.tsx` - Added review CTA section

---

## Notes

- The Google Customer Reviews script only loads when there's a valid order (orderId and email present)
- The estimated delivery date is calculated as 14 days from the order date
- The footer CTA is visible on all pages site-wide
- No changes were made to product pages, checkout flow, or bundle system