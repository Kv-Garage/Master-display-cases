# Shopify Cart & Checkout System - Complete Implementation Guide

## Overview

This is a complete cart and checkout system for a Next.js Shopify storefront using the **Shopify cart URL method** (no Storefront API required). The system uses localStorage to persist cart data and redirects users directly to Shopify's secure checkout.

## Store Configuration

- **Store Domain**: `masterdisplaycases.myshopify.com`
- **Checkout URL Format**: `https://masterdisplaycases.myshopify.com/cart/VARIANT_ID:QUANTITY`

## Architecture

### 1. Core Cart Utilities (`src/lib/cart-utils.ts`)

The foundation of the cart system with the following key functions:

#### `convertToNumericId(id: string | number): number`
Converts GraphQL GID format to numeric ID:
- Input: `"gid://shopify/ProductVariant/12345"` → Output: `12345`
- Input: `"12345"` → Output: `12345`
- Input: `12345` → Output: `12345`

#### `addToCart(variantId: string | number, quantity = 1): CartItem[]`
- Converts variantId to numeric format
- Checks if item already exists in cart
- If exists → increases quantity
- If new → adds item to cart
- Saves to localStorage under key `"cart"`

#### `getCart(): CartItem[]`
- Returns parsed cart from localStorage
- Returns empty array if cart doesn't exist or is invalid
- Validates all cart items

#### `clearCart(): void`
- Removes cart from localStorage
- Clears all cart data

#### `goToCheckout(): void`
- Reads all items from cart
- Builds Shopify cart URL: `/cart/variantId1:qty,variantId2:qty`
- Redirects user using `window.location.href`
- Example: `https://masterdisplaycases.myshopify.com/cart/123:1,456:2`

#### `buyNow(variantId: string | number, quantity = 1): void`
- Converts variantId to numeric format
- Redirects instantly to checkout with single item
- Bypasses cart entirely
- Example: `https://masterdisplaycases.myshopify.com/cart/123:1`

#### Additional Functions:
- `removeFromCart(variantId)`: Remove item from cart
- `updateCartQuantity(variantId, quantity)`: Update item quantity
- `getCartItemCount()`: Get total number of items
- `isCartEmpty()`: Check if cart is empty
- `buildCheckoutUrl()`: Generate checkout URL without redirecting

### 2. React Context (`src/lib/cart-context.tsx`)

Provides cart state and actions to all components:

```typescript
interface CartContextType {
  items: CartItemWithDetails[];
  addItem: (item: Omit<CartItemWithDetails, 'quantity'>) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  checkoutUrl: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  goToCheckout: () => void;
  buyNow: (variantId: string | number, quantity?: number) => void;
}
```

### 3. UI Components

#### AddToCartButton (`src/components/ui/AddToCartButton.tsx`)
```tsx
<AddToCartButton
  variantId={12345} // or "gid://shopify/ProductVariant/12345"
  title="LED Retail Display Showcase"
  price={1999}
  image={{ url: '/product.jpg' }}
  productId="product-123"
  productHandle="led-retail-display-showcase"
  variantTitle="48\" Black"
/>
```

Features:
- Automatic GID to numeric ID conversion
- Loading state while adding
- Success feedback ("Added to Cart!")
- Opens cart drawer automatically

#### BuyNowButton (`src/components/ui/BuyNowButton.tsx`)
```tsx
<BuyNowButton
  variantId={12345}
  quantity={1}
>
  Buy Now
</BuyNowButton>

// Or use the express variant
<ExpressCheckoutButton
  variantId={12345}
  quantity={1}
/>

// Or use direct link (no JS required)
<BuyNowLink
  variantId={12345}
  quantity={1}
>
  Buy Now
</BuyNowLink>
```

Features:
- Direct redirect to Shopify checkout
- Loading state before redirect
- Validates variant ID before redirect

## Usage Examples

### Example 1: Add to Cart from Product Page

```tsx
'use client';

import AddToCartButton from '@/components/ui/AddToCartButton';

export default function ProductPage({ product }) {
  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.price}</p>
      
      <AddToCartButton
        variantId={product.selectedVariant.id} // Can be GID or numeric
        title={product.title}
        price={product.selectedVariant.price}
        image={product.featuredImage}
        productId={product.id}
        productHandle={product.handle}
        variantTitle={product.selectedVariant.title}
      />
    </div>
  );
}
```

### Example 2: Buy Now (Express Checkout)

```tsx
'use client';

import BuyNowButton from '@/components/ui/BuyNowButton';

export default function ProductPage({ product }) {
  return (
    <div>
      <BuyNowButton
        variantId={product.selectedVariant.id}
        quantity={1}
      >
        Buy Now - Go Straight to Checkout
      </BuyNowButton>
    </div>
  );
}
```

### Example 3: Cart Drawer

```tsx
import CartDrawer from '@/components/layout/CartDrawer';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <CartDrawer /> {/* Automatically shows when items added */}
      <Footer />
    </div>
  );
}
```

### Example 4: Using Cart Context Directly

```tsx
'use client';

import { useCart } from '@/lib/cart-context';

export default function SomeComponent() {
  const { 
    items, 
    totalItems, 
    totalPrice, 
    addItem, 
    removeItem, 
    updateQuantity,
    goToCheckout,
    buyNow 
  } = useCart();

  const handleQuickAdd = () => {
    addItem({
      variantId: 'gid://shopify/ProductVariant/12345',
      title: 'Product Name',
      price: 999,
    });
  };

  const handleQuickCheckout = () => {
    goToCheckout(); // Redirects to Shopify with all cart items
  };

  const handleBuyNow = () => {
    buyNow('gid://shopify/ProductVariant/12345', 2); // Direct to checkout
  };

  return (
    <div>
      <p>Cart has {totalItems} items</p>
      <button onClick={handleQuickAdd}>Add Item</button>
      <button onClick={handleQuickCheckout}>Checkout</button>
      <button onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
}
```

