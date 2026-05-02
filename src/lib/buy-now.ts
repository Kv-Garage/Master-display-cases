/**
 * Buy Now functionality using Shopify Storefront API
 * Creates a cart, adds item, and redirects to checkout using checkoutUrl ONLY
 * NO manual URL building - uses checkoutUrl from API
 * 
 * IMPORTANT: After checkout completion, user will be redirected back to
 * masterdisplaycases.com/thank-you via the checkout redirect parameter
 */

import { createCart, addToCart } from "./cart";
import { getCheckoutUrl } from "./checkout";

export async function buyNow(variantId: string) {
  // Validate variant ID format
  if (!variantId || !variantId.includes("ProductVariant")) {
    console.error("❌ INVALID VARIANT ID:", variantId);
    console.error("   Expected format: gid://shopify/ProductVariant/XXXX");
    return;
  }

  console.log("🚀 FINAL VARIANT:", variantId);

  try {
    // Create a new cart
    const cart = await createCart();

    if (!cart?.id) {
      console.error("❌ Cart creation failed");
      console.error("   Response:", cart);
      alert("Unable to create cart. Please try again.");
      return;
    }

    console.log("✅ Cart created:", cart.id);

    // Add item to cart
    const updated = await addToCart(cart.id, variantId, 1);

    if (!updated?.checkoutUrl) {
      console.error("❌ Checkout URL missing");
      console.error("   Cart response:", updated);
      alert("Unable to proceed to checkout. Please try again.");
      return;
    }

    // Get the properly configured checkout URL with redirect parameters
    const checkoutUrl = getCheckoutUrl(updated.checkoutUrl);
    console.log("🚀 REDIRECTING:", checkoutUrl);

    // Store item details for post-checkout reference
    try {
      localStorage.setItem('last_order', JSON.stringify({
        items: [{ variantId, quantity: 1 }],
        timestamp: Date.now(),
        isBuyNow: true,
      }));
    } catch (e) {
      console.warn('Could not store order details:', e);
    }

    // Redirect to Shopify checkout
    // The URL includes redirect parameters to return to masterdisplaycases.com/thank-you
    window.location.href = checkoutUrl;
  } catch (err) {
    console.error("❌ Checkout failed:", err);
    alert("Checkout failed. Please try again.");
  }
}