## Cart Data Structure

### localStorage Format

The cart is stored in localStorage under the key `"cart"`:

```json
[
  {
    "variantId": 12345,
    "quantity": 2
  },
  {
    "variantId": 67890,
    "quantity": 1
  }
]
```

Item details are stored separately under `"cart_details"`:

```json
{
  "12345": {
    "title": "LED Retail Display Showcase",
    "variantTitle": "48\" Black",
    "price": 1999,
    "image": {
      "url": "/product.jpg",
      "altText": "LED Display Case"
    },
    "productHandle": "led-retail-display-showcase",
    "productId": "product-123"
  }
}
```

## Checkout URL Format

The system builds Shopify cart URLs in this format:

```
https://masterdisplaycases.myshopify.com/cart/VARIANT_ID:QUANTITY,VARIANT_ID:QUANTITY
```

Examples:
- Single item: `https://masterdisplaycases.myshopify.com/cart/123:1`
- Multiple items: `https://masterdisplaycases.myshopify.com/cart/123:2,456:1,789:3`

When user clicks "Checkout" or "Buy Now", they are redirected to this URL, which:
1. Preloads the cart with the specified items
2. Automatically redirects to Shopify's secure checkout
3. No additional API calls required

## Edge Cases Handled

### 1. Invalid Variant IDs
```typescript
try {
  convertToNumericId('invalid-id'); // Throws error
} catch (error) {
  console.error('Invalid variant ID');
}
```

### 2. Empty Cart Checkout
```typescript
if (cart.length === 0) {
  console.warn('Cannot checkout: cart is empty');
  return;
}
```

### 3. Duplicate Items
```typescript
// Automatically handled - increases quantity instead of adding duplicate
addToCart(12345, 1); // First time: adds item
addToCart(12345, 1); // Second time: increases quantity to 2
```

### 4. GID Format Conversion
```typescript
// All of these work:
addToCart('gid://shopify/ProductVariant/12345', 1);
addToCart('12345', 1);
addToCart(12345, 1);
```

## Testing the Implementation

### Manual Testing Steps

1. **Add to Cart Test**:
   - Navigate to any product page
   - Click "Add to Cart"
   - Verify cart drawer opens
   - Verify item appears in cart
   - Refresh page - item should persist

2. **Multiple Items Test**:
   - Add different products to cart
   - Verify all items appear
   - Verify quantities are correct
   - Verify total price calculates correctly

3. **Checkout Test**:
   - Add items to cart
   - Click "Proceed to Checkout"
   - Verify redirect to Shopify checkout
   - Verify all items appear in checkout

4. **Buy Now Test**:
   - Navigate to product page
   - Click "Buy Now"
   - Verify direct redirect to Shopify checkout
   - Verify only that item appears (not entire cart)

5. **Cart Persistence Test**:
   - Add items to cart
   - Close browser
   - Reopen browser
   - Navigate to site
   - Verify cart items are restored

### Browser Console Testing

```javascript
// Check cart contents
console.log(JSON.parse(localStorage.getItem('cart')));

// Test adding item
addToCart('gid://shopify/ProductVariant/12345', 1);

// Test checkout URL
buildCheckoutUrl();

// Test buy now
buyNow(12345, 1);

// Clear cart
clearCart();
```

## Migration from Storefront API

If you were previously using the Storefront API for cart management, here's what changed:

### Before (Storefront API):
```typescript
// Required API calls
const cart = await ShopifyAPI.createCart(lines);
await ShopifyAPI.updateCart(cart.id, lines);
```

### After (Cart URL Method):
```typescript
// No API calls needed
addToCart(variantId, quantity);
goToCheckout();
```

### Benefits:
- ✅ No API rate limits
- ✅ No authentication required
- ✅ Works instantly
- ✅ No server-side code needed
- ✅ Faster checkout flow
- ✅ Works with any Shopify plan

## Troubleshooting

### Issue: Cart items not persisting
**Solution**: Check if localStorage is available and not blocked by browser settings.

### Issue: Checkout URL returns 404
**Solution**: Verify variant IDs are numeric and valid. Check store domain in `.env.local`.

### Issue: Items not appearing in checkout
**Solution**: Ensure variant IDs are correct and products are active in Shopify.

### Issue: TypeScript errors with variantId types
**Solution**: The system accepts both string and number types, and converts automatically.

## Files Modified

1. `src/lib/cart-utils.ts` - Core cart utilities (NEW)
2. `src/lib/cart-context.tsx` - React context (UPDATED)
3. `src/components/ui/AddToCartButton.tsx` - Add to cart button (NEW)
4. `src/components/ui/BuyNowButton.tsx` - Buy now button (NEW)
5. `src/components/layout/CartDrawer.tsx` - Cart drawer (UPDATED)
6. `src/app/cart/page.tsx` - Cart page (UPDATED)

## Summary

This implementation provides a complete, production-ready cart and checkout system that:

- ✅ Uses localStorage for cart persistence
- ✅ Converts GID format to numeric IDs automatically
- ✅ Handles duplicate items correctly
- ✅ Builds proper Shopify checkout URLs
- ✅ Provides "Add to Cart" and "Buy Now" functionality
- ✅ Works without Shopify API calls
- ✅ Requires no authentication
- ✅ Works instantly with Shopify checkout
- ✅ Handles all edge cases
- ✅ Provides React components and hooks for easy integration

The system is ready to use and requires no additional configuration beyond ensuring your Shopify store domain is correct in the code.